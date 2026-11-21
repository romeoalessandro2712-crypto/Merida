"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useT } from "@/lib/providers";
import { ProductImage } from "@/components/product/ProductImage";
import { Guilloche } from "@/components/brand/Guilloche";
import { CrestMedallion } from "@/components/brand/CrestMedallion";

/**
 * Scroll-driven campaign moment: a framed image opens up to full screen as you scroll,
 * then the headline rises in. Progress lives in the CSS variable --p (0 → 1).
 * Swap the ProductImage `src` for a campaign photo later.
 */
export function ScrollZoom() {
  const { t } = useT();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // e = how far the frame has opened (0 → 1 over the first 60% of the scroll)
  const e = "min(1, calc(var(--p, 0) * 1.7))";
  const text = "clamp(0, calc((var(--p, 0) - 0.4) * 3), 1)";

  return (
    <section ref={ref} aria-labelledby="campaign-title" className="relative h-[230vh] bg-cream" style={{ ["--p" as string]: 0 }}>
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(calc((1 - ${e}) * 14%) calc((1 - ${e}) * 22%) round calc((1 - ${e}) * 28px))` }}
        >
          <div className="absolute inset-0" style={{ transform: `scale(calc(1.3 - ${e} * 0.3))` }}>
            <ProductImage alt="" tone="#1b2a44" variant={2} aspect="h-full" sizes="100vw" monogram={false} className="h-full" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#4a3326]/60 via-transparent to-navy-deep/80" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 w-[130vmax] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.16]">
              <Guilloche />
            </div>
          </div>
        </div>

        <div
          className="relative z-10 flex flex-col items-center px-6 text-center text-cream"
          style={{ opacity: text, transform: `translateY(calc((1 - ${text}) * 40px))` }}
        >
          <CrestMedallion size="md" />
          <span className="label mt-10 text-gold-light">{t.campaign.label}</span>
          <h2 id="campaign-title" className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-[1.05] md:text-6xl">
            {t.campaign.title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80">{t.campaign.text}</p>
          <Link
            href="/collections"
            className="label mt-8 inline-flex h-12 items-center border border-gold/70 px-8 transition-colors hover:bg-gold hover:text-navy-deep"
          >
            {t.campaign.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
