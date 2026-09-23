import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { Cursor } from "@/components/motion/Cursor";
import { RevealRoot } from "@/components/motion/RevealRoot";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollToTop } from "@/components/navigation/ScrollToTop";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { restaurantJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "High Spirits | Authentic Indian Fine Dining & Buffet in Bunbury",
    template: "%s | High Spirits",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Indian restaurant Bunbury",
    "Indian buffet Bunbury",
    "Punjabi restaurant",
    "fine dining Bunbury",
    "High Spirits",
    "butter chicken Bunbury",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: "High Spirits — Luxury Indian Fine Dining in Bunbury",
    description: "Authentic Punjabi and North Indian cuisine in an elegant setting on Victoria Street, Bunbury.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "The emerald dining room at High Spirits" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "High Spirits — Luxury Indian Fine Dining in Bunbury",
    description: "Authentic Punjabi and North Indian cuisine in an elegant setting on Victoria Street, Bunbury.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04251a",
  colorScheme: "dark",
};

// Adds `.js` before first paint so reveal styles only apply when scripts run,
// and falls back to showing everything if the reveal observer never mounts.
const bootScript = `document.documentElement.classList.add('js');setTimeout(function(){var d=document.documentElement;if(!d.classList.contains('reveal-ready'))d.classList.add('reveal-fallback')},4000);`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <CartProvider>
          <div aria-hidden className="scroll-progress" />
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
          <CartDrawer />
          <ScrollToTop />
          <SmoothScroll />
          <RevealRoot />
          <Cursor />
          <JsonLd data={restaurantJsonLd()} />
        </CartProvider>
      </body>
    </html>
  );
}
