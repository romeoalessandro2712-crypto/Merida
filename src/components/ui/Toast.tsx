"use client";

import { useUI } from "@/lib/providers";
import { cn } from "@/lib/format";
import { CheckIcon } from "./Icons";

export function Toast() {
  const { toast } = useUI();
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-24 lg:bottom-6 left-1/2 z-[60] -translate-x-1/2 transition-all duration-400",
        toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none",
      )}
    >
      {toast && (
        <div className="flex items-center gap-3 border border-line bg-cream px-5 py-3 text-sm text-navy shadow-[0_8px_30px_-12px_rgba(27,42,68,0.25)]">
          <CheckIcon className="text-olive" />
          {toast}
        </div>
      )}
    </div>
  );
}
