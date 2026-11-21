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

  // On the home page the header floats transparently over the dark hero until you scroll.
  const onDark = pathname === "/" && !solid;

  const iconBtn = cn(
    "relative inline-flex h-10 w-10 items-center justify-center transition-colors duration-500",
    onDark ? "text-cream hover:text-gold-light" : "text-navy hover:text-chocolate",
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        onDark
          ? "border-cream/10 bg-transparent"
          : solid
            ? "border-line bg-cream/95 backdrop-blur"
            : "border-transparent bg-cream/80 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto grid h-16 md:h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 md:px-8">
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
                    "label border-b py-2 transition-colors duration-500",
                    onDark
                      ? "border-transparent text-cream/85 hover:border-gold hover:text-cream"
                      : active
                        ? "border-navy text-navy"
                        : "border-transparent text-charcoal/80 hover:border-navy hover:text-navy",
                  )}
                >
                  {t.nav[l.key]}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center: wordmark */}
        <Wordmark light={onDark} />

        {/* Right: language + icons */}
        <div className="flex items-center justify-end gap-1 md:gap-2">
          <LanguageSwitcher className="mr-4 hidden lg:flex" light={onDark} />
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
                className={cn(
                  "absolute -right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.6rem] font-medium tabular-nums",
                  onDark ? "bg-gold text-navy-deep" : "bg-navy text-cream",
                )}
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
