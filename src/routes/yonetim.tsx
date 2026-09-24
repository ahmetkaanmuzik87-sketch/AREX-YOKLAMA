import { createFileRoute } from "@tanstack/react-router";
import { Check, LogOut, Search } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { listYoklama, loginAdmin } from "@/lib/api";
import type { YoklamaRecord } from "@/lib/types";
import { formatDateShort, istanbulDateKey, matchesQuery } from "@/lib/utils";

export const Route = createFileRoute("/yonetim")({ component: YonetimPage });

const TOKEN_KEY = "ao-admin-token";

function YonetimPage() {
  const [token, setToken] = useState("");
  const [ready, setReady] = useState(false);
  const [pin, setPin] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [records, setRecords] = useState<YoklamaRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(sessionStorage.getItem(TOKEN_KEY) ?? "");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    setLoading(true);
    listYoklama({ data: { token } })
      .then((res) => {
        if (cancelled) return;
        if (!res.ok) {
          sessionStorage.removeItem(TOKEN_KEY);
          setToken("");
          toast.error(res.error);
          return;
        }
        setRecords(res.records);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          toast.error(err instanceof Error ? err.message : "Kayıtlar alınamadı.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function onLogin(e: FormEvent) {
    e.preventDefault();
    setUnlocking(true);
    try {
      const res = await loginAdmin({ data: { pin } });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      sessionStorage.setItem(TOKEN_KEY, res.token);
      setToken(res.token);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Giriş yapılamadı.");
    } finally {
      setUnlocking(false);
    }
  }

  if (!ready) {
    return (
      <PageShell title="Yönetim">
        <div className="rounded-xl bg-paper p-8 text-center text-sm text-fg-muted shadow-card">
          Yükleniyor…
        </div>
      </PageShell>
    );
  }

  if (!token) {
    return (
      <PageShell title="Yönetim" subtitle="Kayıtları görmek için şifre gerekli">
        <form
          onSubmit={onLogin}
          className="mx-auto max-w-sm rounded-xl bg-paper p-6 shadow-card sm:p-8"
        >
          <Label htmlFor="pin">Yönetim şifresi</Label>
          <Input
            id="pin"
            type="password"
            inputMode="numeric"
            autoComplete="current-password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="mt-2 tracking-[0.4em]"
            placeholder="••••••"
            autoFocus
          />
          <Button type="submit" className="mt-5 h-12 w-full" disabled={unlocking || !pin}>
            {unlocking ? "Kontrol ediliyor…" : "Giriş"}
          </Button>
        </form>
      </PageShell>
    );
  }

  return (
    <AdminTable
      records={records}
      loading={loading}
      onRefresh={() => {
        setToken((current) => current);
        listYoklama({ data: { token } }).then((res) => {
          if (res.ok) setRecords(res.records);
          else toast.error(res.error);
        });
      }}
      onLogout={() => {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken("");
        setRecords([]);
      }}
    />
  );
}

function AdminTable({
  records,
  loading,
  onRefresh,
  onLogout,
}: {
  records: YoklamaRecord[];
  loading: boolean;
  onRefresh: () => void;
  onLogout: () => void;
}) {
  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (teacher && !matchesQuery(r.teacherName, teacher)) return false;
      if (student && !matchesQuery(r.absentNames, student)) return false;
      if (number && !matchesQuery(r.absentNumbers, number)) return false;
      if (date && istanbulDateKey(r.submittedAt) !== date) return false;
      return true;
    });
  }, [records, teacher, student, number, date]);

  const hasFilters = Boolean(teacher || student || number || date);

  return (
    <PageShell title="Yönetim" subtitle={`${filtered.length} kayıt`}>
      <div className="mb-5 rounded-xl bg-paper p-4 shadow-card sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-fg-muted uppercase">
            <Search className="size-3.5" />
            Filtreleme
          </p>
          <div className="flex gap-2">
            {hasFilters ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setTeacher("");
                  setStudent("");
                  setNumber("");
                  setDate("");
                }}
              >
                Temizle
              </Button>
            ) : null}
            <Button type="button" variant="outline" size="sm" onClick={onRefresh}>
              Yenile
            </Button>
            <Button type="button" variant="ghost" size="icon" className="size-9" onClick={onLogout} aria-label="Çıkış">
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <Label htmlFor="f-teacher">Öğretmen ismi</Label>
            <Input id="f-teacher" value={teacher} onChange={(e) => setTeacher(e.target.value)} placeholder="Ara" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="f-student">Yok olan öğrenci</Label>
            <Input id="f-student" value={student} onChange={(e) => setStudent(e.target.value)} placeholder="Ara" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="f-number">Yok olan öğrenci numarası</Label>
            <Input id="f-number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Ara" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="f-date">Yoklama tarih-saat</Label>
            <Input id="f-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl bg-paper p-8 text-center text-sm text-fg-muted shadow-card">
          Kayıtlar yükleniyor…
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl bg-paper p-8 text-center text-sm text-fg-muted shadow-card">
          Gösterilecek yoklama kaydı yok.
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl bg-paper shadow-card md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-ink text-[11px] tracking-[0.14em] text-paper uppercase">
                  <tr>
                    <th className="px-4 py-3 font-medium">Öğretmen ismi</th>
                    <th className="px-4 py-3 font-medium">Yok olan öğrenci ismi</th>
                    <th className="px-4 py-3 font-medium">Yok olan öğrenci numarası</th>
                    <th className="px-4 py-3 font-medium">Yoklama alınan tarih ve saat</th>
                    <th className="px-4 py-3 text-center font-medium">Öğrenciler tam</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr key={r.id} className={i % 2 ? "bg-paper-2/60" : "bg-paper"}>
                      <td className="px-4 py-3 font-medium text-ink">{r.teacherName}</td>
                      <td className="px-4 py-3 text-fg-muted">{r.allPresent ? "" : r.absentNames}</td>
                      <td className="px-4 py-3 font-mono text-xs tabular-nums text-fg-muted">
                        {r.allPresent ? "" : r.absentNumbers}
                      </td>
                      <td className="px-4 py-3 text-fg-muted">
                        {r.allPresent ? (
                          ""
                        ) : (
                          <span>
                            {formatDateShort(r.submittedAt)}
                            {r.lessonHour ? (
                              <span className="mt-0.5 block text-xs text-fg-subtle">{r.lessonHour}</span>
                            ) : null}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {r.allPresent ? (
                          <span className="inline-flex size-7 items-center justify-center rounded-full bg-success-soft text-success">
                            <Check className="size-4" strokeWidth={2.5} />
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ul className="space-y-3 md:hidden">
            {filtered.map((r) => (
              <li key={r.id} className="rounded-xl bg-paper p-4 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium text-ink">{r.teacherName}</p>
                  {r.allPresent ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-medium text-success">
                      <Check className="size-3" />
                      Tam
                    </span>
                  ) : null}
                </div>
                {r.allPresent ? null : (
                  <dl className="mt-3 space-y-1.5 text-sm">
                    <div>
                      <dt className="text-[11px] tracking-wide text-fg-subtle uppercase">Öğrenci</dt>
                      <dd>{r.absentNames}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] tracking-wide text-fg-subtle uppercase">Numara</dt>
                      <dd className="font-mono text-xs tabular-nums">{r.absentNumbers}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] tracking-wide text-fg-subtle uppercase">Tarih ve saat</dt>
                      <dd>
                        {formatDateShort(r.submittedAt)}
                        {r.lessonHour ? ` · ${r.lessonHour}` : ""}
                      </dd>
                    </div>
                  </dl>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </PageShell>
  );
}
