"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/format";
import { CloseIcon } from "./Icons";

/**
 * Accessible slide-in panel. Side "right" for cart/wishlist, "left" for the mobile menu,
 * "top" for search. Stays mounted so the transition can play both ways.
 */
export function Drawer({
  open,
  onClose,
  title,
  side = "right",
  closeLabel,
  children,
  footer,
  id,
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  side?: "right" | "left" | "top";
  closeLabel: string;
  children: ReactNode;
  footer?: ReactNode;
  id: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastActive = useRef<HTMLElement | null>(null);

  // Move focus into the panel when it opens, restore when it closes.
  useEffect(() => {
    if (open) {
      lastActive.current = document.activeElement as HTMLElement | null;
      const first = panelRef.current?.querySelector<HTMLElement>("button, [href], input, select, textarea");
      first?.focus();
    } else {
      lastActive.current?.focus?.();
    }
  }, [open]);

  // Simple focus trap.
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const position = {
    right: "top-0 right-0 h-full w-full max-w-md",
    left: "top-0 left-0 h-full w-full max-w-sm",
    top: "top-0 left-0 w-full max-h-[85vh]",
  }[side];

  const transform = {
    right: open ? "translate-x-0" : "translate-x-full",
    left: open ? "translate-x-0" : "-translate-x-full",
    top: open ? "translate-y-0" : "-translate-y-full",
  }[side];

  return (
    <div className={cn("fixed inset-0 z-50", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-charcoal/30 transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        id={id}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        onKeyDown={onKeyDown}
        className={cn(
          "absolute flex flex-col bg-cream shadow-[0_0_0_1px_var(--color-line)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          position,
          transform,
        )}
      >
        <header className="flex items-center justify-between border-b border-line px-6 h-16 shrink-0">
          <h2 id={`${id}-title`} className="font-serif text-2xl text-navy">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="-mr-2 p-2 text-navy hover:text-chocolate transition-colors"
          >
            <CloseIcon />
          </button>
        </header>
        <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">{children}</div>
        {footer && <footer className="shrink-0 border-t border-line px-6 py-5">{footer}</footer>}
      </div>
    </div>
  );
}
