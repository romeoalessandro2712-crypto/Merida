"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useT, useUI } from "@/lib/providers";
import { PRODUCTS, CATEGORIES } from "@data/products";
import { ProductImage } from "@/components/product/ProductImage";
import { Price } from "@/components/ui/Price";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";

export function SearchOverlay() {
  const { t, locale } = useT();
  const { drawer, close } = useUI();
  const open = drawer === "search";
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(id);
  }, [open]);

  const handleClose = () => {
    close();
    setQ("");
  };

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length < 2) return [];
    return PRODUCTS.filter((p) => {
      const cat = CATEGORIES.find((c) => c.slug === p.category);
      const hay = [
        p.name,
        p.tagline[locale],
        cat?.name[locale] ?? "",
        ...p.colors.map((c) => c.name[locale]),
        ...p.tags,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    }).slice(0, 8);
  }, [q, locale]);

  return (
    <div className={cn("fixed inset-0 z-50", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <div
        className={cn("absolute inset-0 bg-charcoal/30 transition-opacity duration-500", open ? "opacity-100" : "opacity-0")}
        onClick={handleClose}
      />
      <div
        id="drawer-search"
        role="dialog"
        aria-modal="true"
        aria-label={t.header.search}
        className={cn(
          "absolute top-0 left-0 w-full max-h-[85vh] overflow-y-auto bg-cream border-b border-line transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="mx-auto max-w-3xl px-4 md:px-8 py-8">
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-3 border-b border-navy pb-3"
          >
            <SearchIcon className="shrink-0 text-navy" />
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.search.placeholder}
              aria-label={t.header.search}
              className="w-full bg-transparent font-serif text-2xl text-navy placeholder:text-taupe/70 focus:outline-none"
            />
            <button type="button" onClick={handleClose} aria-label={t.header.close} className="p-2 text-navy hover:text-chocolate">
              <CloseIcon />
            </button>
          </form>

          <div className="mt-6" aria-live="polite">
            {q.trim().length < 2 ? (
              <p className="text-sm text-taupe">{t.search.hint}</p>
            ) : results.length === 0 ? (
              <p className="text-sm text-taupe">
                {t.search.noResults} “{q}”.
              </p>
            ) : (
              <>
                <p className="label text-taupe mb-4">
                  {t.search.results} · {results.length}
                </p>
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link href={`/product/${p.slug}`} onClick={handleClose} className="group block">
                        <ProductImage alt={p.name} tone={p.colors[0].hex} className="mb-2" sizes="25vw" />
                        <p className="text-sm text-navy group-hover:underline underline-offset-4">{p.name}</p>
                        <Price amount={p.price} className="text-xs text-taupe" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
