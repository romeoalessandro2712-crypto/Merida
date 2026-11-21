"use client";

import Link from "next/link";
import { useState } from "react";
import { LOOKS, getProduct, type Product } from "@data/products";
import { useCart, useT, useUI } from "@/lib/providers";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/product/ProductImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { flyToCart } from "@/lib/fly-to-cart";
import { defaultSize } from "@data/products";

export function Community() {
  const { t, locale } = useT();
  const { add } = useCart();
  const { notify } = useUI();
  const [added, setAdded] = useState<string | null>(null);

  function addLook(id: string, products: Product[], source: Element) {
    for (const p of products) {
      // Default size M (or first in stock), first colour — the customer can adjust in the cart.
      add(p.id, p.colors[0].id, defaultSize(p));
    }
    flyToCart(source, products[0].colors[0].hex);
    setAdded(id);
    notify(t.community.lookAdded);
    window.setTimeout(() => setAdded(null), 1500);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24" aria-labelledby="community-title">
      <Reveal>
        <SectionHeading title={<span id="community-title">{t.community.title}</span>} subtitle={t.community.subtitle} />
      </Reveal>
      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:px-0">
        {LOOKS.map((look, i) => {
          const products = look.products.map(getProduct).filter((p): p is Product => Boolean(p));
          const total = products.reduce((n, p) => n + p.price, 0);
          return (
            <Reveal as="li" key={look.id} delay={i * 80} className="w-[72vw] shrink-0 snap-start sm:w-[46vw] md:w-auto">
              <div className="group relative overflow-hidden">
                <ProductImage
                  alt={look.title[locale]}
                  tone={look.tone}
                  variant={i}
                  sizes="(min-width: 768px) 25vw, 72vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                  monogram={false}
                />
                {/* Mini stack of the pieces in the look */}
                <div className="absolute left-3 top-3 flex -space-x-2">
                  {products.map((p) => (
                    <span
                      key={p.id}
                      title={p.name}
                      className="h-6 w-6 rounded-full border border-cream"
                      style={{ backgroundColor: p.colors[0].hex }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <h3 className="font-serif text-xl text-navy">{look.title[locale]}</h3>
                <ul className="mt-1 text-xs text-taupe">
                  {products.map((p) => (
                    <li key={p.id}>
                      <Link href={`/product/${p.slug}`} className="hover:text-navy">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-navy tabular-nums">
                    {formatPrice(total, locale)} · {products.length} {t.community.pieces}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant={added === look.id ? "chocolate" : "secondary"}
                  className="mt-3 w-full"
                  onClick={(e) => addLook(look.id, products, e.currentTarget)}
                >
                  {added === look.id ? (
                    <>
                      <CheckIcon /> {t.community.lookAdded}
                    </>
                  ) : (
                    t.community.addLook
                  )}
                </Button>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
