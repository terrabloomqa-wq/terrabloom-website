// ============================================================
// Terra Bloom — TypeScript Type Definitions
// ============================================================

// ---- Hero Banner ----
export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  badge_text?: string;
  display_order: number;
  active: boolean;
  created_at?: string;
}

// ---- Product Category ----
export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  active: boolean;
  created_at?: string;
}

// ---- Product ----
export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  category_slug: string;
  price: number;
  original_price?: number;
  image_url: string;
  images?: string[];
  description: string;
  care_instructions?: string;
  best_seller: boolean;
  featured: boolean;
  in_stock: boolean;
  tags?: string[];
  created_at?: string;
}

// ---- Store Settings ----
export interface StoreSettings {
  id: string;
  store_name: string;
  tagline: string;
  whatsapp_number: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  announcement_text: string;
  instagram_url?: string;
  facebook_url?: string;
  youtube_url?: string;
  pinterest_url?: string;
  promo_title?: string;
  promo_description?: string;
  promo_video_url?: string;
  promo_button_text?: string;
  promo_button_link?: string;
}

// ---- Order / Enquiry ----
export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address: string;
  customer_city: string;
  customer_pincode: string;
  customer_notes?: string;
  product_id: string;
  product_title: string;
  product_price: number;
  product_image_url: string;
  quantity: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created_at?: string;
}

// ---- Customer Shipping Form Data ----
export interface ShippingFormData {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  pincode: string;
  notes?: string;
}

// ---- Testimonial ----
export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatar?: string;
}

// ---- Admin User ----
export interface AdminUser {
  email: string;
  isAuthenticated: boolean;
}

// ---- API Response ----
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}
