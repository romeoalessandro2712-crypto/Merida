"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getLenis } from "@/lib/smooth-scroll";
import { CloseIcon } from "./Icons";
import { cn } from "@/lib/format";

/** Centred dialog with backdrop, Escape to close, focus on open and paused smooth-scroll. */
export function ModalShell({
  labelledBy,
  onClose,
  closeLabel,
  children,
  className,
}: {
  labelledBy: string;
  onClose: () => void;
  closeLabel: string;
  children: ReactNode;
  className?: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    getLenis()?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      getLenis()?.start();
      prev?.focus?.();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-[3px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        data-lenis-prevent
        className={cn(
          "modal-in relative max-h-[92svh] w-full max-w-md overflow-y-auto border border-line bg-cream px-6 pb-8 pt-10 text-center shadow-[0_40px_80px_-30px_rgba(18,28,48,0.6)] sm:px-8",
          className,
        )}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-3 top-3 p-2 text-navy hover:text-chocolate"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
}
