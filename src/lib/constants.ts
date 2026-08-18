// ============================================================
// Terra Bloom — Fallback / Mock Data Constants
// Used when Supabase is not configured (development / demo mode)
// ============================================================

import type { HeroBanner, Product, Category, StoreSettings, Testimonial } from '@/types';

// ---- Store Settings Defaults ----
export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  id: 'default',
  store_name: 'Terra Bloom',
  tagline: 'A World Within Glass',
  whatsapp_number: '919876543210',
  contact_email: 'hello@terrabloom.in',
  contact_phone: '+91 98765 43210',
  address: 'Bangalore, Karnataka, India',
  announcement_text: 'Handcrafted mini ecosystems, delivered with care across Qatar.',
  instagram_url: 'https://instagram.com/terrabloom',
  facebook_url: 'https://facebook.com/terrabloom',
};

// ---- Categories ----
export const DEFAULT_CATEGORIES: Category[] = [];

// ---- Hero Banners ----
export const DEFAULT_BANNERS: HeroBanner[] = [];

// ---- Products ----
export const DEFAULT_PRODUCTS: Product[] = [];

// ---- Testimonials ----
export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Neha Sharma',
    rating: 5,
    text: 'Absolutely in love with my terrarium! It arrived in perfect condition and has added so much life to my workspace.',
  },
  {
    id: 'test-2',
    name: 'Arjun Patel',
    rating: 5,
    text: 'The craftsmanship is incredible. I ordered a custom terrarium as a gift and the recipient was thrilled!',
  },
  {
    id: 'test-3',
    name: 'Priya Menon',
    rating: 5,
    text: 'Best purchase I\'ve made this year. The Forest Globe is absolutely stunning and so easy to maintain.',
  },
  {
    id: 'test-4',
    name: 'Rahul Gupta',
    rating: 5,
    text: 'Excellent packaging and fast delivery. The terrarium looks even better in person than in the photos.',
  },
];

// ---- Navigation Links ----
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

// ---- Trust Badges array moved to TrustBadges component ----
