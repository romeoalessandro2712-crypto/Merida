/**
 * MERIDIA — mock product catalogue.
 * This is the single source of truth for the storefront. No backend.
 *
 * To use real photography later: fill `images` with file paths
 * (e.g. "/products/ercole-navy-1.jpg"). While `images` is empty,
 * <ProductImage> renders a tonal placeholder based on the colour hex.
 */

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
  /** Optional real image paths for this colour, in gallery order */
  images?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
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
    slug: "knitwear",
    name: { it: "Maglieria", en: "Knitwear" },
    blurb: {
      it: "Merino, cashmere e cotone pettinato per ogni giorno.",
      en: "Merino, cashmere and combed cotton for every day.",
    },
    tone: "#8c7a66",
  },
  {
    slug: "shirts-polos",
    name: { it: "Camicie & Polo", en: "Shirts & Polos" },
    blurb: {
      it: "Dalla scrivania all'aperitivo, senza cambiarsi.",
      en: "From the desk to the aperitivo, without changing.",
    },
    tone: "#aeb9c8",
  },
  {
    slug: "outerwear",
    name: { it: "Capispalla", en: "Outerwear" },
    blurb: {
      it: "Trench, blazer destrutturati e giacche in lana.",
      en: "Trench coats, unstructured blazers and wool jackets.",
    },
    tone: "#1b2a44",
  },
  {
    slug: "trousers",
    name: { it: "Pantaloni", en: "Trousers" },
    blurb: {
      it: "Chino, flanella e lino con la giusta caduta.",
      en: "Chinos, flannel and linen with the right drape.",
    },
    tone: "#6b705c",
  },
  {
    slug: "accessories",
    name: { it: "Accessori", en: "Accessories" },
    blurb: {
      it: "Dettagli silenziosi che completano il guardaroba.",
      en: "Quiet details that complete the wardrobe.",
    },
    tone: "#4a3326",
  },
];

export const SIZES: Size[] = ["XS", "S", "M", "L", "XL"];

/* ---------- Shared colour palette ---------- */

const C = {
  navy: { id: "navy", name: { it: "Blu navy", en: "Navy" }, hex: "#1b2a44" },
  cream: { id: "cream", name: { it: "Panna", en: "Cream" }, hex: "#ece4d3" },
  camel: { id: "camel", name: { it: "Cammello", en: "Camel" }, hex: "#b5916a" },
  chocolate: { id: "chocolate", name: { it: "Cioccolato", en: "Chocolate" }, hex: "#4a3326" },
  olive: { id: "olive", name: { it: "Oliva", en: "Olive" }, hex: "#6b705c" },
  charcoal: { id: "charcoal", name: { it: "Antracite", en: "Charcoal" }, hex: "#3a3a3a" },
  sand: { id: "sand", name: { it: "Sabbia", en: "Sand" }, hex: "#d3c3a4" },
  burgundy: { id: "burgundy", name: { it: "Bordeaux", en: "Burgundy" }, hex: "#5b2a2f" },
  sky: { id: "sky", name: { it: "Celeste", en: "Light blue" }, hex: "#b9c7d6" },
  white: { id: "white", name: { it: "Bianco", en: "White" }, hex: "#f2efe8" },
  taupe: { id: "taupe", name: { it: "Tortora", en: "Taupe" }, hex: "#8f8273" },
  forest: { id: "forest", name: { it: "Verde bosco", en: "Forest green" }, hex: "#3c4a3e" },
  stone: { id: "stone", name: { it: "Pietra", en: "Stone" }, hex: "#b7ada0" },
  black: { id: "black", name: { it: "Nero", en: "Black" }, hex: "#1f1f1f" },
} satisfies Record<string, ProductColor>;

const ALL: Size[] = ["XS", "S", "M", "L", "XL"];
const ONE: Size[] = ["ONE"];

/* ---------- Products ---------- */

