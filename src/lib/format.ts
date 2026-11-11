import type { Locale } from "@data/products";

/** Format a EUR amount for the given locale, e.g. 129 → "129,00 €" (it) / "€129.00" (en) */
export function formatPrice(amount: number, locale: Locale = "it"): string {
  return new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
