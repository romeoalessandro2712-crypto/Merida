"use client";

import type { Badge as BadgeKind } from "@data/products";
import { useT } from "@/lib/providers";
import { cn } from "@/lib/format";

export function Badge({ kind, className }: { kind: BadgeKind; className?: string }) {
  const { t } = useT();
  const tone = {
    new: "bg-cream text-navy",
    bestseller: "bg-navy text-cream",
    exclusive: "bg-olive text-cream",
  }[kind];
  return <span className={cn("label px-2.5 py-1.5 text-[0.6rem]", tone, className)}>{t.badge[kind]}</span>;
}
