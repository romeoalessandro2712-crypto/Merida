"use client";

import { useT } from "@/lib/providers";

export function TrustMarquee() {
  const { t } = useT();
  const items = t.trust;
  // Duplicate the list so the marquee loops seamlessly (-50% translate).
  const track = [...items, ...items, ...items, ...items];
  return (
    <div className="border-y border-line bg-ecru overflow-hidden" aria-label="Store guarantees">
      {/* Screen-reader friendly static list */}
      <ul className="sr-only">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="flex w-max animate-marquee py-3.5 hover:[animation-play-state:paused]">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {track.map((item, i) => (
              <span key={`${half}-${i}`} className="label text-navy flex items-center">
                <span className="px-8">{item}</span>
                <span className="text-taupe">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
