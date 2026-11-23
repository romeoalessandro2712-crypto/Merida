// Scans public/products/<slug>/<colour>-<n>.(jpg|jpeg|png|webp) and public/editorial/*.(jpg|...)
// and writes data/photo-manifest.json, which the catalogue reads. Runs before every build.
import { readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const IMG = /\.(jpe?g|png|webp|avif)$/i;
const manifest = { products: {}, editorial: [] };

const productsDir = join(ROOT, "public/products");
if (existsSync(productsDir)) {
  for (const slug of readdirSync(productsDir)) {
    const dir = join(productsDir, slug);
    if (!statSync(dir).isDirectory()) continue;
    for (const file of readdirSync(dir).filter((f) => IMG.test(f)).sort()) {
      const m = file.match(/^([a-z0-9]+)-(\d+)\./i);
      if (!m) continue;
      const [, colour] = m;
      manifest.products[slug] ??= {};
      (manifest.products[slug][colour] ??= []).push(`/products/${slug}/${file}`);
    }
  }
}

const editorialDir = join(ROOT, "public/editorial");
if (existsSync(editorialDir)) {
  manifest.editorial = readdirSync(editorialDir).filter((f) => IMG.test(f)).sort().map((f) => `/editorial/${f}`);
}

writeFileSync(join(ROOT, "data/photo-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
const count = Object.values(manifest.products).flatMap((c) => Object.values(c).flat()).length;
console.log(`photo manifest: ${count} product photo(s), ${manifest.editorial.length} editorial photo(s)`);
