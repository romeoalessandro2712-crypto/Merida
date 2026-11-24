"use client";

import type { ProductColor } from "@data/products";
import { cn } from "@/lib/format";
import { useT } from "@/lib/providers";

export function Swatches({
  colors,
  value,
  onChange,
  size = "sm",
  name,
}: {
  colors: ProductColor[];
  value: string;
  onChange: (id: string) => void;
  size?: "sm" | "md";
  name: string;
}) {
  const { t, locale } = useT();
  return (
    <div role="radiogroup" aria-label={t.product.color} className="flex items-center gap-2">
      {colors.map((c) => {
        const selected = c.id === value;
        return (
          <button
            key={c.id}
            type="button"
            role="radio"
            name={name}
            aria-checked={selected}
            aria-label={c.name[locale]}
            title={c.name[locale]}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange(c.id);
            }}
            className={cn(
              "flex items-center justify-center rounded-full border transition-colors",
              size === "sm" ? "h-6 w-6" : "h-8 w-8",
              selected ? "border-navy" : "border-transparent hover:border-taupe",
            )}
          >
            <span
              className={cn("block rounded-full border border-black/10", size === "sm" ? "h-3.5 w-3.5" : "h-6 w-6")}
              style={{
                backgroundColor: c.hex,
                backgroundImage: c.stripe
                  ? `repeating-linear-gradient(0deg, ${c.hex} 0 2px, ${c.stripe} 2px 4px)`
                  : undefined,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
