-- ============================================================
-- Terra Bloom — Supabase Database Schema
-- Run this in your Supabase SQL Editor to set up all tables
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---- Hero Banners ----
CREATE TABLE IF NOT EXISTS hero_banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  image_url TEXT NOT NULL,
  badge_text TEXT,
  cta_text TEXT DEFAULT 'Shop Terrariums',
  cta_link TEXT DEFAULT '/shop',
  display_order INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---- Products ----
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  image_url TEXT NOT NULL,
  images TEXT[],
  description TEXT NOT NULL,
  care_instructions TEXT,
  best_seller BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---- Store Settings (single-row) ----
CREATE TABLE IF NOT EXISTS store_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_name TEXT DEFAULT 'Terra Bloom',
  tagline TEXT DEFAULT 'A World Within Glass',
  whatsapp_number TEXT NOT NULL DEFAULT '919876543210',
  contact_email TEXT DEFAULT 'hello@terrabloom.in',
  contact_phone TEXT DEFAULT '+91 98765 43210',
  address TEXT DEFAULT 'Bangalore, Karnataka, India',
  announcement_text TEXT DEFAULT 'Handcrafted mini ecosystems, delivered with care across India.',
  instagram_url TEXT,
  facebook_url TEXT,
  youtube_url TEXT,
  pinterest_url TEXT,
  promo_title TEXT DEFAULT 'Bring Nature Closer to You',
  promo_description TEXT DEFAULT 'Our terrariums are more than décor...',
  promo_video_url TEXT,
  promo_button_text TEXT DEFAULT 'Explore Collection',
  promo_button_link TEXT DEFAULT '/shop'
);

-- ---- Categories ----
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image_url TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---- Indexes ----
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_best_seller ON products(best_seller);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(active);
CREATE INDEX IF NOT EXISTS idx_banners_active ON hero_banners(active);

-- ---- RLS Policies (enable Row Level Security) ----
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read access for storefront
CREATE POLICY "Public read banners" ON hero_banners FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON store_settings FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);

-- Authenticated full access (for admin) — requires Supabase auth setup
CREATE POLICY "Admin full access banners" ON hero_banners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access settings" ON store_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access categories" ON categories FOR ALL USING (auth.role() = 'authenticated');

-- ---- Seed: Default Store Settings ----
INSERT INTO store_settings (store_name, tagline, whatsapp_number, contact_email, contact_phone, address, announcement_text)
VALUES ('Terra Bloom', 'A World Within Glass', '919876543210', 'hello@terrabloom.in', '+91 98765 43210', 'Bangalore, Karnataka, India', 'Handcrafted mini ecosystems, delivered with care across Qatar.')
ON CONFLICT DO NOTHING;
