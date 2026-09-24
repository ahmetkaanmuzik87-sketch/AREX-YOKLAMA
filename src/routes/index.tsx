import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, ClipboardList, Shield } from "lucide-react";
import { Crest } from "@/components/crest";

export const Route = createFileRoute("/")({ component: Home });

const OPTIONS = [
  {
    to: "/yonetim" as const,
    label: "Yönetim",
    detail: "Yoklama kayıtlarını görüntüle ve filtrele",
    icon: Shield,
  },
  {
    to: "/ogretmen" as const,
    label: "Öğretmen",
    detail: "İsminizi seçin, ders yoklamasını gönderin",
    icon: ClipboardList,
  },
  {
    to: "/ai" as const,
    label: "Atatürk AI",
    detail: "Yoklama asistanı · Gemini ücretsiz katman",
    icon: Bot,
  },
];

function Home() {
  return (
    <div className="ink-grid relative min-h-dvh overflow-hidden bg-ink text-paper">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-accent"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex min-h-dvh max-w-5xl flex-col px-5 py-6 sm:px-8 sm:py-12">
        <header className="rise flex items-center gap-4">
          <Crest variant="dark" className="size-14 sm:size-[4.5rem]" />
          <div>
            <p className="text-[10px] font-medium tracking-[0.28em] text-paper/55 uppercase">
              T.C. Millî Eğitim Bakanlığı
            </p>
            <p className="mt-1 text-[11px] tracking-[0.18em] text-paper/70 uppercase">
              Artvin · Arhavi
            </p>
          </div>
        </header>

        <div className="rise mt-8 mb-8 sm:my-auto sm:py-10">
          <p className="text-[11px] font-medium tracking-[0.32em] text-accent-soft uppercase">
            2026–2027 öğretim yılı
          </p>
          <h1 className="mt-3 font-display text-[2.2rem] leading-[0.95] font-semibold tracking-tight text-paper sm:text-6xl">
            Atatürk
            <br />
            Ortaokulu
          </h1>
          <div className="mt-4 h-px w-24 bg-accent sm:mt-5" />
          <p className="mt-3 font-display text-xl tracking-[0.18em] text-paper/85 uppercase sm:mt-4 sm:text-3xl">
            Yoklama Sistemi
          </p>
          <p className="mt-4 max-w-lg font-display text-base leading-snug text-paper/55 italic sm:mt-6 sm:text-lg">
            Öğretmenler! Yeni nesil sizin eseriniz olacaktır.
          </p>
        </div>

        <nav
          className="rise grid gap-3 pb-4 sm:grid-cols-3"
          style={{ animationDelay: "160ms" }}
          aria-label="Ana menü"
        >
          {OPTIONS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group rounded-xl bg-paper p-5 text-ink shadow-card transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <item.icon className="size-5 text-accent" strokeWidth={1.75} />
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                {item.label}
              </h2>
              <p className="mt-1 text-sm leading-snug text-fg-muted">{item.detail}</p>
              <span className="mt-4 inline-flex text-xs font-medium tracking-wide text-accent">
                Devam et
              </span>
            </Link>
          ))}
        </nav>

        <p className="pt-6 text-center text-[11px] tracking-wide text-paper/40">
          Arhavi Atatürk Ortaokulu · Teşkilat şemasına göre kadro
        </p>
      </div>
    </div>
  );
}
