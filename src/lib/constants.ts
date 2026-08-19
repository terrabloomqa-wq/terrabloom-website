// ============================================================
// Terra Bloom — Fallback / Mock Data Constants
// Used when Supabase is not configured (development / demo mode)
// ============================================================

import type { HeroBanner, Product, Category, StoreSettings, Testimonial } from '@/types';

// ---- Store Settings Defaults ----
export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  id: '',
  store_name: '',
  tagline: '',
  whatsapp_number: '',
  contact_email: '',
  contact_phone: '',
  address: '',
  announcement_text: '',
  instagram_url: '',
  facebook_url: '',
};

// ---- Categories ----
export const DEFAULT_CATEGORIES: Category[] = [];

// ---- Hero Banners ----
export const DEFAULT_BANNERS: HeroBanner[] = [];

// ---- Products ----
export const DEFAULT_PRODUCTS: Product[] = [];

// ---- Testimonials ----
export const DEFAULT_TESTIMONIALS: Testimonial[] = [];

// ---- Navigation Links ----
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

// ---- Trust Badges array moved to TrustBadges component ----
