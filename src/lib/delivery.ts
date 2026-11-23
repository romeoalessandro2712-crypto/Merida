import type { Locale } from "@data/products";

export function addBusinessDays(from: Date, n: number): Date {
  const d = new Date(from);
  let added = 0;
  while (added < n) {
    d.setDate(d.getDate() + 1);
    const w = d.getDay();
    if (w !== 0 && w !== 6) added++;
  }
  return d;
}

/** Dispatch today on business days before 14:00, otherwise next business day. Standard: +2–4 days, Express: +1–2. */
export function deliveryWindow(now: Date, express = false): [Date, Date] {
  const w = now.getDay();
  const dispatch = w === 0 || w === 6 || now.getHours() >= 14 ? addBusinessDays(now, 1) : new Date(now);
  return express ? [addBusinessDays(dispatch, 1), addBusinessDays(dispatch, 2)] : [addBusinessDays(dispatch, 2), addBusinessDays(dispatch, 4)];
}

export function formatDay(d: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-GB", { weekday: "short", day: "numeric", month: "short" }).format(d);
}
