import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Terra Bloom — Handcrafted Terrariums Qatar',
    short_name: 'Terra Bloom',
    description:
      'Handcrafted terrariums, miniature ecosystems, and living botanical art delivered across Doha, Qatar.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f6f2',
    theme_color: '#2c4028',
    icons: [
      {
        src: '/images/logo.jpeg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/images/logo.jpeg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
