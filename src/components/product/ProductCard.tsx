"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Product, Size } from "@data/products";
import { useCart, useT, useUI } from "@/lib/providers";
import { cn } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { Swatches } from "./Swatches";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { WishlistButton } from "./WishlistButton";
import { PlusIcon, CheckIcon } from "@/components/ui/Icons";
import { Tilt } from "@/components/ui/Tilt";
import { flyToCart } from "@/lib/fly-to-cart";

export function ProductCard({
  product,
  rank,
  priority,
  className,
}: {
  product: Product;
  rank?: number;
  priority?: boolean;
  className?: string;
}) {
  const { t, locale } = useT();
  const { add } = useCart();
  const { notify } = useUI();
  const [colorId, setColorId] = useState(product.colors[0].id);
  const [quickOpen, setQuickOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<Size | null>(null);
  const articleRef = useRef<HTMLElement>(null);
  const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0];

  function quickAdd(size: Size) {
    add(product.id, color.id, size);
    flyToCart(articleRef.current?.querySelector(".tilt"), color.hex);
    setJustAdded(size);
    notify(t.product.addedToCart);
    window.setTimeout(() => {
      setJustAdded(null);
      setQuickOpen(false);
    }, 900);
  }

  return (
    <article
      ref={articleRef}
      className={cn("group relative flex flex-col", className)}
      onMouseLeave={() => setQuickOpen(false)}
    >
      <Tilt className="overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block" aria-label={product.name}>
          <ProductImage
            src={color.images?.[0]}
            alt={`${product.name} — ${color.name[locale]}`}
            tone={color.hex}
            art={product.art}
            stripe={color.stripe}
            priority={priority}
            monogram={false}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {/* Second view (detail) fades in on hover, like a second product photo */}
          <div aria-hidden="true" className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
            <ProductImage
              src={color.images?.[1]}
              alt=""
              tone={color.hex}
              art={product.art}
              stripe={color.stripe}
              variant={1}
              monogram={false}
            />
          </div>
        </Link>

        {/* Badges / rank */}
        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
          {rank !== undefined && (
            <span className="flex h-8 w-8 items-center justify-center bg-cream font-serif text-lg text-navy">{rank}</span>
          )}
          {product.badge && <Badge kind={product.badge} />}
        </div>

        <WishlistButton productId={product.id} className="absolute right-2 top-2 p-2 bg-cream/0 hover:bg-cream/80" />

        {/* Quick add */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 bg-cream/95 backdrop-blur-sm border-t border-line transition-transform duration-400 ease-out",
            quickOpen ? "translate-y-0" : "translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0",
          )}
        >
          {product.sizes.length === 1 ? (
            <button
              type="button"
              onClick={() => quickAdd(product.sizes[0])}
              className="flex w-full items-center justify-center gap-2 py-3 label text-navy hover:bg-ecru"
            >
              {justAdded ? <CheckIcon className="text-olive" /> : <PlusIcon />}
              {justAdded ? t.card.added : t.card.quickAdd}
            </button>
          ) : (
            <div className="px-3 py-2.5">
              <p className="label text-taupe text-[0.58rem] mb-1.5">{justAdded ? t.card.added : t.card.selectSize}</p>
              <div className="flex gap-1" role="group" aria-label={t.card.quickAdd}>
                {product.sizes.map((s) => {
                  const out = product.soldOut?.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={out}
                      aria-label={`${t.card.add} ${s}${out ? ` — ${t.card.soldOut}` : ""}`}
                      onClick={() => quickAdd(s)}
                      className={cn(
                        "flex h-8 flex-1 items-center justify-center border text-[0.68rem] tracking-[0.08em] transition-colors",
                        justAdded === s
                          ? "border-olive bg-olive text-cream"
                          : "border-line text-navy hover:border-navy hover:bg-navy hover:text-cream",
                        out && "cursor-not-allowed line-through text-taupe/60 hover:bg-transparent hover:text-taupe/60 hover:border-line",
                      )}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Mobile tap target for quick add (hover unavailable) */}
        <button
          type="button"
          onClick={() => setQuickOpen((v) => !v)}
          aria-expanded={quickOpen}
          aria-label={t.card.quickAdd}
          className={cn(
            "absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center border border-line bg-cream text-navy transition-opacity md:hidden",
            quickOpen && "opacity-0 pointer-events-none",
          )}
        >
          <PlusIcon />
        </button>
      </Tilt>

      <div className="mt-3 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[1.15rem] leading-snug text-navy">
            <Link href={`/product/${product.slug}`} className="hover:underline underline-offset-4">
              {product.name}
            </Link>
          </h3>
          <Price amount={product.price} compareAt={product.compareAtPrice} className="text-[0.9rem] text-navy shrink-0" />
        </div>
        <div className="flex items-center justify-between">
          <Swatches colors={product.colors} value={colorId} onChange={setColorId} name={`card-color-${product.id}`} />
          <span className="text-[0.68rem] text-taupe">
            {product.colors.length} {product.colors.length === 1 ? t.card.color : t.card.colors}
          </span>
        </div>
      </div>
    </article>
  );
}
