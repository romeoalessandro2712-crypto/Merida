"use client";

import { useT } from "@/lib/providers";
import { useNow } from "@/lib/engagement";
import { deliveryWindow, formatDay } from "@/lib/delivery";
import { cn } from "@/lib/format";

/** Real dates, computed from today (business days, 14:00 dispatch cutoff). */
export function DeliveryEstimate({ className, compact }: { className?: string; compact?: boolean }) {
  const { t, locale } = useT();
  const now = useNow(60_000);
  if (now === null) return <p className={cn("h-4", className)} aria-hidden="true" />;
  const [from, to] = deliveryWindow(new Date(now));
  return (
    <p className={cn("text-xs text-charcoal/80", className)}>
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-olive align-middle" aria-hidden="true" />
      {t.delivery.arrives} <strong className="font-medium text-navy">{formatDay(from, locale)}</strong> {t.delivery.and}{" "}
      <strong className="font-medium text-navy">{formatDay(to, locale)}</strong>
      {!compact && <span className="block pl-3 text-taupe">{t.delivery.cutoff}</span>}
    </p>
  );
}
