"use client";

import type { Product } from "@data/products";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/format";

export function ProductGrid({
  products,
  ranked,
  columns = 4,
  className,
}: {
  products: Product[];
  ranked?: boolean;
  columns?: 3 | 4;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {products.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} rank={ranked ? i + 1 : undefined} priority={i < 4} />
        </li>
      ))}
    </ul>
  );
}
