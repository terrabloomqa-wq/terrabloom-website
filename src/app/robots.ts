import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/shop', '/about', '/contact', '/products/', '/images/'],
        disallow: ['/admin', '/admin/*', '/api', '/api/*'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/shop', '/about', '/contact', '/products/', '/images/'],
        disallow: ['/admin', '/admin/*', '/api', '/api/*'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/'],
        disallow: ['/admin'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
