"use client";

import { useState } from "react";
import type { ProductColor } from "@data/products";
import type { ArtKind } from "./garments";
import { ProductImage } from "./ProductImage";
import { cn } from "@/lib/format";
import { useT } from "@/lib/providers";

/** Gallery: real images when `color.images` is set, otherwise 4 tonal variants. */
export function Gallery({ color, name, art }: { color: ProductColor; name: string; art?: ArtKind }) {
  const { t, locale } = useT();
  const slides = color.images?.length ? color.images : [undefined, undefined, undefined, undefined];
  const [active, setActive] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const alt = (i: number) => `${name} — ${color.name[locale]} — ${t.product.gallery} ${i + 1} ${t.product.of} ${slides.length}`;

  return (
    <div className="grid gap-3 lg:grid-cols-[72px_1fr]">
      {/* Thumbnails (desktop) */}
      <ul className="hidden lg:flex lg:flex-col gap-3" aria-label={t.product.gallery}>
        {slides.map((src, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={alt(i)}
              aria-current={active === i}
              className={cn("block w-full border transition-colors", active === i ? "border-navy" : "border-transparent hover:border-line")}
            >
              <ProductImage src={src} alt="" art={art} stripe={color.stripe} tone={color.hex} variant={i} sizes="72px" monogram={false} />
            </button>
          </li>
        ))}
      </ul>

      {/* Main image (desktop) */}
      <div
        className="hidden cursor-zoom-in overflow-hidden lg:block"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseLeave={() => setZoom(null)}
      >
        <div
          key={`${color.id}-${active}`}
          className="img-swap transition-transform duration-300 ease-out"
          style={{
            transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "50% 50%",
            transform: zoom ? "scale(1.6)" : undefined,
          }}
        >
          <ProductImage
            src={slides[active]}
            alt={alt(active)}
            art={art} stripe={color.stripe} tone={color.hex}
            variant={active}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
      </div>

      {/* Mobile: horizontal snap carousel */}
      <div className="lg:hidden -mx-4">
        <ul
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          aria-label={t.product.gallery}
          onScroll={(e) => {
            const el = e.currentTarget;
            setMobileIndex(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
          }}
        >
          {slides.map((src, i) => (
            <li key={i} className="w-full shrink-0 snap-center">
              <ProductImage src={src} alt={alt(i)} art={art} stripe={color.stripe} tone={color.hex} variant={i} sizes="100vw" priority={i === 0} />
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
          {slides.map((_, i) => (
            <span key={i} className={cn("h-1 w-6 transition-colors", i === mobileIndex ? "bg-navy" : "bg-line")} />
          ))}
        </div>
      </div>
    </div>
  );
}
