// ============================================================
// Terra Bloom — SEO Configuration & Structured Data (Qatar Market)
// ============================================================

import type { Product, StoreSettings } from '@/types';

/**
 * Resolve canonical site base URL.
 * Defaults to https://terrabloom.qa or custom domain in NEXT_PUBLIC_SITE_URL.
 */
export function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && envUrl.trim()) {
    return envUrl.replace(/\/+$/, '');
  }
  return 'https://terrabloom.qa';
}

/**
 * Qatar SEO Focus Keywords Matrix
 */
export const QATAR_SEO_KEYWORDS = [
  // Primary Focus Keywords (Qatar & Doha)
  'terrarium qatar',
  'terrariums doha',
  'handcrafted terrariums qatar',
  'buy terrarium online qatar',
  'custom terrariums doha',
  'closed terrarium qatar',
  'open terrarium doha',
  'paludarium qatar',
  'moss art doha',
  'living art qatar',
  'miniature ecosystem qatar',
  'indoor plants qatar',
  'indoor plants doha',
  'plant gifts qatar',
  'plant gifts doha',
  'eco friendly gifts qatar',
  'unique gifts doha',
  'terrarium workshop qatar',
  'terrarium delivery doha',
  'glass jar terrarium qatar',
  'botanical decor doha',
  'corporate plant gifts qatar',
];

/**
 * Default SEO Metadata for Qatar Market
 */
export const DEFAULT_SEO = {
  siteName: 'Terra Bloom Qatar',
  title: 'Terra Bloom — Handcrafted Terrariums & Living Art | Doha, Qatar',
  description:
    "Discover handcrafted terrariums, living art pieces, and miniature ecosystems in Doha, Qatar. Custom closed and open terrariums, paludariums, and eco-friendly plant gifts delivered across Qatar.",
  url: getBaseUrl(),
  ogImage: `${getBaseUrl()}/images/qatar-baner.png`,
  locale: 'en_QA',
  location: {
    city: 'Doha',
    region: 'Doha',
    country: 'QA',
    countryName: 'Qatar',
    latitude: 25.2854,
    longitude: 51.531,
  },
  currency: 'QAR',
};

/**
 * Generate Schema.org LocalBusiness / Store structured data for Google Search.
 */
export function generateLocalBusinessSchema(settings?: Partial<StoreSettings>) {
  const baseUrl = getBaseUrl();
  const address = settings?.address || 'Doha, Qatar';
  const phone = settings?.contact_phone || '+974 5512 3456';
  const email = settings?.contact_email || 'info@terrabloom.qa';

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#localbusiness`,
    name: 'Terra Bloom',
    alternateName: 'Terra Bloom Qatar',
    description:
      'Artisanal handcrafted terrariums, self-sustaining miniature ecosystems, moss art, and living botanical decor in Doha, Qatar.',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.jpeg`,
    image: `${baseUrl}/images/qatar-baner.png`,
    telephone: phone,
    email: email,
    priceRange: '$$',
    currenciesAccepted: 'QAR',
    paymentAccepted: 'Cash, Card, WhatsApp Order, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: 'Doha',
      addressRegion: 'Doha',
      addressCountry: 'QA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: DEFAULT_SEO.location.latitude,
      longitude: DEFAULT_SEO.location.longitude,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Doha',
      },
      {
        '@type': 'City',
        name: 'Lusail',
      },
      {
        '@type': 'City',
        name: 'Al Rayyan',
      },
      {
        '@type': 'City',
        name: 'Al Wakrah',
      },
      {
        '@type': 'Country',
        name: 'Qatar',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '22:00',
      },
    ],
    sameAs: [
      settings?.instagram_url || 'https://instagram.com/terrabloom.qa',
      settings?.facebook_url || 'https://facebook.com/terrabloom.qa',
    ].filter(Boolean),
  };
}

/**
 * Generate Schema.org WebSite structured data with Sitelinks Searchbox.
 */
export function generateWebSiteSchema() {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Terra Bloom',
    alternateName: 'Terra Bloom Qatar',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/shop?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-QA',
  };
}

/**
 * Generate Schema.org Product structured data for rich product snippets in Google Search.
 */
export function generateProductSchema(product: Product) {
  const baseUrl = getBaseUrl();
  const productUrl = `${baseUrl}/products/${product.slug || product.id}`;
  const imageUrl = product.image_url.startsWith('http')
    ? product.image_url
    : `${baseUrl}${product.image_url.startsWith('/') ? '' : '/'}${product.image_url}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    name: product.title,
    description: product.description,
    image: [imageUrl, ...(product.images || []).map(img => img.startsWith('http') ? img : `${baseUrl}/${img.replace(/^\//, '')}`)],
    url: productUrl,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'Terra Bloom',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'QAR',
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.in_stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: productUrl,
      seller: {
        '@type': 'Organization',
        name: 'Terra Bloom Qatar',
      },
      eligibleRegion: {
        '@type': 'Country',
        name: 'Qatar',
      },
    },
  };
}

/**
 * Generate Schema.org BreadcrumbList structured data.
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
    })),
  };
}

/**
 * Generate CollectionPage schema for the shop catalog.
 */
export function generateCollectionSchema(title: string, description: string, url: string) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${baseUrl}${url}#collection`,
    name: title,
    description: description,
    url: `${baseUrl}${url}`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      name: 'Terra Bloom',
      url: baseUrl,
    },
  };
}
