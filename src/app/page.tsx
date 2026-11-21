import { Hero } from "@/components/home/Hero";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { ScrollZoom } from "@/components/home/ScrollZoom";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { BestSellers } from "@/components/home/BestSellers";
import { BrandStory } from "@/components/home/BrandStory";
import { Reviews } from "@/components/home/Reviews";
import { Community } from "@/components/home/Community";
import { Newsletter } from "@/components/home/Newsletter";
import { QuizPromo } from "@/components/home/QuizPromo";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";

export default function HomePage() {
  return (
    // -mb-24 lets the newsletter sit flush against the footer
    <div className="-mb-24">
      <Hero />
      <TrustMarquee />
      <FeaturedCarousel />
      <ShopByCategory />
      <ScrollZoom />
      <CategoryTiles />
      <QuizPromo />
      <BestSellers />
      <BrandStory />
      <RecentlyViewed className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24" />
      <Reviews />
      <Community />
      <Newsletter />
    </div>
  );
}
