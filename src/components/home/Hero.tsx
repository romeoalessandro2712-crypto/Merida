"use client";

import Link from "next/link";
import { useRef } from "react";
import { useT } from "@/lib/providers";
import { ButtonLink } from "@/components/ui/Button";
import { Aurora } from "@/components/brand/Aurora";
import { Guilloche } from "@/components/brand/Guilloche";
import { CrestMedallion } from "@/components/brand/CrestMedallion";
import { smoothScrollTo } from "@/lib/smooth-scroll";

/** Full-screen cinematic opening: animated light, a rotating dial pattern and the crest at the centre. */
export function Hero() {
  const { t } = useT();
  const ref = useRef<HTMLElement>(null);
  const [line1, line2] = t.hero.title.split("\n");

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="grain relative isolate -mt-[65px] flex min-h-[100svh] items-center justify-center overflow-clip bg-navy-deep text-cream md:-mt-[81px]"
    >
      <Aurora />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[150vmax] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.13] md:w-[110vmax]">
        <Guilloche />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse at center, rgba(18,28,48,0) 30%, rgba(10,15,28,0.75) 100%)" }}
      />

      <div className="relative flex flex-col items-center px-4 pb-28 pt-32 text-center md:pt-36">
        <CrestMedallion size="lg" rotatingText priority className="crest-in" />

        <span className="label mt-20 animate-fade-up text-gold-light [animation-delay:500ms] md:mt-24">{t.hero.label}</span>
        <h1
          id="hero-title"
          className="mt-4 max-w-4xl font-serif text-[2.4rem] font-medium leading-[1.05] sm:text-5xl lg:text-[4.2rem]"
        >
          <span className="block animate-fade-up [animation-delay:650ms]">{line1}</span>
          <span className="block animate-fade-up font-normal italic text-gold-light [animation-delay:800ms]">{line2}</span>
        </h1>
        <p className="mt-5 max-w-md animate-fade-up text-sm leading-relaxed text-cream/75 [animation-delay:950ms]">
          {t.hero.subtitle}
        </p>
        <div className="mt-9 flex animate-fade-up flex-wrap items-center justify-center gap-4 [animation-delay:1100ms]">
          <ButtonLink href="/shop" variant="light" size="lg">
            {t.hero.cta}
          </ButtonLink>
          <Link
            href="/new-in"
            className="label inline-flex h-14 items-center border border-gold/60 px-8 text-cream transition-colors hover:border-gold hover:bg-gold hover:text-navy-deep"
          >
            {t.nav.newIn}
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          const el = ref.current;
          if (el) smoothScrollTo(el.offsetTop + el.offsetHeight - 64);
        }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-cream/70 transition-colors hover:text-cream"
      >
        <span className="label text-[0.58rem]">{t.scroll}</span>
        <span className="relative h-10 w-px overflow-hidden bg-cream/15">
          <span className="cue-line absolute inset-0 bg-gold" />
        </span>
      </button>
    </section>
  );
}
