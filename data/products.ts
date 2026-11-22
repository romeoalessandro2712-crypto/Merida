/**
 * MERIDIA — mock product catalogue.
 * This is the single source of truth for the storefront. No backend.
 *
 * To use real photography later: fill `images` with file paths
 * (e.g. "/products/ercole-navy-1.jpg"). While `images` is empty,
 * <ProductImage> renders a tonal placeholder based on the colour hex.
 */

import type { ArtKind } from "../src/components/product/garments";

export type CategorySlug =
  | "knitwear"
  | "shirts-polos"
  | "outerwear"
  | "trousers"
  | "accessories";

export type Locale = "it" | "en";
export type Localized = Record<Locale, string>;

export type Badge = "new" | "bestseller" | "exclusive";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "ONE";

export interface ProductColor {
  /** Stable id, used in cart keys and URL filters */
  id: string;
  name: Localized;
  /** Hex used for swatches and placeholder imagery */
  hex: string;
  /** Stripe colour for striped colourways */
  stripe?: string;
  /** Optional real image paths for this colour, in gallery order */
  images?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  /** Which garment drawing to use until real photos exist */
  art: ArtKind;
  /** Price in EUR */
  price: number;
  /** Original price when discounted (EUR) */
  compareAtPrice?: number;
  badge?: Badge;
  /** Ranking for "Last week's best sellers" (1 = top). Undefined = not ranked */
  bestSellerRank?: number;
  isNew?: boolean;
  colors: ProductColor[];
  sizes: Size[];
  /** Sizes currently out of stock (mock) */
  soldOut?: Size[];
  /** Sizes with only a few pieces left (mock) */
  lowStock?: Size[];
  tagline: Localized;
  description: Localized;
  details: Localized[];
  fabricCare: Localized[];
  /** Style tags used for "You may also like" */
  tags: string[];
}

export interface Category {
  slug: CategorySlug;
  name: Localized;
  blurb: Localized;
  /** Tone used for the category tile placeholder */
  tone: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "shirts-polos",
    name: { it: "Camicie & Polo", en: "Shirts & Polos" },
    blurb: {
      it: "Righe marinare e lino europeo, dalla mattina alla sera.",
      en: "Nautical stripes and European linen, from morning to evening.",
    },
    tone: "#1b2a44",
  },
  {
    slug: "knitwear",
    name: { it: "Maglieria", en: "Knitwear" },
    blurb: {
      it: "Maglia di lino leggera, per le sere d'estate.",
      en: "Light linen knits for summer evenings.",
    },
    tone: "#d3c3a4",
  },
  {
    slug: "accessories",
    name: { it: "Accessori", en: "Accessories" },
    blurb: {
      it: "Il cappello e il bracciale che completano il look.",
      en: "The cap and bracelet that finish the look.",
    },
    tone: "#7a5236",
  },
];

export const SIZES: Size[] = ["XS", "S", "M", "L", "XL"];

/* ---------- Shared colour palette ---------- */

const C = {
  navy: { id: "navy", name: { it: "Blu navy", en: "Navy" }, hex: "#1b2a44" },
  cream: { id: "cream", name: { it: "Panna", en: "Cream" }, hex: "#ece4d3" },
  sand: { id: "sand", name: { it: "Sabbia", en: "Sand" }, hex: "#d3c3a4" },
  olive: { id: "olive", name: { it: "Oliva", en: "Olive" }, hex: "#6b705c" },
  chocolate: { id: "chocolate", name: { it: "Cioccolato", en: "Chocolate" }, hex: "#4a3326" },
  sky: { id: "sky", name: { it: "Celeste", en: "Light blue" }, hex: "#b9c7d6" },
  white: { id: "white", name: { it: "Bianco", en: "White" }, hex: "#f2efe8" },
} satisfies Record<string, ProductColor>;

/* Striped colourways: `hex` is the ground, `stripe` the stripe */
const S = {
  navyCream: { id: "navy", name: { it: "Navy a righe panna", en: "Navy, cream stripe" }, hex: "#1b2a44", stripe: "#ece4d3" },
  creamNavy: { id: "cream", name: { it: "Panna a righe navy", en: "Cream, navy stripe" }, hex: "#ece4d3", stripe: "#1b2a44" },
  oliveCream: { id: "olive", name: { it: "Oliva a righe panna", en: "Olive, cream stripe" }, hex: "#6b705c", stripe: "#ece4d3" },
  whiteSky: { id: "sky", name: { it: "Bianco a righe celesti", en: "White, sky stripe" }, hex: "#f2efe8", stripe: "#7f9bb8" },
  whiteSand: { id: "sand", name: { it: "Bianco a righe sabbia", en: "White, sand stripe" }, hex: "#f2efe8", stripe: "#b9a27c" },
  whiteNavy: { id: "navy", name: { it: "Bianco a righe navy", en: "White, navy stripe" }, hex: "#f2efe8", stripe: "#1b2a44" },
} satisfies Record<string, ProductColor>;

