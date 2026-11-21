"use client";

import { PRODUCTS } from "@data/products";
import { useT } from "@/lib/providers";
import { useRecent } from "@/lib/engagement";
import { ProductGrid } from "./ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Pieces the visitor looked at before (stored only in their browser). */
export function RecentlyViewed({ excludeId, className }: { excludeId?: string; className?: string }) {
  const { t } = useT();
  const ids = useRecent();
  const products = ids
    .filter((id) => id !== excludeId)
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p))
    .slice(0, 4);
  if (products.length === 0) return null;
  return (
    <section aria-labelledby="recent-title" className={className}>
      <SectionHeading title={<span id="recent-title">{t.recent.title}</span>} />
      <ProductGrid products={products} />
    </section>
  );
}
