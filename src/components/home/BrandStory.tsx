"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/lib/providers";
import { ProductImage } from "@/components/product/ProductImage";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";

export function BrandStory() {
  const { t } = useT();
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-28" aria-labelledby="story-title">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal className="order-2 md:order-1">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/meridia-crest-600.jpg"
              alt="MERIDIA crest"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full border border-line object-cover"
            />
            <span className="label text-taupe">{t.story.label}</span>
          </div>
          <h2 id="story-title" className="mt-6 font-serif text-3xl md:text-[2.75rem] leading-[1.12] text-navy font-medium">
            {t.story.title}
          </h2>
          <p className="mt-6 text-[0.95rem] leading-relaxed text-charcoal/85">{t.story.p1}</p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-charcoal/85">{t.story.p2}</p>
          <Link href="/collections" className="label mt-8 inline-flex items-center gap-2 border-b border-navy pb-1 text-navy">
            {t.story.cta}
            <ArrowIcon />
          </Link>
        </Reveal>
        <Reveal className="order-1 md:order-2" delay={100}>
          <ProductImage alt="" tone="#8c7a66" variant={3} aspect="aspect-[4/5]" sizes="(min-width: 768px) 50vw, 100vw" monogram={false} />
        </Reveal>
      </div>
    </section>
  );
}
