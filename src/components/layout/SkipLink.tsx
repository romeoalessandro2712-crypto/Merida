"use client";

import { useT } from "@/lib/providers";

export function SkipLink() {
  const { t } = useT();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-navy focus:px-4 focus:py-2 focus:text-cream label"
    >
      {t.common.skipToContent}
    </a>
  );
}
