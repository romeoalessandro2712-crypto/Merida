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

/** Weight vs. a typical weight for the height (height − 105 kg) shifts one size up or down. */
export function weightShift(heightCm: number, weightKg: number): -1 | 0 | 1 {
  const diff = weightKg - (heightCm - 105);
  return diff > 10 ? 1 : diff < -12 ? -1 : 0;
}

/**
 * Starts from the size you usually wear (or your height and weight), shifts one size
 * for a closer/looser preference, then moves to the nearest size in stock.
 */
export function recommendSize(p: Product, heightCm: number, usual: Size | null, pref: -1 | 0 | 1, weightKg?: number): Size | null {
  const available = p.sizes.filter((s) => !p.soldOut?.includes(s));
  if (available.length === 0) return null;
  const bodyShift = usual || weightKg === undefined ? 0 : weightShift(heightCm, weightKg);
  let i = SIZE_ORDER.indexOf(usual ?? sizeForHeight(heightCm)) + bodyShift + pref;
  i = Math.max(0, Math.min(SIZE_ORDER.length - 1, i));
  for (let step = 0; step < SIZE_ORDER.length; step++) {
    for (const j of [i + step, i - step]) {
      const s = SIZE_ORDER[j];
      if (s && available.includes(s)) return s;
    }
  }
  return available[0];
}
