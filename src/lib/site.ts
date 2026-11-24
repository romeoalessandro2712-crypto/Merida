/** Absolute site address, used for canonical URLs, social cards, sitemap and structured data. */
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://romeoalessandro2712-crypto.github.io";
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** siteUrl("product/x/") → https://…/Merida/product/x/ */
export function siteUrl(path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return `${SITE_ORIGIN}${BASE_PATH}/${clean}`;
}