export const PRODUCTS: Product[] = [
  /* ---- Knitwear ---- */
  {
    id: "p-001",
    slug: "ercole-merino-crewneck",
    name: "Ercole Merino Crewneck",
    category: "knitwear",
    price: 129,
    badge: "bestseller",
    bestSellerRank: 1,
    colors: [C.navy, C.camel, C.charcoal, C.cream],
    sizes: ALL,
    soldOut: ["XS"],
    tagline: { it: "Il girocollo che vorrai ogni giorno.", en: "The crewneck you'll want every day." },
    description: {
      it: "Un girocollo in lana merino extrafine, con finitura a costine sottili e una vestibilità regolare che si porta da solo o sotto un blazer. Lavorato in Italia da una filatura a conduzione familiare.",
      en: "An extra-fine merino crewneck with a slim ribbed finish and a regular fit that works on its own or under a blazer. Knitted in Italy by a family-run mill.",
    },
    details: [
      { it: "100% lana merino extrafine 19.5 micron", en: "100% extra-fine 19.5 micron merino wool" },
      { it: "Vestibilità regolare, spalla naturale", en: "Regular fit, natural shoulder" },
      { it: "Costine a collo, polsi e fondo", en: "Ribbed collar, cuffs and hem" },
    ],
    fabricCare: [
      { it: "Lavare a mano in acqua fredda o a secco", en: "Hand wash cold or dry clean" },
      { it: "Asciugare in piano, lontano da fonti di calore", en: "Dry flat, away from heat" },
    ],
    tags: ["merino", "layering", "office"],
  },
  {
    id: "p-002",
    slug: "lugano-cashmere-blend-cardigan",
    name: "Lugano Cashmere-Blend Cardigan",
    category: "knitwear",
    price: 189,
    badge: "new",
    isNew: true,
    bestSellerRank: 5,
    colors: [C.taupe, C.navy, C.forest],
    sizes: ALL,
    tagline: { it: "Morbido come una domenica mattina.", en: "As soft as a Sunday morning." },
    description: {
      it: "Cardigan in misto cashmere e lana, con bottoni in corozo e tasche a filo. Il capo di mezza stagione che sostituisce la giacca senza rinunciare al portamento.",
      en: "A cashmere and wool blend cardigan with corozo buttons and welt pockets. The in-between-seasons piece that replaces a jacket without losing posture.",
    },
    details: [
      { it: "70% lana, 30% cashmere", en: "70% wool, 30% cashmere" },
      { it: "Bottoni in corozo naturale", en: "Natural corozo buttons" },
      { it: "Tasche a filo frontali", en: "Front welt pockets" },
    ],
    fabricCare: [
      { it: "Lavaggio a secco consigliato", en: "Dry clean recommended" },
      { it: "Conservare piegato", en: "Store folded" },
    ],
    tags: ["cashmere", "layering", "weekend"],
  },
  {
    id: "p-003",
    slug: "ravenna-half-zip",
    name: "Ravenna Half-Zip Sweater",
    category: "knitwear",
    price: 139,
    bestSellerRank: 7,
    colors: [C.olive, C.navy, C.sand],
    sizes: ALL,
    tagline: { it: "Sportivo nelle intenzioni, elegante nel risultato.", en: "Sporting in intent, elegant in effect." },
    description: {
      it: "Maglione con mezza zip in lana merino e cotone, collo alto morbido e zip in metallo brunito. Perfetto sopra una camicia Oxford.",
      en: "A merino and cotton half-zip sweater with a soft stand collar and burnished metal zip. Perfect over an Oxford shirt.",
    },
    details: [
      { it: "60% lana merino, 40% cotone", en: "60% merino wool, 40% cotton" },
      { it: "Zip in metallo brunito", en: "Burnished metal zip" },
    ],
    fabricCare: [
      { it: "Lavare a mano in acqua fredda", en: "Hand wash cold" },
      { it: "Non stirare la zip", en: "Do not iron the zip" },
    ],
    tags: ["merino", "layering", "weekend"],
  },
  {
    id: "p-004",
    slug: "siena-cotton-polo-knit",
    name: "Siena Knitted Polo",
    category: "knitwear",
    price: 109,
    badge: "exclusive",
    colors: [C.cream, C.chocolate, C.sky],
    sizes: ALL,
    tagline: { it: "Una polo che è anche un maglione.", en: "A polo that is also a sweater." },
    description: {
      it: "Polo in maglia di cotone pettinato a trama fine, con colletto aperto e maniche corte. Pensata per le serate miti e per le giornate in cui la camicia è troppo.",
      en: "A fine-gauge combed cotton knitted polo with an open collar and short sleeves. Made for mild evenings and days when a shirt is too much.",
    },
    details: [
      { it: "100% cotone pettinato", en: "100% combed cotton" },
      { it: "Colletto aperto a punta", en: "Open pointed collar" },
    ],
    fabricCare: [
      { it: "Lavare in lavatrice a 30°, ciclo delicati", en: "Machine wash at 30°, delicate cycle" },
      { it: "Asciugare in piano", en: "Dry flat" },
    ],
    tags: ["cotton", "summer", "polo"],
  },
  {
    id: "p-005",
    slug: "bolzano-turtleneck",
    name: "Bolzano Merino Turtleneck",
    category: "knitwear",
    price: 139,
    isNew: true,
    badge: "new",
    colors: [C.black, C.cream, C.burgundy],
    sizes: ALL,
    tagline: { it: "Il dolcevita, ma senza dolcezza.", en: "The turtleneck, done quietly." },
    description: {
      it: "Dolcevita in lana merino sottile, con collo alto a doppio strato. Si porta sotto un cappotto o da solo con un pantalone di flanella.",
      en: "A fine merino turtleneck with a double-layer collar. Wear it under a coat or alone with flannel trousers.",
    },
    details: [
      { it: "100% lana merino", en: "100% merino wool" },
      { it: "Collo a doppio strato", en: "Double-layer collar" },
    ],
    fabricCare: [
      { it: "Lavare a mano in acqua fredda", en: "Hand wash cold" },
    ],
    tags: ["merino", "layering", "winter"],
  },
  {
    id: "p-006",
    slug: "cortina-cable-knit",
    name: "Cortina Cable-Knit Sweater",
    category: "knitwear",
    price: 169,
    colors: [C.cream, C.navy],
    sizes: ALL,
    soldOut: ["XL"],
    tagline: { it: "Trecce a mano, come una volta.", en: "Hand-finished cables, the old way." },
    description: {
      it: "Maglione a trecce in lana vergine, pesante al punto giusto. Un classico da montagna reinterpretato per la città.",
      en: "A cable-knit sweater in virgin wool, heavy in just the right way. A mountain classic rethought for the city.",
    },
    details: [
      { it: "100% lana vergine", en: "100% virgin wool" },
      { it: "Lavorazione a trecce rifinita a mano", en: "Hand-finished cable knit" },
    ],
    fabricCare: [
      { it: "Lavaggio a secco", en: "Dry clean" },
    ],
    tags: ["wool", "winter", "weekend"],
  },

  /* ---- Shirts & Polos ---- */
  {
    id: "p-010",
    slug: "aurelio-oxford-shirt",
    name: "Aurelio Oxford Shirt",
    category: "shirts-polos",
    price: 99,
    badge: "bestseller",
    bestSellerRank: 2,
    colors: [C.white, C.sky, C.cream],
    sizes: ALL,
    tagline: { it: "La camicia che risolve ogni mattina.", en: "The shirt that solves every morning." },
    description: {
      it: "Camicia in cotone Oxford con collo button-down morbido e vestibilità regolare. Tessuto lavato per una mano già vissuta dal primo giorno.",
      en: "An Oxford cotton shirt with a soft button-down collar and regular fit. Garment-washed for a lived-in hand from day one.",
    },
    details: [
      { it: "100% cotone Oxford", en: "100% Oxford cotton" },
      { it: "Collo button-down, bottoni in madreperla", en: "Button-down collar, mother-of-pearl buttons" },
      { it: "Taschino al petto", en: "Chest pocket" },
    ],
    fabricCare: [
      { it: "Lavare in lavatrice a 30°", en: "Machine wash at 30°" },
      { it: "Stirare a temperatura media", en: "Iron at medium heat" },
    ],
    tags: ["cotton", "office", "shirt"],
  },
  {
    id: "p-011",
    slug: "lido-linen-shirt",
    name: "Lido Linen Shirt",
    category: "shirts-polos",
    price: 109,
    colors: [C.sand, C.white, C.olive],
    sizes: ALL,
    tagline: { it: "Lino europeo, ora anche d'inverno.", en: "European linen, now in winter too." },
    description: {
      it: "Camicia in lino lavato di provenienza europea, con collo alla francese e vestibilità leggermente ampia. Sgualcita con grazia.",
      en: "A washed European linen shirt with a French collar and slightly relaxed fit. Creases gracefully.",
    },
    details: [
      { it: "100% lino europeo", en: "100% European linen" },
      { it: "Collo alla francese", en: "French collar" },
    ],
    fabricCare: [
      { it: "Lavare in lavatrice a 30°", en: "Machine wash at 30°" },
      { it: "Stirare leggermente umida", en: "Iron while slightly damp" },
    ],
    tags: ["linen", "summer", "shirt"],
  },
  {
    id: "p-012",
    slug: "marina-pique-polo",
    name: "Marina Piqué Polo",
    category: "shirts-polos",
    price: 79,
    bestSellerRank: 4,
    colors: [C.navy, C.white, C.forest, C.burgundy],
    sizes: ALL,
    tagline: { it: "Il piqué che non si deforma.", en: "The piqué that keeps its shape." },
    description: {
      it: "Polo in piqué di cotone a filo lungo, con colletto in maglia rasata e abbottonatura a due bottoni. Nessun logo: solo una buona polo.",
      en: "A long-staple cotton piqué polo with a flat-knit collar and two-button placket. No logo: just a good polo.",
    },
    details: [
      { it: "100% cotone a filo lungo", en: "100% long-staple cotton" },
      { it: "Colletto in maglia rasata", en: "Flat-knit collar" },
    ],
    fabricCare: [
      { it: "Lavare in lavatrice a 30°", en: "Machine wash at 30°" },
    ],
    tags: ["cotton", "polo", "summer"],
  },
  {
    id: "p-013",
    slug: "verona-flannel-shirt",
    name: "Verona Flannel Overshirt",
    category: "shirts-polos",
    price: 129,
    isNew: true,
    badge: "new",
    colors: [C.chocolate, C.olive, C.charcoal],
    sizes: ALL,
    tagline: { it: "Camicia fuori, giacca dentro.", en: "A shirt on the outside, a jacket at heart." },
    description: {
      it: "Sovracamicia in flanella di cotone spazzolato, con due tasche al petto e bottoni in corozo. Si porta aperta sopra una maglia sottile.",
      en: "A brushed cotton flannel overshirt with two chest pockets and corozo buttons. Wear it open over a fine knit.",
    },
    details: [
      { it: "100% cotone spazzolato", en: "100% brushed cotton" },
      { it: "Due tasche al petto con pattina", en: "Two flap chest pockets" },
    ],
    fabricCare: [
      { it: "Lavare in lavatrice a 30°", en: "Machine wash at 30°" },
    ],
    tags: ["cotton", "layering", "weekend"],
  },
  {
    id: "p-014",
    slug: "brera-poplin-shirt",
    name: "Brera Poplin Shirt",
    category: "shirts-polos",
    price: 109,
    badge: "exclusive",
    colors: [C.white, C.sky],
    sizes: ALL,
    tagline: { it: "Per le giornate che contano.", en: "For the days that matter." },
    description: {
      it: "Camicia in popeline di cotone a doppio ritorto, collo semi-francese e polsini a un bottone. Tagliata per stare sotto la giacca senza tirare.",
      en: "A two-ply cotton poplin shirt with a semi-spread collar and single-button cuffs. Cut to sit under a jacket without pulling.",
    },
    details: [
      { it: "100% cotone doppio ritorto", en: "100% two-ply cotton" },
      { it: "Collo semi-francese", en: "Semi-spread collar" },
    ],
    fabricCare: [
      { it: "Lavare in lavatrice a 40°", en: "Machine wash at 40°" },
      { it: "Stirare a temperatura alta", en: "Iron at high heat" },
    ],
    tags: ["cotton", "office", "shirt"],
  },

  /* ---- Outerwear ---- */
  {
    id: "p-020",
    slug: "adriano-wool-overcoat",
    name: "Adriano Wool Overcoat",
    category: "outerwear",
    price: 389,
    badge: "bestseller",
    bestSellerRank: 3,
    colors: [C.camel, C.navy, C.charcoal],
    sizes: ALL,
    soldOut: ["XS"],
    tagline: { it: "Il cappotto che si nota senza farsi notare.", en: "The coat that gets noticed without trying." },
    description: {
      it: "Cappotto monopetto in lana e cashmere, lunghezza al ginocchio e spalla leggermente costruita. Fodera in viscosa, tasche a pattina. Un investimento per dieci inverni.",
      en: "A single-breasted wool and cashmere overcoat, knee-length with a lightly built shoulder. Viscose lining, flap pockets. An investment for ten winters.",
    },
    details: [
      { it: "90% lana, 10% cashmere", en: "90% wool, 10% cashmere" },
      { it: "Monopetto a tre bottoni", en: "Single-breasted, three buttons" },
      { it: "Fodera in viscosa", en: "Viscose lining" },
    ],
    fabricCare: [
      { it: "Lavaggio a secco", en: "Dry clean only" },
      { it: "Conservare su gruccia sagomata", en: "Store on a shaped hanger" },
    ],
    tags: ["wool", "winter", "office"],
  },
  {
    id: "p-021",
    slug: "ostuni-trench-coat",
    name: "Ostuni Trench Coat",
    category: "outerwear",
    price: 349,
    bestSellerRank: 8,
    colors: [C.sand, C.navy],
    sizes: ALL,
    tagline: { it: "Pioggia leggera, passo deciso.", en: "Light rain, steady stride." },
    description: {
      it: "Trench in gabardine di cotone idrorepellente, doppiopetto, con cintura e spallini. Fodera scozzese tono su tono.",
      en: "A water-repellent cotton gabardine trench, double-breasted with belt and epaulettes. Tone-on-tone check lining.",
    },
    details: [
      { it: "100% cotone gabardine idrorepellente", en: "100% water-repellent cotton gabardine" },
      { it: "Doppiopetto con cintura", en: "Double-breasted with belt" },
    ],
    fabricCare: [
      { it: "Lavaggio a secco", en: "Dry clean only" },
    ],
    tags: ["cotton", "rain", "office"],
  },
  {
    id: "p-022",
    slug: "capri-unstructured-blazer",
    name: "Capri Unstructured Blazer",
    category: "outerwear",
    price: 299,
    isNew: true,
    badge: "new",
    colors: [C.navy, C.olive, C.taupe],
    sizes: ALL,
    tagline: { it: "La giacca che si dimentica di avere addosso.", en: "The jacket you forget you're wearing." },
    description: {
      it: "Blazer destrutturato in lana e lino, senza spalline né fodera. Tasche applicate e due bottoni. Da indossare con un pantalone chino o una flanella.",
      en: "An unstructured wool and linen blazer with no padding or lining. Patch pockets and two buttons. Wear with chinos or flannel trousers.",
    },
    details: [
      { it: "55% lana, 45% lino", en: "55% wool, 45% linen" },
      { it: "Sfoderato, tasche applicate", en: "Unlined, patch pockets" },
    ],
    fabricCare: [
      { it: "Lavaggio a secco", en: "Dry clean only" },
    ],
    tags: ["wool", "linen", "office"],
  },
  {
    id: "p-023",
    slug: "dolomiti-quilted-jacket",
    name: "Dolomiti Quilted Jacket",
    category: "outerwear",
    price: 229,
    colors: [C.olive, C.navy, C.chocolate],
    sizes: ALL,
    tagline: { it: "Dal weekend in campagna al lunedì in città.", en: "From a country weekend to Monday in town." },
    description: {
      it: "Giacca trapuntata leggera con collo in velluto a coste e imbottitura riciclata. Chiusura a bottoni automatici, due tasche a toppa.",
      en: "A light quilted jacket with a corduroy collar and recycled padding. Snap closure, two patch pockets.",
    },
    details: [
      { it: "Esterno in nylon riciclato, collo in velluto a coste", en: "Recycled nylon shell, corduroy collar" },
      { it: "Imbottitura in poliestere riciclato", en: "Recycled polyester padding" },
    ],
    fabricCare: [
      { it: "Lavare in lavatrice a 30°, ciclo delicati", en: "Machine wash at 30°, delicate cycle" },
    ],
    tags: ["weekend", "rain", "layering"],
  },
  {
    id: "p-024",
    slug: "garda-harrington-jacket",
    name: "Garda Harrington Jacket",
    category: "outerwear",
    price: 199,
    badge: "exclusive",
    colors: [C.sand, C.navy, C.forest],
    sizes: ALL,
    tagline: { it: "Un classico corto, in versione silenziosa.", en: "A short classic, in a quiet version." },
    description: {
      it: "Giacca corta in cotone con collo alla coreana, polsi e fondo elasticizzati. Fodera leggera in cotone a quadri.",
      en: "A short cotton jacket with a stand collar and elasticated cuffs and hem. Light cotton check lining.",
    },
    details: [
      { it: "100% cotone", en: "100% cotton" },
      { it: "Fodera in cotone a quadri", en: "Cotton check lining" },
    ],
    fabricCare: [
      { it: "Lavare in lavatrice a 30°", en: "Machine wash at 30°" },
    ],
    tags: ["cotton", "weekend", "layering"],
  },

  /* ---- Trousers ---- */
  {
    id: "p-030",
    slug: "torino-flannel-trousers",
    name: "Torino Flannel Trousers",
    category: "trousers",
    price: 149,
    badge: "bestseller",
    bestSellerRank: 6,
    colors: [C.charcoal, C.navy, C.taupe],
    sizes: ALL,
    tagline: { it: "Una pince, la giusta caduta.", en: "One pleat, the right drape." },
    description: {
      it: "Pantalone in flanella di lana con una pince, vita media e gamba dritta. Orlo con risvolto di 4 cm. Il compagno naturale del blazer Capri.",
      en: "Single-pleat wool flannel trousers with a mid rise and straight leg. 4 cm turn-up. The natural partner of the Capri blazer.",
    },
    details: [
      { it: "100% lana flanella", en: "100% wool flannel" },
      { it: "Una pince, risvolto 4 cm", en: "Single pleat, 4 cm turn-up" },
      { it: "Passanti per cintura e fibbie laterali", en: "Belt loops and side adjusters" },
    ],
    fabricCare: [
      { it: "Lavaggio a secco", en: "Dry clean only" },
      { it: "Stirare con panno umido", en: "Press with a damp cloth" },
    ],
    tags: ["wool", "office", "winter"],
  },
  {
    id: "p-031",
    slug: "parma-stretch-chino",
    name: "Parma Stretch Chino",
    category: "trousers",
    price: 109,
    colors: [C.sand, C.navy, C.olive, C.chocolate],
    sizes: ALL,
    tagline: { it: "Il chino che va ovunque.", en: "The chino that goes anywhere." },
    description: {
      it: "Chino in twill di cotone con un tocco di elastan, vita media e gamba affusolata. Lavato per una mano morbida.",
      en: "A cotton twill chino with a touch of stretch, mid rise and tapered leg. Garment-washed for a soft hand.",
    },
    details: [
      { it: "98% cotone, 2% elastan", en: "98% cotton, 2% elastane" },
      { it: "Gamba affusolata", en: "Tapered leg" },
    ],
    fabricCare: [
      { it: "Lavare in lavatrice a 30°", en: "Machine wash at 30°" },
    ],
    tags: ["cotton", "office", "weekend"],
  },
  {
    id: "p-032",
    slug: "positano-linen-trousers",
    name: "Positano Linen Trousers",
    category: "trousers",
    price: 119,
    colors: [C.cream, C.olive, C.navy],
    sizes: ALL,
    tagline: { it: "Leggeri, ampi, mai sciatti.", en: "Light, loose, never sloppy." },
    description: {
      it: "Pantalone in lino lavato con doppia pince, vita alta e coulisse interna. Gamba ampia che si stringe sul fondo.",
      en: "Washed linen trousers with double pleats, high rise and internal drawcord. A wide leg that narrows toward the hem.",
    },
    details: [
      { it: "100% lino", en: "100% linen" },
      { it: "Doppia pince, coulisse interna", en: "Double pleat, internal drawcord" },
    ],
    fabricCare: [
      { it: "Lavare in lavatrice a 30°", en: "Machine wash at 30°" },
    ],
    tags: ["linen", "summer", "weekend"],
  },
  {
    id: "p-033",
    slug: "bergamo-corduroy-trousers",
    name: "Bergamo Corduroy Trousers",
    category: "trousers",
    price: 129,
    isNew: true,
    badge: "new",
    colors: [C.chocolate, C.olive, C.camel],
    sizes: ALL,
    soldOut: ["S"],
    tagline: { it: "Velluto a coste, come dev'essere.", en: "Corduroy, the way it should be." },
    description: {
      it: "Pantalone in velluto di cotone a coste medie, vita media e gamba dritta. Un capo d'autunno che dura fino a marzo.",
      en: "Mid-wale cotton corduroy trousers with a mid rise and straight leg. An autumn piece that lasts until March.",
    },
    details: [
      { it: "100% cotone velluto a coste", en: "100% cotton corduroy" },
      { it: "Gamba dritta", en: "Straight leg" },
    ],
    fabricCare: [
      { it: "Lavare in lavatrice a 30°, al rovescio", en: "Machine wash at 30°, inside out" },
    ],
    tags: ["cotton", "winter", "weekend"],
  },
  {
    id: "p-034",
    slug: "modena-wool-trousers",
    name: "Modena Tailored Wool Trousers",
    category: "trousers",
    price: 169,
    badge: "exclusive",
    colors: [C.navy, C.charcoal],
    sizes: ALL,
    tagline: { it: "Sartoriali senza il sarto.", en: "Tailored without the tailor." },
    description: {
      it: "Pantalone sartoriale in fresco di lana a quattro stagioni, senza pince, con fondo a vivo. Per chi veste in giacca ogni giorno.",
      en: "Tailored trousers in four-season tropical wool, flat-front with a plain hem. For those who wear a jacket every day.",
    },
    details: [
      { it: "100% lana fresco", en: "100% tropical wool" },
      { it: "Senza pince, fondo a vivo", en: "Flat front, plain hem" },
    ],
    fabricCare: [
      { it: "Lavaggio a secco", en: "Dry clean only" },
    ],
    tags: ["wool", "office"],
  },

  /* ---- Accessories ---- */
  {
    id: "p-040",
    slug: "ancona-cashmere-scarf",
    name: "Ancona Cashmere Scarf",
    category: "accessories",
    price: 119,
    colors: [C.camel, C.navy, C.charcoal, C.burgundy],
    sizes: ONE,
    tagline: { it: "Il cashmere che si regala, anche a sé stessi.", en: "The cashmere you gift, even to yourself." },
    description: {
      it: "Sciarpa in puro cashmere a trama fine, bordi sfrangiati. Leggera ma calda, da annodare al volo.",
      en: "A pure cashmere scarf with a fine weave and fringed edges. Light but warm, to be knotted on the go.",
    },
    details: [
      { it: "100% cashmere", en: "100% cashmere" },
      { it: "180 × 30 cm", en: "180 × 30 cm" },
    ],
    fabricCare: [
      { it: "Lavaggio a secco", en: "Dry clean only" },
    ],
    tags: ["cashmere", "winter", "gift"],
  },
  {
    id: "p-041",
    slug: "firenze-leather-belt",
    name: "Firenze Leather Belt",
    category: "accessories",
    price: 89,
    colors: [C.chocolate, C.black],
    sizes: ["S", "M", "L", "XL"],
    tagline: { it: "Pelle conciata al vegetale, fibbia opaca.", en: "Vegetable-tanned leather, matte buckle." },
    description: {
      it: "Cintura in pelle conciata al vegetale, 3 cm di altezza, con fibbia in ottone brunito. Invecchia bene.",
      en: "A vegetable-tanned leather belt, 3 cm wide, with a burnished brass buckle. Ages well.",
    },
    details: [
      { it: "100% pelle conciata al vegetale", en: "100% vegetable-tanned leather" },
      { it: "Fibbia in ottone brunito", en: "Burnished brass buckle" },
    ],
    fabricCare: [
      { it: "Nutrire con crema per pelle due volte l'anno", en: "Condition with leather cream twice a year" },
    ],
    tags: ["leather", "office", "gift"],
  },
  {
    id: "p-042",
    slug: "trieste-wool-beanie",
    name: "Trieste Wool Beanie",
    category: "accessories",
    price: 59,
    isNew: true,
    badge: "new",
    colors: [C.navy, C.olive, C.cream, C.charcoal],
    sizes: ONE,
    tagline: { it: "Il berretto da portare basso.", en: "The beanie to wear low." },
    description: {
      it: "Berretto in lana merino a costine, risvolto doppio. Nessuna etichetta esterna.",
      en: "A ribbed merino wool beanie with a double cuff. No external label.",
    },
    details: [
      { it: "100% lana merino", en: "100% merino wool" },
    ],
    fabricCare: [
      { it: "Lavare a mano in acqua fredda", en: "Hand wash cold" },
    ],
    tags: ["merino", "winter", "gift"],
  },
  {
    id: "p-043",
    slug: "lucca-canvas-tote",
    name: "Lucca Canvas Tote",
    category: "accessories",
    price: 99,
    colors: [C.sand, C.olive, C.navy],
    sizes: ONE,
    tagline: { it: "Per il mercato e per l'ufficio.", en: "For the market and for the office." },
    description: {
      it: "Borsa tote in tela di cotone pesante con manici in pelle conciata al vegetale e tasca interna. Fondo rinforzato.",
      en: "A heavy cotton canvas tote with vegetable-tanned leather handles and an internal pocket. Reinforced base.",
    },
    details: [
      { it: "Tela di cotone 18 oz, manici in pelle", en: "18 oz cotton canvas, leather handles" },
      { it: "40 × 38 × 14 cm", en: "40 × 38 × 14 cm" },
    ],
    fabricCare: [
      { it: "Pulire con panno umido", en: "Wipe clean with a damp cloth" },
    ],
    tags: ["cotton", "leather", "weekend"],
  },
  {
    id: "p-044",
    slug: "como-silk-pocket-square",
    name: "Como Silk Pocket Square",
    category: "accessories",
    price: 49,
    badge: "exclusive",
    colors: [C.navy, C.burgundy, C.forest],
    sizes: ONE,
    tagline: { it: "Un dettaglio, non una dichiarazione.", en: "A detail, not a statement." },
    description: {
      it: "Pochette in seta stampata a mano con bordo rullato. Da piegare con disinvoltura.",
      en: "A hand-printed silk pocket square with a hand-rolled edge. To be folded with ease.",
    },
    details: [
      { it: "100% seta", en: "100% silk" },
      { it: "33 × 33 cm, bordo rullato a mano", en: "33 × 33 cm, hand-rolled edge" },
    ],
    fabricCare: [
      { it: "Lavaggio a secco", en: "Dry clean only" },
    ],
    tags: ["silk", "office", "gift"],
  },
  {
    id: "p-045",
    slug: "genova-leather-card-holder",
    name: "Genova Leather Card Holder",
    category: "accessories",
    price: 69,
    colors: [C.chocolate, C.navy, C.black],
    sizes: ONE,
    tagline: { it: "Quattro carte, niente di più.", en: "Four cards, nothing more." },
    description: {
      it: "Porta carte in pelle pieno fiore con quattro scomparti e taschino centrale. Cuciture tono su tono.",
      en: "A full-grain leather card holder with four slots and a central pocket. Tone-on-tone stitching.",
    },
    details: [
      { it: "100% pelle pieno fiore", en: "100% full-grain leather" },
    ],
    fabricCare: [
      { it: "Pulire con panno morbido", en: "Wipe with a soft cloth" },
    ],
    tags: ["leather", "gift", "office"],
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
    title: { it: "Lunedì in centro", en: "Monday downtown" },
    tone: "#1b2a44",
    products: ["capri-unstructured-blazer", "aurelio-oxford-shirt", "torino-flannel-trousers"],
  },
  {
    id: "look-2",
    title: { it: "Weekend fuori porta", en: "Weekend out of town" },
    tone: "#6b705c",
    products: ["dolomiti-quilted-jacket", "ravenna-half-zip", "bergamo-corduroy-trousers"],
  },
  {
    id: "look-3",
    title: { it: "Cena senza fretta", en: "An unhurried dinner" },
    tone: "#4a3326",
    products: ["bolzano-turtleneck", "modena-wool-trousers", "firenze-leather-belt"],
  },
  {
    id: "look-4",
    title: { it: "Primo freddo", en: "First cold days" },
    tone: "#b5916a",
    products: ["adriano-wool-overcoat", "ercole-merino-crewneck", "ancona-cashmere-scarf"],
  },
];

/* ---------- Helpers ---------- */

export const FREE_SHIPPING_THRESHOLD = 149;

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
