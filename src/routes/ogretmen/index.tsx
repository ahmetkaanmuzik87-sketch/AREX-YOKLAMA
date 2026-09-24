import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Input } from "@/components/ui/input";
import { TEACHERS, teachersByDepartment } from "@/lib/teachers";
import { matchesQuery } from "@/lib/utils";

export const Route = createFileRoute("/ogretmen/")({ component: OgretmenList });

function OgretmenList() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const list = TEACHERS.filter(
      (t) => matchesQuery(t.name, query) || matchesQuery(t.title, query) || matchesQuery(t.department, query),
    );
    return teachersByDepartment(list);
  }, [query]);

  const total = filtered.reduce((n, g) => n + g.teachers.length, 0);

  return (
    <PageShell title="Öğretmen Yoklaması" subtitle="İsminizi arayın veya listeden seçin">
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-fg-subtle" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Öğretmen adı, branş…"
          className="h-12 pl-10"
          autoFocus
          autoComplete="off"
        />
      </div>

      <p className="mb-4 text-xs tracking-wide text-fg-subtle">
        {total} öğretmen · Teşkilat şeması
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl bg-paper p-8 text-center shadow-card">
          <p className="text-sm text-fg-muted">Aramanıza uygun öğretmen bulunamadı.</p>
        </div>
      ) : (
        <div className="space-y-7">
          {filtered.map((group) => (
            <section key={group.department}>
              <h2 className="sticky top-0 z-10 -mx-1 bg-paper/90 px-1 py-2 font-display text-lg font-semibold text-ink backdrop-blur-sm">
                {group.department}
              </h2>
              <ul className="divide-y divide-line overflow-hidden rounded-xl bg-paper shadow-card">
                {group.teachers.map((teacher) => (
                  <li key={teacher.id}>
                    <Link
                      to="/ogretmen/$teacherId"
                      params={{ teacherId: teacher.id }}
                      className="flex min-h-14 items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-paper-2"
                    >
                      <span>
                        <span className="block font-medium text-ink">{teacher.name}</span>
                        <span className="block text-xs text-fg-muted">{teacher.title}</span>
                      </span>
                      <span className="text-xs tracking-wide text-accent">Seç</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </PageShell>
  );
}
