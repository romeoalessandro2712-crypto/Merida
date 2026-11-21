"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FREE_SHIPPING_THRESHOLD } from "@data/products";
import { COUPONS, EXPRESS_SHIPPING, STANDARD_SHIPPING, computeTotals, pct } from "@/lib/pricing";
import { useReward } from "@/lib/engagement";
import { useCart, useT } from "@/lib/providers";
import { cn, formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/product/ProductImage";
import { Button, ButtonLink } from "@/components/ui/Button";

type Shipping = "standard" | "express";

const EXPRESS_COST = EXPRESS_SHIPPING;
const STANDARD_COST = STANDARD_SHIPPING;

export function CheckoutClient() {
  const { t, locale } = useT();
  const { lines, subtotal, count, hydrated, clear } = useCart();
  const { reward, active } = useReward();
  const router = useRouter();
  const [shipping, setShipping] = useState<Shipping>("standard");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [codeError, setCodeError] = useState(false);

  // A code typed here wins over the scratch-card reward; the better of code vs. multi-piece applies.
  const appliedCode = discountCode ?? (active && reward ? reward.code : null);
  const totals = computeTotals(subtotal, count, appliedCode, shipping);
  const shippingCost = totals.shipping;
  const discount = totals.discount;
  const total = totals.total;

  function applyCode() {
    const code = codeInput.trim().toUpperCase();
    if (COUPONS[code]) {
      setDiscountCode(code);
      setCodeError(false);
    } else {
      setDiscountCode(null);
      setCodeError(true);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    for (const key of ["email", "firstName", "lastName", "address", "city", "zip", "country", "cardNumber", "expiry", "cvc", "nameOnCard"]) {
      if (!String(fd.get(key) ?? "").trim()) next[key] = t.checkout.required;
    }
    const email = String(fd.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t.checkout.invalidEmail;
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setSubmitting(true);
    const orderNo = `MRD-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    window.setTimeout(() => {
      clear();
      router.push(`/checkout/success?order=${orderNo}`);
    }, 700);
  }

  if (hydrated && lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-serif text-4xl text-navy font-medium">{t.checkout.emptyTitle}</h1>
        <p className="mt-3 text-sm text-taupe">{t.checkout.emptyText}</p>
        <ButtonLink href="/shop" className="mt-8">
          {t.cart.emptyCta}
        </ButtonLink>
      </div>
    );
  }

  const field = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={`co-${name}`} className="label text-navy">
        {label}
      </label>
      <input
        id={`co-${name}`}
        name={name}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `co-${name}-err` : undefined}
        className={cn(
          "h-12 border bg-cream px-3 text-sm text-navy focus:outline-none focus:border-navy transition-colors",
          errors[name] ? "border-[#7a3b41]" : "border-line",
        )}
        {...props}
      />
      {errors[name] && (
        <p id={`co-${name}-err`} className="text-xs text-[#7a3b41]">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h1 className="font-serif text-4xl md:text-5xl text-navy font-medium">{t.checkout.title}</h1>
        <p className="label text-olive">{t.checkout.demo}</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="grid gap-12 lg:grid-cols-[1fr_400px]">
        <div className="flex flex-col gap-10">
          <section aria-labelledby="co-contact">
            <h2 id="co-contact" className="font-serif text-2xl text-navy mb-4">
              {t.checkout.contact}
            </h2>
            {field("email", t.checkout.email, { type: "email", autoComplete: "email", inputMode: "email" })}
          </section>

          <section aria-labelledby="co-ship">
            <h2 id="co-ship" className="font-serif text-2xl text-navy mb-4">
              {t.checkout.shippingAddress}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field("firstName", t.checkout.firstName, { autoComplete: "given-name" })}
              {field("lastName", t.checkout.lastName, { autoComplete: "family-name" })}
              <div className="sm:col-span-2">{field("address", t.checkout.address, { autoComplete: "street-address" })}</div>
              {field("city", t.checkout.city, { autoComplete: "address-level2" })}
              {field("zip", t.checkout.zip, { autoComplete: "postal-code", inputMode: "numeric" })}
              {field("country", t.checkout.country, { autoComplete: "country-name", defaultValue: locale === "it" ? "Italia" : "Italy" })}
              {field("phone", t.checkout.phone, { type: "tel", autoComplete: "tel", inputMode: "tel" })}
            </div>
          </section>

          <section aria-labelledby="co-method">
            <h2 id="co-method" className="font-serif text-2xl text-navy mb-4">
              {t.checkout.shippingMethod}
            </h2>
            <div role="radiogroup" aria-labelledby="co-method" className="flex flex-col divide-y divide-line border border-line">
              {(
                [
                  { id: "standard", label: t.checkout.standard, cost: subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_COST },
                  { id: "express", label: t.checkout.express, cost: EXPRESS_COST },
                ] as { id: Shipping; label: string; cost: number }[]
              ).map((o) => (
                <label key={o.id} className="flex cursor-pointer items-center justify-between gap-4 px-4 py-4 text-sm text-navy hover:bg-ecru/60">
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value={o.id}
                      checked={shipping === o.id}
                      onChange={() => setShipping(o.id)}
                      className="accent-navy"
                    />
                    {o.label}
                  </span>
                  <span className="tabular-nums">{o.cost === 0 ? t.checkout.free : formatPrice(o.cost, locale)}</span>
                </label>
              ))}
            </div>
          </section>

          <section aria-labelledby="co-pay">
            <h2 id="co-pay" className="font-serif text-2xl text-navy mb-1">
              {t.checkout.payment}
            </h2>
            <p className="text-xs text-taupe mb-4">{t.checkout.demo}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                {field("cardNumber", t.checkout.cardNumber, { inputMode: "numeric", autoComplete: "cc-number", placeholder: "4242 4242 4242 4242" })}
              </div>
              {field("expiry", t.checkout.expiry, { autoComplete: "cc-exp", placeholder: "MM / YY" })}
              {field("cvc", t.checkout.cvc, { inputMode: "numeric", autoComplete: "cc-csc", placeholder: "123" })}
              <div className="sm:col-span-2">{field("nameOnCard", t.checkout.nameOnCard, { autoComplete: "cc-name" })}</div>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start border border-line bg-ecru/50 p-6">
          <h2 className="font-serif text-2xl text-navy mb-5">{t.checkout.summary}</h2>
          <ul className="flex flex-col divide-y divide-line">
            {lines.map((l) => (
              <li key={l.key} className="flex items-center gap-3 py-3">
                <div className="w-14 shrink-0">
                  <ProductImage alt={l.product.name} tone={l.color.hex} src={l.color.images?.[0]} sizes="56px" monogram={false} />
                </div>
                <div className="flex-1 text-sm">
                  <p className="text-navy">{l.product.name}</p>
                  <p className="text-xs text-taupe">
                    {l.color.name[locale]} · {l.size === "ONE" ? t.card.oneSize : l.size} · ×{l.qty}
                  </p>
                </div>
                <span className="text-sm text-navy tabular-nums">{formatPrice(l.lineTotal, locale)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex gap-2">
            <label htmlFor="co-code" className="sr-only">
              {t.discount.label}
            </label>
            <input
              id="co-code"
              value={codeInput}
              onChange={(e) => {
                setCodeInput(e.target.value);
                setCodeError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyCode();
                }
              }}
              placeholder={t.discount.label}
              aria-invalid={codeError}
              className="h-11 min-w-0 flex-1 border border-line bg-cream px-3 text-sm uppercase text-navy placeholder:normal-case focus:border-navy focus:outline-none"
            />
            <Button size="sm" variant="secondary" className="h-11" onClick={applyCode}>
              {t.discount.apply}
            </Button>
          </div>
          <p className="mt-1.5 text-xs" aria-live="polite">
            {codeError ? (
              <span className="text-[#7a3b41]">{t.discount.invalid}</span>
            ) : appliedCode ? (
              <span className="text-olive">
                {t.discount.applied}: {appliedCode}
              </span>
            ) : (
              <span className="text-taupe">{t.discount.hint}</span>
            )}
          </p>
          <dl className="mt-5 flex flex-col gap-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-charcoal/80">{t.cart.subtotal}</dt>
              <dd className="tabular-nums">{formatPrice(subtotal, locale)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-olive">
                <dt>
                  {totals.source === "coupon" ? `${t.tiers.codeLine} ${appliedCode}` : t.tiers.bundleLine} (-{pct(totals.rate)})
                </dt>
                <dd className="tabular-nums">−{formatPrice(discount, locale)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-charcoal/80">{t.checkout.shipping}</dt>
              <dd className="tabular-nums">{shippingCost === 0 ? t.checkout.free : formatPrice(shippingCost, locale)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 font-serif text-xl text-navy">
              <dt>{t.checkout.total}</dt>
              <dd className="tabular-nums">{formatPrice(total, locale)}</dd>
            </div>
            <p className="text-xs text-taupe">{t.checkout.vat}</p>
            {discount > 0 && (
              <p className="text-xs font-medium text-olive">
                {t.tiers.saved} {formatPrice(discount, locale)}
              </p>
            )}
          </dl>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting || !hydrated}>
            {submitting ? t.common.loading : t.checkout.placeOrder}
          </Button>
          <Link href="/shop" className="mt-4 block text-center label text-taupe hover:text-navy">
            {t.checkout.backToCart}
          </Link>
        </aside>
      </form>
    </div>
  );
}
