"use client";

import Link from "next/link";
import { useT } from "@/lib/providers";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CrestMedallion } from "@/components/brand/CrestMedallion";
import { Guilloche } from "@/components/brand/Guilloche";
import { Ornament } from "@/components/brand/Ornament";

const PAYMENTS = ["VISA", "MASTERCARD", "AMEX", "PAYPAL", "APPLE PAY", "KLARNA"];

export function Footer() {
  const { t } = useT();

  const cols = [
    {
      title: t.footer.navigation,
      links: [
        { href: "/shop", label: t.nav.shop },
        { href: "/new-in", label: t.nav.newIn },
        { href: "/best-sellers", label: t.nav.bestSellers },
        { href: "/collections", label: t.nav.collections },
        { href: "/quiz", label: t.quiz.nav },
      ],
    },
    {
      title: t.footer.care,
      links: [
        { href: "/track", label: t.track.nav },
        { href: "/returns", label: t.returnsFlow.nav },
        { href: "/info/contact", label: t.footer.contact },
        { href: "/info/faq", label: t.footer.faq },
        { href: "/info/shipping", label: t.footer.shipping },
        { href: "/info/returns", label: t.footer.returns },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { href: "/info/terms", label: t.footer.terms },
        { href: "/info/privacy", label: t.footer.privacy },
        { href: "/info/refunds", label: t.footer.refunds },
      ],
    },
  ];

  return (
    <footer className="grain relative mt-24 isolate overflow-clip border-t border-gold/30 bg-navy-deep text-cream">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 w-[90vmax] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.08]">
        <Guilloche spin="rev" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 md:px-8">
        <div className="flex flex-col items-center text-center">
          <CrestMedallion size="md" />
          <p className="mt-10 font-serif text-3xl tracking-[0.3em] md:text-4xl">MERIDIA</p>
          <Ornament className="mt-4" />
          <p className="mt-4 font-serif text-lg italic text-gold-light">
            European sensibility. Timeless design. Everyday sophistication.
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/65">{t.footer.blurb}</p>
        </div>

        <div className="mt-16 grid gap-10 border-t border-cream/10 pt-12 sm:grid-cols-3">
          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title} className="text-center sm:text-left">
              <h3 className="label mb-5 font-sans text-gold-light">{col.title}</h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-sm text-cream/70 transition-colors hover:text-cream">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-6 border-t border-cream/10 pt-8 md:flex-row md:justify-between">
          <LanguageSwitcher light />
          <ul aria-label={t.footer.payments} className="flex flex-wrap justify-center gap-2">
            {PAYMENTS.map((p) => (
              <li
                key={p}
                className="flex h-7 items-center border border-cream/20 px-2.5 text-[0.56rem] font-semibold tracking-[0.12em] text-cream/80"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-center text-xs text-cream/45">
          © MERIDIA 2026 · {t.footer.rights} · {t.footer.concept}
        </p>
      </div>
    </footer>
  );
}
