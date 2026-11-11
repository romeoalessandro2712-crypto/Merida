"use client";

import { FREE_SHIPPING_THRESHOLD } from "@data/products";
import { formatPrice } from "@/lib/format";
import { useT } from "@/lib/providers";

export function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const { t, locale } = useT();
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const reached = remaining === 0;

  return (
    <div className="mb-6">
      <p className="text-xs text-charcoal/80 mb-2" aria-live="polite">
        {reached
          ? t.cart.freeShippingReached
          : t.cart.freeShippingRemaining.replace("{amount}", formatPrice(remaining, locale))}
      </p>
      <div
        className="h-px w-full bg-line relative"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={FREE_SHIPPING_THRESHOLD}
        aria-valuenow={Math.min(subtotal, FREE_SHIPPING_THRESHOLD)}
        aria-label={t.trust[0]}
      >
        <div
          className={`absolute left-0 top-[-1px] h-[3px] transition-[width] duration-700 ease-out ${reached ? "bg-olive" : "bg-navy"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
