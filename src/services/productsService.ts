// ============================================================
// Terra Bloom — Products Data Service
// ============================================================

import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { DEFAULT_PRODUCTS } from '@/lib/constants';
import type { Product } from '@/types';

/**
 * Fetch all products.
 */
export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return DEFAULT_PRODUCTS;

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching products:', error);
    return DEFAULT_PRODUCTS;
  }

  return data as Product[];
}

/**
 * Fetch best-seller products.
 * If no products are marked as best_seller, fall back to the 5 most recent products.
 */
export async function getBestSellers(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    const bestSellers = DEFAULT_PRODUCTS.filter((p) => p.best_seller);
    if (bestSellers.length > 0) return bestSellers.slice(0, 5);
    return DEFAULT_PRODUCTS.slice(0, 5);
  }

  const supabase = getSupabaseClient()!;
  
  // First, attempt to fetch up to 5 best sellers
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('best_seller', true)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching best sellers:', error);
  }

  // If we found any best sellers, return them
  if (data && data.length > 0) {
    return data as Product[];
  }

  // Fallback: If no best sellers, fetch the 5 latest products
  const { data: fallbackData, error: fallbackError } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (fallbackError || !fallbackData) {
    console.error('Error fetching fallback latest products:', fallbackError);
    const fallbackDefaults = DEFAULT_PRODUCTS.filter((p) => p.best_seller);
    if (fallbackDefaults.length > 0) return fallbackDefaults.slice(0, 5);
    return DEFAULT_PRODUCTS.slice(0, 5);
  }

  return fallbackData as Product[];
}

/**
 * Fetch products by category slug.
 */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_PRODUCTS.filter((p) => p.category_slug === categorySlug);
  }

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_slug', categorySlug)
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching products by category:', error);
    return DEFAULT_PRODUCTS.filter((p) => p.category_slug === categorySlug);
  }

  return data as Product[];
}

/**
 * Fetch a single product by ID.
 */
export async function getProductById(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_PRODUCTS.find((p) => p.id === id) || null;
  }

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching product:', error);
    return DEFAULT_PRODUCTS.find((p) => p.id === id) || null;
  }

  return data as Product;
}

/**
 * Fetch a single product by Slug.
 * Falls back to scanning all products if direct slug query returns nothing
 * (e.g. if the slug column is missing or empty in the database).
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_PRODUCTS.find((p) => p.slug === slug) || null;
  }

  const supabase = getSupabaseClient()!;

  // First: try direct slug query (fast path)
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (!error && data) {
    return data as Product;
  }

  // Fallback: fetch all products and match by slug in memory
  // This handles cases where the slug column is missing or empty in the DB
  const { data: allData, error: allError } = await supabase
    .from('products')
    .select('*');

  if (allError || !allData) {
    console.error('Error fetching products for slug fallback:', allError);
    return null;
  }

  const found = (allData as Product[]).find((p) => p.slug === slug || p.id === slug);
  return found || null;
}

/**
 * Create a new product.
 */
export async function createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    return null;
  }

  return data as Product;
}

/**
 * Update an existing product.
 */
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }

  return data as Product;
}

/**
 * Delete a product.
 */
export async function deleteProduct(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  const supabase = getSupabaseClient()!;
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }

  return true;
}
