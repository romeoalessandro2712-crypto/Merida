# MERIDIA — conversion & visibility audit (24 Nov 2026)

Plugins used: design critique, UX copy, SEO & AI visibility (small-business), plus vidIQ image
generation for on-model photos. Not used: finance, hiring, CRM, ads plugins (not relevant to a
storefront). Marketing connectors (HubSpot, Klaviyo, Canva, Figma, Amplitude…) failed to connect
in this session, so no live analytics were available: findings come from the site itself.

## Top findings and what shipped

| # | Finding | Impact | Fix shipped |
|---|---|---|---|
| 1 | No real people in photos; illustrations only | High | 6 AI on-model photos: 4 product photos, 2 campaign panels. Photo-first cards and gallery |
| 2 | Scratch card interrupted visitors after 4.5 s on arrival (also discouraged by Google on mobile) | High | Opens only after real interest: 40% scroll, a 2nd page view, or 25 s |
| 3 | Products not visible on the first phone screen; home was ~17 screens long with duplicate grids | High | "Stories" rail with all 5 pieces under the hero; removed duplicate category tiles and best-seller grid; shorter hero on phones |
| 4 | No structured data, no social card, no canonical, no sitemap/robots/llms.txt; English meta on an Italian page | High | Product, Offer, shipping & free-return policy, Breadcrumb, Organization, WebSite and FAQ JSON-LD; Open Graph/Twitter cards with real photos; canonicals; sitemap with images; robots.txt; llms.txt; Italian metadata |
| 5 | Small grey text below WCAG contrast; unnamed images; 14 px swatch targets | Medium | Darker taupe/olive, decorative images hidden from screen readers, 24 px swatches. Axe WCAG A/AA: 0 violations on 8 pages × desktop/phone |
| 6 | CTA copy | Medium | Price on the add-to-cart button, hero 2nd CTA → style quiz, clearer empty-cart and gift copy |
| 7 | No easy sharing for social traffic | Medium | Native share button on product pages (WhatsApp, Instagram DMs…) |

## Deliberately not done
- No fake ratings, review counts, viewer counters or countdowns (misleading; risk under EU consumer law).
- No AggregateRating in structured data: MERIDIA has no collected reviews.

## Known limits
- AI photos: the striped polo in the terracotta campaign photo has slightly soft stripes on the
  shoulders after 3 attempts; replace with a real shoot before any commercial use.
- robots.txt and llms.txt only take effect at a domain root, i.e. once the site has its own domain.
- Recheck SEO in ~30 days; there is no ranking guarantee.

## ElevenLabs (24 Nov 2026)
- **Voice stylist** (agent "MERIDIA Stylist", id agent_5001m86h3kjgf7gt7kkc6pkjngdx): answers only from the
  "MERIDIA store facts" knowledge base; Italian voice "Luca", English via language detection.
  Loaded on tap only (no third-party script or microphone prompt on page load); hidden on checkout.
  Tests: sizing, no invented products, shipping/returns in English — 3/3 passed.
- **Narrated brand story** (32 s, Italian) in the philosophy section, with transcript; never autoplays.
- Privacy page updated to disclose that stylist conversations are processed by ElevenLabs.
