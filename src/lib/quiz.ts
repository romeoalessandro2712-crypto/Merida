import { getProduct, type Product } from "@data/products";

export type Occasion = "office" | "weekend" | "evening";
export type Palette = "navy" | "earth" | "green";
export type Fit = "classic" | "relaxed";

/** Colour ids that belong to each palette answer (first match wins). */
const PALETTES: Record<Palette, string[]> = {
  navy: ["navy", "sky", "white"],
  earth: ["sand", "cream", "chocolate"],
  green: ["olive", "cream", "sand"],
};

export interface LookItem {
  product: Product;
  colorId: string;
}

/**
 * Builds a 3-piece look from the capsule:
 * - city: shirt (classic) or polo (relaxed) + bracelet + sweater (classic) or cap (relaxed)
 * - seaside: polo + cap + bracelet
 * - evening: sweater + shirt + bracelet
 */
export function buildLook(occasion: Occasion, palette: Palette, fit: Fit): LookItem[] {
  const slugs: Record<Occasion, string[]> = {
    office:
      fit === "classic"
        ? ["amalfi-striped-linen-shirt", "sorrento-linen-sweater", "capri-braided-bracelet"]
        : ["portofino-striped-polo", "riviera-cotton-cap", "capri-braided-bracelet"],
    weekend: ["portofino-striped-polo", "riviera-cotton-cap", "capri-braided-bracelet"],
    evening: ["sorrento-linen-sweater", "amalfi-striped-linen-shirt", "capri-braided-bracelet"],
  };
  const want = PALETTES[palette];
  return slugs[occasion]
    .map((s) => getProduct(s))
    .filter((p): p is Product => Boolean(p))
    .map((product) => {
      const match = want.map((id) => product.colors.find((c) => c.id === id)).find(Boolean);
      return { product, colorId: (match ?? product.colors[0]).id };
    });
}
