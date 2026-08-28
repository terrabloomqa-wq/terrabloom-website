import type { Metadata } from 'next';
import {
  getBaseUrl,
  QATAR_SEO_KEYWORDS,
  generateBreadcrumbSchema,
} from '@/lib/seo';

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: 'About Terra Bloom — Handcrafted Terrarium Studio in Doha, Qatar',
  description:
    'Learn about Terra Bloom in Doha, Qatar. Our artisans handcraft sustainable living ecosystems and bespoke moss art pieces with recycled glass and eco-friendly materials.',
  keywords: [
    'about terra bloom qatar',
    'terrarium makers doha',
    'botanical studio qatar',
    'sustainable plants doha',
    'handmade living art qatar',
    ...QATAR_SEO_KEYWORDS,
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Terra Bloom — Handcrafted Terrarium Studio in Doha, Qatar',
    description:
      'Bringing the beauty of nature into everyday spaces. Handcrafted terrariums made in Doha, Qatar.',
    url: `${baseUrl}/about`,
    images: [
      {
        url: '/images/qatar-baner.png',
        width: 1200,
        height: 630,
        alt: 'About Terra Bloom Qatar Handcrafted Terrariums',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Terra Bloom — Handcrafted Terrarium Studio in Doha, Qatar',
    description:
      'Bringing the beauty of nature into everyday spaces. Handcrafted terrariums made in Doha, Qatar.',
    images: ['/images/qatar-baner.png'],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${baseUrl}/about#webpage`,
    name: 'About Terra Bloom Qatar',
    url: `${baseUrl}/about`,
    description:
      'Terra Bloom is an artisan botanical studio based in Doha, Qatar, specializing in handcrafted terrariums and self-sustaining living art.',
    publisher: {
      '@type': 'Organization',
      name: 'Terra Bloom',
      logo: `${baseUrl}/images/logo.jpeg`,
    },
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([aboutSchema, breadcrumbSchema]),
        }}
      />
      {children}
    </>
  );
}