const ALL: Size[] = ["XS", "S", "M", "L", "XL"];
const ONE: Size[] = ["ONE"];

/* ---------- Products: the MERIDIA capsule ---------- */

export const PRODUCTS: Product[] = [
  {
    id: "p-101",
    slug: "portofino-striped-polo",
    name: "Portofino Striped Polo",
    category: "shirts-polos",
    art: "polo",
    price: 89,
    badge: "bestseller",
    bestSellerRank: 1,
    lowStock: ["M"],
    colors: [S.navyCream, S.creamNavy, S.oliveCream],
    sizes: ALL,
    tagline: { it: "La riga marinara, in versione silenziosa.", en: "The nautical stripe, quietly done." },
    description: {
      it: "Polo in jersey di cotone pettinato a righe tinte in filo, con colletto in maglia rasata e abbottonatura a due bottoni in madreperla. Vestibilità regolare che sta bene da sola o sotto un blazer leggero.",
      en: "A yarn-dyed striped polo in combed cotton jersey, with a flat-knit collar and a two-button mother-of-pearl placket. A regular fit that works on its own or under a light blazer.",
    },
    details: [
      { it: "100% cotone pettinato, righe tinte in filo", en: "100% combed cotton, yarn-dyed stripes" },
      { it: "Colletto in maglia rasata", en: "Flat-knit collar" },
      { it: "Bottoni in madreperla", en: "Mother-of-pearl buttons" },
    ],
    fabricCare: [
      { it: "Lavare in lavatrice a 30°, al rovescio", en: "Machine wash at 30°, inside out" },
      { it: "Asciugare in piano", en: "Dry flat" },
    ],
    tags: ["cotton", "summer", "polo", "weekend"],
  },
  {
    id: "p-102",
    slug: "amalfi-striped-linen-shirt",
    name: "Amalfi Striped Linen Shirt",
    category: "shirts-polos",
    art: "shirt",
    price: 119,
    badge: "new",
    isNew: true,
    bestSellerRank: 2,
    lowStock: ["L"],
    colors: [S.whiteSky, S.whiteSand, S.whiteNavy],
    sizes: ALL,
    tagline: { it: "Lino europeo e una riga sottile.", en: "European linen and a fine stripe." },
    description: {
      it: "Camicia in lino europeo lavato con riga sottile, collo alla francese e taschino al petto. Si sgualcisce con grazia e respira anche nelle giornate più calde.",
      en: "A washed European linen shirt with a fine stripe, French collar and chest pocket. It creases gracefully and breathes on the warmest days.",
    },
    details: [
      { it: "100% lino europeo lavato", en: "100% washed European linen" },
      { it: "Collo alla francese, taschino al petto", en: "French collar, chest pocket" },
      { it: "Bottoni in corozo", en: "Corozo buttons" },
    ],
    fabricCare: [
      { it: "Lavare in lavatrice a 30°", en: "Machine wash at 30°" },
      { it: "Stirare leggermente umida", en: "Iron while slightly damp" },
    ],
    tags: ["linen", "summer", "shirt", "office"],
  },
  {
    id: "p-103",
    slug: "sorrento-linen-sweater",
    name: "Sorrento Linen Sweater",
    category: "knitwear",
    art: "sweater",
    price: 149,
    badge: "exclusive",
    isNew: true,
    bestSellerRank: 3,
    soldOut: ["XS"],
    colors: [C.cream, C.sand, C.navy, C.olive],
    sizes: ALL,
    tagline: { it: "La maglia per le sere d'estate.", en: "The knit for summer evenings." },
    description: {
      it: "Girocollo in maglia di lino e cotone a trama aperta, leggero e fresco. Da appoggiare sulle spalle al tramonto o indossare sopra una camicia di lino.",
      en: "An open-knit linen and cotton crewneck, light and cool. Drape it over your shoulders at sunset or wear it over a linen shirt.",
    },
    details: [
      { it: "60% lino, 40% cotone", en: "60% linen, 40% cotton" },
      { it: "Maglia a trama aperta, costine a collo e polsi", en: "Open knit, ribbed collar and cuffs" },
      { it: "Vestibilità leggermente morbida", en: "Slightly relaxed fit" },
    ],
    fabricCare: [
      { it: "Lavare a mano in acqua fredda", en: "Hand wash cold" },
      { it: "Asciugare in piano, all'ombra", en: "Dry flat, in the shade" },
    ],
    tags: ["linen", "summer", "layering", "evening"],
  },
  {
    id: "p-104",
    slug: "riviera-cotton-cap",
    name: "Riviera Cotton Cap",
    category: "accessories",
    art: "cap",
    price: 45,
    bestSellerRank: 4,
    colors: [C.navy, C.cream, C.olive, C.chocolate],
    sizes: ONE,
    tagline: { it: "Sei pannelli, nessun logo.", en: "Six panels, no logo." },
    description: {
      it: "Cappello in twill di cotone lavato, sei pannelli e visiera precurvata. Cinturino regolabile con fibbia in ottone brunito. Nessun logo in vista.",
      en: "A washed cotton twill cap with six panels and a pre-curved peak. Adjustable strap with a burnished brass buckle. No visible logo.",
    },
    details: [
      { it: "100% cotone twill lavato", en: "100% washed cotton twill" },
      { it: "Cinturino regolabile, fibbia in ottone", en: "Adjustable strap, brass buckle" },
    ],
    fabricCare: [{ it: "Lavare a mano in acqua fredda", en: "Hand wash cold" }],
    tags: ["cotton", "summer", "weekend", "gift"],
  },
  {
    id: "p-105",
    slug: "capri-braided-bracelet",
    name: "Capri Braided Bracelet",
    category: "accessories",
    art: "bracelet",
    price: 59,
    badge: "new",
    isNew: true,
    bestSellerRank: 5,
    colors: [
      { ...C.chocolate, name: { it: "Cuoio", en: "Tan leather" }, hex: "#7a5236" },
      { ...C.navy, name: { it: "Navy e panna", en: "Navy and cream" }, stripe: "#ece4d3" },
      { ...C.olive, name: { it: "Oliva e sabbia", en: "Olive and sand" }, stripe: "#d3c3a4" },
    ],
    sizes: ONE,
    tagline: { it: "Un dettaglio che resta al polso.", en: "A detail that stays on the wrist." },
    description: {
      it: "Bracciale intrecciato a mano in cordino cerato, con chiusura in ottone brunito incisa con la M di MERIDIA. Leggero, da portare ogni giorno.",
      en: "A hand-braided waxed cord bracelet with a burnished brass clasp engraved with the MERIDIA M. Light enough to wear every day.",
    },
    details: [
      { it: "Cordino cerato intrecciato a mano", en: "Hand-braided waxed cord" },
      { it: "Chiusura in ottone brunito incisa", en: "Engraved burnished brass clasp" },
      { it: "Circonferenza 19 cm", en: "19 cm circumference" },
    ],
    fabricCare: [{ it: "Evitare il contatto prolungato con l'acqua", en: "Avoid prolonged contact with water" }],
    tags: ["gift", "summer", "evening", "weekend"],
  },
];

