import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory, getProductsByCategory, type CategorySlug } from "@data/products";
import { ShopPageClient } from "../ShopPageClient";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "Shop" };
  return { title: cat.name.it, description: `${cat.name.it} MERIDIA: ${cat.blurb.it}`, alternates: { canonical: siteUrl(`shop/${cat.slug}/`) } };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  return <ShopPageClient products={getProductsByCategory(cat.slug as CategorySlug)} mode="category" category={cat.slug} />;
}
