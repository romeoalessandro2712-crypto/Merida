"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { WELCOME_CODE } from "@data/products";
import { useT } from "@/lib/providers";
import { asset } from "@/lib/asset";
import { ButtonLink } from "@/components/ui/Button";
import { CloseIcon } from "@/components/ui/Icons";
import { getLenis } from "@/lib/smooth-scroll";

const KEY = "meridia:welcome-seen";

/** First-visit offer: appears once, a few seconds after landing (never on checkout). */
export function WelcomeOffer() {
  const { t } = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathname.startsWith("/checkout")) return;
    let seen = false;
    try {
      seen = window.localStorage.getItem(KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    if (seen) return;
    const id = window.setTimeout(() => setOpen(true), 8000);
    return () => window.clearTimeout(id);
  }, [pathname]);

  function dismiss() {
    setOpen(false);
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      /* storage unavailable */
    }
  }

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal/45 backdrop-blur-[2px]" onClick={dismiss} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        className="modal-in relative w-full max-w-md border border-line bg-cream px-7 pb-8 pt-10 text-center shadow-[0_40px_80px_-30px_rgba(18,28,48,0.6)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label={t.welcome.close}
          className="absolute right-3 top-3 p-2 text-navy hover:text-chocolate"
        >
          <CloseIcon />
        </button>
        <Image
          src={asset("/brand/meridia-crest-600.jpg")}
          alt="MERIDIA crest"
          width={72}
          height={72}
          className="mx-auto h-18 w-18 rounded-full border border-line object-cover"
        />
        <p className="label mt-5 text-taupe">{t.welcome.label}</p>
        <h2 id="welcome-title" className="mt-2 font-serif text-4xl font-medium leading-tight text-navy">
          {t.welcome.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-charcoal/80">{t.welcome.text}</p>
        <div className="mt-6 flex items-stretch border border-dashed border-navy/50">
          <span className="flex flex-1 items-center justify-center font-serif text-2xl tracking-[0.2em] text-navy">
            {WELCOME_CODE}
          </span>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(WELCOME_CODE);
              } catch {
                /* clipboard blocked — the code is visible anyway */
              }
              setCopied(true);
            }}
            className="label border-l border-dashed border-navy/50 px-4 py-3 text-navy hover:bg-ecru"
            aria-live="polite"
          >
            {copied ? t.welcome.copied : t.welcome.copy}
          </button>
        </div>
        <ButtonLink href="/shop" size="lg" className="mt-6 w-full" onClick={dismiss}>
          {t.welcome.cta}
        </ButtonLink>
      </div>
    </div>
  );
}
