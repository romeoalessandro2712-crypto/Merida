"use client";

import { getNewIn } from "@data/products";
import { useT } from "@/lib/providers";
import { Aurora } from "@/components/brand/Aurora";
import { Guilloche } from "@/components/brand/Guilloche";
import { Ornament } from "@/components/brand/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { Coverflow } from "./Coverflow";

const ITEMS = getNewIn();

/** Dark band with the 3D carousel of the season's new pieces. */
export function FeaturedCarousel() {
  const { t } = useT();
  return (
    <section aria-labelledby="featured-title" className="grain relative isolate overflow-hidden bg-[#1e1712] py-20 text-cream md:py-28">
      <Aurora variant="chocolate" />
      <div className="pointer-events-none absolute -right-[30vmax] top-1/2 -z-10 w-[80vmax] -translate-y-1/2 text-gold opacity-[0.1]">
        <Guilloche spin="rev" />
      </div>
      <Reveal className="mb-12 flex flex-col items-center px-4 text-center">
        <span className="label text-gold-light">{t.featured.label}</span>
        <h2 id="featured-title" className="mt-3 font-serif text-4xl font-medium md:text-5xl">
          {t.featured.title}
        </h2>
        <Ornament className="mt-4" />
      </Reveal>
      <div className="mx-auto max-w-5xl px-4">
        <Coverflow items={ITEMS} />
      </div>
    </section>
  );
}
