import type { Metadata } from "next";
import { getBestSellers } from "@data/products";
import { ShopPageClient } from "../shop/ShopPageClient";

export const metadata: Metadata = { title: "Best Sellers" };

export default function BestSellersPage() {
  return <ShopPageClient products={getBestSellers(12)} mode="best-sellers" />;
}
