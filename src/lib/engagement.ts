"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPersistedStore } from "./persisted-store";

/* ------------------------------ Scratch reward ----------------------------- */

export interface Reward {
  code: string;
  rate: number;
  /** epoch ms */
  expiresAt: number;
}

export const REWARD_HOURS = 48;

const isReward = (v: unknown): v is Reward | null =>
  v === null || (typeof v === "object" && v !== null && "code" in v && "rate" in v && "expiresAt" in v);

export const rewardStore = createPersistedStore<Reward | null>("meridia:reward", null, isReward);
export const playedStore = createPersistedStore<boolean>("meridia:scratch-played", false, (v): v is boolean => typeof v === "boolean");

/** Weighted prize draw: 10% (60%), 15% (30%), 20% (10%). */
export function drawPrize(): Omit<Reward, "expiresAt"> {
  const r = Math.random();
  if (r < 0.1) return { code: "MERIDIA20", rate: 0.2 };
  if (r < 0.4) return { code: "MERIDIA15", rate: 0.15 };
  return { code: "MERIDIA10", rate: 0.1 };
}

/** Ticking clock; `null` until mounted so server and client markup match. */
export function useNow(intervalMs = 1000): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, intervalMs);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [intervalMs]);
  return now;
}

export function useReward() {
  const reward = useSyncExternalStore(rewardStore.subscribe, rewardStore.get, rewardStore.getServer);
  const played = useSyncExternalStore(playedStore.subscribe, playedStore.get, playedStore.getServer);
  const now = useNow(1000);
  const active = Boolean(reward && now !== null && reward.expiresAt > now);
  return { reward, played, active, now };
}

export function formatCountdown(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec].map((n) => String(n).padStart(2, "0")).join(":");
}

/* ------------------------------ Recently viewed ----------------------------- */

export const recentStore = createPersistedStore<string[]>("meridia:recent", [], Array.isArray);

export function recordView(productId: string) {
  recentStore.set((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, 8));
}

export function useRecent() {
  return useSyncExternalStore(recentStore.subscribe, recentStore.get, recentStore.getServer);
}

/* ------------------------------ Preferred size ------------------------------ */

/** The last apparel size the visitor added to the cart; pre-selected on the next product. */
export const prefSizeStore = createPersistedStore<string | null>(
  "meridia:pref-size",
  null,
  (v): v is string | null => v === null || typeof v === "string",
);

export function usePrefSize() {
  return useSyncExternalStore(prefSizeStore.subscribe, prefSizeStore.get, prefSizeStore.getServer);
}

/* --------------------------------- Orders ---------------------------------- */

export interface SavedOrder {
  id: string;
  placedAt: number;
  express: boolean;
  total: number;
  items: { name: string; color: string; size: string; qty: number }[];
}

export const ordersStore = createPersistedStore<SavedOrder[]>("meridia:orders", [], Array.isArray);

export function useOrders() {
  return useSyncExternalStore(ordersStore.subscribe, ordersStore.get, ordersStore.getServer);
}

/* ------------------------------ Saved details ------------------------------- */

export type SavedDetails = Record<string, string>;
export const detailsStore = createPersistedStore<SavedDetails | null>(
  "meridia:details",
  null,
  (v): v is SavedDetails | null => v === null || typeof v === "object",
);

export function useSavedDetails() {
  return useSyncExternalStore(detailsStore.subscribe, detailsStore.get, detailsStore.getServer);
}
