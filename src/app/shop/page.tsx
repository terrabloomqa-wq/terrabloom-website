'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { AnnouncementBar, Header, Footer } from '@/components/layout';
import { ProductGrid, WhatsappModal } from '@/components/storefront';
import { getProducts } from '@/services';
import { DEFAULT_CATEGORIES } from '@/lib/constants';
import type { Product } from '@/types';
import { useSearchParams } from 'next/navigation';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const searchQuery = searchParams.get('q');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryFilter);
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    setActiveCategory(categoryFilter);
  }, [categoryFilter]);

  // Filter & sort
  let filtered = activeCategory
    ? products.filter((p) => p.category_slug === activeCategory)
    : products;

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query)
    );
  }

  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-bg-cream py-12 border-b border-border-custom">
        <div className="max-w-[1280px] mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-main mb-3">
            {searchQuery 
              ? `Search Results for "${searchQuery}"`
              : activeCategory
                ? DEFAULT_CATEGORIES.find((c) => c.slug === activeCategory)?.name || 'Shop'
                : 'All Terrariums'}
          </h1>
          <p className="text-lg text-text-secondary">
            Browse our collection of handcrafted terrariums and living art
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border-custom">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                !activeCategory
                  ? 'bg-primary text-white'
                  : 'bg-bg-warm text-text-main hover:bg-bg-green-light'
              }`}
            >
              All
            </button>
            {DEFAULT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat.slug
                    ? 'bg-primary text-white'
                    : 'bg-bg-warm text-text-main hover:bg-bg-green-light'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-border-custom rounded-lg text-sm bg-white outline-none focus:border-primary cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <img src="/images/logo.jpeg" alt="Loading" className="w-12 h-12 object-contain mx-auto mb-3 animate-pulse" />
            <p className="text-text-muted">Loading products...</p>
          </div>
        </div>
      ) : (
        <ProductGrid products={filtered} columns={4} />
      )}

      {/* Results Count */}
      {!loading && (
        <div className="max-w-[1280px] mx-auto px-6 pb-8">
          <p className="text-sm text-text-muted">
            Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </>
  );
}

export default function ShopPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="min-h-screen bg-white">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <img src="/images/logo.jpeg" alt="Loading" className="w-12 h-12 object-contain mx-auto mb-3 animate-pulse" />
                <p className="text-text-muted">Loading shop...</p>
              </div>
            </div>
          }
        >
          <ShopContent />
        </Suspense>
      </main>

      <Footer />
      <WhatsappModal />
    </>
  );
}
