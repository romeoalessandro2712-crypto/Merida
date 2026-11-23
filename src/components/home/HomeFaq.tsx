"use client";

import Link from "next/link";
import { useT } from "@/lib/providers";
import { Accordion } from "@/components/product/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function HomeFaq() {
  const { t } = useT();
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20 md:px-8 md:pb-28" aria-labelledby="home-faq-title">
      <Reveal>
        <SectionHeading title={<span id="home-faq-title">{t.homeFaq.title}</span>} />
        <Accordion
          defaultOpen={null}
          items={t.homeFaq.items.map((it, i) => ({ id: `faq-${i}`, title: it.q, content: <p>{it.a}</p> }))}
        />
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          <Link href="/info/faq" className="label text-navy underline-offset-4 hover:underline">
            {t.footer.faq}
          </Link>
          <Link href="/returns" className="label text-navy underline-offset-4 hover:underline">
            {t.returnsFlow.nav}
          </Link>
          <Link href="/track" className="label text-navy underline-offset-4 hover:underline">
            {t.track.nav}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
