"use client";

import Link from "next/link";
import { useT } from "@/lib/providers";
import { ButtonLink } from "@/components/ui/Button";
import { Coverflow } from "./Coverflow";

export function Hero() {
  const { t } = useT();
  const [line1, line2] = t.hero.title.split("\n");

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-[#2a211b] text-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(70% 60% at 75% 40%, rgba(181,145,106,0.38) 0%, rgba(42,33,27,0) 60%), radial-gradient(60% 55% at 5% 95%, rgba(27,42,68,0.75) 0%, rgba(42,33,27,0) 70%)",
        }}
      />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-12 pt-10 md:px-8 lg:grid-cols-[1fr_1.15fr] lg:py-20">
        <div className="max-w-xl">
          <span className="label animate-fade-up text-cream/80">{t.hero.label}</span>
          <h1 id="hero-title" className="mt-4 font-serif text-[2.6rem] font-medium leading-[1.02] sm:text-6xl lg:text-6xl xl:text-7xl">
            <span className="block animate-fade-up [animation-delay:120ms]">{line1}</span>
            <span className="block animate-fade-up font-normal italic [animation-delay:240ms]">{line2}</span>
          </h1>
          <p className="mt-5 max-w-md animate-fade-up text-sm leading-relaxed text-cream/80 [animation-delay:360ms]">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-6 [animation-delay:480ms]">
            <ButtonLink href="/shop" variant="light" size="lg">
              {t.hero.cta}
            </ButtonLink>
            <Link href="/new-in" className="label border-b border-cream/60 pb-1 transition-colors hover:border-cream">
              {t.nav.newIn}
            </Link>
          </div>
        </div>
        <Coverflow />
      </div>
    </section>
  );
}
