"use client";

import { useState, type FormEvent } from "react";
import type { Size } from "@data/products";
import { useT } from "@/lib/providers";

/** "Notify me" for a sold-out size: an honest alternative to pre-orders. Stored locally (demo). */
export function NotifyMe({ size }: { size: Size }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    try {
      const key = "meridia:notify";
      const list = JSON.parse(window.localStorage.getItem(key) ?? "[]") as unknown[];
      window.localStorage.setItem(key, JSON.stringify([...list, { size, at: Date.now() }]));
    } catch {
      /* demo only */
    }
    setState("done");
  }

  if (state === "done") {
    return <p className="mt-3 text-xs text-olive" role="status">{t.notify.done.replace("{size}", size)}</p>;
  }

  return (
    <div className="mt-3">
      {!open ? (
        <button type="button" onClick={() => setOpen(true)} className="text-xs text-navy underline underline-offset-4 hover:text-chocolate">
          {size} · {t.notify.title.toLowerCase()} — {t.notify.cta}
        </button>
      ) : (
        <form onSubmit={submit} noValidate className="border border-line bg-ecru/50 p-3">
          <p className="text-xs text-charcoal/80">{t.notify.text.replace("{size}", size)}</p>
          <div className="mt-2 flex gap-2">
            <label htmlFor="notify-email" className="sr-only">
              {t.notify.placeholder}
            </label>
            <input
              id="notify-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setState("idle");
              }}
              placeholder={t.notify.placeholder}
              aria-invalid={state === "error"}
              className="h-10 min-w-0 flex-1 border border-line bg-cream px-3 text-sm focus:border-navy focus:outline-none"
            />
            <button type="submit" className="label h-10 bg-navy px-4 text-[0.62rem] text-cream hover:bg-navy-deep">
              {t.notify.submit}
            </button>
          </div>
          {state === "error" && <p className="mt-1 text-xs text-[#7a3b41]">{t.newsletter.invalid}</p>}
        </form>
      )}
    </div>
  );
}
