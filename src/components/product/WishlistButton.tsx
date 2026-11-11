"use client";

import { useT, useWishlist } from "@/lib/providers";
import { HeartIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";

export function WishlistButton({ productId, className, withLabel }: { productId: string; className?: string; withLabel?: boolean }) {
  const { has, toggle } = useWishlist();
  const { t } = useT();
  const active = has(productId);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? t.card.removeFromWishlist : t.card.addToWishlist}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      className={cn(
        "inline-flex items-center gap-2 transition-colors",
        active ? "text-chocolate" : "text-navy hover:text-chocolate",
        className,
      )}
    >
      <HeartIcon filled={active} />
      {withLabel && <span className="label">{t.product.wishlist}</span>}
    </button>
  );
}
