"use client";

import Image from "next/image";
import Link from "next/link";
import { EDITORIAL_PHOTOS, LOOKS, getProduct, type Product } from "@data/products";
import { useT } from "@/lib/providers";
import { asset } from "@/lib/asset";
import { lookOutfit } from "@/lib/outfit";
import { Figure, SHOTS } from "@/components/product/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";

/** Two settings, as in a campaign shoot: a terracotta studio and a warm walnut interior. */
const SETS = [
  {
    look: LOOKS[0],
    background:
      "radial-gradient(90% 70% at 40% 30%, #b45a3c 0%, #9a4428 45%, #7a3220 100%)",
  },
  {
    look: LOOKS[2],
    background:
      "linear-gradient(90deg, rgba(0,0,0,0.18) 0 1.5%, transparent 1.5% 33%, rgba(0,0,0,0.18) 33% 34.5%, transparent 34.5% 66%, rgba(0,0,0,0.18) 66% 67.5%, transparent 67.5%), repeating-linear-gradient(180deg, transparent 0 22%, rgba(255,214,150,0.55) 22% 23%, rgba(60,35,20,0.35) 23% 25%), linear-gradient(180deg, #8a5a36 0%, #6e4426 55%, #4e2f1a 100%)",
  },
];

/** Full-height campaign panels. Real photos from public/editorial replace the illustrations automatically. */
export function EditorialSplit() {
  const { t, locale } = useT();
  return (
    <section aria-label={t.editorial.label} className="grid md:grid-cols-2">
      {SETS.map((set, i) => {
        const products = set.look.products.map(getProduct).filter((p): p is Product => Boolean(p));
        const items = products.map((p, k) => ({
          product: p,
          color: (k === 0 ? p.colors.find((c) => c.hex === set.look.tone) : undefined) ?? p.colors[0],
        }));
        const photo = EDITORIAL_PHOTOS[i];
        return (
          <Link
            key={set.look.id}
            href={`/product/${products[0].slug}`}
            className="group relative block aspect-[4/5] overflow-clip md:aspect-auto md:h-[92svh]"
            style={{ background: set.background }}
          >
            {photo ? (
              <Image
                src={asset(photo)}
                alt={set.look.title[locale]}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="kenburns object-cover"
              />
            ) : (
              <>
                <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(20,10,5,0.45) 100%)" }} />
                <svg viewBox={SHOTS.full} className="absolute inset-x-0 bottom-0 mx-auto h-[92%] w-full transition-transform duration-[1.6s] ease-out group-hover:scale-[1.03]" role="img" aria-label={set.look.title[locale]}>
                  <g className="sway" style={{ animationDelay: `${i * -3}s` }}>
                    <Figure outfit={lookOutfit(items, set.look.id + "-ed")} id={`ed-${i}`} />
                  </g>
                </svg>
              </>
            )}
            <div className="absolute left-6 top-6 md:left-10 md:top-10">
              <Reveal>
                <span className="label text-cream/80">{t.editorial.label}</span>
                <h2 className="mt-2 font-serif text-3xl font-medium text-cream md:text-4xl">{set.look.title[locale]}</h2>
              </Reveal>
            </div>
            <span className="label absolute bottom-6 left-6 inline-flex items-center gap-2 border-b border-cream/70 pb-1 text-cream md:bottom-10 md:left-10">
              {t.editorial.cta} <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        );
      })}
    </section>
  );
}
