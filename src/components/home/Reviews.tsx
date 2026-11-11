"use client";

import { useT } from "@/lib/providers";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { StarIcon } from "@/components/ui/Icons";

/**
 * Placeholder reviews. Deliberately generic: no real names, no counts, no ratings aggregate.
 * Replace `PLACEHOLDER_REVIEWS` with real, consented reviews when available.
 */
const PLACEHOLDER_REVIEWS = [
  { id: "r1", it: "Testo di una recensione segnaposto. Qui apparirà il commento di un cliente reale.", en: "Placeholder review text. A real customer's comment will appear here." },
  { id: "r2", it: "Testo di una recensione segnaposto sulla vestibilità e sui materiali.", en: "Placeholder review text about fit and materials." },
  { id: "r3", it: "Testo di una recensione segnaposto sulla spedizione e sul servizio clienti.", en: "Placeholder review text about shipping and customer service." },
];

export function Reviews() {
  const { t, locale } = useT();
  return (
    <section className="border-y border-line bg-ecru/60 py-16 md:py-24" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <SectionHeading title={<span id="reviews-title">{t.reviews.title}</span>} subtitle={t.reviews.subtitle} />
        </Reveal>
        <ul className="grid gap-5 md:grid-cols-3">
          {PLACEHOLDER_REVIEWS.map((r, i) => (
            <Reveal as="li" key={r.id} delay={i * 80} className="flex flex-col border border-line bg-cream p-7">
              <span className="label text-olive text-[0.6rem]">{t.reviews.placeholderTag}</span>
              <div aria-hidden="true" className="mt-4 flex gap-0.5 text-sand-dark">
                {Array.from({ length: 5 }).map((_, s) => (
                  <StarIcon key={s} />
                ))}
              </div>
              <p className="mt-4 font-serif text-xl leading-snug text-navy">“{r[locale]}”</p>
              <div className="mt-auto pt-6 border-t border-line mt-6">
                <p className="text-sm text-navy">{t.reviews.author}</p>
                <p className="text-xs text-taupe mt-0.5">{t.reviews.verified}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
