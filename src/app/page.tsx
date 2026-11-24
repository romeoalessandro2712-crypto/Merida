import { Hero } from "@/components/home/Hero";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { ScrollZoom } from "@/components/home/ScrollZoom";
import { BrandStory } from "@/components/home/BrandStory";
import { Reviews } from "@/components/home/Reviews";
import { Community } from "@/components/home/Community";
import { Newsletter } from "@/components/home/Newsletter";
import { QuizPromo } from "@/components/home/QuizPromo";
import { Manifesto } from "@/components/home/Manifesto";
import { HomeFaq } from "@/components/home/HomeFaq";
import { EditorialSplit } from "@/components/home/EditorialSplit";
import { StoriesRail } from "@/components/home/StoriesRail";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/i18n";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";

export default function HomePage() {
  return (
    // -mb-24 lets the newsletter sit flush against the footer
    <div className="-mb-24">
      {/* Mirrors the visible FAQ section (Italian, the default language). */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: getDictionary("it").homeFaq.items.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }}
      />
      <Hero />
      <StoriesRail />
      <TrustMarquee />
      <FeaturedCarousel />
      <EditorialSplit />
      <ShopByCategory />
      <ScrollZoom />
      <QuizPromo />
      <BrandStory />
      <RecentlyViewed className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24" />
      <Reviews />
      <Community />
      <Manifesto />
      <HomeFaq />
      <Newsletter />
    </div>
  );
}
