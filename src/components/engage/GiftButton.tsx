"use client";

import { useT, useUI } from "@/lib/providers";
import { formatCountdown, useReward } from "@/lib/engagement";
import { pct } from "@/lib/pricing";
import { GiftIcon } from "@/components/ui/Icons";

/** Floating reminder: invites to scratch, or shows the active prize with a live countdown. */
export function GiftButton() {
  const { t } = useT();
  const { openModal, modal } = useUI();
  const { reward, played, active, now } = useReward();

  if (now === null || modal === "scratch") return null;
  if (played && !active) return null;

  return (
    <button
      type="button"
      onClick={() => openModal("scratch")}
      className="group fixed bottom-20 left-4 z-30 flex items-center gap-2.5 border border-gold bg-navy-deep py-2.5 pl-3 pr-4 text-cream shadow-[0_15px_35px_-12px_rgba(18,28,48,0.7)] transition-transform hover:-translate-y-0.5 lg:bottom-6 lg:left-6"
    >
      <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gold text-navy-deep">
        {!active && <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-gold/60" />}
        <GiftIcon className="relative" />
      </span>
      {active && reward ? (
        <span className="text-left leading-tight">
          <span className="label block text-[0.6rem] text-gold-light">
            -{pct(reward.rate)} · {reward.code}
          </span>
          <span className="block text-[0.7rem] tabular-nums text-cream/80">
            {t.scratch.expires} {formatCountdown(reward.expiresAt - now)}
          </span>
        </span>
      ) : (
        <span className="label text-[0.62rem]">{t.scratch.float}</span>
      )}
    </button>
  );
}
