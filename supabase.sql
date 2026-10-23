-- 1. Hero Banners Table
CREATE TABLE hero_banners (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  subtitle text NOT NULL,
  image_url text NOT NULL,
  badge_text text,
  cta_text text,
  cta_link text,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Products Table
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  category_slug text NOT NULL,
  price integer NOT NULL,
  original_price integer,
  image_url text NOT NULL,
  images text[] NOT NULL DEFAULT '{}',
  description text NOT NULL,
  care_instructions text,
  best_seller boolean DEFAULT false,
  featured boolean DEFAULT false,
  in_stock boolean DEFAULT true,
  tags text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE products
  ADD CONSTRAINT products_images_max_five CHECK (cardinality(images) <= 5);

-- Enable RLS (Row Level Security) and add public read policies
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access for Banners" ON hero_banners FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Products" ON products FOR SELECT USING (true);

-- Note: Since you're creating the admin manually from Supabase, 
-- you can manage these tables directly from the Supabase dashboard 
-- or add a policy allowing all operations if you want your local admin panel to work without Supabase Auth.
CREATE POLICY "Full Access for Admin" ON hero_banners FOR ALL USING (true);
CREATE POLICY "Full Access for Admin" ON products FOR ALL USING (true);

-- 3. Categories Table
CREATE TABLE categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  image_url text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Access for Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Full Access for Admin" ON categories FOR ALL USING (true);
