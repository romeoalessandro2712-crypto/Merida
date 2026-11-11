/**
 * Tiny localStorage-backed external store, consumed via useSyncExternalStore.
 * - Server snapshot is always `initial` (so SSR markup is deterministic).
 * - First client read lazily loads from localStorage; React re-renders after hydration.
 */
export interface PersistedStore<T> {
  get: () => T;
  getServer: () => T;
  set: (updater: T | ((prev: T) => T)) => void;
  subscribe: (listener: () => void) => () => void;
}

export function createPersistedStore<T>(key: string, initial: T, validate?: (v: unknown) => v is T): PersistedStore<T> {
  let value: T = initial;
  let loaded = false;
  const listeners = new Set<() => void>();

  const load = () => {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        const parsed: unknown = JSON.parse(raw);
        if (!validate || validate(parsed)) value = parsed as T;
      }
    } catch {
      /* ignore corrupted or unavailable storage */
    }
  };

  const persist = () => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* private mode / quota — state still lives in memory */
    }
  };

  // Keep tabs in sync.
  if (typeof window !== "undefined") {
    window.addEventListener("storage", (e) => {
      if (e.key !== key) return;
      loaded = false;
      load();
      listeners.forEach((l) => l());
    });
  }

  return {
    get: () => {
      load();
      return value;
    },
    getServer: () => initial,
    set: (updater) => {
      load();
      value = typeof updater === "function" ? (updater as (prev: T) => T)(value) : updater;
      persist();
      listeners.forEach((l) => l());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
