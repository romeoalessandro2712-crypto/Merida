import type { Metadata } from "next";
import { getNewIn } from "@data/products";
import { ShopPageClient } from "../shop/ShopPageClient";

export const metadata: Metadata = { title: "New In" };

export default function NewInPage() {
  return <ShopPageClient products={getNewIn()} mode="new-in" />;
}
