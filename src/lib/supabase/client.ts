import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

/**
 * Browser-side Supabase client (singleton).
 * Returns null if environment variables are not configured or are placeholders,
 * allowing the application to gracefully fall back to mock data.
 */
export function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Check whether Supabase is properly configured.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl && 
    supabaseUrl.startsWith('http') && 
    supabaseAnonKey && 
    supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE' &&
    supabaseAnonKey !== 'YOUR_SUPABASE_PUBLISHABLE_KEY_HERE'
  );
}
