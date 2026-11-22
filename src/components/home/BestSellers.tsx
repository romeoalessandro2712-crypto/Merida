"use client";

import Link from "next/link";
import { getBestSellers } from "@data/products";
import { useT } from "@/lib/providers";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";

export function BestSellers() {
  const { t } = useT();
  const products = getBestSellers(5);
  return (
    <section className="border-t border-line bg-ecru/60 py-16 md:py-24" aria-labelledby="best-title">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <SectionHeading
            align="left"
            label={`01 — ${String(products.length).padStart(2, "0")}`}
            title={<span id="best-title">{t.best.title}</span>}
            subtitle={t.best.subtitle}
            action={
              <Link href="/best-sellers" className="label inline-flex items-center gap-2 border-b border-navy pb-1 text-navy">
                {t.shopBy.viewAll}
                <ArrowIcon />
              </Link>
            }
          />
        </Reveal>
        <ProductGrid products={products} ranked columns={5} />
      </div>
    </section>
  );
}
