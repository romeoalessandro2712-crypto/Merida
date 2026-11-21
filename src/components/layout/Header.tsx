"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart, useT, useUI, useWishlist } from "@/lib/providers";
import { cn } from "@/lib/format";
import { BagIcon, HeartIcon, MenuIcon, SearchIcon } from "@/components/ui/Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Wordmark } from "./Wordmark";

export const NAV_LINKS = [
  { href: "/shop", key: "shop" },
  { href: "/new-in", key: "newIn" },
  { href: "/best-sellers", key: "bestSellers" },
  { href: "/collections", key: "collections" },
] as const;

export function Header() {
  const { t } = useT();
  const { count, hydrated } = useCart();
  const { ids } = useWishlist();
  const { open } = useUI();
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const iconBtn =
    "relative inline-flex h-10 w-10 items-center justify-center text-navy transition-colors hover:text-chocolate";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 border-b",
        solid ? "bg-cream/95 backdrop-blur border-line" : "bg-cream/70 backdrop-blur-sm border-transparent",
      )}
    >
      <div className="mx-auto grid h-16 md:h-[4.5rem] max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 md:px-8">
        {/* Left: nav (desktop) / hamburger (mobile) */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => open("menu")}
            aria-label={t.header.menu}
            aria-haspopup="dialog"
            aria-controls="drawer-menu"
            className={cn(iconBtn, "-ml-2 lg:hidden")}
          >
            <MenuIcon />
          </button>
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "label py-2 transition-colors border-b border-transparent hover:border-navy",
                    active ? "text-navy border-navy" : "text-charcoal/80 hover:text-navy",
                  )}
                >
                  {t.nav[l.key]}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center: wordmark */}
        <Wordmark />

        {/* Right: language + icons */}
        <div className="flex items-center justify-end gap-1 md:gap-2">
          <LanguageSwitcher className="hidden lg:flex mr-4" />
          <button
            type="button"
            onClick={() => open("search")}
            aria-label={t.header.search}
            aria-haspopup="dialog"
            aria-controls="drawer-search"
            className={iconBtn}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            onClick={() => open("wishlist")}
            aria-label={`${t.header.wishlist}${ids.length ? ` (${ids.length})` : ""}`}
            aria-haspopup="dialog"
            aria-controls="drawer-wishlist"
            className={cn(iconBtn, "max-sm:hidden")}
          >
            <HeartIcon filled={ids.length > 0} />
          </button>
          <button
            type="button"
            onClick={() => open("cart")}
            aria-label={`${t.header.cart}${count ? ` (${count})` : ""}`}
            aria-haspopup="dialog"
            aria-controls="drawer-cart"
            data-cart-icon
            className={cn(iconBtn, "-mr-2")}
          >
            <BagIcon />
            {hydrated && count > 0 && (
              <span
                aria-hidden="true"
                className="absolute -right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-navy px-1 text-[0.6rem] font-medium text-cream tabular-nums"
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
