"use client";

import type { Product } from "@data/products";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/format";

const WIDTHS = {
  3: "lg:w-[calc((100%-3rem)/3)]",
  4: "lg:w-[calc((100%-4.5rem)/4)]",
  5: "lg:w-[calc((100%-6rem)/5)]",
} as const;

/** Centred flex grid, so a small capsule (e.g. 5 pieces) never leaves a lonely last row on the left. */
export function ProductGrid({
  products,
  ranked,
  columns = 4,
  className,
}: {
  products: Product[];
  ranked?: boolean;
  columns?: 3 | 4 | 5;
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap justify-center gap-x-4 gap-y-12 md:gap-x-6", className)}>
      {products.map((p, i) => (
        <li
          key={p.id}
          className={cn("card-in w-[calc(50%-0.5rem)] md:w-[calc(50%-0.75rem)]", WIDTHS[columns])}
          style={{ animationDelay: `${Math.min(i, 8) * 70}ms` }}
        >
          <ProductCard product={p} rank={ranked ? i + 1 : undefined} priority={i < 4} />
        </li>
      ))}
    </ul>
  );
}
