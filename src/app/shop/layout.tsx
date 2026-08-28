import type { Metadata } from 'next';
import {
  getBaseUrl,
  QATAR_SEO_KEYWORDS,
  generateCollectionSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo';

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: 'Shop Handcrafted Terrariums in Qatar — Closed, Open & Paludariums',
  description:
    'Browse our curated collection of handcrafted terrariums, moss jars, and paludariums in Doha, Qatar. Self-sustaining miniature ecosystems with fast delivery across Qatar.',
  keywords: [
    'buy terrarium online qatar',
    'shop terrariums doha',
    'closed terrariums qatar',
    'open terrariums doha',
    'paludarium qatar',
    'moss jars doha',
    ...QATAR_SEO_KEYWORDS,
  ],
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: 'Shop Handcrafted Terrariums in Qatar | Terra Bloom',
    description:
      'Explore handcrafted terrariums, moss jars, and paludariums in Doha, Qatar. Living art pieces with local delivery.',
    url: `${baseUrl}/shop`,
    images: [
      {
        url: '/images/qatar-baner.png',
        width: 1200,
        height: 630,
        alt: 'Shop Handcrafted Terrariums in Doha Qatar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop Handcrafted Terrariums in Qatar | Terra Bloom',
    description:
      'Explore handcrafted terrariums, moss jars, and paludariums in Doha, Qatar. Living art pieces with local delivery.',
    images: ['/images/qatar-baner.png'],
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collectionSchema = generateCollectionSchema(
    'Handcrafted Terrariums Collection — Qatar',
    'Curated collection of closed terrariums, open terrariums, paludariums, and moss art in Doha, Qatar.',
    '/shop'
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionSchema, breadcrumbSchema]),
        }}
      />
      {children}
    </>
  );
}
