"use client";

import { useT } from "@/lib/providers";

export function AnnouncementBar() {
  const { t } = useT();
  return (
    <div className="bg-navy text-cream">
      <p className="label mx-auto max-w-7xl px-4 py-2.5 text-center text-[0.62rem] md:text-[0.66rem] tracking-[0.16em]">
        {t.announcement}
      </p>
    </div>
  );
}
