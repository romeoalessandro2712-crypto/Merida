"use client";

import Link from "next/link";
import { useT } from "@/lib/providers";
import { Reveal } from "@/components/ui/Reveal";
import { CrestMedallion } from "@/components/brand/CrestMedallion";
import { Guilloche } from "@/components/brand/Guilloche";
import { ArrowIcon } from "@/components/ui/Icons";

export function QuizPromo() {
  const { t } = useT();
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8 md:pb-24" aria-labelledby="quiz-promo-title">
      <Reveal>
        <Link
          href="/quiz"
          className="grain group relative isolate flex flex-col items-center gap-8 overflow-clip border border-gold/40 bg-navy-deep px-6 py-12 text-center text-cream md:flex-row md:px-14 md:text-left"
        >
          <div className="pointer-events-none absolute -right-[15%] top-1/2 -z-10 w-[700px] -translate-y-1/2 text-gold opacity-[0.14]">
            <Guilloche spin="rev" />
          </div>
          <CrestMedallion size="sm" className="shrink-0" />
          <div className="flex-1">
            <span className="label text-gold-light">{t.quiz.label}</span>
            <h2 id="quiz-promo-title" className="mt-2 font-serif text-3xl font-medium md:text-4xl">
              {t.quiz.promoTitle}
            </h2>
            <p className="mt-2 max-w-lg text-sm text-cream/75">{t.quiz.promoText}</p>
          </div>
          <span className="label inline-flex h-12 shrink-0 items-center gap-3 border border-gold px-7 transition-colors group-hover:bg-gold group-hover:text-navy-deep">
            {t.quiz.start} <ArrowIcon className="transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
