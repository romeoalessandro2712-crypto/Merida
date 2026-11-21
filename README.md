# MERIDIA — concept storefront

> European sensibility. Timeless design. Everyday sophistication.

A front-end-only e-commerce storefront for **MERIDIA**, a concept European accessible-premium
menswear brand (business casual, quiet luxury). Built for a university project: realistic UX,
mock data, no real payments and no backend.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (theme tokens in `src/app/globals.css`)
- `next/font` for Cormorant Garamond (headlines) and Inter (body/UI)
- Zero runtime dependencies beyond React/Next. Deployable on Vercel as-is.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` produces a fully static export of every route.

## Where things live

| Path | What |
| --- | --- |
| `data/products.ts` | **The catalogue.** Products, categories, looks, prices, colours, sizes, copy (IT/EN). Edit this to change what the store sells. |
| `src/lib/i18n.ts` | All UI strings in Italian (default) and English. |
| `src/lib/providers.tsx` | Cart, wishlist, language and drawer state. Cart/wishlist/language persist in `localStorage`. |
| `src/components/product/ProductImage.tsx` | The single image component. Renders a tonal placeholder until real photos exist. |
| `src/app/` | Routes: `/`, `/shop`, `/shop/[category]`, `/new-in`, `/best-sellers`, `/collections`, `/product/[slug]`, `/checkout`, `/checkout/success`, `/info/[slug]`. |
| `public/brand/` | The MERIDIA crest. |

## Adding real photography

Every image on the site goes through `<ProductImage>`. While a product colour has no `images`,
it renders a gradient placeholder derived from the colour's hex. To use real photos, add file
paths to the colour in `data/products.ts`:

```ts
{ id: "navy", name: { it: "Blu navy", en: "Navy" }, hex: "#1b2a44",
  images: ["/products/ercole-navy-1.jpg", "/products/ercole-navy-2.jpg"] }
```

Drop the files into `public/products/` (portrait 4:5 works best). Product cards use the first
image; the product page gallery uses all of them. The hero, category tiles and brand story
block take a `src` prop in the same way.

## Notes

- The reviews section is intentionally filled with clearly labelled placeholders.
- Checkout validates the form and then clears the cart and shows a mock order number. No data
  leaves the browser.
- Language preference is stored under `meridia:locale`, cart under `meridia:cart`, wishlist
  under `meridia:wishlist`.

## Publishing on GitHub Pages

The repo ships with `.github/workflows/pages.yml`. After pushing to `main`:

1. On GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to go green (about 2 minutes).
3. The site is live at `https://<your-username>.github.io/<repo-name>/`.

The workflow builds a static export with the repo name as the base path, so links and images
resolve under that sub-folder automatically.
