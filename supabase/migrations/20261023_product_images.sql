-- Run this migration in the Supabase SQL Editor to support up to five
-- product images. Existing products keep their current image as image #1.

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS images TEXT[];

UPDATE public.products AS product
SET images = ARRAY[product.image_url] || ARRAY(
  SELECT image
  FROM unnest(COALESCE(product.images, ARRAY[]::TEXT[])) AS images_to_keep(image)
  WHERE image IS NOT NULL
    AND image <> ''
    AND image <> product.image_url
  LIMIT 4
);

ALTER TABLE public.products
  ALTER COLUMN images SET DEFAULT ARRAY[]::TEXT[],
  ALTER COLUMN images SET NOT NULL;

ALTER TABLE public.products
  DROP CONSTRAINT IF EXISTS products_images_max_five;

ALTER TABLE public.products
  ADD CONSTRAINT products_images_max_five
  CHECK (cardinality(images) <= 5);
