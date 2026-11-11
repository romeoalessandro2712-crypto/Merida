"use client";

import Link from "next/link";
import { useCart, useT, useUI } from "@/lib/providers";
import { Drawer } from "@/components/ui/Drawer";
import { ProductImage } from "@/components/product/ProductImage";
import { Price } from "@/components/ui/Price";
import { Button, ButtonLink } from "@/components/ui/Button";
import { MinusIcon, PlusIcon } from "@/components/ui/Icons";
import { FreeShippingBar } from "./FreeShippingBar";

export function CartDrawer() {
  const { t, locale } = useT();
  const { drawer, close } = useUI();
  const { lines, subtotal, count, setQty, remove } = useCart();

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
            <div className="flex items-center justify-between mb-1">
              <span className="label text-navy">{t.cart.subtotal}</span>
              <Price amount={subtotal} className="font-serif text-xl text-navy" />
            </div>
            <p className="text-xs text-taupe mb-4">{t.cart.shippingNote}</p>
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
          <FreeShippingBar subtotal={subtotal} />
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
        </>
      )}
    </Drawer>
  );
}
