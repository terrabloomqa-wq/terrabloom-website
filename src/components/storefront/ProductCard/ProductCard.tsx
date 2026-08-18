'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { openWhatsappModal } = useStore();
  const hasDiscount = product.original_price && product.original_price > product.price;

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-border-custom hover:shadow-elevated hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden aspect-square bg-bg-warm">
        <div
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url(${product.image_url})` }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.best_seller && (
            <span className="px-2.5 py-1 bg-accent text-white text-[11px] font-semibold rounded-md uppercase tracking-wider">
              Best Seller
            </span>
          )}
          {hasDiscount && (
            <span className="px-2.5 py-1 bg-error text-white text-[11px] font-semibold rounded-md">
              {Math.round(((product.original_price! - product.price) / product.original_price!) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Quick View on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
          <span className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-text-main shadow-card transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            Quick View
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-display text-base font-semibold text-text-main group-hover:text-secondary transition-colors mb-1 truncate">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-sm text-text-muted line-through">{formatPrice(product.original_price!)}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => openWhatsappModal(product)}
            className="flex-1 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors cursor-pointer"
          >
            Buy Now
          </button>
          <button
            onClick={() => openWhatsappModal(product)}
            className="w-10 h-10 flex items-center justify-center border border-border-custom rounded-lg hover:bg-bg-warm transition-colors cursor-pointer"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4 text-text-main" />
          </button>
        </div>
      </div>
    </div>
  );
}
