"use client";

import { useState } from "react";
import type { Product, Size } from "@data/products";
import { useT } from "@/lib/providers";
import { recommendSize, SIZE_ORDER } from "@/lib/fit";
import { cn } from "@/lib/format";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";

/** Size guide drawer: fit scale, a size finder that recommends a size, measurements (cm/in) and how to measure. */
export function SizeGuide({
  product,
  open,
  onClose,
  onSelect,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
  onSelect: (s: Size) => void;
}) {
  const { t, locale } = useT();
  const g = t.sizeGuide;
  const [height, setHeight] = useState(180);
  const [usual, setUsual] = useState<Size | null>(null);
  const [pref, setPref] = useState<-1 | 0 | 1>(0);
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const rec = recommendSize(product, height, usual, pref);
  const conv = (n: number) => (unit === "cm" ? n : Math.round((n / 2.54) * 10) / 10);

  return (
    <Drawer id="drawer-size-guide" open={open} onClose={onClose} title={g.title} closeLabel={t.header.close}>
      <div className="flex flex-col gap-8">
        {/* Fit scale */}
        <section>
          <h3 className="label mb-3 text-navy">{g.fit}</h3>
          <div className="relative grid grid-cols-3 text-center text-[0.7rem] text-taupe">
            <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-2 h-px bg-line" />
            {g.fits.map((f, i) => (
              <span key={f} className="relative flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "h-4 w-4 rounded-full border-2",
                    i === product.fit ? "border-navy bg-gold" : "border-line bg-cream",
                  )}
                />
                <span className={i === product.fit ? "font-medium text-navy" : ""}>{f}</span>
              </span>
            ))}
          </div>
          {product.model && <p className="mt-3 text-xs text-charcoal/80">{product.model[locale]}</p>}
        </section>

        {/* Size finder */}
        <section className="border border-gold/40 bg-ecru/60 p-4">
          <h3 className="font-serif text-2xl text-navy">{g.finder}</h3>
          <label className="mt-4 block text-xs text-charcoal/80">
            {g.height}: <strong className="text-navy tabular-nums">{height} cm</strong>
            <input
              type="range"
              min={155}
              max={205}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </label>
          <p className="mt-4 text-xs text-charcoal/80">{g.usual}</p>
          <div className="mt-2 flex flex-wrap gap-1.5" role="radiogroup" aria-label={g.usual}>
            {[null, ...SIZE_ORDER].map((s) => (
              <button
                key={s ?? "any"}
                type="button"
                role="radio"
                aria-checked={usual === s}
                onClick={() => setUsual(s)}
                className={cn(
                  "h-8 min-w-9 border px-2 text-[0.68rem] transition-colors",
                  usual === s ? "border-navy bg-navy text-cream" : "border-line bg-cream text-navy hover:border-navy",
                )}
              >
                {s ?? g.usualAny}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-charcoal/80">{g.prefer}</p>
          <div className="mt-2 grid grid-cols-3 gap-1.5" role="radiogroup" aria-label={g.prefer}>
            {([-1, 0, 1] as const).map((v, i) => (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={pref === v}
                onClick={() => setPref(v)}
                className={cn(
                  "h-9 border px-1 text-[0.66rem] transition-colors",
                  pref === v ? "border-navy bg-navy text-cream" : "border-line bg-cream text-navy hover:border-navy",
                )}
              >
                {g.prefs[i]}
              </button>
            ))}
          </div>
          {rec && (
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4" aria-live="polite">
              <p className="text-sm text-navy">
                {g.result} <strong className="font-serif text-3xl align-middle">{rec}</strong>
              </p>
              <Button
                size="sm"
                onClick={() => {
                  onSelect(rec);
                  onClose();
                }}
              >
                {g.select} {rec}
              </Button>
            </div>
          )}
        </section>

        {/* Measurements */}
        {product.measurements && (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="label text-navy">{g.measurements}</h3>
              <div className="flex border border-line" role="group" aria-label="Unit">
                {(["cm", "in"] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    aria-pressed={unit === u}
                    onClick={() => setUnit(u)}
                    className={cn("px-3 py-1 text-[0.66rem] uppercase", unit === u ? "bg-navy text-cream" : "text-navy")}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <table className="w-full text-center text-xs tabular-nums">
              <thead>
                <tr className="border-b border-line text-taupe">
                  <th className="py-2 text-left font-normal"> </th>
                  <th className="py-2 font-normal">{g.chest}</th>
                  <th className="py-2 font-normal">{g.length}</th>
                  <th className="py-2 font-normal">{g.sleeve}</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_ORDER.filter((s) => product.measurements?.[s]).map((s) => {
                  const m = product.measurements![s]!;
                  return (
                    <tr key={s} className={cn("border-b border-line", rec === s && "bg-gold/15 font-medium text-navy")}>
                      <td className="py-2 text-left font-medium text-navy">{s}</td>
                      <td>{conv(m.chest)}</td>
                      <td>{conv(m.length)}</td>
                      <td>{conv(m.sleeve)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="mt-2 text-[0.68rem] text-taupe">{g.note}</p>
          </section>
        )}

        <section>
          <h3 className="label mb-3 text-navy">{g.how}</h3>
          <ul className="flex flex-col gap-1.5 text-xs text-charcoal/80">
            <li>{g.howChest}</li>
            <li>{g.howLength}</li>
            <li>{g.howSleeve}</li>
          </ul>
          <p className="mt-3 text-xs italic text-taupe">{g.tip}</p>
        </section>
      </div>
    </Drawer>
  );
}
