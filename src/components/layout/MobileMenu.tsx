"use client";

import Link from "next/link";
import { useT, useUI, useWishlist } from "@/lib/providers";
import { Drawer } from "@/components/ui/Drawer";
import { CATEGORIES } from "@data/products";
import { NAV_LINKS } from "./Header";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ArrowIcon } from "@/components/ui/Icons";

export function MobileMenu() {
  const { t, locale } = useT();
  const { drawer, close, open } = useUI();
  const { ids } = useWishlist();

  return (
    <Drawer id="drawer-menu" open={drawer === "menu"} onClose={close} side="left" title="MERIDIA" closeLabel={t.header.close}>
      <nav aria-label="Mobile" className="flex flex-col">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={close}
            className="flex items-center justify-between border-b border-line py-4 font-serif text-2xl text-navy"
          >
            {t.nav[l.key]}
            <ArrowIcon className="text-taupe" />
          </Link>
        ))}
        <Link
          href="/quiz"
          onClick={close}
          className="mt-6 flex items-center justify-between border border-gold/60 bg-navy-deep px-4 py-4 text-cream"
        >
          <span className="font-serif text-xl">{t.quiz.nav}</span>
          <ArrowIcon className="text-gold" />
        </Link>
        <div className="mt-6">
          <p className="label text-taupe mb-3">{t.shop.category}</p>
          <ul className="flex flex-col">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/${c.slug}`} onClick={close} className="block py-2 text-sm text-charcoal hover:text-navy">
                  {c.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={() => open("wishlist")}
          className="mt-8 flex items-center justify-between border-t border-line pt-5 text-sm text-navy"
        >
          {t.header.wishlist}
          {ids.length > 0 && <span className="label text-taupe">{ids.length}</span>}
        </button>
        <LanguageSwitcher className="mt-6" />
      </nav>
    </Drawer>
  );
}
