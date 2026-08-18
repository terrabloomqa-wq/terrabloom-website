'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnnouncementBar, Header, Footer } from '@/components/layout';
import {
  HeroSlider,
  CategoryGrid,
  ProductGrid,
  TrustBadges,
  TestimonialSlider,
  WhatsappModal,
} from '@/components/storefront';
import { getBanners, getBestSellers, getCategories, getStoreSettings } from '@/services';
import type { HeroBanner, Product, Category, StoreSettings } from '@/types';

export default function HomePage() {
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [bannersData, productsData, categoriesData, settingsData] = await Promise.all([
          getBanners(),
          getBestSellers(),
          getCategories(),
          getStoreSettings(),
        ]);
        setBanners(bannersData);
        setBestSellers(productsData);
        setCategories(categoriesData);
        setSettings(settingsData);
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-cream">
        <div className="text-center animate-fade-in flex flex-col items-center">
          <img src="/images/logo.png" alt="Loading" className="w-16 h-16 object-contain mb-4 animate-pulse" />
          <p className="text-lg text-text-secondary font-display">Loading Terra Bloom...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        {/* Hero Slider */}
        <HeroSlider banners={banners} />

        {/* Shop by Category */}
        <CategoryGrid categories={categories} />

        {/* Promo Banner — Dynamic from Settings */}
        {settings?.promo_video_url && (
          <section className="relative py-24 md:py-32 overflow-hidden flex items-center min-h-[500px]">
            <div className="absolute inset-0 z-0">
              <video
                src={settings.promo_video_url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        )}

        {/* Best Sellers */}
        <ProductGrid
          products={bestSellers}
          title="Best Sellers"
          subtitle="Handpicked favourites loved by our customers"
          columns={5}
        />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Custom Terrariums Section */}
        <section className="py-20 bg-bg-green-light">
          <div className="max-w-[1280px] mx-auto px-6 text-center">
            <h2 className="font-heading text-4xl font-bold text-text-main mb-4 italic">
              Custom Terrariums
            </h2>
            <p className="text-lg text-text-secondary max-w-[600px] mx-auto mb-8">
              Have a unique idea in mind? We create personalised terrariums for gifts, corporates, events & special occasions.
            </p>
            <Link
              href="/custom-terrariums"
              className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-card transition-all duration-250"
            >
              Order Custom Terrarium
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialSlider />
      </main>

      <Footer />
      <WhatsappModal />
    </>
  );
}
