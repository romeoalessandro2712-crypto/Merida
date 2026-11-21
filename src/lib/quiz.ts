import { PRODUCTS, type CategorySlug, type Product } from "@data/products";

export type Occasion = "office" | "weekend" | "evening";
export type Palette = "navy" | "earth" | "green";
export type Fit = "classic" | "relaxed";

const PALETTES: Record<Palette, string[]> = {
  navy: ["navy", "charcoal", "sky", "white", "black"],
  earth: ["camel", "chocolate", "sand", "taupe", "stone", "cream"],
  green: ["olive", "forest", "cream", "sand"],
};
const OCCASION_TAGS: Record<Occasion, string[]> = {
  office: ["office"],
  weekend: ["weekend", "cotton"],
  evening: ["winter", "merino", "wool", "silk"],
};

export interface LookItem {
  product: Product;
  colorId: string;
}

/** Picks one piece per slot (outer layer, top, trousers, accessory) that best matches the answers. */
export function buildLook(occasion: Occasion, palette: Palette, fit: Fit): LookItem[] {
  const slots: CategorySlug[] = ["outerwear", fit === "relaxed" ? "knitwear" : "shirts-polos", "trousers", "accessories"];
  const tags = [...OCCASION_TAGS[occasion], fit === "classic" ? "office" : "weekend"];
  const colors = PALETTES[palette];

  return slots.map((slot) => {
    let best: LookItem | null = null;
    let bestScore = -1;
    for (const p of PRODUCTS.filter((x) => x.category === slot)) {
      const match = p.colors.find((c) => colors.includes(c.id));
      const score = p.tags.filter((tg) => tags.includes(tg)).length * 2 + (match ? 3 : 0) + (p.bestSellerRank ? 0.5 : 0);
      if (score > bestScore) {
        bestScore = score;
        best = { product: p, colorId: (match ?? p.colors[0]).id };
      }
    }
    return best!;
  });
}
