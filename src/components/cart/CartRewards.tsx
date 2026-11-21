"use client";

import { FREE_SHIPPING_THRESHOLD } from "@data/products";
import { useT } from "@/lib/providers";
import { formatPrice, cn } from "@/lib/format";
import { nextTier, pct } from "@/lib/pricing";
import { CheckIcon } from "@/components/ui/Icons";

/** Three-step reward ladder: free shipping, 10% with 2 pieces, 15% with 3+. */
export function CartRewards({ subtotal, count }: { subtotal: number; count: number }) {
  const { t, locale } = useT();
  const steps = [
    { label: t.tiers.ship, done: subtotal >= FREE_SHIPPING_THRESHOLD },
    { label: t.tiers.two, done: count >= 2 },
    { label: t.tiers.three, done: count >= 3 },
  ];
  const doneCount = steps.filter((s) => s.done).length;
  const next = nextTier(count);
  const missing = next ? next.min - count : 0;
  const shipLeft = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="mb-6 border border-gold/40 bg-ecru/60 p-4">
      <p className="label mb-4 text-navy">{t.tiers.title}</p>
      <ol className="relative grid grid-cols-3 gap-2">
        <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-3 h-px bg-line" />
        <span
          aria-hidden="true"
          className="absolute left-[16%] top-3 h-px bg-gold transition-[width] duration-700"
          style={{ width: `${(Math.max(0, doneCount - 1) / 2) * 68}%` }}
        />
        {steps.map((s) => (
          <li key={s.label} className="relative flex flex-col items-center text-center">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border text-[0.6rem] transition-colors duration-500",
                s.done ? "border-gold bg-gold text-navy-deep" : "border-line bg-cream text-taupe",
              )}
            >
              {s.done ? <CheckIcon width={12} height={12} /> : null}
            </span>
            <span className={cn("mt-2 text-[0.66rem] leading-tight", s.done ? "text-navy" : "text-taupe")}>{s.label}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs font-medium text-chocolate" aria-live="polite">
        {next
          ? t.tiers.next
              .replace("{n}", String(missing))
              .replace("{item}", missing === 1 ? t.tiers.piece : t.tiers.pieces)
              .replace("{rate}", pct(next.rate))
          : t.tiers.max}
        {shipLeft > 0 && (
          <span className="mt-1 block font-normal text-charcoal/75">
            {t.cart.freeShippingRemaining.replace("{amount}", formatPrice(shipLeft, locale))}
          </span>
        )}
      </p>
    </div>
  );
}
