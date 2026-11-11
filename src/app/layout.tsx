import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/cart/WishlistDrawer";
import { Toast } from "@/components/ui/Toast";
import { SkipLink } from "@/components/layout/SkipLink";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MERIDIA — European sensibility. Timeless design. Everyday sophistication.",
    template: "%s · MERIDIA",
  },
  description:
    "MERIDIA is a concept European accessible-premium clothing brand: business casual essentials with a quiet, timeless sensibility. Autumn/Winter 26 available now.",
  openGraph: {
    title: "MERIDIA",
    description: "European sensibility. Timeless design. Everyday sophistication.",
    type: "website",
    locale: "it_IT",
    alternateLocale: ["en_GB"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${cormorant.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <SkipLink />
          <AnnouncementBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileMenu />
          <SearchOverlay />
          <CartDrawer />
          <WishlistDrawer />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
