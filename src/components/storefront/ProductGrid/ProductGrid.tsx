'use client';

import React from 'react';
import type { Product } from '@/types';
import ProductCard from '../ProductCard/ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4 | 5;
}

const gridColsMap: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
};

export default function ProductGrid({ products, title, subtitle, columns = 4 }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-text-muted">No products found</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-text-main mb-3">{title}</h2>
            {subtitle && (
              <p className="text-lg text-text-secondary max-w-[600px] mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={`grid ${gridColsMap[columns]} gap-6`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
