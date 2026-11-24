import type { Metadata } from "next";
import { PRODUCTS } from "@data/products";
import { siteUrl } from "@/lib/site";
import { ShopPageClient } from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Shop — tutti i capi",
  description: "Tutti i cinque pezzi della capsule MERIDIA: polo a righe, camicia in lino, maglia di lino, cappello in cotone e bracciale intrecciato. Spedizione gratuita sopra i 149 €.",
  alternates: { canonical: siteUrl("shop/") },
};

export default function ShopPage() {
  return <ShopPageClient products={PRODUCTS} mode="shop" />;
}
