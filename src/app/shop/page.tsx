import type { Metadata } from "next";
import { PRODUCTS } from "@data/products";
import { ShopPageClient } from "./ShopPageClient";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return <ShopPageClient products={PRODUCTS} mode="shop" />;
}
