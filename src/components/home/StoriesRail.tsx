"use client";

import Link from "next/link";
import { PRODUCTS } from "@data/products";
import { useT } from "@/lib/providers";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/product/ProductImage";

/**
 * Instagram-style "stories" row right under the hero: every piece of the capsule is one tap
 * away on the first screen, in a pattern TikTok/Instagram visitors already know.
 */
export function StoriesRail() {
  const { t, locale } = useT();
  return (
    <nav aria-label={t.stories.label} className="border-b border-line bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-5 pt-6 md:px-8">
        <p className="label mb-4 text-center text-taupe">{t.stories.label}</p>
        <ul className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 md:justify-center md:gap-10">
          {PRODUCTS.map((p, i) => {
            const c = p.colors[0];
            const name = t.stories.names[p.slug as keyof typeof t.stories.names] ?? p.name;
            return (
              <li key={p.id} className="snap-start animate-fade-up" style={{ animationDelay: `${200 + i * 90}ms` }}>
                <Link href={`/product/${p.slug}`} className="group flex w-[76px] flex-col items-center gap-2 text-center md:w-[92px]">
                  <span className="rounded-full bg-[conic-gradient(from_180deg,#b89b5e,#d9c28f,#1b2a44,#b89b5e)] p-[2px] transition-transform duration-500 group-hover:scale-105">
                    <span className="block overflow-hidden rounded-full border-2 border-cream">
                      <ProductImage
                        alt={p.name}
                        src={c.images?.[0]}
                        tone={c.hex}
                        art={p.art}
                        stripe={c.stripe}
                        aspect="aspect-square"
                        className="h-[66px] w-[66px] md:h-[80px] md:w-[80px]"
                        sizes="80px"
                        monogram={false}
                      />
                    </span>
                  </span>
                  <span className="text-xs text-navy">{name}</span>
                  <span className="-mt-1.5 text-[0.68rem] text-taupe tabular-nums">{formatPrice(p.price, locale)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
