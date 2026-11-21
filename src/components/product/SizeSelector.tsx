"use client";

import type { Size } from "@data/products";
import { cn } from "@/lib/format";
import { useT } from "@/lib/providers";

export function SizeSelector({
  sizes,
  soldOut = [],
  lowStock = [],
  value,
  onChange,
  compact,
  name,
}: {
  sizes: Size[];
  soldOut?: Size[];
  lowStock?: Size[];
  value?: Size;
  onChange: (s: Size) => void;
  compact?: boolean;
  name: string;
}) {
  const { t } = useT();
  return (
    <div role="radiogroup" aria-label={t.product.size} className={cn("flex flex-wrap", compact ? "gap-1.5" : "gap-2")}>
      {sizes.map((s) => {
        const out = soldOut.includes(s);
        const low = !out && lowStock.includes(s);
        const selected = value === s;
        return (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${s}${out ? ` — ${t.card.soldOut}` : low ? ` — ${t.stock.lowShort}` : ""}`}
            disabled={out}
            name={name}
            onClick={() => onChange(s)}
            className={cn(
              "relative flex items-center justify-center border text-[0.7rem] tracking-[0.1em] transition-colors",
              compact ? "h-8 min-w-8 px-2" : "h-11 min-w-12 px-3",
              selected ? "border-navy bg-navy text-cream" : "border-line bg-transparent text-navy hover:border-navy",
              out && "cursor-not-allowed text-taupe/60 line-through hover:border-line",
            )}
          >
            {s === "ONE" ? t.card.oneSize : s}
            {low && <span aria-hidden="true" className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-chocolate" />}
          </button>
        );
      })}
    </div>
  );
}
