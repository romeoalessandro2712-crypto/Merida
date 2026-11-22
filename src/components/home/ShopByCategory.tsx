"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, type CategorySlug } from "@data/products";
import { useT } from "@/lib/providers";
import { cn } from "@/lib/format";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";

type Tab = "all" | CategorySlug;

export function ShopByCategory() {
  const { t, locale } = useT();
  const [tab, setTab] = useState<Tab>("all");

  const products = useMemo(() => {
    const list = tab === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === tab);
    return list.slice(0, 8);
  }, [tab]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: t.shopBy.all },
    ...CATEGORIES.map((c) => ({ id: c.slug, label: c.name[locale] })),
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24" aria-labelledby="shopby-title">
      <Reveal>
        <SectionHeading title={<span id="shopby-title">{t.shopBy.title}</span>} />
      </Reveal>

      <Reveal>
        <div role="tablist" aria-label={t.shopBy.title} className="no-scrollbar -mx-4 mb-10 flex gap-6 overflow-x-auto border-b border-line px-4 md:mx-0 md:justify-center md:px-0">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              role="tab"
              type="button"
              aria-selected={tab === tb.id}
              aria-controls="shopby-panel"
              onClick={() => setTab(tb.id)}
              className={cn(
                "label whitespace-nowrap pb-3 -mb-px border-b transition-colors",
                tab === tb.id ? "border-navy text-navy" : "border-transparent text-taupe hover:text-navy",
              )}
            >
              {tb.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div id="shopby-panel" role="tabpanel">
        <ProductGrid key={tab} products={products} columns={5} />
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href={tab === "all" ? "/shop" : `/shop/${tab}`}
          className="label inline-flex items-center gap-2 border-b border-navy pb-1 text-navy hover:text-chocolate hover:border-chocolate transition-colors"
        >
          {t.shopBy.viewAll}
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
