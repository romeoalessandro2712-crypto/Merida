"use client";

import { useState, type FormEvent } from "react";
import { useT } from "@/lib/providers";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Guilloche } from "@/components/brand/Guilloche";

export function Newsletter() {
  const { t } = useT();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  function submit(e: FormEvent) {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setState(ok ? "done" : "error");
  }

  return (
    <section className="relative isolate overflow-hidden bg-navy text-cream" aria-labelledby="newsletter-title">
      <div className="pointer-events-none absolute -right-[20vmax] top-1/2 -z-10 w-[60vmax] -translate-y-1/2 text-gold opacity-[0.12]">
        <Guilloche />
      </div>
      <Reveal className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h2 id="newsletter-title" className="font-serif text-3xl md:text-[2.6rem] leading-[1.1] font-medium">
            {t.newsletter.title}
          </h2>
          <p className="mt-3 max-w-md text-sm text-cream/75 leading-relaxed">{t.newsletter.subtitle}</p>
        </div>
        <form onSubmit={submit} noValidate className="md:justify-self-end w-full max-w-md">
          {state === "done" ? (
            <p role="status" className="font-serif text-2xl">
              {t.newsletter.thanks}
            </p>
          ) : (
            <>
              <div className="flex border-b border-cream/50 focus-within:border-cream transition-colors">
                <label htmlFor="newsletter-email" className="sr-only">
                  {t.newsletter.placeholder}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                  placeholder={t.newsletter.placeholder}
                  aria-invalid={state === "error"}
                  aria-describedby="newsletter-note"
                  className="w-full bg-transparent py-3 text-sm text-cream placeholder:text-cream/50 focus:outline-none"
                />
                <Button type="submit" variant="ghost" className="text-cream hover:border-transparent hover:underline underline-offset-4 px-2">
                  {t.newsletter.cta}
                </Button>
              </div>
              <p id="newsletter-note" className="mt-3 text-xs text-cream/60">
                {state === "error" ? <span className="text-sand">{t.newsletter.invalid}</span> : t.newsletter.note}
              </p>
            </>
          )}
        </form>
      </Reveal>
    </section>
  );
}
