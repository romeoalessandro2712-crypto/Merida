import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Note: crawlers only read robots.txt at the domain root. On a GitHub Pages project URL
 * (…github.io/Merida/) this file is not at the root, so it takes effect once the site
 * moves to its own domain. Search and AI crawlers are allowed explicitly.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...["ClaudeBot", "GPTBot", "OAI-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"].map((ua) => ({
        userAgent: ua,
        allow: "/",
      })),
    ],
    sitemap: siteUrl("sitemap.xml"),
  };
}
