"use client";

import Link from "next/link";
import Image from "next/image";
import { useT } from "@/lib/providers";
import { LanguageSwitcher } from "./LanguageSwitcher";

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
      ],
    },
    {
      title: t.footer.care,
      links: [
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
    <footer className="border-t border-line bg-ecru mt-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/brand/meridia-crest-600.jpg"
                alt="MERIDIA crest"
                width={52}
                height={52}
                className="h-13 w-13 rounded-full border border-line object-cover"
              />
              <span className="font-serif text-2xl tracking-[0.22em] text-navy">MERIDIA</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-charcoal/80">{t.footer.blurb}</p>
            <p className="mt-3 font-serif italic text-navy/80">European sensibility. Timeless design. Everyday sophistication.</p>
            <LanguageSwitcher className="mt-8" />
          </div>
          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="label text-navy mb-5 font-sans">{col.title}</h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-sm text-charcoal/80 hover:text-navy transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <ul aria-label={t.footer.payments} className="flex flex-wrap gap-2">
            {PAYMENTS.map((p) => (
              <li
                key={p}
                className="flex h-7 items-center border border-line bg-cream px-2.5 text-[0.56rem] font-semibold tracking-[0.12em] text-navy"
              >
                {p}
              </li>
            ))}
          </ul>
          <p className="text-xs text-taupe">
            © MERIDIA 2026 · {t.footer.rights} <span className="hidden md:inline">·</span>
            <br className="md:hidden" />
            <span className="md:ml-1">{t.footer.concept}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
