"use client";

import Link from "next/link";
import { useState } from "react";
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
import { cn } from "@/lib/format";

export function ProductPageClient({ product, related }: { product: Product; related: Product[] }) {
  const { t, locale } = useT();
  const { add } = useCart();
  const { notify, open } = useUI();
  const [colorId, setColorId] = useState(product.colors[0].id);
  const [size, setSize] = useState<Size | undefined>(product.sizes.length === 1 ? product.sizes[0] : undefined);
  const [sizeError, setSizeError] = useState(false);
  const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0];
  const category = CATEGORIES.find((c) => c.slug === product.category);

  function addToCart() {
    if (!size) {
      setSizeError(true);
      return;
    }
    add(product.id, color.id, size);
    notify(t.product.addedToCart);
    open("cart");
  }

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
                <div>
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
                  />
                </div>
              )}

              <div className="flex items-stretch gap-3">
                <Button size="lg" className="flex-1" onClick={addToCart}>
                  {t.product.addToCart}
                </Button>
                <WishlistButton productId={product.id} className="h-14 w-14 shrink-0 justify-center border border-line hover:border-navy" />
              </div>
              <p className="text-xs text-olive">{t.product.stock}</p>
            </div>

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

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24 border-t border-line mt-10" aria-labelledby="related-title">
          <Reveal>
            <SectionHeading title={<span id="related-title">{t.product.related}</span>} />
          </Reveal>
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}
