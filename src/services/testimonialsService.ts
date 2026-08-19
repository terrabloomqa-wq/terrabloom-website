// ============================================================
// Terra Bloom — Testimonials Data Service
// ============================================================

import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { DEFAULT_TESTIMONIALS } from '@/lib/constants';
import type { Testimonial } from '@/types';

/**
 * Fetch all testimonials.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_TESTIMONIALS;
  }

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching testimonials:', error);
    return DEFAULT_TESTIMONIALS;
  }

  return data as Testimonial[];
}

/**
 * Fetch all testimonials for admin (alias for consistency with other services).
 */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  return getTestimonials();
}

/**
 * Create a new testimonial.
 */
export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('testimonials')
    .insert(testimonial)
    .select()
    .single();

  if (error) {
    console.error('Error creating testimonial:', error);
    return null;
  }

  return data as Testimonial;
}

/**
 * Update an existing testimonial.
 */
export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabaseClient()!;
  const { data, error } = await supabase
    .from('testimonials')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating testimonial:', error);
    return null;
  }

  return data as Testimonial;
}

/**
 * Delete a testimonial.
 */
export async function deleteTestimonial(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  const supabase = getSupabaseClient()!;
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting testimonial:', error);
    return false;
  }

  return true;
}
