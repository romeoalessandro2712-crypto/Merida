"use client";

import { useState, type FormEvent } from "react";
import { useT } from "@/lib/providers";
import { useOrders } from "@/lib/engagement";
import { cn } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Ornament } from "@/components/brand/Ornament";
import { CheckIcon } from "@/components/ui/Icons";

function returnCode(orderId: string) {
  return `R-${orderId.replace(/[^A-Z0-9]/gi, "").slice(-6).toUpperCase()}`;
}

/** Online return request: pick an order and items, get a free label code straight away (demo). */
export function ReturnsClient() {
  const { t } = useT();
  const r = t.returnsFlow;
  const orders = useOrders();
  const [orderId, setOrderId] = useState("");
  const [picked, setPicked] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const order = orders.find((o) => o.id === orderId);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!orderId.trim()) return setError(t.checkout.required);
    if (order && picked.length === 0) return setError(r.pickOne);
    setError(null);
    setDone(returnCode(orderId));
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center animate-fade-up">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy-deep">
          <CheckIcon width={24} height={24} />
        </span>
        <h1 className="mt-6 font-serif text-4xl font-medium text-navy">{r.doneTitle}</h1>
        <p className="mt-4 text-sm leading-relaxed text-charcoal/80">{r.doneText.replace("{code}", done)}</p>
        <ol className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3 text-xs text-navy">
          {r.steps.map((s, i) => (
            <li key={s} className="border border-gold/50 p-3">
              <span className="block font-serif text-2xl text-gold">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs text-taupe">{r.demo}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:py-20">
      <h1 className="font-serif text-4xl font-medium text-navy md:text-5xl">{r.title}</h1>
      <Ornament className="mt-4 justify-start" />
      <p className="mt-4 text-sm text-taupe">{r.intro}</p>

      <form onSubmit={submit} noValidate className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ret-order" className="label text-navy">
            {r.order}
          </label>
          {orders.length > 0 ? (
            <select
              id="ret-order"
              value={orderId}
              onChange={(e) => {
                setOrderId(e.target.value);
                setPicked([]);
              }}
              className="h-12 border border-line bg-cream px-3 text-sm text-navy focus:border-navy focus:outline-none"
            >
              <option value="">{r.choose}</option>
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.id}
                </option>
              ))}
            </select>
          ) : (
            <>
              <input
                id="ret-order"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder={t.track.placeholder}
                className="h-12 border border-line bg-cream px-3 text-sm uppercase text-navy placeholder:normal-case focus:border-navy focus:outline-none"
              />
              <p className="text-xs text-taupe">{r.none}</p>
            </>
          )}
        </div>

        {order && (
          <fieldset>
            <legend className="label mb-3 text-navy">{r.items}</legend>
            <div className="flex flex-col divide-y divide-line border-y border-line">
              {order.items.map((it, i) => {
                const on = picked.includes(i);
                return (
                  <label key={i} className={cn("flex cursor-pointer items-center gap-3 py-3 text-sm", on ? "text-navy" : "text-charcoal/80")}>
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => setPicked((p) => (on ? p.filter((x) => x !== i) : [...p, i]))}
                      className="accent-navy"
                    />
                    {it.qty} × {it.name} — {it.color}, {it.size === "ONE" ? t.card.oneSize : it.size}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="ret-reason" className="label text-navy">
            {r.reason}
          </label>
          <select id="ret-reason" className="h-12 border border-line bg-cream px-3 text-sm text-navy focus:border-navy focus:outline-none">
            <option value="">—</option>
            {r.reasons.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal/80">
          <input type="checkbox" className="accent-navy" />
          {r.exchange}
        </label>

        {error && (
          <p className="text-xs text-[#7a3b41]" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" size="lg">
          {r.submit}
        </Button>
        <p className="text-xs text-taupe">{r.demo}</p>
      </form>
    </div>
  );
}
