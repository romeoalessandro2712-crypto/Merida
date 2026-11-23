"use client";

import type { Product } from "@data/products";
import { useT } from "@/lib/providers";
import { Ornament } from "@/components/brand/Ornament";

/** The story behind the name + a visible traceability card (fibre, making, composition). */
export function ProductStory({ product }: { product: Product }) {
  const { t, locale } = useT();
  const rows = [
    { k: t.pstory.fibre, v: product.origin.fibre[locale] },
    { k: t.pstory.made, v: product.origin.made[locale] },
    { k: t.pstory.composition, v: product.origin.composition[locale] },
  ];
  return (
    <section className="mt-10 grid gap-6 border border-gold/40 p-6 sm:grid-cols-2" aria-labelledby="pstory-title">
      <div>
        <h2 id="pstory-title" className="label text-navy">
          {t.pstory.title}
        </h2>
        <Ornament className="my-3 justify-start" />
        <p className="font-serif text-lg italic leading-snug text-navy">{product.story[locale]}</p>
      </div>
      <div>
        <h2 className="label text-navy">{t.pstory.origin}</h2>
        <dl className="mt-3 divide-y divide-line border-y border-line">
          {rows.map((r) => (
            <div key={r.k} className="flex justify-between gap-4 py-2.5 text-xs">
              <dt className="text-taupe">{r.k}</dt>
              <dd className="text-right text-navy">{r.v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[0.68rem] text-olive">{t.pstory.transparency}</p>
      </div>
    </section>
  );
}
