"use client";

import Link from "next/link";
import { useState } from "react";
import { defaultSize } from "@data/products";
import { useCart, useT, useUI } from "@/lib/providers";
import { buildLook, type Fit, type Occasion, type Palette } from "@/lib/quiz";
import { bundleRate, pct } from "@/lib/pricing";
import { formatPrice, cn } from "@/lib/format";
import { flyToCart } from "@/lib/fly-to-cart";
import { ProductImage } from "@/components/product/ProductImage";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/brand/Aurora";
import { Guilloche } from "@/components/brand/Guilloche";
import { CrestMedallion } from "@/components/brand/CrestMedallion";
import { Ornament } from "@/components/brand/Ornament";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icons";

type Answers = { occasion?: Occasion; palette?: Palette; fit?: Fit };

const SWATCHES: Record<Palette, string[]> = {
  navy: ["#1b2a44", "#7f9bb8", "#f2efe8"],
  earth: ["#d3c3a4", "#ece4d3", "#7a5236"],
  green: ["#6b705c", "#3c4a3e", "#ece4d3"],
};

export function QuizClient() {
  const { t, locale } = useT();
  const { add } = useCart();
  const { notify, open } = useUI();
  const [step, setStep] = useState(0); // 0 = intro, 1-3 = questions, 4 = result
  const [a, setA] = useState<Answers>({});
  const [added, setAdded] = useState(false);

  const questions = [
    { key: "occasion" as const, q: t.quiz.q1, options: (["office", "weekend", "evening"] as const).map((v) => ({ v, label: t.quiz[v] })) },
    { key: "palette" as const, q: t.quiz.q2, options: (["navy", "earth", "green"] as const).map((v) => ({ v, label: t.quiz[v] })) },
    { key: "fit" as const, q: t.quiz.q3, options: (["classic", "relaxed"] as const).map((v) => ({ v, label: t.quiz[v] })) },
  ];

  const look = step === 4 && a.occasion && a.palette && a.fit ? buildLook(a.occasion, a.palette, a.fit) : [];
  const sum = look.reduce((n, i) => n + i.product.price, 0);
  const rate = bundleRate(look.length);
  const final = Math.round(sum * (1 - rate) * 100) / 100;

  function choose(key: keyof Answers, v: string) {
    setA((prev) => ({ ...prev, [key]: v }));
    setStep((s) => s + 1);
    window.scrollTo({ top: 0 });
  }

  function addLook(source: Element) {
    for (const i of look) add(i.product.id, i.colorId, defaultSize(i.product));
    flyToCart(source, look[0].product.colors.find((c) => c.id === look[0].colorId)?.hex ?? "#1b2a44");
    setAdded(true);
    notify(t.quiz.added);
    window.setTimeout(() => open("cart"), 800);
  }

  return (
    <section className="grain relative isolate -mb-24 min-h-[85svh] overflow-clip bg-navy-deep pb-24 text-cream">
      <Aurora />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[130vmax] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.1]">
        <Guilloche />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
        {step > 0 && step < 4 && (
          <div className="mb-10 flex items-center justify-between">
            <button type="button" onClick={() => setStep((s) => s - 1)} className="label inline-flex items-center gap-2 text-cream/70 hover:text-cream">
              <ArrowIcon className="rotate-180" /> {t.quiz.back}
            </button>
            <span className="label text-gold-light">{t.quiz.step.replace("{n}", String(step))}</span>
            <div className="flex gap-1.5" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <span key={n} className={cn("h-1 w-8 transition-colors", n <= step ? "bg-gold" : "bg-cream/20")} />
              ))}
            </div>
          </div>
        )}

        <div key={step} className="img-swap">
          {step === 0 && (
            <div className="flex flex-col items-center text-center">
              <CrestMedallion size="md" />
              <span className="label mt-10 text-gold-light">{t.quiz.label}</span>
              <h1 className="mt-3 font-serif text-4xl font-medium md:text-6xl">{t.quiz.title}</h1>
              <Ornament className="mt-5" />
              <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/75">{t.quiz.intro}</p>
              <Button variant="light" size="lg" className="mt-9" onClick={() => setStep(1)}>
                {t.quiz.start}
              </Button>
            </div>
          )}

          {step >= 1 && step <= 3 && (() => {
            const q = questions[step - 1];
            return (
              <fieldset>
                <legend className="mx-auto max-w-2xl text-center font-serif text-3xl font-medium md:text-5xl">{q.q}</legend>
                <div className={cn("mt-10 grid gap-4", q.options.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
                  {q.options.map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => choose(q.key, o.v)}
                      aria-pressed={a[q.key] === o.v}
                      className={cn(
                        "group flex min-h-36 flex-col items-center justify-center gap-4 border px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-cream/5",
                        a[q.key] === o.v ? "border-gold bg-cream/10" : "border-cream/20",
                      )}
                    >
                      {q.key === "palette" && (
                        <span className="flex -space-x-2" aria-hidden="true">
                          {SWATCHES[o.v as Palette].map((h) => (
                            <span key={h} className="h-9 w-9 rounded-full border-2 border-navy-deep" style={{ backgroundColor: h }} />
                          ))}
                        </span>
                      )}
                      <span className="font-serif text-2xl">{o.label}</span>
                      <span className="label text-[0.58rem] text-gold-light opacity-0 transition-opacity group-hover:opacity-100">
                        <ArrowIcon />
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            );
          })()}

          {step === 4 && (
            <div>
              <div className="text-center">
                <span className="label text-gold-light">{t.quiz.resultLabel}</span>
                <h1 className="mt-3 font-serif text-4xl font-medium md:text-6xl">{t.quiz.resultTitle}</h1>
                <Ornament className="mt-5" />
              </div>
              <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
                {look.map((i, n) => {
                  const c = i.product.colors.find((x) => x.id === i.colorId) ?? i.product.colors[0];
                  return (
                    <li key={i.product.id} className="card-in" style={{ animationDelay: `${n * 90}ms` }}>
                      <Link href={`/product/${i.product.slug}`} className="group block">
                        <div className="overflow-hidden border border-gold/30">
                          <ProductImage alt={`${i.product.name} — ${c.name[locale]}`} art={i.product.art} stripe={c.stripe} tone={c.hex} src={c.images?.[0]} sizes="25vw" className="transition-transform duration-700 group-hover:scale-[1.04]" />
                        </div>
                        <p className="mt-3 text-sm">{i.product.name}</p>
                        <p className="text-xs text-cream/60">
                          {c.name[locale]} · {formatPrice(i.product.price, locale)}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-10 flex flex-col items-center gap-2 border-t border-cream/15 pt-8 text-center">
                <p className="text-sm text-cream/70">
                  {t.quiz.total}: <s>{formatPrice(sum, locale)}</s>
                </p>
                <p className="font-serif text-4xl">
                  {formatPrice(final, locale)} <span className="label align-middle text-xs text-gold-light">-{pct(rate)}</span>
                </p>
                <p className="text-xs text-cream/60">{t.quiz.withBundle}</p>
                <Button variant="light" size="lg" className="mt-6" onClick={(e) => addLook(e.currentTarget)}>
                  {added ? (
                    <>
                      <CheckIcon /> {t.quiz.added}
                    </>
                  ) : (
                    t.quiz.addLook
                  )}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setA({});
                    setAdded(false);
                    setStep(1);
                  }}
                  className="label mt-4 text-cream/60 hover:text-cream"
                >
                  {t.quiz.retake}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
