import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-paper-2 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-fg-muted",
        className,
      )}
      {...props}
    />
  );
}
