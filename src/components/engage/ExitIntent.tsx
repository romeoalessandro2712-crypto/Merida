"use client";

import { useEffect } from "react";
import { useCart, useT, useUI } from "@/lib/providers";
import { useReward } from "@/lib/engagement";
import { nextTier, pct } from "@/lib/pricing";
import { ModalShell } from "@/components/ui/ModalShell";
import { Button } from "@/components/ui/Button";
import { CrestMedallion } from "@/components/brand/CrestMedallion";

const KEY = "meridia:exit-shown";

/**
 * Desktop only: when the pointer leaves through the top of the window (heading for the
 * tabs/address bar), remind once per visit — the cart if it has items, else the scratch card.
 */
export function ExitIntentWatcher() {
  const { openModal, modal, drawer } = useUI();
  const { count } = useCart();
  const { played } = useReward();

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget || e.clientY > 0 || modal || drawer) return;
      try {
        if (window.sessionStorage.getItem(KEY)) return;
      } catch {
        return;
      }
      if (count > 0) openModal("exit");
      else if (!played) openModal("scratch");
      else return;
      try {
        window.sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
    };
    // Give people a moment on the page before this can trigger.
    const arm = window.setTimeout(() => document.addEventListener("mouseout", onOut), 8000);
    return () => {
      window.clearTimeout(arm);
      document.removeEventListener("mouseout", onOut);
    };
  }, [count, played, modal, drawer, openModal]);

  return null;
}

export function ExitModal() {
  const { t } = useT();
  const { modal, closeModal, open } = useUI();
  const { count, lines } = useCart();
  if (modal !== "exit") return null;

  const next = nextTier(count);
  const missing = next ? next.min - count : 0;
  const message = next
    ? t.tiers.next
        .replace("{n}", String(missing))
        .replace("{item}", missing === 1 ? t.tiers.piece : t.tiers.pieces)
        .replace("{rate}", pct(next.rate))
    : t.tiers.max;

  return (
    <ModalShell labelledBy="exit-title" onClose={closeModal} closeLabel={t.scratch.close}>
      <CrestMedallion size="sm" />
      <p className="label mt-6 text-taupe">{t.exit.label}</p>
      <h2 id="exit-title" className="mt-2 font-serif text-4xl font-medium leading-tight text-navy">
        {t.exit.title}
      </h2>
      <div className="mt-5 flex justify-center -space-x-3">
        {lines.slice(0, 4).map((l) => (
          <span key={l.key} className="h-14 w-11 border-2 border-cream shadow" style={{ backgroundColor: l.color.hex }} title={l.product.name} />
        ))}
      </div>
      <p className="mt-5 text-sm font-medium text-chocolate">{message}</p>
      <div className="mt-7 flex flex-col gap-3">
        <Button size="lg" className="w-full" onClick={() => open("cart")}>
          {t.exit.cart}
        </Button>
        <button type="button" onClick={closeModal} className="label text-taupe hover:text-navy">
          {t.exit.continue}
        </button>
      </div>
    </ModalShell>
  );
}
