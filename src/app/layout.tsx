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
import { ScratchAutoOpen, ScratchModal } from "@/components/engage/ScratchModal";
import { GiftButton } from "@/components/engage/GiftButton";
import { ExitIntentWatcher, ExitModal } from "@/components/engage/ExitIntent";
import { TabNudge } from "@/components/engage/TabNudge";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { RouteCurtain } from "@/components/layout/RouteCurtain";
import { Intro } from "@/components/layout/Intro";
import { siteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

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

const OG_IMAGE = { url: siteUrl("editorial/1-studio.jpg"), width: 1152, height: 2048, alt: "MERIDIA — campagna Primavera/Estate 27" };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "MERIDIA — Sensibilità europea. Design senza tempo.",
    template: "%s · MERIDIA",
  },
  description:
    "MERIDIA: capsule di abbigliamento uomo dal gusto europeo. Polo a righe, camicia in lino, maglia di lino, cappello e bracciale in fibre naturali. Spedizione gratuita sopra i 149 €, reso gratuito in 14 giorni.",
  alternates: { canonical: siteUrl() },
  openGraph: {
    title: "MERIDIA — Sensibilità europea. Design senza tempo.",
    description: "Una capsule di cinque pezzi essenziali in fibre naturali, disegnata in Europa. Primavera/Estate 27.",
    url: siteUrl(),
    siteName: "MERIDIA",
    type: "website",
    locale: "it_IT",
    alternateLocale: ["en_GB"],
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "MERIDIA — Sensibilità europea. Design senza tempo.",
    description: "Una capsule di cinque pezzi essenziali in fibre naturali, disegnata in Europa.",
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${cormorant.variable} ${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Play the crest intro only on the first page load of a visit */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('meridia:intro')){document.documentElement.classList.add('intro-seen')}else{sessionStorage.setItem('meridia:intro','1')}}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "MERIDIA",
              url: siteUrl(),
              logo: siteUrl("brand/meridia-crest-600.jpg"),
              slogan: "European sensibility. Timeless design. Everyday sophistication.",
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MERIDIA",
              url: siteUrl(),
              inLanguage: ["it-IT", "en-GB"],
            },
          ]}
        />
        <Intro />
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
          <GiftButton />
          <ScratchAutoOpen />
          <ScratchModal />
          <ExitIntentWatcher />
          <ExitModal />
          <TabNudge />
          <SmoothScroll />
          <RouteCurtain />
        </Providers>
      </body>
    </html>
  );
}
