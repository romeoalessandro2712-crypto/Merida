import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, getRelatedProducts } from "@data/products";
import { ProductPageClient } from "./ProductPageClient";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product" };
  return { title: p.name, description: p.description.en };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductPageClient product={product} related={getRelatedProducts(product, 4)} />;
}
