"use client";

import { useT } from "@/lib/providers";
import { cn } from "@/lib/format";

const ICONS = [
  "M3 7h11v9H3zM14 10h4l3 3v3h-7z M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  "M12 3 4 6v6c0 4.4 3.4 8.3 8 9 4.6-.7 8-4.6 8-9V6l-8-3Z M9 12l2 2 4-4",
  "M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4",
  "M5 11h14v9H5z M8 11V8a4 4 0 0 1 8 0v3",
];

export function TrustRow({ className }: { className?: string }) {
  const { t } = useT();
  return (
    <ul className={cn("grid grid-cols-2 gap-x-4 gap-y-3 border-y border-line py-4", className)}>
      {t.trustRow.map((label, i) => (
        <li key={label} className="flex items-center gap-2.5 text-[0.72rem] leading-tight text-charcoal/85">
          <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gold">
            <path d={ICONS[i]} />
          </svg>
          {label}
        </li>
      ))}
    </ul>
  );
}
