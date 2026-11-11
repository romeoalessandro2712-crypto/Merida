"use client";

import { useT } from "@/lib/providers";
import { ButtonLink } from "@/components/ui/Button";
import { ProductImage } from "@/components/product/ProductImage";

export function Hero() {
  const { t } = useT();
  const [line1, line2] = t.hero.title.split("\n");

  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-title">
      {/* Editorial image block — swap `src` for a real campaign photo later */}
      <ProductImage
        alt=""
        tone="#4a3a2e"
        variant={2}
        monogram={false}
        aspect="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]"
        sizes="100vw"
        priority
        className="max-h-[88vh]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/10 to-transparent"
      />
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 pb-10 md:pb-16">
          <div className="max-w-2xl animate-fade-up">
            <span className="label text-cream/90">{t.hero.label}</span>
            <h1 id="hero-title" className="mt-4 font-serif text-[2.6rem] leading-[1.02] text-cream sm:text-6xl lg:text-7xl font-medium">
              {line1}
              <br />
              <span className="italic font-normal">{line2}</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/85">{t.hero.subtitle}</p>
            <ButtonLink href="/shop" variant="light" className="mt-8" size="lg">
              {t.hero.cta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
