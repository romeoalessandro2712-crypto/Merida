"use client";

import Link from "next/link";
import { useMemo } from "react";
import { FREE_SHIPPING_THRESHOLD, defaultSize, getRelatedProducts } from "@data/products";
import { useCart, useT, useUI } from "@/lib/providers";
import { Drawer } from "@/components/ui/Drawer";
import { ProductImage } from "@/components/product/ProductImage";
import { Price } from "@/components/ui/Price";
import { Button, ButtonLink } from "@/components/ui/Button";
import { MinusIcon, PlusIcon } from "@/components/ui/Icons";
import { CartRewards } from "./CartRewards";
import { computeTotals, pct } from "@/lib/pricing";
import { useReward } from "@/lib/engagement";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { t, locale } = useT();
  const { drawer, close } = useUI();
  const { lines, subtotal, count, setQty, remove, add } = useCart();
  const { reward, active } = useReward();
  const totals = computeTotals(subtotal, count, active ? reward?.code : null);

  // Suggest pieces that go with the last item, cheapest-that-unlocks-free-shipping first.
  const suggestions = useMemo(() => {
    if (!lines.length) return [];
    const inCart = new Set(lines.map((l) => l.productId));
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    const pool = getRelatedProducts(lines[lines.length - 1].product, 12).filter((p) => !inCart.has(p.id));
    const sorted =
      remaining > 0
        ? [...pool].sort((a, b) => Number(a.price < remaining) - Number(b.price < remaining) || a.price - b.price)
        : pool;
    return sorted.slice(0, 3);
  }, [lines, subtotal]);

  return (
    <Drawer
      id="drawer-cart"
      open={drawer === "cart"}
      onClose={close}
      title={
        <>
          {t.cart.title}
          {count > 0 && <span className="ml-2 font-sans text-xs text-taupe tracking-wide">({count})</span>}
        </>
      }
      closeLabel={t.header.close}
      footer={
        lines.length > 0 ? (
          <div>
            <dl className="mb-2 flex flex-col gap-1 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-charcoal/80">{t.cart.subtotal}</dt>
                <dd className="tabular-nums">{formatPrice(subtotal, locale)}</dd>
              </div>
              {totals.discount > 0 && (
                <div className="flex items-center justify-between text-olive">
                  <dt>
                    {totals.source === "coupon" ? `${t.tiers.codeLine} ${reward?.code}` : t.tiers.bundleLine} (-{pct(totals.rate)})
                  </dt>
                  <dd className="tabular-nums">−{formatPrice(totals.discount, locale)}</dd>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-line pt-2">
                <dt className="label text-navy">{t.tiers.estimate}</dt>
                <dd className="font-serif text-2xl tabular-nums text-navy">{formatPrice(totals.subtotal - totals.discount, locale)}</dd>
              </div>
            </dl>
            <p className="text-xs text-taupe">{t.cart.shippingNote}</p>
            {totals.discount > 0 && (
              <p className="mt-1 text-xs font-medium text-olive">
                {t.tiers.saved} {formatPrice(totals.discount, locale)}
              </p>
            )}
            <div className="mb-4" />
            <ButtonLink href="/checkout" className="w-full" size="lg" onClick={close}>
              {t.cart.checkout}
            </ButtonLink>
          </div>
        ) : undefined
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-5 text-center py-16">
          <p className="font-serif text-2xl text-navy">{t.cart.empty}</p>
          <Button variant="secondary" onClick={close}>
            {t.cart.emptyCta}
          </Button>
        </div>
      ) : (
        <>
          <CartRewards subtotal={subtotal} count={count} />
          <ul className="flex flex-col divide-y divide-line">
            {lines.map((l) => (
              <li key={l.key} className="flex gap-4 py-5">
                <Link href={`/product/${l.product.slug}`} onClick={close} className="w-20 shrink-0">
                  <ProductImage alt={l.product.name} tone={l.color.hex} src={l.color.images?.[0]} sizes="80px" monogram={false} />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/product/${l.product.slug}`} onClick={close} className="text-sm text-navy hover:underline underline-offset-4">
                      {l.product.name}
                    </Link>
                    <Price amount={l.lineTotal} className="text-sm text-navy shrink-0" />
                  </div>
                  <p className="mt-1 text-xs text-taupe">
                    {l.color.name[locale]} · {l.size === "ONE" ? t.card.oneSize : l.size}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center border border-line" role="group" aria-label={t.cart.qty}>
                      <button
                        type="button"
                        aria-label={t.cart.decrease}
                        onClick={() => setQty(l.key, l.qty - 1)}
                        className="h-8 w-8 flex items-center justify-center text-navy hover:bg-ecru"
                      >
                        <MinusIcon />
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
                        {l.qty}
                      </span>
                      <button
                        type="button"
                        aria-label={t.cart.increase}
                        onClick={() => setQty(l.key, l.qty + 1)}
                        className="h-8 w-8 flex items-center justify-center text-navy hover:bg-ecru"
                      >
                        <PlusIcon />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(l.key)}
                      className="label text-taupe hover:text-navy underline-offset-4 hover:underline"
                    >
                      {t.cart.remove}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {suggestions.length > 0 && (
            <div className="mt-4 border-t border-line pt-5">
              <p className="label mb-4 text-navy">{t.upsell.title}</p>
              <ul className="grid grid-cols-3 gap-3">
                {suggestions.map((p) => (
                  <li key={p.id} className="flex flex-col">
                    <Link href={`/product/${p.slug}`} onClick={close}>
                      <ProductImage alt={p.name} tone={p.colors[0].hex} src={p.colors[0].images?.[0]} sizes="120px" monogram={false} />
                    </Link>
                    <p className="mt-2 line-clamp-2 text-[0.7rem] leading-tight text-navy">{p.name}</p>
                    <Price amount={p.price} className="text-[0.7rem] text-taupe" />
                    <button
                      type="button"
                      onClick={() => add(p.id, p.colors[0].id, defaultSize(p))}
                      className="label mt-2 border border-navy py-1.5 text-[0.58rem] text-navy transition-colors hover:bg-navy hover:text-cream"
                    >
                      + {t.upsell.add}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </Drawer>
  );
}
