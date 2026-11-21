"use client";

import { useEffect } from "react";
import { useCart, useT } from "@/lib/providers";

/** When the tab is in the background and the cart has items, the tab title gently reminds. */
export function TabNudge() {
  const { count } = useCart();
  const { t } = useT();

  useEffect(() => {
    let original = document.title;
    const onVis = () => {
      if (document.hidden && count > 0) {
        original = document.title;
        document.title = `(${count}) ${t.tabNudge} · MERIDIA`;
      } else if (!document.hidden && document.title.includes(t.tabNudge)) {
        document.title = original;
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [count, t.tabNudge]);

  return null;
}
