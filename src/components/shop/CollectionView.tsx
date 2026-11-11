"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CATEGORIES,
  SIZES,
  getAllColors,
  type CategorySlug,
  type Product,
  type Size,
} from "@data/products";
import { useT } from "@/lib/providers";
import { cn, formatPrice } from "@/lib/format";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { FilterIcon, ChevronIcon } from "@/components/ui/Icons";

type SortKey = "featured" | "new" | "priceAsc" | "priceDesc";

interface Filters {
  categories: CategorySlug[];
  colors: string[];
  sizes: Size[];
  maxPrice: number;
}

export function CollectionView({
  products,
  title,
  intro,
  lockedCategory,
  activeSlug,
}: {
  products: Product[];
  title: string;
  intro?: string;
  /** When viewing /shop/[category], hide the category facet */
  lockedCategory?: CategorySlug;
  /** Which nav chip is active (shop, new-in, best-sellers, or a category) */
  activeSlug?: string;
}) {
  const { t, locale } = useT();
  const priceCeil = useMemo(() => Math.max(...products.map((p) => p.price), 0), [products]);
  const [filters, setFilters] = useState<Filters>({ categories: [], colors: [], sizes: [], maxPrice: Infinity });
  const [sort, setSort] = useState<SortKey>("featured");
  const [mobileOpen, setMobileOpen] = useState(false);

  const colorsAvailable = useMemo(() => {
    const ids = new Set(products.flatMap((p) => p.colors.map((c) => c.id)));
    return getAllColors().filter((c) => ids.has(c.id));
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.colors.length && !p.colors.some((c) => filters.colors.includes(c.id))) return false;
      if (filters.sizes.length && !p.sizes.some((s) => filters.sizes.includes(s) && !p.soldOut?.includes(s))) return false;
      if (p.price > filters.maxPrice) return false;
      return true;
    });
    switch (sort) {
      case "priceAsc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "new":
        list = [...list].sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
        break;
      default:
        list = [...list].sort((a, b) => (a.bestSellerRank ?? 99) - (b.bestSellerRank ?? 99));
    }
    return list;
  }, [products, filters, sort]);

  const activeCount =
    filters.categories.length + filters.colors.length + filters.sizes.length + (filters.maxPrice !== Infinity ? 1 : 0);

  const toggle = <K extends "categories" | "colors" | "sizes">(key: K, value: Filters[K][number]) =>
    setFilters((f) => {
      const arr = f[key] as string[];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...f, [key]: next };
    });

  const clear = () => setFilters({ categories: [], colors: [], sizes: [], maxPrice: Infinity });

  const sortOptions: { id: SortKey; label: string }[] = [
    { id: "featured", label: t.shop.sortFeatured },
    { id: "new", label: t.shop.sortNew },
    { id: "priceAsc", label: t.shop.sortPriceAsc },
    { id: "priceDesc", label: t.shop.sortPriceDesc },
  ];

  const chips = [
    { href: "/shop", label: t.shop.allProducts, id: "shop" },
    { href: "/new-in", label: t.shop.newIn, id: "new-in" },
    { href: "/best-sellers", label: t.shop.bestSellers, id: "best-sellers" },
    ...CATEGORIES.map((c) => ({ href: `/shop/${c.slug}`, label: c.name[locale], id: c.slug })),
  ];

  const facets = (
    <div className="flex flex-col gap-8">
      {!lockedCategory && (
        <Facet title={t.shop.category}>
          {CATEGORIES.map((c) => (
            <Check
              key={c.slug}
              label={c.name[locale]}
              checked={filters.categories.includes(c.slug)}
              onChange={() => toggle("categories", c.slug)}
            />
          ))}
        </Facet>
      )}
      <Facet title={t.shop.color}>
        <div className="flex flex-wrap gap-2">
          {colorsAvailable.map((c) => {
            const on = filters.colors.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                aria-label={c.name[locale]}
                title={c.name[locale]}
                onClick={() => toggle("colors", c.id)}
                className={cn("rounded-full border p-[2px] transition-colors", on ? "border-navy" : "border-transparent hover:border-taupe")}
              >
                <span className="block h-6 w-6 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
              </button>
            );
          })}
        </div>
      </Facet>
      <Facet title={t.shop.size}>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => {
            const on = filters.sizes.includes(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => toggle("sizes", s)}
                className={cn(
                  "h-9 min-w-10 border px-2 text-[0.7rem] tracking-[0.1em] transition-colors",
                  on ? "border-navy bg-navy text-cream" : "border-line text-navy hover:border-navy",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Facet>
      <Facet title={t.shop.price}>
        <label className="flex flex-col gap-2 text-xs text-charcoal/80">
          <span>
            {t.shop.upTo} {formatPrice(filters.maxPrice === Infinity ? priceCeil : filters.maxPrice, locale)}
          </span>
          <input
            type="range"
            min={Math.min(...products.map((p) => p.price), priceCeil)}
            max={priceCeil}
            step={10}
            value={filters.maxPrice === Infinity ? priceCeil : filters.maxPrice}
            onChange={(e) => {
              const v = Number(e.target.value);
              setFilters((f) => ({ ...f, maxPrice: v >= priceCeil ? Infinity : v }));
            }}
            aria-label={t.shop.price}
            className="w-full"
          />
        </label>
      </Facet>
      {activeCount > 0 && (
        <button type="button" onClick={clear} className="label self-start border-b border-navy pb-0.5 text-navy">
          {t.shop.clear}
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 md:py-12">
      {/* Title */}
      <div className="mb-8 md:mb-10">
        <p className="label text-taupe mb-3">
          <Link href="/" className="hover:text-navy">
            {t.product.breadcrumbHome}
          </Link>{" "}
          / {t.shop.title}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-navy font-medium">{title}</h1>
        {intro && <p className="mt-3 max-w-xl text-sm text-taupe leading-relaxed">{intro}</p>}
      </div>

      {/* Category chips */}
      <nav aria-label={t.shop.category} className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
        {chips.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            aria-current={activeSlug === c.id ? "page" : undefined}
            className={cn(
              "label whitespace-nowrap border px-4 py-2 transition-colors",
              activeSlug === c.id ? "border-navy bg-navy text-cream" : "border-line text-navy hover:border-navy",
            )}
          >
            {c.label}
          </Link>
        ))}
      </nav>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Desktop facets */}
        <aside className="hidden lg:block" aria-label={t.shop.filters}>
          <div className="sticky top-28">{facets}</div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
            <p className="text-xs text-taupe" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? t.shop.result : t.shop.results}
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="label inline-flex items-center gap-2 text-navy lg:hidden"
                aria-haspopup="dialog"
                aria-controls="drawer-filters"
              >
                <FilterIcon />
                {t.shop.filters}
                {activeCount > 0 && <span className="text-taupe">({activeCount})</span>}
              </button>
              <label className="relative inline-flex items-center gap-2 label text-navy">
                <span className="sr-only">{t.shop.sort}</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="appearance-none bg-transparent pr-5 label text-navy cursor-pointer focus:outline-none"
                >
                  {sortOptions.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronIcon className="pointer-events-none absolute right-0 text-taupe" />
              </label>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-serif text-2xl text-navy">{t.shop.empty}</p>
              <Button variant="secondary" className="mt-6" onClick={clear}>
                {t.shop.clear}
              </Button>
            </div>
          ) : (
            <ProductGrid products={filtered} columns={3} />
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <Drawer
        id="drawer-filters"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        side="right"
        title={t.shop.filters}
        closeLabel={t.header.close}
        footer={
          <Button className="w-full" onClick={() => setMobileOpen(false)}>
            {t.shop.apply} ({filtered.length})
          </Button>
        }
      >
        {facets}
      </Drawer>
    </div>
  );
}

function Facet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-5">
      <legend className="label text-navy mb-4 float-left w-full">{title}</legend>
      <div className="flex flex-col gap-2.5 clear-both">{children}</div>
    </fieldset>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-charcoal/85 hover:text-navy">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden="true"
        className="flex h-4 w-4 items-center justify-center border border-line peer-checked:border-navy peer-checked:bg-navy peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-navy peer-focus-visible:outline-offset-2"
      >
        {checked && <span className="h-1.5 w-1.5 bg-cream" />}
      </span>
      {label}
    </label>
  );
}
