import type { Product, Size } from "@data/products";

export const SIZE_ORDER: Size[] = ["XS", "S", "M", "L", "XL"];

/** Height bands calibrated so the 185 cm model lands on M. */
export function sizeForHeight(cm: number): Size {
  if (cm < 170) return "XS";
  if (cm < 177) return "S";
  if (cm < 186) return "M";
  if (cm < 193) return "L";
  return "XL";
}

/**
 * Starts from the size you usually wear (or your height), shifts one size for a
 * closer/looser preference, then moves to the nearest size in stock.
 */
export function recommendSize(p: Product, heightCm: number, usual: Size | null, pref: -1 | 0 | 1): Size | null {
  const available = p.sizes.filter((s) => !p.soldOut?.includes(s));
  if (available.length === 0) return null;
  let i = SIZE_ORDER.indexOf(usual ?? sizeForHeight(heightCm)) + pref;
  i = Math.max(0, Math.min(SIZE_ORDER.length - 1, i));
  for (let step = 0; step < SIZE_ORDER.length; step++) {
    for (const j of [i + step, i - step]) {
      const s = SIZE_ORDER[j];
      if (s && available.includes(s)) return s;
    }
  }
  return available[0];
}
