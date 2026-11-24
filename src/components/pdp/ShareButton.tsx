"use client";

import { useState } from "react";
import { useT, useUI } from "@/lib/providers";

/** Native share sheet on phones (WhatsApp, Instagram DMs…); copies the link elsewhere. */
export function ShareButton({ title }: { title: string }) {
  const { t } = useT();
  const { notify } = useUI();
  const [busy, setBusy] = useState(false);

  async function share() {
    if (busy) return;
    setBusy(true);
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${title} · MERIDIA`, text: t.share.text, url });
      } else {
        await navigator.clipboard.writeText(url);
        notify(t.share.copied);
      }
    } catch {
      /* user closed the share sheet, or clipboard blocked */
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label={t.share.cta}
      title={t.share.cta}
      className="inline-flex h-14 w-14 shrink-0 items-center justify-center border border-line text-navy transition-colors hover:border-navy hover:text-chocolate"
    >
      <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15V3m0 0L8 7m4-4 4 4" />
        <path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" />
      </svg>
    </button>
  );
}
