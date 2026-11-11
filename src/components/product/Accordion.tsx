"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/format";
import { ChevronIcon } from "@/components/ui/Icons";

export function Accordion({ items, defaultOpen = 0 }: { items: { id: string; title: string; content: ReactNode }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<string | null>(defaultOpen === null ? null : items[defaultOpen]?.id ?? null);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`acc-${item.id}`}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between py-4 text-left label text-navy hover:text-chocolate"
              >
                {item.title}
                <ChevronIcon className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
              </button>
            </h3>
            <div
              id={`acc-${item.id}`}
              className={cn(
                "grid transition-[grid-template-rows] duration-400 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-5 text-sm leading-relaxed text-charcoal/85">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
