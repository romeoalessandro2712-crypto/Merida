"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { defaultSize, getRelatedProducts, type Product, type Size } from "@data/products";
import { useCart, useT, useUI } from "@/lib/providers";
import { bundleRate, pct } from "@/lib/pricing";
import { formatPrice, cn } from "@/lib/format";
import { flyToCart } from "@/lib/fly-to-cart";
import { ProductImage } from "./ProductImage";
import { Button } from "@/components/ui/Button";
import { PlusIcon, CheckIcon } from "@/components/ui/Icons";

/** "Frequently bought together": this piece + two from other categories, with the multi-piece price shown. */
export function FrequentlyBought({ product, colorId, size }: { product: Product; colorId: string; size?: Size }) {
  const { t, locale } = useT();
  const { add } = useCart();
  const { notify, open } = useUI();

  const partners = useMemo(() => {
    const seen = new Set<string>([product.category]);
    const out: Product[] = [];
    for (const p of getRelatedProducts(product, 20)) {
      if (seen.has(p.category)) continue;
      seen.add(p.category);
      out.push(p);
      if (out.length === 2) break;
    }
    return out;
  }, [product]);

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const items = [product, ...partners];
  const isOn = (p: Product) => p.id === product.id || checked[p.id] !== false;
  const selected = items.filter(isOn);
  const sum = selected.reduce((n, p) => n + p.price, 0);
  const rate = bundleRate(selected.length);
  const final = Math.round(sum * (1 - rate) * 100) / 100;

  function addAll(source: Element) {
    for (const p of selected) {
      if (p.id === product.id) add(p.id, colorId, size ?? defaultSize(p));
      else add(p.id, p.colors[0].id, defaultSize(p));
    }
    flyToCart(source, product.colors.find((c) => c.id === colorId)?.hex ?? product.colors[0].hex);
    notify(t.product.addedToCart);
    window.setTimeout(() => open("cart"), 750);
  }

  if (partners.length === 0) return null;

  return (
    <section aria-labelledby="fbt-title" className="mt-10 border border-gold/40 bg-ecru/50 p-5">
      <h2 id="fbt-title" className="label mb-4 text-navy">
        {t.bundle.title}
      </h2>
      <ul className="flex items-start gap-2">
        {items.map((p, i) => {
          const on = isOn(p);
          const col = (p.id === product.id ? product.colors.find((c) => c.id === colorId) : undefined) ?? p.colors[0];
          const tone = col.hex;
          return (
            <li key={p.id} className="flex flex-1 items-start gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="mt-10 text-taupe">
                  <PlusIcon />
                </span>
              )}
              <div className={cn("flex-1 transition-opacity", !on && "opacity-40")}>
                <Link href={`/product/${p.slug}`} className="block">
                  <ProductImage alt={p.name} art={p.art} stripe={col.stripe} tone={tone} sizes="120px" monogram={false} />
                </Link>
                <label className="mt-2 flex cursor-pointer items-start gap-1.5 text-[0.7rem] leading-tight text-navy">
                  <input
                    type="checkbox"
                    checked={on}
                    disabled={p.id === product.id}
                    onChange={(e) => setChecked((c) => ({ ...c, [p.id]: e.target.checked }))}
                    className="mt-0.5 accent-navy"
                  />
                  <span>
                    {p.id === product.id ? t.bundle.thisItem : p.name}
                    <span className="block text-taupe">{formatPrice(p.price, locale)}</span>
                  </span>
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-line pt-4">
        <div>
          <p className="text-xs text-taupe">{t.bundle.together}</p>
          <p className="font-serif text-2xl text-navy">
            {rate > 0 && <s className="mr-2 text-base text-taupe">{formatPrice(sum, locale)}</s>}
            {formatPrice(final, locale)}
            {rate > 0 && <span className="label ml-2 align-middle text-[0.6rem] text-olive">-{pct(rate)}</span>}
          </p>
        </div>
        <Button size="sm" onClick={(e) => addAll(e.currentTarget)}>
          <CheckIcon width={14} height={14} />
          {t.bundle.add.replace("{n}", String(selected.length))}
        </Button>
      </div>
      <p className="mt-2 text-[0.68rem] text-taupe">{t.bundle.note}</p>
    </section>
  );
}
