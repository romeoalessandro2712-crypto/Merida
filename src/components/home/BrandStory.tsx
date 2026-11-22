"use client";

import Link from "next/link";
import { useT } from "@/lib/providers";
import { ProductImage } from "@/components/product/ProductImage";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import { Aurora } from "@/components/brand/Aurora";
import { Guilloche } from "@/components/brand/Guilloche";
import { CrestMedallion } from "@/components/brand/CrestMedallion";
import { Tilt } from "@/components/ui/Tilt";

export function BrandStory() {
  const { t } = useT();
  return (
    <section aria-labelledby="story-title" className="grain relative isolate overflow-clip bg-navy-deep py-20 text-cream md:py-32">
      <Aurora />
      <div className="pointer-events-none absolute -left-[25vmax] top-1/2 -z-10 w-[75vmax] -translate-y-1/2 text-gold opacity-[0.12]">
        <Guilloche />
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:grid-cols-2 md:gap-20 md:px-8">
        <Reveal className="order-2 md:order-1">
          <CrestMedallion size="md" />
          <span className="label mt-10 block text-gold-light">{t.story.label}</span>
          <h2 id="story-title" className="mt-5 font-serif text-3xl font-medium leading-[1.12] md:text-[2.9rem]">
            {t.story.title}
          </h2>
          <p className="mt-6 text-[0.95rem] leading-relaxed text-cream/75">{t.story.p1}</p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-cream/75">{t.story.p2}</p>
          <Link
            href="/collections"
            className="label mt-9 inline-flex items-center gap-2 border-b border-gold pb-1 text-gold-light transition-colors hover:text-cream"
          >
            {t.story.cta}
            <ArrowIcon />
          </Link>
        </Reveal>
        <Reveal className="order-1 md:order-2" delay={100}>
          <div className="relative">
            <span aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 border border-gold/50 md:translate-x-6 md:translate-y-6" />
            <Tilt max={5}>
              <ProductImage alt="" art="shirt" tone="#f2efe8" stripe="#7f9bb8" variant={3} sizes="(min-width: 768px) 50vw, 100vw" monogram={false} />
            </Tilt>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
