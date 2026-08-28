import type { Metadata } from 'next';
import { getProductBySlug } from '@/services/productsService';
import {
  getBaseUrl,
  QATAR_SEO_KEYWORDS,
  generateProductSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = getBaseUrl();
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Terrarium Not Found | Terra Bloom Qatar',
      description:
        'The requested handcrafted terrarium could not be found. Explore our full collection in Doha, Qatar.',
    };
  }

  const title = `${product.title} — Handcrafted Terrarium in Qatar`;
  const cleanDescription = product.description.replace(/\s+/g, ' ').trim();
  const truncatedDesc =
    cleanDescription.length > 140
      ? `${cleanDescription.slice(0, 140)}...`
      : cleanDescription;
  const description = `${product.title}: ${truncatedDesc} Handcrafted living art available for delivery across Doha, Qatar.`;
  const canonicalUrl = `${baseUrl}/products/${product.slug || slug}`;
  const imageUrl = product.image_url.startsWith('http')
    ? product.image_url
    : `${baseUrl}${product.image_url.startsWith('/') ? '' : '/'}${product.image_url}`;

  return {
    title,
    description,
    keywords: [
      product.title.toLowerCase(),
      `${product.title.toLowerCase()} qatar`,
      `${product.title.toLowerCase()} doha`,
      product.category.toLowerCase(),
      `${product.category.toLowerCase()} qatar`,
      'buy terrarium qatar',
      'handcrafted terrarium doha',
      ...QATAR_SEO_KEYWORDS,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.title} | Terra Bloom Qatar`,
      description,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${product.title} Handcrafted Terrarium Qatar`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | Terra Bloom Qatar`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductLayout({
  children,
  params,
}: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <>{children}</>;
  }

  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
    { name: product.category || 'Collection', url: `/shop?category=${product.category_slug || ''}` },
    { name: product.title, url: `/products/${product.slug || slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productSchema, breadcrumbSchema]),
        }}
      />
      {children}
    </>
  );
}
