import { createServerFn } from "@tanstack/react-start";
import type { ChatMessage, SubmitYoklamaInput, YoklamaRecord } from "./types";

export const loginAdmin = createServerFn({ method: "POST" })
  .validator((data: { pin: string }) => data)
  .handler(async ({ data }) => {
    const { checkPin, issueToken } = await import("./admin.server");
    if (!checkPin(data.pin ?? "")) {
      return { ok: false as const, error: "Şifre hatalı." };
    }
    return { ok: true as const, token: issueToken() };
  });

export const listYoklama = createServerFn({ method: "POST" })
  .validator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const { verifyToken } = await import("./admin.server");
    if (!verifyToken(data.token ?? "")) {
      return { ok: false as const, error: "Oturum sona erdi.", records: [] as YoklamaRecord[] };
    }
    const { readRecords } = await import("./jsonbin.server");
    const records = await readRecords();
    return { ok: true as const, records };
  });

export const submitYoklama = createServerFn({ method: "POST" })
  .validator((data: SubmitYoklamaInput) => data)
  .handler(async ({ data }) => {
    const allPresent = Boolean(data.allPresent);
    const absentNames = allPresent ? "" : (data.absentNames ?? "").trim();
    const absentNumbers = allPresent ? "" : (data.absentNumbers ?? "").trim();
    const lessonHour = allPresent ? "" : (data.lessonHour ?? "").trim();

    if (!data.teacherId || !data.teacherName) {
      throw new Error("Öğretmen bilgisi eksik.");
    }
    if (!allPresent && (!absentNames || !absentNumbers || !lessonHour)) {
      throw new Error("Tüm alanları doldurun veya «Olmayan öğrenci yok» seçeneğini işaretleyin.");
    }

    const record: YoklamaRecord = {
      id: crypto.randomUUID(),
      teacherId: data.teacherId,
      teacherName: data.teacherName,
      teacherTitle: data.teacherTitle ?? "",
      absentNames,
      absentNumbers,
      lessonHour,
      allPresent,
      submittedAt: new Date().toISOString(),
    };

    const { appendRecord } = await import("./jsonbin.server");
    await appendRecord(record);
    return { ok: true as const, record };
  });

export const askAssistant = createServerFn({ method: "POST" })
  .validator((data: { messages: ChatMessage[] }) => data)
  .handler(async ({ data }) => {
    const { readRecords } = await import("./jsonbin.server");
    const { askGemini } = await import("./gemini.server");
    const records = await readRecords();
    const text = await askGemini(data.messages ?? [], records);
    return { ok: true as const, text };
  });
