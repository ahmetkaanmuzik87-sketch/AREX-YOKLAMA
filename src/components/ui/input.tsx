import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-md bg-paper px-3.5 text-sm text-fg shadow-[0_0_0_1px_var(--color-line)] outline-none transition-[box-shadow] duration-150 placeholder:text-fg-subtle focus-visible:shadow-[0_0_0_2px_var(--color-accent)] disabled:cursor-not-allowed disabled:bg-paper-2 disabled:text-fg-subtle",
        className,
      )}
      {...props}
    />
  );
}
