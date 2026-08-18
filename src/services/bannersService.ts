// ============================================================
// Terra Bloom — Banners Data Service
// ============================================================

import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { DEFAULT_BANNERS } from '@/lib/constants';
import type { HeroBanner } from '@/types';

/**
 * Fetch all active hero banners, ordered by display_order.
 */
export async function getBanners(): Promise<HeroBanner[]> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_BANNERS.filter((b) => b.active);
  }

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('hero_banners')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true });

  if (error || !data) {
    console.error('Error fetching banners:', error);
    return DEFAULT_BANNERS.filter((b) => b.active);
  }

  return data as HeroBanner[];
}

/**
 * Fetch all banners (including inactive) for admin.
 */
export async function getAllBanners(): Promise<HeroBanner[]> {
  if (!isSupabaseConfigured()) return DEFAULT_BANNERS;

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('hero_banners')
    .select('*')
    .order('display_order', { ascending: true });

  if (error || !data) {
    console.error('Error fetching all banners:', error);
    return DEFAULT_BANNERS;
  }

  return data as HeroBanner[];
}

/**
 * Create a new banner.
 */
export async function createBanner(banner: Omit<HeroBanner, 'id' | 'created_at'>): Promise<HeroBanner | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('hero_banners')
    .insert(banner)
    .select()
    .single();

  if (error) {
    console.error('Error creating banner:', error);
    return null;
  }

  return data as HeroBanner;
}

/**
 * Update an existing banner.
 */
export async function updateBanner(id: string, updates: Partial<HeroBanner>): Promise<HeroBanner | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('hero_banners')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating banner:', error);
    return null;
  }

  return data as HeroBanner;
}

/**
 * Delete a banner.
 */
export async function deleteBanner(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  const supabase = getSupabaseClient()!;
  const { error } = await supabase
    .from('hero_banners')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting banner:', error);
    return false;
  }

  return true;
}
