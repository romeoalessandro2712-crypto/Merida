import type { Product, ProductColor } from "@data/products";
import { luminance } from "@/components/product/garments";
import { HAIRS, SKINS, type Outfit, type Shot } from "@/components/product/Figure";

const NAVY = "#1b2a44";
const SAND = "#d3c3a4";
const CREAM = "#ece4d3";

function seedOf(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

/** Trousers that contrast with the top: navy under light tops, sand under dark ones. */
const trousersFor = (top: string) => (luminance(top) > 0.62 ? NAVY : SAND);

/** How a single product is shown worn. Accessories are styled with a neutral top. */
export function productOutfit(product: Product, color: ProductColor): Outfit {
  const n = seedOf(product.slug + color.id);
  const base = { skin: SKINS[n % SKINS.length], hair: HAIRS[n % HAIRS.length] };
  switch (product.art) {
    case "polo":
    case "shirt":
    case "sweater":
      return { ...base, top: { kind: product.art, tone: color.hex, stripe: color.stripe }, trousers: trousersFor(color.hex) };
    case "cap":
      return { ...base, top: { kind: "polo", tone: CREAM }, cap: { tone: color.hex }, trousers: NAVY };
    case "bracelet":
      return {
        ...base,
        top: { kind: "shirt", tone: "#f2efe8", stripe: "#7f9bb8" },
        bracelet: { tone: color.hex, stripe: color.stripe },
        trousers: SAND,
      };
  }
}

/** The close-up that best shows the piece on the body. */
export function detailShot(product: Product): Shot {
  return product.art === "cap" ? "head" : product.art === "bracelet" ? "wrist" : "upper";
}

/** Dress one figure in a whole look (first colour of each piece unless a colour is given). */
export function lookOutfit(items: { product: Product; color: ProductColor }[], seed: string): Outfit {
  const n = seedOf(seed);
  const tops = items.filter((i) => i.product.art === "polo" || i.product.art === "shirt" || i.product.art === "sweater");
  const sweater = tops.find((i) => i.product.art === "sweater");
  const mainTop = tops.find((i) => i.product.art !== "sweater") ?? sweater ?? null;
  const cap = items.find((i) => i.product.art === "cap");
  const bracelet = items.find((i) => i.product.art === "bracelet");
  const topTone = mainTop?.color.hex ?? CREAM;
  return {
    skin: SKINS[n % SKINS.length],
    hair: HAIRS[(n >> 3) % HAIRS.length],
    top: mainTop
      ? { kind: mainTop.product.art as "polo" | "shirt" | "sweater", tone: mainTop.color.hex, stripe: mainTop.color.stripe }
      : { kind: "polo", tone: CREAM },
    draped: sweater && mainTop !== sweater ? { tone: sweater.color.hex } : undefined,
    cap: cap ? { tone: cap.color.hex } : undefined,
    bracelet: bracelet ? { tone: bracelet.color.hex, stripe: bracelet.color.stripe } : undefined,
    trousers: trousersFor(topTone),
  };
}
