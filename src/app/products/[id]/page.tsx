'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnnouncementBar, Header, Footer } from '@/components/layout';
import { WhatsappModal } from '@/components/storefront';
import { getProductById } from '@/services';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { openWhatsappModal } = useStore();

  useEffect(() => {
    async function loadProduct() {
      try {
        const { id } = await params;
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-cream">
        <div className="text-center animate-fade-in flex flex-col items-center">
          <img src="/images/logo.png" alt="Loading" className="w-16 h-16 object-contain mb-4 animate-pulse" />
          <p className="text-lg text-text-secondary">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-3xl mb-4">Product Not Found</h1>
            <Link href="/shop" className="text-secondary hover:underline">
              ← Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const hasDiscount = product.original_price && product.original_price > product.price;

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-secondary transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-text-main">{product.title}</span>
          </nav>
        </div>

        {/* Product Detail */}
        <section className="max-w-[1280px] mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-bg-warm">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image_url})` }}
                />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.best_seller && (
                  <span className="px-3 py-1.5 bg-accent text-white text-xs font-semibold rounded-md uppercase tracking-wider">
                    Best Seller
                  </span>
                )}
                {hasDiscount && (
                  <span className="px-3 py-1.5 bg-error text-white text-xs font-semibold rounded-md">
                    {Math.round(((product.original_price! - product.price) / product.original_price!) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              {/* Category */}
              <span className="text-sm font-medium text-secondary mb-2 uppercase tracking-wider">
                {product.category}
              </span>

              <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-main mb-4">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                {hasDiscount && (
                  <span className="text-xl text-text-muted line-through">{formatPrice(product.original_price!)}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-base text-text-secondary leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Care Instructions */}
              {product.care_instructions && (
                <div className="p-5 bg-bg-green-light rounded-xl mb-8">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                    🌱 Care Instructions
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {product.care_instructions}
                  </p>
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <span className={`w-2.5 h-2.5 rounded-full ${product.in_stock ? 'bg-success' : 'bg-error'}`} />
                <span className="text-sm font-medium text-text-main">
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => openWhatsappModal(product)}
                  disabled={!product.in_stock}
                  className="flex-1 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-card transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => openWhatsappModal(product)}
                  disabled={!product.in_stock}
                  className="py-4 px-6 border-2 border-primary text-primary rounded-xl font-semibold text-lg hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Enquire
                </button>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-bg-warm text-text-muted text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Trust Features */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border-custom">
                {[
                  { icon: '🌱', text: 'Live Arrival Guarantee' },
                  { icon: '🚚', text: 'Free Pan India Delivery' },
                  { icon: '♻️', text: 'Eco-Friendly Packaging' },
                  { icon: '💬', text: '24/7 Expert Support' },
                ].map((feature) => (
                  <div key={feature.text} className="flex items-center gap-2">
                    <span className="text-lg">{feature.icon}</span>
                    <span className="text-xs text-text-secondary">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappModal />
    </>
  );
}