/* ---------- Looks ("Our community" / shop the look) ---------- */

export interface Look {
  id: string;
  title: Localized;
  /** Background tone for the look card placeholder */
  tone: string;
  /** Product slugs that make up the look (first is the hero piece) */
  products: string[];
}

export const LOOKS: Look[] = [
  {
    id: "look-1",
    title: { it: "Mattina al porto", en: "Morning at the harbour" },
    tone: "#1b2a44",
    products: ["portofino-striped-polo", "riviera-cotton-cap", "capri-braided-bracelet"],
  },
  {
    id: "look-2",
    title: { it: "Pranzo in terrazza", en: "Lunch on the terrace" },
    tone: "#b9c7d6",
    products: ["amalfi-striped-linen-shirt", "capri-braided-bracelet"],
  },
  {
    id: "look-3",
    title: { it: "Tramonto sul lungomare", en: "Sunset on the promenade" },
    tone: "#d3c3a4",
    products: ["sorrento-linen-sweater", "amalfi-striped-linen-shirt", "capri-braided-bracelet"],
  },
  {
    id: "look-4",
    title: { it: "Weekend in barca", en: "A weekend on the boat" },
    tone: "#6b705c",
    products: ["sorrento-linen-sweater", "portofino-striped-polo", "riviera-cotton-cap"],
  },
];

/* ---------- Helpers ---------- */

export const FREE_SHIPPING_THRESHOLD = 149;

/** Welcome-offer code accepted at the mock checkout */
export const WELCOME_CODE = "MERIDIA10";
export const WELCOME_DISCOUNT = 0.1;

/** Size used for one-tap adds: M when available, otherwise the first size in stock */
export function defaultSize(p: Product): Size {
  if (p.sizes.includes("M") && !p.soldOut?.includes("M")) return "M";
  return p.sizes.find((s) => !p.soldOut?.includes(s)) ?? p.sizes[0];
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function getBestSellers(limit = 8): Product[] {
  return PRODUCTS.filter((p) => p.bestSellerRank !== undefined)
    .sort((a, b) => (a.bestSellerRank ?? 99) - (b.bestSellerRank ?? 99))
    .slice(0, limit);
}

export function getNewIn(): Product[] {
  return PRODUCTS.filter((p) => p.isNew);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const scored = PRODUCTS.filter((p) => p.id !== product.id).map((p) => {
    let score = p.category === product.category ? 2 : 0;
    score += p.tags.filter((t) => product.tags.includes(t)).length;
    return { p, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);
}

/** Every distinct colour across the catalogue, for filters */
export function getAllColors(): ProductColor[] {
  const seen = new Map<string, ProductColor>();
  for (const p of PRODUCTS) for (const c of p.colors) if (!seen.has(c.id)) seen.set(c.id, c);
  return [...seen.values()];
}
