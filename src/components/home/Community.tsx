"use client";

import Link from "next/link";
import { useState } from "react";
import { LOOKS, defaultSize, getProduct, type Product, type ProductColor } from "@data/products";
import { useCart, useT, useUI } from "@/lib/providers";
import { cn, formatPrice } from "@/lib/format";
import { flyToCart } from "@/lib/fly-to-cart";
import { lookOutfit } from "@/lib/outfit";
import { ANCHORS, Figure, SHOTS } from "@/components/product/Figure";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";

type Item = { product: Product; color: ProductColor };

const BACKDROPS = [
  "radial-gradient(120% 90% at 50% 30%, #f6efe2 0%, #e4d6bf 70%, #d3c3a4 100%)",
  "radial-gradient(120% 90% at 50% 30%, #eef1f3 0%, #d9e0e6 70%, #c3ccd6 100%)",
  "radial-gradient(120% 90% at 50% 30%, #f3ece2 0%, #e2d3bd 70%, #cdb99b 100%)",
  "radial-gradient(120% 90% at 50% 30%, #eef0ea 0%, #dadfd2 70%, #c5ccbb 100%)",
];

/** Converts figure coordinates into % positions inside the 4:5 "full" frame. */
const [VX, VY, VW, VH] = SHOTS.full.split(" ").map(Number);
const pos = (x: number, y: number) => ({ left: `${((x - VX) / VW) * 100}%`, top: `${((y - VY) / VH) * 100}%` });

/** Lookbook: each look is worn by an illustrated figure, with shoppable hotspots on every piece. */
export function Community() {
  const { t, locale } = useT();
  const { add } = useCart();
  const { notify } = useUI();
  const [added, setAdded] = useState<string | null>(null);
  const [openSpot, setOpenSpot] = useState<string | null>(null);

  function addLook(id: string, items: Item[], source: Element) {
    for (const { product, color } of items) add(product.id, color.id, defaultSize(product));
    flyToCart(source, items[0].color.hex);
    setAdded(id);
    notify(t.community.lookAdded);
    window.setTimeout(() => setAdded(null), 1500);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24" aria-labelledby="community-title">
      <Reveal>
        <SectionHeading title={<span id="community-title">{t.community.title}</span>} subtitle={t.community.subtitle} />
      </Reveal>
      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
        {LOOKS.map((look, i) => {
          const products = look.products.map(getProduct).filter((p): p is Product => Boolean(p));
          // The hero piece takes the look's mood colour when it comes in it.
          const items: Item[] = products.map((p, k) => ({
            product: p,
            color: (k === 0 ? p.colors.find((c) => c.hex === look.tone) : undefined) ?? p.colors[0],
          }));
          const outfit = lookOutfit(items, look.id);
          const total = products.reduce((n, p) => n + p.price, 0);
          const spots = items.map((it) => {
            const a = it.product.art;
            const isDraped = a === "sweater" && items.some((o) => o.product.art === "polo" || o.product.art === "shirt");
            const anchor = a === "cap" ? ANCHORS.cap : a === "bracelet" ? ANCHORS.bracelet : isDraped ? ANCHORS.draped : ANCHORS.top;
            return { it, anchor };
          });
          return (
            <Reveal as="li" key={look.id} delay={i * 90} className="w-[74vw] shrink-0 snap-start sm:w-[46vw] md:w-auto">
              <div className="group relative aspect-[4/5]">
                <div className="absolute inset-0 overflow-hidden" style={{ background: BACKDROPS[i % BACKDROPS.length] }}>
                <svg viewBox={SHOTS.full} className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" role="img" aria-label={look.title[locale]}>
                  <g className="sway" style={{ animationDelay: `${i * -1.7}s` }}>
                    <Figure outfit={outfit} id={`look-${look.id}`} />
                  </g>
                </svg>
                </div>
                {spots.map(({ it, anchor }) => {
                  const key = `${look.id}-${it.product.id}`;
                  const isOpen = openSpot === key;
                  return (
                    <div key={key} className={cn("absolute", isOpen ? "z-30" : "z-10")} style={pos(anchor.x, anchor.y)}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={it.product.name}
                        onClick={() => setOpenSpot(isOpen ? null : key)}
                        onMouseEnter={() => setOpenSpot(key)}
                        className="relative -ml-3 -mt-3 flex h-6 w-6 items-center justify-center"
                      >
                        <span aria-hidden="true" className="hotspot-ping absolute inset-0 rounded-full bg-cream/80" />
                        <span aria-hidden="true" className="relative h-3.5 w-3.5 rounded-full border-2 border-navy bg-cream shadow" />
                      </button>
                      <Link
                        href={`/product/${it.product.slug}`}
                        tabIndex={isOpen ? 0 : -1}
                        className={cn(
                          "absolute left-1/2 top-5 z-20 w-max max-w-[12rem] -translate-x-1/2 border border-line bg-cream/95 px-3 py-2 text-center shadow-[0_10px_30px_-12px_rgba(18,28,48,0.5)] backdrop-blur transition-all duration-300",
                          isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
                        )}
                      >
                        <span className="block text-xs text-navy">{it.product.name}</span>
                        <span className="block text-[0.68rem] text-taupe">
                          {it.color.name[locale]} · {formatPrice(it.product.price, locale)}
                        </span>
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3" onMouseEnter={() => setOpenSpot(null)}>
                <h3 className="font-serif text-xl text-navy">{look.title[locale]}</h3>
                <p className="mt-1 text-sm text-navy tabular-nums">
                  {formatPrice(total, locale)} · {products.length} {t.community.pieces}
                </p>
                <Button
                  size="sm"
                  variant={added === look.id ? "chocolate" : "secondary"}
                  className="mt-3 w-full"
                  onClick={(e) => addLook(look.id, items, e.currentTarget)}
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
