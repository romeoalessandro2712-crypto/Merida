"use client";

import Link from "next/link";
import { CATEGORIES } from "@data/products";
import { useT } from "@/lib/providers";
import { ProductImage } from "@/components/product/ProductImage";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";

const TILE_SLUGS = ["knitwear", "shirts-polos", "outerwear", "trousers"] as const;

export function CategoryTiles() {
  const { t, locale } = useT();
  const tiles = TILE_SLUGS.map((s) => CATEGORIES.find((c) => c.slug === s)!);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 pb-16 md:pb-24" aria-label={t.tiles.title}>
      <ul className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {tiles.map((c, i) => (
          <Reveal as="li" key={c.slug} delay={i * 80}>
            <Link href={`/shop/${c.slug}`} className="group relative block overflow-hidden">
              <ProductImage
                alt={c.name[locale]}
                tone={c.tone}
                variant={i}
                aspect="aspect-[3/4]"
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                monogram={false}
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-cream">
                <h3 className="font-serif text-2xl md:text-3xl font-medium">{c.name[locale]}</h3>
                <p className="mt-1 hidden text-xs text-cream/80 md:block">{c.blurb[locale]}</p>
                <span className="label mt-3 inline-flex items-center gap-2 border-b border-cream/70 pb-0.5">
                  {t.tiles.shopNow}
                  <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
