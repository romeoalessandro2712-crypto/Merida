"use client";

import Link from "next/link";
import { useCart, useT, useUI, useWishlist } from "@/lib/providers";
import { Drawer } from "@/components/ui/Drawer";
import { ProductImage } from "@/components/product/ProductImage";
import { Price } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { SizeSelector } from "@/components/product/SizeSelector";
import type { Size } from "@data/products";

export function WishlistDrawer() {
  const { t } = useT();
  const { drawer, close, notify } = useUI();
  const { products, remove } = useWishlist();
  const { add } = useCart();
  const [sizes, setSizes] = useState<Record<string, Size | undefined>>({});

  return (
    <Drawer
      id="drawer-wishlist"
      open={drawer === "wishlist"}
      onClose={close}
      title={
        <>
          {t.wishlist.title}
          {products.length > 0 && <span className="ml-2 font-sans text-xs text-taupe tracking-wide">({products.length})</span>}
        </>
      }
      closeLabel={t.header.close}
    >
      {products.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center py-16">
          <p className="font-serif text-2xl text-navy">{t.wishlist.empty}</p>
          <p className="text-sm text-taupe max-w-xs">{t.wishlist.emptyHint}</p>
          <Link href="/shop" onClick={close} className="mt-2 label border-b border-navy pb-1 text-navy">
            {t.wishlist.emptyCta}
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-line">
          {products.map((p) => {
            const size = sizes[p.id] ?? (p.sizes.length === 1 ? p.sizes[0] : undefined);
            return (
              <li key={p.id} className="flex gap-4 py-5">
                <Link href={`/product/${p.slug}`} onClick={close} className="w-20 shrink-0">
                  <ProductImage alt={p.name} art={p.art} stripe={p.colors[0].stripe} tone={p.colors[0].hex} src={p.colors[0].images?.[0]} sizes="80px" monogram={false} />
                </Link>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/product/${p.slug}`} onClick={close} className="text-sm text-navy hover:underline underline-offset-4">
                      {p.name}
                    </Link>
                    <Price amount={p.price} className="text-sm text-navy shrink-0" />
                  </div>
                  {p.sizes.length > 1 && (
                    <SizeSelector
                      sizes={p.sizes}
                      soldOut={p.soldOut}
                      value={size}
                      onChange={(s) => setSizes((prev) => ({ ...prev, [p.id]: s }))}
                      compact
                      name={`wishlist-size-${p.id}`}
                    />
                  )}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <Button
                      size="sm"
                      disabled={!size}
                      onClick={() => {
                        if (!size) return;
                        add(p.id, p.colors[0].id, size);
                        notify(t.product.addedToCart);
                      }}
                    >
                      {t.wishlist.moveToCart}
                    </Button>
                    <button type="button" onClick={() => remove(p.id)} className="label text-taupe hover:text-navy">
                      {t.wishlist.remove}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Drawer>
  );
}
