'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { AnnouncementBar, Header, Footer } from '@/components/layout';
import { WhatsappModal, ProductGrid } from '@/components/storefront';
import { getProductBySlug, getProducts } from '@/services';
import { useStore } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';
import { Leaf, Truck, Recycle, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [notFoundState, setNotFoundState] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const { openWhatsappModal } = useStore();
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      try {
        const [data, allProducts] = await Promise.all([
          getProductBySlug(slug),
          getProducts(),
        ]);
        if (!data) {
          setNotFoundState(true);
        } else {
          setProduct(data);
          const initialImages = [...new Set([...(data.images || []), data.image_url].filter(Boolean))];
          setSelectedImage(initialImages[0] || data.image_url);
          setSuggestedProducts(allProducts.filter(p => p.id !== data.id).slice(0, 4));
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setNotFoundState(true);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const hasDiscount = Boolean(product?.original_price && product.original_price > product.price);
  const productImages = product
    ? [...new Set([...(product.images || []), product.image_url].filter(Boolean))].slice(0, 5)
    : [];
  const activeImage = selectedImage && productImages.includes(selectedImage)
    ? selectedImage
    : productImages[0] || product?.image_url || '';
  const activeIndex = Math.max(0, productImages.indexOf(activeImage));

  const handleSelectImage = (image: string, index: number) => {
    setSelectedImage(image);
    if (thumbnailsRef.current) {
      const buttons = thumbnailsRef.current.querySelectorAll('button');
      buttons[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const handlePrevImage = () => {
    if (productImages.length <= 1) return;
    const prevIndex = (activeIndex - 1 + productImages.length) % productImages.length;
    handleSelectImage(productImages[prevIndex], prevIndex);
  };

  const handleNextImage = () => {
    if (productImages.length <= 1) return;
    const nextIndex = (activeIndex + 1) % productImages.length;
    handleSelectImage(productImages[nextIndex], nextIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (productImages.length <= 1) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [productImages, activeIndex]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-cream">
        <div className="text-center animate-fade-in flex flex-col items-center">
          <img src="/images/logo.jpeg" alt="Loading" className="w-16 h-16 object-contain mb-4 animate-pulse" />
          <p className="text-lg text-text-secondary">Loading product...</p>
        </div>
      </div>
    );
  }

  if (notFoundState || !product) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <main className="min-h-[70vh] flex flex-col items-center justify-center bg-bg-cream px-6 py-20 relative overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up relative z-10">
            <div className="relative inline-block mb-8">
              <h1 className="text-[100px] md:text-[150px] font-heading font-bold text-primary opacity-5 leading-none select-none">404</h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">Oops!</span>
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-text-main mb-4">Product Not Found</h2>
            <p className="text-base text-text-secondary mb-8 max-w-md mx-auto">This terrarium seems to have returned to nature. Browse our full collection instead.</p>
            <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-medium text-lg hover:bg-primary-light hover:-translate-y-1 transition-all duration-300 shadow-soft hover:shadow-card">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Browse Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Gallery Column */}
            <div className="lg:sticky lg:top-24 self-start flex flex-col gap-4">
              {/* Main Image Showcase */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-bg-warm border border-border-light shadow-soft group select-none">
                <img
                  src={activeImage}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-300 ease-in-out"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                  {product.best_seller && (
                    <span className="px-3 py-1.5 bg-accent text-white text-xs font-semibold rounded-md uppercase tracking-wider shadow-sm">
                      Best Seller
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="px-3 py-1.5 bg-error text-white text-xs font-semibold rounded-md shadow-sm">
                      {Math.round(((product.original_price! - product.price) / product.original_price!) * 100)}% OFF
                    </span>
                  )}
                </div>

                {/* Image Counter Badge (when multiple images) */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-full shadow-sm z-10 pointer-events-none">
                    {activeIndex + 1} / {productImages.length}
                  </div>
                )}

                {/* Navigation Arrows on Main Image (when multiple images) */}
                {productImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur-md shadow-md text-text-main flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110 cursor-pointer z-10"
                    >
                      <ChevronLeft className="w-5 h-5 text-text-main" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur-md shadow-md text-text-main flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110 cursor-pointer z-10"
                    >
                      <ChevronRight className="w-5 h-5 text-text-main" />
                    </button>
                  </>
                )}
              </div>

              {/* Bottom Thumbnail Strip (Cards) */}
              {productImages.length > 1 && (
                <div
                  ref={thumbnailsRef}
                  className="flex gap-3 overflow-x-auto py-1 px-0.5 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  aria-label="Product thumbnails"
                >
                  {productImages.map((image, index) => {
                    const isActive = activeImage === image;
                    return (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => handleSelectImage(image, index)}
                        aria-label={`View product image ${index + 1} of ${productImages.length}`}
                        aria-current={isActive ? 'true' : 'false'}
                        className={`relative shrink-0 w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 snap-start bg-bg-warm border-2 ${
                          isActive
                            ? 'border-primary ring-2 ring-primary ring-offset-2 shadow-md scale-[1.03] opacity-100'
                            : 'border-border-custom hover:border-primary/60 opacity-70 hover:opacity-100 hover:scale-[1.02]'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.title} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
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
                  onClick={() => addToCart(product)}
                  disabled={!product.in_stock}
                  className="flex-1 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-card transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => openWhatsappModal(product)}
                  disabled={!product.in_stock}
                  className="py-4 px-6 border-2 border-primary text-primary rounded-xl font-semibold text-lg hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Buy Now
                </button>
              </div>



              {/* Trust Features */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border-custom">
                {[
                  { icon: Leaf, text: 'Live Arrival Guarantee', color: 'text-emerald-500' },
                  { icon: Truck, text: 'Free Delivery Across Doha', color: 'text-orange-500' },
                  { icon: Recycle, text: 'Eco-Friendly Packaging', color: 'text-teal-500' },
                  { icon: MessageCircle, text: '24/7 Expert Support', color: 'text-indigo-500' },
                ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${feature.color}`} strokeWidth={2} />
                      <span className="text-xs text-text-secondary">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && (
          <div className="border-t border-border-custom bg-bg-cream pt-4 pb-8">
            <ProductGrid 
              products={suggestedProducts} 
              title="You Might Also Like" 
              subtitle="Discover more handcrafted terrariums"
              columns={4}
            />
          </div>
        )}
      </main>

      <Footer />
      <WhatsappModal />
    </>
  );
}
