import type { MetadataRoute } from "next";
import { CATEGORIES, PRODUCTS } from "@data/products";
import { INFO_PAGE_SLUGS } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({ url: siteUrl(path), lastModified: now, priority });
  return [
    page("", 1),
    page("shop/", 0.9),
    ...PRODUCTS.map((p) => ({
      ...page(`product/${p.slug}/`, 0.9),
      images: p.colors.flatMap((c) => c.images ?? []).map((src) => siteUrl(src)),
    })),
    ...CATEGORIES.map((c) => page(`shop/${c.slug}/`, 0.7)),
    page("new-in/", 0.7),
    page("best-sellers/", 0.7),
    page("collections/", 0.6),
    page("quiz/", 0.6),
    ...INFO_PAGE_SLUGS.map((s) => page(`info/${s}/`, 0.3)),
    page("track/", 0.2),
    page("returns/", 0.2),
  ];
}
