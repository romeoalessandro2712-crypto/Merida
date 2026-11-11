import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INFO_PAGE_SLUGS, getDictionary, type InfoPageSlug } from "@/lib/i18n";
import { InfoPageClient } from "./InfoPageClient";

export function generateStaticParams() {
  return INFO_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!INFO_PAGE_SLUGS.includes(slug as InfoPageSlug)) return {};
  return { title: getDictionary("en").pages[slug as InfoPageSlug].title };
}

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!INFO_PAGE_SLUGS.includes(slug as InfoPageSlug)) notFound();
  return <InfoPageClient slug={slug as InfoPageSlug} />;
}
