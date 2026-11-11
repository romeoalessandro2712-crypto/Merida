"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, getDictionary, type Dictionary, type Locale } from "@/lib/i18n";
import { PRODUCTS, type Product, type Size } from "@data/products";
import { createPersistedStore } from "./persisted-store";

/* -------------------------------------------------------------------------- */
/*                             Persisted stores                               */
/* -------------------------------------------------------------------------- */

export interface CartLine {
  /** `${productId}:${colorId}:${size}` */
  key: string;
  productId: string;
  colorId: string;
  size: Size;
  qty: number;
}

const localeStore = createPersistedStore<Locale>(
  "meridia:locale",
  DEFAULT_LOCALE,
  (v): v is Locale => v === "it" || v === "en",
);
const cartStore = createPersistedStore<CartLine[]>("meridia:cart", [], Array.isArray);
const wishlistStore = createPersistedStore<string[]>("meridia:wishlist", [], Array.isArray);

const noopSubscribe = () => () => {};
/** false during SSR + hydration, true once the client has taken over */
function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Language                                   */
/* -------------------------------------------------------------------------- */

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(localeStore.subscribe, localeStore.get, localeStore.getServer);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => localeStore.set(l), []);
  const value = useMemo(() => ({ locale, setLocale, t: getDictionary(locale) }), [locale, setLocale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within <Providers>");
  return ctx;
}

/** Shorthand: returns the active dictionary and locale */
export function useT() {
  const { t, locale } = useLanguage();
  return { t, locale };
}

/* -------------------------------------------------------------------------- */
/*                                    Cart                                     */
/* -------------------------------------------------------------------------- */

export interface CartLineResolved extends CartLine {
  product: Product;
  color: Product["colors"][number];
  lineTotal: number;
}

interface CartContextValue {
  lines: CartLineResolved[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  add: (productId: string, colorId: string, size: Size, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function CartProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(cartStore.subscribe, cartStore.get, cartStore.getServer);
  const hydrated = useHydrated();

  const add = useCallback((productId: string, colorId: string, size: Size, qty = 1) => {
    const key = `${productId}:${colorId}:${size}`;
    cartStore.set((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { key, productId, colorId, size, qty }];
    });
  }, []);

  const remove = useCallback((key: string) => cartStore.set((prev) => prev.filter((l) => l.key !== key)), []);

  const setQty = useCallback((key: string, qty: number) => {
    cartStore.set((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const clear = useCallback(() => cartStore.set([]), []);

  const lines = useMemo<CartLineResolved[]>(() => {
    const out: CartLineResolved[] = [];
    for (const l of raw) {
      const product = PRODUCTS.find((p) => p.id === l.productId);
      const color = product?.colors.find((c) => c.id === l.colorId);
      if (!product || !color) continue; // product no longer in catalogue
      out.push({ ...l, product, color, lineTotal: product.price * l.qty });
    }
    return out;
  }, [raw]);

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);

  const value = useMemo(
    () => ({ lines, count, subtotal, hydrated, add, remove, setQty, clear }),
    [lines, count, subtotal, hydrated, add, remove, setQty, clear],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <Providers>");
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*                                  Wishlist                                   */
/* -------------------------------------------------------------------------- */

interface WishlistContextValue {
  ids: string[];
  products: Product[];
  hydrated: boolean;
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function WishlistProvider({ children }: { children: ReactNode }) {
  const ids = useSyncExternalStore(wishlistStore.subscribe, wishlistStore.get, wishlistStore.getServer);
  const hydrated = useHydrated();

  const has = useCallback((id: string) => ids.includes(id), [ids]);
  const toggle = useCallback(
    (id: string) => wishlistStore.set((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [],
  );
  const remove = useCallback((id: string) => wishlistStore.set((prev) => prev.filter((x) => x !== id)), []);

  const products = useMemo(
    () => ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p): p is Product => Boolean(p)),
    [ids],
  );

  const value = useMemo(
    () => ({ ids, products, hydrated, has, toggle, remove }),
    [ids, products, hydrated, has, toggle, remove],
  );
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within <Providers>");
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*                               UI (drawers)                                  */
/* -------------------------------------------------------------------------- */

export type Drawer = "cart" | "wishlist" | "menu" | "search" | null;

interface UIContextValue {
  drawer: Drawer;
  open: (d: Exclude<Drawer, null>) => void;
  close: () => void;
  toast: string | null;
  notify: (message: string) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

function UIProvider({ children }: { children: ReactNode }) {
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [toast, setToast] = useState<string | null>(null);

  const open = useCallback((d: Exclude<Drawer, null>) => setDrawer(d), []);
  const close = useCallback(() => setDrawer(null), []);
  const notify = useCallback((message: string) => setToast(message), []);

  // Auto-dismiss toast.
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(id);
  }, [toast]);

  // Lock body scroll while a drawer is open; close on Escape.
  useEffect(() => {
    if (!drawer) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawer(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawer]);

  const value = useMemo(() => ({ drawer, open, close, toast, notify }), [drawer, open, close, toast, notify]);
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within <Providers>");
  return ctx;
}

/* -------------------------------------------------------------------------- */

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <UIProvider>
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </UIProvider>
    </LanguageProvider>
  );
}
