"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useT } from "@/lib/providers";
import { useNow, useOrders, type SavedOrder } from "@/lib/engagement";
import { addBusinessDays, deliveryWindow, formatDay } from "@/lib/delivery";
import { cn, formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Ornament } from "@/components/brand/Ornament";

/**
 * Order tracking (demo). Orders live in this browser. The timeline shows the order date
 * and the *estimated* dates of the next steps — it never pretends a parcel has moved.
 */
export function TrackClient() {
  const { t, locale } = useT();
  const params = useSearchParams();
  const orders = useOrders();
  const now = useNow(60_000);
  const [query, setQuery] = useState(params.get("order") ?? "");
  const [searched, setSearched] = useState(params.get("order") ?? "");

  const found = orders.find((o) => o.id.toUpperCase() === searched.trim().toUpperCase());

  function submit(e: FormEvent) {
    e.preventDefault();
    setSearched(query);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:py-20">
      <h1 className="font-serif text-4xl font-medium text-navy md:text-5xl">{t.track.title}</h1>
      <Ornament className="mt-4 justify-start" />
      <p className="mt-4 text-sm text-taupe">{t.track.intro}</p>

      <form onSubmit={submit} className="mt-6 flex gap-2">
        <label htmlFor="track-q" className="sr-only">
          {t.track.title}
        </label>
        <input
          id="track-q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.track.placeholder}
          className="h-12 min-w-0 flex-1 border border-line bg-cream px-3 text-sm uppercase text-navy placeholder:normal-case focus:border-navy focus:outline-none"
        />
        <Button type="submit">{t.track.search}</Button>
      </form>

      {searched && !found && now !== null && <p className="mt-4 text-sm text-[#7a3b41]">{t.track.notFound}</p>}
      {found && <Timeline order={found} />}

      {orders.length > 0 && (
        <div className="mt-12">
          <h2 className="label mb-3 text-navy">{t.track.recent}</h2>
          <ul className="divide-y divide-line border-y border-line">
            {orders.map((o) => (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => {
                    setQuery(o.id);
                    setSearched(o.id);
                  }}
                  className="flex w-full items-center justify-between py-3 text-left text-sm hover:text-chocolate"
                >
                  <span className="font-medium text-navy">{o.id}</span>
                  <span className="text-taupe">
                    {formatDay(new Date(o.placedAt), locale)} · {formatPrice(o.total, locale)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="mt-8 text-xs text-taupe">{t.track.demo}</p>
      <div className="mt-6 flex gap-6">
        <Link href="/returns" className="label text-navy underline-offset-4 hover:underline">
          {t.returnsFlow.nav}
        </Link>
        <Link href="/shop" className="label text-navy underline-offset-4 hover:underline">
          {t.checkout.continue}
        </Link>
      </div>
    </div>
  );
}

function Timeline({ order }: { order: SavedOrder }) {
  const { t, locale } = useT();
  const placed = new Date(order.placedAt);
  const [, deliveredBy] = deliveryWindow(placed, order.express);
  const dates = [placed, placed, addBusinessDays(placed, order.express ? 0 : 1), deliveredBy];
  return (
    <div className="mt-8 border border-gold/40 p-6">
      <p className="font-serif text-2xl text-navy">{order.id}</p>
      <ol className="mt-6 flex flex-col">
        {t.track.status.map((label, i) => {
          const done = i === 0;
          return (
            <li key={label} className="relative flex gap-4 pb-6 last:pb-0">
              {i < 3 && <span aria-hidden="true" className="absolute left-[7px] top-4 h-full w-px bg-line" />}
              <span
                aria-hidden="true"
                className={cn("relative mt-1 h-[15px] w-[15px] shrink-0 rounded-full border-2", done ? "border-gold bg-gold" : "border-line bg-cream")}
              />
              <div>
                <p className={cn("text-sm", done ? "font-medium text-navy" : "text-charcoal/80")}>{label}</p>
                <p className="text-xs text-taupe">
                  {formatDay(dates[i], locale)}
                  {!done && ` · ${t.track.estimated}`}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="mt-6 border-t border-line pt-4">
        <p className="label mb-2 text-navy">{t.track.items}</p>
        <ul className="flex flex-col gap-1 text-xs text-charcoal/80">
          {order.items.map((it, i) => (
            <li key={i}>
              {it.qty} × {it.name} — {it.color}, {it.size === "ONE" ? t.card.oneSize : it.size}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-navy">
          {t.checkout.total}: {formatPrice(order.total, locale)}
        </p>
      </div>
    </div>
  );
}
