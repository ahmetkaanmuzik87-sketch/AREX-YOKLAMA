import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, Bot } from "lucide-react";
import { useRef, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { askAssistant } from "@/lib/api";
import type { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ai")({ component: AiPage });

const SUGGESTIONS = [
  "Bugün kimler yok?",
  "Hangi öğretmenler yoklama gönderdi?",
  "Olmayan öğrenci yok işaretlenen dersler",
];

function ChatBody({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const bold = /^\*\*([^*]+)\*\*$/.exec(part);
        if (bold) return <strong key={i}>{bold[1]}</strong>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function AiPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    const next = [...messages, { role: "user" as const, text: trimmed }];
    setMessages(next);
    setInput("");
    setPending(true);
    setError("");
    try {
      const res = await askAssistant({ data: { messages: next } });
      setMessages([...next, { role: "model", text: res.text }]);
      requestAnimationFrame(() => {
        scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yanıt alınamadı.");
    } finally {
      setPending(false);
    }
  }

  return (
    <PageShell title="Atatürk AI" subtitle="Yoklama asistanı · Gemini ücretsiz katman">
      <div className="flex min-h-[70dvh] flex-col rounded-xl bg-paper shadow-card">
        <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
          {messages.length === 0 ? (
            <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-ink text-paper">
                <Bot className="size-5" />
              </span>
              <p className="mt-4 font-display text-2xl font-semibold text-ink">Nasıl yardımcı olayım?</p>
              <p className="mt-1 max-w-sm text-sm text-fg-muted">
                Yoklama kayıtlarını sorabilir, günlük özet alabilir veya form hakkında bilgi isteyebilirsiniz.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full bg-paper-2 px-3 py-2 text-xs text-fg transition-colors hover:bg-paper-3"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                    m.role === "user" ? "rounded-br-xs bg-ink text-paper" : "rounded-bl-xs bg-paper-2 text-fg",
                  )}
                >
                  <ChatBody text={m.text} />
                </div>
              </div>
            ))
          )}
          {pending ? <p className="text-xs tracking-wide text-fg-subtle">Düşünüyor…</p> : null}
          {error ? <p className="text-xs text-accent">{error}</p> : null}
        </div>

        <form
          className="border-t border-line p-3 sm:p-4"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder="Bir soru yazın…"
              className="max-h-32 min-h-11 flex-1 resize-none rounded-md bg-paper-2 px-3.5 py-2.5 text-sm outline-none focus-visible:shadow-[0_0_0_2px_var(--color-accent)]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
            />
            <Button type="submit" size="icon" disabled={pending || !input.trim()} aria-label="Gönder">
              <ArrowUp className="size-4" />
            </Button>
          </div>
        </form>
      </div>
    </PageShell>
  );
}
