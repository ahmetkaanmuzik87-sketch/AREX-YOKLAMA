import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Crest } from "@/components/crest";
import { cn } from "@/lib/utils";

export function PageShell({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="paper-grid min-h-dvh">
      <header className="border-b border-line/80 bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="inline-flex size-11 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-paper-2 hover:text-fg"
            aria-label="Ana menü"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <Crest className="size-11" />
          <div className="min-w-0">
            <p className="text-[10px] font-medium tracking-[0.22em] text-fg-subtle uppercase">
              Atatürk Ortaokulu · Arhavi
            </p>
            <h1 className="font-display text-xl font-semibold leading-tight text-ink sm:text-2xl">
              {title}
            </h1>
            {subtitle ? <p className="text-xs text-fg-muted">{subtitle}</p> : null}
          </div>
        </div>
      </header>
      <main className={cn("mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8", className)}>
        {children}
      </main>
    </div>
  );
}
