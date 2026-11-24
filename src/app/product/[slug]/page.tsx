import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, FREE_SHIPPING_THRESHOLD, PRODUCTS, getProduct, getRelatedProducts } from "@data/products";
import { siteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductPageClient } from "./ProductPageClient";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Prodotto" };
  const photo = p.colors.find((c) => c.images?.length)?.images?.[0];
  const image = photo ? siteUrl(photo) : siteUrl("editorial/1-studio.jpg");
  const description = `${p.tagline.it} ${p.description.it}`.slice(0, 158);
  return {
    title: p.name,
    description,
    alternates: { canonical: siteUrl(`product/${p.slug}/`) },
    openGraph: { title: `${p.name} · MERIDIA`, description, url: siteUrl(`product/${p.slug}/`), images: [{ url: image, alt: p.name }], type: "website" },
    twitter: { card: "summary_large_image", title: `${p.name} · MERIDIA`, description, images: [image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const url = siteUrl(`product/${product.slug}/`);
  const images = product.colors.flatMap((c) => c.images ?? []).map((src) => siteUrl(src));
  const category = CATEGORIES.find((c) => c.slug === product.category);
  // Only facts that are visible on the page: name, description, price, colours, composition, returns.
  // No ratings: MERIDIA has no collected reviews yet.
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description.it,
      sku: product.id.toUpperCase(),
      brand: { "@type": "Brand", name: "MERIDIA" },
      ...(images.length ? { image: images } : {}),
      color: product.colors.map((c) => c.name.it).join(", "),
      material: product.origin.composition.it,
      offers: {
        "@type": "Offer",
        url,
        price: product.price.toFixed(2),
        priceCurrency: "EUR",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: { "@type": "MonetaryAmount", value: product.price >= FREE_SHIPPING_THRESHOLD ? "0" : "6.90", currency: "EUR" },
          shippingDestination: { "@type": "DefinedRegion", addressCountry: "IT" },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
            transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 4, unitCode: "DAY" },
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "IT",
          returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 14,
          returnFees: "https://schema.org/FreeReturn",
          returnMethod: "https://schema.org/ReturnByMail",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl() },
        { "@type": "ListItem", position: 2, name: "Shop", item: siteUrl("shop/") },
        ...(category ? [{ "@type": "ListItem", position: 3, name: category.name.it, item: siteUrl(`shop/${category.slug}/`) }] : []),
        { "@type": "ListItem", position: category ? 4 : 3, name: product.name, item: url },
      ],
    },
  ];
  return (
    <>
      <JsonLd data={structured} />
      <ProductPageClient product={product} related={getRelatedProducts(product, 4)} />
    </>
  );
}
