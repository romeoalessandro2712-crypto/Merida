"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { PRODUCTS, type Product } from "@data/products";
import { useT } from "@/lib/providers";
import { cn } from "@/lib/format";
import { ProductImage } from "@/components/product/ProductImage";
import { Price } from "@/components/ui/Price";
import { ArrowIcon } from "@/components/ui/Icons";

const DEFAULT_ITEMS = PRODUCTS;

/**
 * 3D coverflow of best sellers. Auto-rotates, pauses on hover, supports drag/swipe,
 * arrow keys and dots. Clicking a side card brings it to the front; clicking the
 * front card opens the product page.
 */
export function Coverflow({ items: ITEMS = DEFAULT_ITEMS }: { items?: Product[] }) {
  const { t, locale } = useT();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef<number | null>(null);
  const justDragged = useRef(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const n = ITEMS.length;

  const go = useCallback((d: number) => setIndex((i) => (i + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => go(1), 3800);
    return () => window.clearInterval(id);
  }, [paused, go]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        ref={regionRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={t.hero3d.carousel}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
          }
        }}
        onPointerDown={(e) => {
          drag.current = e.clientX;
          justDragged.current = false;
          if (regionRef.current) delete regionRef.current.dataset.noTransition;
          setPaused(true);
        }}
        onPointerUp={(e) => {
          if (drag.current === null) return;
          const dx = e.clientX - drag.current;
          drag.current = null;
          justDragged.current = Math.abs(dx) > 8;
          // A drag must not count as a click on the card (skips the page curtain too).
          if (justDragged.current && regionRef.current) regionRef.current.dataset.noTransition = "";
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          if (e.pointerType !== "mouse") setPaused(false);
        }}
        onPointerCancel={() => {
          drag.current = null;
          setPaused(false);
        }}
        className="relative mx-auto h-[380px] select-none touch-pan-y [perspective:1400px] sm:h-[460px] lg:h-[500px]"
      >
        {ITEMS.map((p, i) => {
          let off = i - index;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const abs = Math.abs(off);
          const hidden = abs > 2;
          const color = p.colors[0];
          return (
            <div
              key={p.id}
              aria-hidden={off !== 0}
              className="absolute left-1/2 top-0 w-[58vw] max-w-[280px] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[280px]"
              style={{
                transform: `translateX(-50%) translateX(${off * 64}%) translateZ(${-abs * 170}px) rotateY(${-off * 34}deg)`,
                opacity: hidden ? 0 : 1 - abs * 0.15,
                zIndex: 10 - abs,
                filter: abs ? `brightness(${1 - abs * 0.2})` : undefined,
                pointerEvents: hidden ? "none" : "auto",
              }}
            >
              <Link
                href={`/product/${p.slug}`}
                tabIndex={off === 0 ? 0 : -1}
                draggable={false}
                data-no-transition={off !== 0 ? "" : undefined}
                onClick={(e) => {
                  if (justDragged.current || off !== 0) {
                    e.preventDefault();
                    if (!justDragged.current) setIndex(i);
                  }
                }}
                className="block bg-cream text-navy shadow-[0_40px_70px_-30px_rgba(0,0,0,0.75)]"
              >
                <ProductImage
                  alt={`${p.name} — ${color.name[locale]}`}
                  tone={color.hex}
                  art={p.art}
                  stripe={color.stripe}
                  monogram={false}
                  src={color.images?.[0]}
                  sizes="280px"
                  priority={i === 0}
                />
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm">{p.name}</p>
                    <Price amount={p.price} className="text-xs text-taupe" />
                  </div>
                  <span className="label inline-flex shrink-0 items-center gap-1 text-[0.58rem]">
                    {t.hero3d.discover} <ArrowIcon />
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          type="button"
          aria-label={t.hero3d.prev}
          onClick={() => go(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 transition-colors hover:bg-cream hover:text-navy"
        >
          <ArrowIcon className="rotate-180" />
        </button>
        <div className="flex items-center">
          {ITEMS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`${i + 1} / ${n} — ${p.name}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="px-1 py-3"
            >
              <span className={cn("block h-1 transition-all duration-500", i === index ? "w-8 bg-cream" : "w-3 bg-cream/35")} />
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label={t.hero3d.next}
          onClick={() => go(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 transition-colors hover:bg-cream hover:text-navy"
        >
          <ArrowIcon />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {ITEMS[index].name}
      </p>
      <p className="label mt-3 text-center text-[0.58rem] text-cream/50">{t.hero3d.hint}</p>
    </div>
  );
}
