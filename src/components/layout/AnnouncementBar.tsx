"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/providers";

/** Rotates through the current offers every few seconds. */
export function AnnouncementBar() {
  const { t } = useT();
  const [i, setI] = useState(0);
  const items = t.announcements;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % items.length), 4500);
    return () => window.clearInterval(id);
  }, [items.length]);

  return (
    <div className="bg-navy text-cream">
      <p
        key={i}
        className="label mx-auto max-w-7xl animate-fade-up px-4 py-2.5 text-center text-[0.62rem] tracking-[0.16em] md:text-[0.66rem]"
      >
        {items[i % items.length]}
      </p>
    </div>
  );
}
