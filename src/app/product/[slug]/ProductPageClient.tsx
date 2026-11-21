"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, type Product, type Size } from "@data/products";
import { useCart, useT, useUI } from "@/lib/providers";
import { Gallery } from "@/components/product/Gallery";
import { Swatches } from "@/components/product/Swatches";
import { SizeSelector } from "@/components/product/SizeSelector";
import { WishlistButton } from "@/components/product/WishlistButton";
import { Accordion } from "@/components/product/Accordion";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn, formatPrice } from "@/lib/format";
import { flyToCart } from "@/lib/fly-to-cart";
import { recordView } from "@/lib/engagement";
import { FrequentlyBought } from "@/components/product/FrequentlyBought";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";

export function ProductPageClient({ product, related }: { product: Product; related: Product[] }) {
  const { t, locale } = useT();
  const { add } = useCart();
  const { notify, open } = useUI();
  const [colorId, setColorId] = useState(product.colors[0].id);
  const [size, setSize] = useState<Size | undefined>(product.sizes.length === 1 ? product.sizes[0] : undefined);
  const [sizeError, setSizeError] = useState(false);
  const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0];
  const category = CATEGORIES.find((c) => c.slug === product.category);
  const atcRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    recordView(product.id);
  }, [product.id]);

  // Show the sticky mobile bar once the main "Add to cart" button scrolls out of view.
  useEffect(() => {
    const el = atcRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function addToCart(source?: Element | null) {
    if (!size) {
      setSizeError(true);
      sizeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    add(product.id, color.id, size);
    notify(t.product.addedToCart);
    flyToCart(source, color.hex);
    window.setTimeout(() => open("cart"), 750);
  }

  const lowSelected = size !== undefined && product.lowStock?.includes(size);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 md:py-10">
        <nav aria-label="Breadcrumb" className="label text-taupe mb-6">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-navy">
                {t.product.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/shop" className="hover:text-navy">
                {t.shop.title}
              </Link>
            </li>
            {category && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={`/shop/${category.slug}`} className="hover:text-navy">
                    {category.name[locale]}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li className="text-navy" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Gallery color={color} name={product.name} />

          <div className="lg:sticky lg:top-28 lg:self-start">
            {product.badge && <Badge kind={product.badge} className="mb-4 inline-block border border-line" />}
            <h1 className="font-serif text-4xl md:text-5xl leading-[1.05] text-navy font-medium">{product.name}</h1>
            <p className="mt-2 font-serif italic text-lg text-taupe">{product.tagline[locale]}</p>
            <Price amount={product.price} compareAt={product.compareAtPrice} className="mt-4 block text-xl text-navy" />

            <div className="mt-8 flex flex-col gap-6">
              <div>
                <p className="label text-navy mb-3">
                  {t.product.color}: <span className="text-taupe normal-case tracking-normal">{color.name[locale]}</span>
                </p>
                <Swatches colors={product.colors} value={colorId} onChange={setColorId} size="md" name="pdp-color" />
              </div>

              {product.sizes.length > 1 && (
                <div ref={sizeRef}>
                  <div className="mb-3 flex items-center justify-between">
                    <p className={cn("label", sizeError ? "text-burgundy" : "text-navy")} id="size-label">
                      {t.product.size}
                      {sizeError && <span className="ml-2 normal-case tracking-normal text-[#7a3b41]">— {t.product.selectSizeFirst}</span>}
                    </p>
                    <button type="button" className="label text-taupe underline-offset-4 hover:underline">
                      {t.product.sizeGuide}
                    </button>
                  </div>
                  <SizeSelector
                    sizes={product.sizes}
                    soldOut={product.soldOut}
                    value={size}
                    onChange={(s) => {
                      setSize(s);
                      setSizeError(false);
                    }}
                    name="pdp-size"
                    lowStock={product.lowStock}
                  />
                  {lowSelected ? (
                    <p className="mt-3 text-xs font-medium text-chocolate" aria-live="polite">
                      {t.stock.low} {size}
                    </p>
                  ) : product.lowStock?.length ? (
                    <p className="mt-3 flex items-center gap-2 text-xs text-taupe">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-chocolate" />
                      {t.stock.lowShort}
                    </p>
                  ) : null}
                </div>
              )}

              <div ref={atcRef} className="flex items-stretch gap-3">
                <Button size="lg" className="flex-1" onClick={(e) => addToCart(e.currentTarget)}>
                  {t.product.addToCart}
                </Button>
                <WishlistButton productId={product.id} className="h-14 w-14 shrink-0 justify-center border border-line hover:border-navy" />
              </div>
              <p className="text-xs text-olive">{t.product.stock}</p>
            </div>

            <FrequentlyBought product={product} colorId={color.id} size={size} />

            <p className="mt-8 text-[0.95rem] leading-relaxed text-charcoal/85">{product.description[locale]}</p>

            <div className="mt-8">
              <Accordion
                items={[
                  {
                    id: "details",
                    title: t.product.details,
                    content: (
                      <ul className="list-disc pl-4 space-y-1.5">
                        {product.details.map((d, i) => (
                          <li key={i}>{d[locale]}</li>
                        ))}
                        <li>
                          {t.product.sku}: {product.id.toUpperCase()}
                        </li>
                      </ul>
                    ),
                  },
                  {
                    id: "fabric",
                    title: t.product.fabric,
                    content: (
                      <ul className="list-disc pl-4 space-y-1.5">
                        {product.fabricCare.map((d, i) => (
                          <li key={i}>{d[locale]}</li>
                        ))}
                      </ul>
                    ),
                  },
                  { id: "shipping", title: t.product.shipping, content: <p>{t.product.shippingText}</p> },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky add-to-cart bar (mobile) */}
      <div
        aria-hidden={!showSticky}
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 px-4 py-3 backdrop-blur transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          showSticky ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-10 w-8 shrink-0 border border-line" style={{ backgroundColor: color.hex }} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-navy">{product.name}</p>
            <p className="truncate text-xs text-taupe">
              {formatPrice(product.price, locale)} · {size ? (size === "ONE" ? t.card.oneSize : size) : t.sticky.choose}
            </p>
          </div>
          <Button size="md" className="shrink-0 px-6" tabIndex={showSticky ? 0 : -1} onClick={(e) => addToCart(e.currentTarget)}>
            {t.card.add}
          </Button>
        </div>
      </div>

      {/* Keeps the footer clear of the sticky bar on phones */}
      <div aria-hidden="true" className="h-20 lg:hidden" />

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24 border-t border-line mt-10" aria-labelledby="related-title">
          <Reveal>
            <SectionHeading title={<span id="related-title">{t.product.related}</span>} />
          </Reveal>
          <ProductGrid products={related} />
        </section>
      )}

      <RecentlyViewed excludeId={product.id} className="mx-auto max-w-7xl border-t border-line px-4 py-16 md:px-8 md:py-24" />
    </>
  );
}
