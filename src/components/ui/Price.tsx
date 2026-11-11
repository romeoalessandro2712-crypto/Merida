"use client";

import { formatPrice, cn } from "@/lib/format";
import { useT } from "@/lib/providers";

export function Price({ amount, compareAt, className }: { amount: number; compareAt?: number; className?: string }) {
  const { locale } = useT();
  return (
    <span className={cn("tabular-nums", className)}>
      {compareAt && compareAt > amount && (
        <s className="mr-2 text-taupe">{formatPrice(compareAt, locale)}</s>
      )}
      <span>{formatPrice(amount, locale)}</span>
    </span>
  );
}
