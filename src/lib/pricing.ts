import { FREE_SHIPPING_THRESHOLD } from "@data/products";

/** Coupon codes accepted at checkout (scratch-card prizes + the original welcome code). */
export const COUPONS: Record<string, number> = {
  MERIDIA10: 0.1,
  MERIDIA15: 0.15,
  MERIDIA20: 0.2,
};

/** Multi-piece basket discount on the whole cart. */
export const BUNDLE_TIERS = [
  { min: 2, rate: 0.1 },
  { min: 3, rate: 0.15 },
] as const;

export const STANDARD_SHIPPING = 6.9;
export const EXPRESS_SHIPPING = 14.9;

const round2 = (n: number) => Math.round(n * 100) / 100;

export function bundleRate(count: number): number {
  let r = 0;
  for (const t of BUNDLE_TIERS) if (count >= t.min) r = t.rate;
  return r;
}

/** The next tier the cart hasn't reached yet, or null when at the top tier. */
export function nextTier(count: number) {
  return BUNDLE_TIERS.find((t) => count < t.min) ?? null;
}

export function couponRate(code?: string | null): number {
  if (!code) return 0;
  return COUPONS[code.trim().toUpperCase()] ?? 0;
}

export interface Totals {
  subtotal: number;
  rate: number;
  /** Which discount won. Discounts never stack: the customer always gets the better one. */
  source: "bundle" | "coupon" | null;
  discount: number;
  shipping: number;
  total: number;
}

export function computeTotals(
  subtotal: number,
  count: number,
  code: string | null | undefined,
  shippingMethod: "standard" | "express" = "standard",
): Totals {
  const b = bundleRate(count);
  const c = couponRate(code);
  const rate = Math.max(b, c);
  const source = rate === 0 ? null : c >= b ? "coupon" : "bundle";
  const discount = round2(subtotal * rate);
  const shipping =
    subtotal === 0 ? 0 : shippingMethod === "express" ? EXPRESS_SHIPPING : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  return { subtotal, rate, source, discount, shipping, total: round2(subtotal - discount + shipping) };
}

export const pct = (rate: number) => `${Math.round(rate * 100)}%`;
