import { cn } from "@/lib/format";

/** Thin gold rule with a small diamond, used under headings. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex items-center justify-center gap-3", className)}>
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold" />
      <span className="h-1.5 w-1.5 rotate-45 border border-gold" />
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold" />
    </div>
  );
}
