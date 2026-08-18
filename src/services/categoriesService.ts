// ============================================================
// Terra Bloom — Categories Data Service
// ============================================================

import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { DEFAULT_CATEGORIES } from '@/lib/constants';
import type { Category } from '@/types';

/**
 * Fetch all categories.
 */
export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return DEFAULT_CATEGORIES || [];

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: true });

  if (error || !data) {
    console.error('Error fetching categories:', error);
    return DEFAULT_CATEGORIES || [];
  }

  return data as Category[];
}

/**
 * Fetch a single category by slug.
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isSupabaseConfigured()) {
    return (DEFAULT_CATEGORIES || []).find((c) => c.slug === slug) || null;
  }

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Error fetching category:', error);
    return (DEFAULT_CATEGORIES || []).find((c) => c.slug === slug) || null;
  }

  return data as Category;
}

/**
 * Create a new category.
 */
export async function createCategory(category: Omit<Category, 'id' | 'created_at'>): Promise<Category | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();

  if (error) {
    console.error('Error creating category:', error);
    return null;
  }

  return data as Category;
}

/**
 * Update an existing category.
 */
export async function updateCategory(id: string, updates: Partial<Category>): Promise<Category | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating category:', error);
    return null;
  }

  return data as Category;
}

/**
 * Delete a category.
 */
export async function deleteCategory(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  const supabase = getSupabaseClient()!;
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting category:', error);
    return false;
  }

  return true;
}
