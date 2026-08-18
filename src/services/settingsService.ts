// ============================================================
// Terra Bloom — Store Settings Data Service
// ============================================================

import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { DEFAULT_STORE_SETTINGS } from '@/lib/constants';
import type { StoreSettings } from '@/types';

/**
 * Fetch the store settings (single row).
 */
export async function getStoreSettings(): Promise<StoreSettings> {
  if (!isSupabaseConfigured()) return DEFAULT_STORE_SETTINGS;

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('store_settings')
    .select('*')
    .limit(1)
    .single();

  if (error || !data) {
    console.error('Error fetching store settings:', error);
    return DEFAULT_STORE_SETTINGS;
  }

  return data as StoreSettings;
}

/**
 * Update store settings.
 */
export async function updateStoreSettings(id: string, updates: Partial<StoreSettings>): Promise<StoreSettings | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('store_settings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating store settings:', error);
    return null;
  }

  return data as StoreSettings;
}
