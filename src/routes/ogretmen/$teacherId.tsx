import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, CircleCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitYoklama } from "@/lib/api";
import { getTeacher } from "@/lib/teachers";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ogretmen/$teacherId")({
  component: YoklamaForm,
});

function YoklamaForm() {
  const { teacherId } = Route.useParams();
  const teacher = getTeacher(teacherId);

  const [absentNames, setAbsentNames] = useState("");
  const [absentNumbers, setAbsentNumbers] = useState("");
  const [lessonHour, setLessonHour] = useState("");
  const [allPresent, setAllPresent] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!teacher) {
    return (
      <PageShell title="Öğretmen bulunamadı">
        <div className="rounded-xl bg-paper p-8 text-center shadow-card">
          <p className="text-sm text-fg-muted">Bu isim kadroda yer almıyor.</p>
          <Button asChild className="mt-4" variant="ink">
            <Link to="/ogretmen">Listeye dön</Link>
          </Button>
        </div>
      </PageShell>
    );
  }

  function validate() {
    if (allPresent) return true;
    const next: Record<string, string> = {};
    if (!absentNames.trim()) next.absentNames = "Yok olan öğrenci isimlerini yazın.";
    if (!absentNumbers.trim()) next.absentNumbers = "Yok olan öğrenci numaralarını yazın.";
    if (!lessonHour.trim()) next.lessonHour = "Ders saatini yazın.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!teacher) return;
    if (!validate()) return;
    setSending(true);
    try {
      await submitYoklama({
        data: {
          teacherId: teacher.id,
          teacherName: teacher.name,
          teacherTitle: teacher.title,
          absentNames: allPresent ? "" : absentNames,
          absentNumbers: allPresent ? "" : absentNumbers,
          lessonHour: allPresent ? "" : lessonHour,
          allPresent,
        },
      });
      setDone(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gönderilemedi.");
    } finally {
      setSending(false);
    }
  }

  function toggleAllPresent() {
    const next = !allPresent;
    setAllPresent(next);
    setErrors({});
    if (next) {
      setAbsentNames("");
      setAbsentNumbers("");
      setLessonHour("");
    }
  }

  if (done) {
    return (
      <PageShell title="Yoklama" subtitle={teacher.name}>
        <div className="mx-auto max-w-lg rounded-xl bg-paper px-6 py-12 text-center shadow-card">
          <CircleCheck className="mx-auto size-12 text-success" strokeWidth={1.5} />
          <p className="mt-5 font-display text-2xl font-semibold leading-snug tracking-wide text-ink uppercase">
            Yoklama gönderildi
            <br />
            dersinize devam edebilirsiniz
          </p>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              variant="ink"
              onClick={() => {
                setDone(false);
                setAllPresent(false);
                setAbsentNames("");
                setAbsentNumbers("");
                setLessonHour("");
              }}
            >
              Yeni yoklama
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Ana menü</Link>
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  const locked = allPresent;

  return (
    <PageShell title={teacher.name} subtitle={teacher.title}>
      <form onSubmit={onSubmit} className="mx-auto max-w-lg space-y-5 rounded-xl bg-paper p-5 shadow-card sm:p-7">
        <div className="space-y-1.5">
          <Label htmlFor="absent-names">Yok olan öğrenci isimleri</Label>
          <Textarea
            id="absent-names"
            value={absentNames}
            onChange={(e) => setAbsentNames(e.target.value)}
            disabled={locked}
            placeholder="Örn: Ayşe Demir, Mehmet Kaya"
            rows={3}
          />
          {errors.absentNames ? <p className="text-xs text-accent">{errors.absentNames}</p> : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="absent-numbers">Yok olan öğrenci numaraları</Label>
          <Textarea
            id="absent-numbers"
            value={absentNumbers}
            onChange={(e) => setAbsentNumbers(e.target.value)}
            disabled={locked}
            placeholder="Örn: 145, 212"
            rows={2}
          />
          {errors.absentNumbers ? <p className="text-xs text-accent">{errors.absentNumbers}</p> : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="lesson-hour">Yoklama alınan ders saati</Label>
          <Input
            id="lesson-hour"
            value={lessonHour}
            onChange={(e) => setLessonHour(e.target.value)}
            disabled={locked}
            placeholder="Örn: 3. Ders"
          />
          {errors.lessonHour ? <p className="text-xs text-accent">{errors.lessonHour}</p> : null}
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={allPresent}
          onClick={toggleAllPresent}
          className={cn(
            "flex min-h-14 w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors",
            allPresent ? "bg-success-soft text-success" : "bg-paper-2 text-fg",
          )}
        >
          <span
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-xs border",
              allPresent ? "border-success bg-success text-paper" : "border-line bg-paper",
            )}
          >
            {allPresent ? <Check className="size-4" strokeWidth={2.5} /> : null}
          </span>
          <span>
            <span className="block text-sm font-medium tracking-wide">Olmayan öğrenci yok</span>
            <span className="block text-xs opacity-70">
              İşaretlenince üstteki alanlar kilitlenir
            </span>
          </span>
        </button>

        <Button type="submit" className="h-12 w-full" disabled={sending}>
          {sending ? "Gönderiliyor…" : "Gönder"}
        </Button>
      </form>
    </PageShell>
  );
}
