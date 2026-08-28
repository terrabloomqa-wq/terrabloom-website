import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { CartProvider } from "@/context/CartContext";
import CartSlideOver from "@/components/storefront/CartSlideOver/CartSlideOver";
import {
  getBaseUrl,
  QATAR_SEO_KEYWORDS,
  DEFAULT_SEO,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
} from "@/lib/seo";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: DEFAULT_SEO.title,
    template: "%s | Terra Bloom Qatar",
  },
  description: DEFAULT_SEO.description,
  keywords: QATAR_SEO_KEYWORDS,
  authors: [{ name: "Terra Bloom", url: baseUrl }],
  creator: "Terra Bloom",
  publisher: "Terra Bloom",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-QA": "/",
      "ar-QA": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_QA",
    url: baseUrl,
    siteName: DEFAULT_SEO.siteName,
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    images: [
      {
        url: "/images/qatar-baner.png",
        width: 1200,
        height: 630,
        alt: "Terra Bloom Handcrafted Terrariums Doha Qatar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    images: ["/images/qatar-baner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo.jpeg",
    apple: "/images/logo.jpeg",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "n0RJQ3ZwhKo716ThJNQi3H7AejZO8bGf-RFGAp0TJtE",
  },
  other: {
    "geo.region": "QA",
    "geo.placename": "Doha",
    "geo.position": "25.2854;51.5310",
    ICBM: "25.2854, 51.5310",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const localBusinessSchema = generateLocalBusinessSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([localBusinessSchema, webSiteSchema]),
          }}
        />
      </head>
      <body className="antialiased">
        <StoreProvider>
          <CartProvider>
            {children}
            <CartSlideOver />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

