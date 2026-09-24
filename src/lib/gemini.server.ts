import type { ChatMessage, YoklamaRecord } from "./types";
import { formatDateTime } from "./utils";

const API_KEY = "AQ.Ab8RN6JGooG6qmzSGCxxzWd7YOSoCvz7UJwncdQ6hWNRlPZH6g";
const MODEL = "gemini-flash-lite-latest";

function extractText(payload: unknown) {
  const json = payload as {
    error?: { message?: string };
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  if (json.error?.message) throw new Error(json.error.message);
  const parts = json.candidates?.[0]?.content?.parts ?? [];
  const text = parts.map((p) => p.text ?? "").join("").trim();
  if (!text) throw new Error("Asistan şu anda yanıt üretemedi.");
  return text;
}

export async function askGemini(messages: ChatMessage[], records: YoklamaRecord[]) {
  const recent = records.slice(0, 80);
  const lines = recent.length
    ? recent
        .map((r) => {
          const when = formatDateTime(r.submittedAt);
          if (r.allPresent) {
            return `- ${when} | ${r.teacherName} (${r.teacherTitle}) | Öğrenciler tam`;
          }
          return `- ${when} | ${r.teacherName} (${r.teacherTitle}) | Ders: ${r.lessonHour || "—"} | Yok: ${r.absentNames || "—"} | No: ${r.absentNumbers || "—"}`;
        })
        .join("\n")
    : "Henüz yoklama kaydı yok.";

  const system = `Sen Artvin / Arhavi Atatürk Ortaokulu Yoklama Sistemi asistanısın.
Kısa, resmi ve net Türkçe konuş. Görevlerin:
- Yoklama kayıtlarını özetlemek, kimlerin yok olduğunu söylemek
- Öğretmenlere yoklama formunu nasıl dolduracaklarını anlatmak
- Yönetime günlük / branş bazlı yoklama özeti vermek
- Okul teşkilatındaki öğretmen isimleri ve branşları hakkında bilgi vermek

Kurallar:
- Uydurma yoklama kaydı yazma. Sadece aşağıda verilen kayıtlara dayan.
- Kayıt yoksa bunu açıkça söyle.
- Tarihleri Türkiye saatiyle (Europe/Istanbul) yorumla.
- Kısa paragraflar ve madde işaretleri kullan. Gereksiz başlık şablonu yazma.
- Bugünün tarihi: ${formatDateTime(new Date().toISOString())}

Güncel yoklama kayıtları (yeniden eskiye, en fazla 80):
${lines}`;

  const contents = messages
    .filter((m) => m.text.trim())
    .slice(-12)
    .map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

  if (!contents.length) {
    throw new Error("Bir soru yazın.");
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1024,
        },
      }),
    },
  );

  const json: unknown = await res.json();
  if (!res.ok) {
    const err = json as { error?: { message?: string } };
    throw new Error(err.error?.message || `Gemini yanıt vermedi (${res.status}).`);
  }
  return extractText(json);
}
