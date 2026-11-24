"use client";

import { createElement, useState } from "react";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/providers";

const AGENT_ID = "agent_5001m86h3kjgf7gt7kkc6pkjngdx";
/** Pinned widget release (published 10 Nov 2026). */
const WIDGET_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed@0.25.2/dist/index.js";

/**
 * ElevenLabs voice stylist. Nothing is loaded until the visitor taps the button:
 * no third-party script, microphone prompt or data transfer on page load.
 */
export function StylistWidget() {
  const { t, locale } = useT();
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "loading" | "ready">("idle");

  if (pathname.startsWith("/checkout")) return null;

  function open() {
    if (state !== "idle") return;
    setState("loading");
    const done = () => setState("ready");
    if (customElements.get("elevenlabs-convai")) return done();
    const s = document.createElement("script");
    s.src = WIDGET_SRC;
    s.async = true;
    s.type = "text/javascript";
    s.onload = done;
    s.onerror = () => setState("idle");
    document.body.appendChild(s);
  }

  if (state === "ready") {
    return createElement("elevenlabs-convai", { "agent-id": AGENT_ID, "override-language": locale });
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-label={t.stylist.cta}
      title={t.stylist.note}
      className="group fixed bottom-20 right-4 z-30 flex items-center gap-2.5 rounded-full border border-gold bg-navy-deep p-1.5 text-cream shadow-[0_15px_35px_-12px_rgba(18,28,48,0.7)] transition-transform hover:-translate-y-0.5 lg:bottom-6 lg:right-6 lg:py-1.5 lg:pl-1.5 lg:pr-5"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[conic-gradient(from_200deg,#1b2a44,#b89b5e,#1b2a44)]">
        <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true" fill="none" stroke="#f7f3ec" strokeWidth={1.6} strokeLinecap="round">
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </svg>
      </span>
      <span className="label hidden text-[0.62rem] lg:inline">{state === "loading" ? t.stylist.loading : t.stylist.cta}</span>
    </button>
  );
}
