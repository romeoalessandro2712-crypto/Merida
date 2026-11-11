import { Hero } from "@/components/home/Hero";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { BestSellers } from "@/components/home/BestSellers";
import { BrandStory } from "@/components/home/BrandStory";
import { Reviews } from "@/components/home/Reviews";
import { Community } from "@/components/home/Community";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <ShopByCategory />
      <CategoryTiles />
      <BestSellers />
      <BrandStory />
      <Reviews />
      <Community />
      <Newsletter />
    </>
  );
}
