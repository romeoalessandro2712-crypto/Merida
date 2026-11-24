"use client";

import { useLanguage } from "@/lib/providers";
import { LOCALES, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/format";

export function LanguageSwitcher({ className, light }: { className?: string; light?: boolean }) {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div className={cn("flex items-center gap-3 label", className)}>
      <div role="group" aria-label={t.header.language} className="flex items-center gap-1">
        {LOCALES.map((l: Locale, i) => (
          <span key={l} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true" className="text-taupe/60">/</span>}
            <button
              type="button"
              onClick={() => setLocale(l)}
              aria-pressed={locale === l}
              className={cn(
                "px-0.5 transition-colors",
                locale === l ? (light ? "text-cream" : "text-navy") : light ? "text-cream/70 hover:text-cream" : "text-taupe hover:text-navy",
              )}
            >
              {l.toUpperCase()}
            </button>
          </span>
        ))}
      </div>
      <span aria-hidden="true" className="h-3 w-px bg-line" />
      <span aria-label={`${t.header.currency}: EUR`} className={light ? "text-cream" : "text-navy"}>
        EUR €
      </span>
    </div>
  );
}
