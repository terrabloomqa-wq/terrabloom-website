import type { Metadata } from 'next';
import {
  getBaseUrl,
  QATAR_SEO_KEYWORDS,
  generateBreadcrumbSchema,
} from '@/lib/seo';

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: 'Contact Terra Bloom Qatar — Custom Terrariums & Plant Orders Doha',
  description:
    'Get in touch with Terra Bloom Doha for custom terrarium commissions, corporate plant gifting in Qatar, and direct orders via WhatsApp and email.',
  keywords: [
    'contact terra bloom doha',
    'custom terrariums qatar',
    'terrarium orders doha',
    'corporate plant gifts doha',
    'plant shop contact qatar',
    ...QATAR_SEO_KEYWORDS,
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Terra Bloom Qatar — Custom Terrariums & Orders',
    description:
      'Contact our artisan team in Doha, Qatar for bespoke terrariums, bulk corporate gifts, and care advice.',
    url: `${baseUrl}/contact`,
    images: [
      {
        url: '/images/qatar-baner.png',
        width: 1200,
        height: 630,
        alt: 'Contact Terra Bloom Doha Qatar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Terra Bloom Qatar — Custom Terrariums & Orders',
    description:
      'Contact our artisan team in Doha, Qatar for bespoke terrariums, bulk corporate gifts, and care advice.',
    images: ['/images/qatar-baner.png'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${baseUrl}/contact#webpage`,
    name: 'Contact Terra Bloom Qatar',
    url: `${baseUrl}/contact`,
    description:
      'Contact Terra Bloom for handcrafted terrariums, custom corporate gifts, and plant care support in Doha, Qatar.',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Terra Bloom Qatar',
      telephone: '+974 5512 3456',
      email: 'info@terrabloom.qa',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Doha',
        addressRegion: 'Doha',
        addressCountry: 'QA',
      },
    },
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([contactSchema, breadcrumbSchema]),
        }}
      />
      {children}
    </>
  );
}
