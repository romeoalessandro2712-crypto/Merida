"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/providers";
import { Guilloche } from "@/components/brand/Guilloche";
import { Ornament } from "@/components/brand/Ornament";

/** Three short lines that rise in word by word when the section scrolls into view. */
export function Manifesto() {
  const { t } = useT();
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let w = 0;
  return (
    <section ref={ref} aria-labelledby="manifesto-title" className="relative isolate overflow-clip py-24 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[110vmax] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.08]">
        <Guilloche spin="rev" />
      </div>
      <div className="mx-auto max-w-4xl px-4 text-center">
        <span className="label text-taupe">{t.manifesto.label}</span>
        <h2 id="manifesto-title" className="mt-6 font-serif text-5xl font-medium leading-[1.08] text-navy md:text-7xl">
          {t.manifesto.lines.map((line, li) => (
            <span key={line} className={li === 1 ? "block italic text-chocolate" : "block"}>
              {line.split(" ").map((word) => {
                const delay = (w++) * 110;
                return (
                  <span key={word + delay} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <span
                      className="inline-block transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                      style={{
                        transform: shown ? "none" : "translateY(105%)",
                        opacity: shown ? 1 : 0,
                        transitionDelay: `${delay}ms`,
                      }}
                    >
                      {word}&nbsp;
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h2>
        <Ornament className="mt-8" />
        <p
          className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-charcoal/80 transition-opacity duration-1000"
          style={{ opacity: shown ? 1 : 0, transitionDelay: "900ms" }}
        >
          {t.manifesto.text}
        </p>
      </div>
    </section>
  );
}
