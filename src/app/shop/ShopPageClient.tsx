"use client";

import type { CategorySlug, Product } from "@data/products";
import { CATEGORIES } from "@data/products";
import { useT } from "@/lib/providers";
import { CollectionView } from "@/components/shop/CollectionView";

export function ShopPageClient({
  products,
  mode,
  category,
}: {
  products: Product[];
  mode: "shop" | "new-in" | "best-sellers" | "category";
  category?: CategorySlug;
}) {
  const { t, locale } = useT();
  const cat = category ? CATEGORIES.find((c) => c.slug === category) : undefined;

  const title =
    mode === "new-in" ? t.shop.newIn : mode === "best-sellers" ? t.shop.bestSellers : cat ? cat.name[locale] : t.shop.allProducts;

  return (
    <CollectionView
      products={products}
      title={title}
      intro={cat?.blurb[locale]}
      lockedCategory={category}
      activeSlug={mode === "category" ? category : mode}
    />
  );
}
