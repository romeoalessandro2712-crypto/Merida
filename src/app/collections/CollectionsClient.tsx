"use client";

import Link from "next/link";
import { CATEGORIES } from "@data/products";
import { useT } from "@/lib/providers";
import { ProductImage } from "@/components/product/ProductImage";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import { BrandStory } from "@/components/home/BrandStory";
import { Community } from "@/components/home/Community";

export function CollectionsClient() {
  const { t, locale } = useT();
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <p className="label text-taupe mb-3">
          <Link href="/" className="hover:text-navy">
            {t.product.breadcrumbHome}
          </Link>{" "}
          / {t.shop.collections}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-navy font-medium">{t.shop.collections}</h1>
        <p className="mt-3 max-w-xl text-sm text-taupe leading-relaxed">{t.shop.collectionsIntro}</p>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i * 60}>
              <Link href={`/shop/${c.slug}`} className="group relative block overflow-hidden">
                <ProductImage
                  alt={c.name[locale]}
                  tone={c.tone}
                  variant={i}
                  aspect="aspect-[5/4]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  monogram={false}
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                  <h2 className="font-serif text-3xl font-medium">{c.name[locale]}</h2>
                  <p className="mt-1 text-xs text-cream/80">{c.blurb[locale]}</p>
                  <span className="label mt-3 inline-flex items-center gap-2 border-b border-cream/70 pb-0.5">
                    {t.tiles.shopNow} <ArrowIcon />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
      <BrandStory />
      <div className="border-t border-line">
        <Community />
      </div>
    </>
  );
}
