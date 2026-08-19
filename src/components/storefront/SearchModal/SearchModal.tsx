'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getProducts } from '@/services';
import type { Product } from '@/types';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
      loadSuggestions();
    } else {
      document.body.style.overflow = '';
      setSearchTerm('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  async function loadSuggestions() {
    try {
      const data = await getProducts();
      setAllProducts(data);
    } catch (err) {
      console.error('Error loading search products:', err);
    }
  }

  const displayedProducts = searchTerm.trim()
    ? allProducts
        .filter((p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3)
    : allProducts.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-elevated overflow-hidden animate-fade-in-up transform transition-all">
        {/* Search Input Area */}
        <div className="p-4 sm:p-6 border-b border-border-custom flex-shrink-0">
          <form onSubmit={handleSearch} className="flex items-center relative">
            <Search className="w-6 h-6 text-text-muted absolute left-4" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products, categories, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-12 py-4 text-lg md:text-xl font-medium outline-none bg-transparent placeholder-text-muted text-text-main"
            />
            <button 
              type="button" 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-warm text-text-main hover:text-primary transition-colors cursor-pointer ml-2 shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="p-4 sm:p-6 sm:py-8 bg-bg-cream/30 overflow-y-auto">
          {/* Displayed Products */}
          {displayedProducts.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold tracking-wider text-text-muted uppercase">
                  {searchTerm.trim() ? 'Search Results' : 'Suggested Products'}
                </h3>
                <Link 
                  href={searchTerm.trim() ? `/shop?q=${encodeURIComponent(searchTerm.trim())}` : "/shop"} 
                  onClick={onClose}
                  className="text-sm font-medium text-secondary hover:text-secondary-dark flex items-center gap-1 group"
                >
                  View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              <div className="flex flex-col gap-3">
                {displayedProducts.map((product) => (
                  <Link 
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="flex items-start gap-4 p-4 bg-white border border-border-custom rounded-xl hover:border-primary hover:shadow-soft transition-all group"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-bg-warm overflow-hidden flex-shrink-0">
                      <div 
                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${product.image_url})` }}
                      />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0 py-1">
                      <div className="flex justify-between items-start gap-4 mb-1">
                        <span className="text-base font-semibold text-text-main truncate group-hover:text-primary transition-colors">
                          {product.title}
                        </span>
                        <span className="text-sm font-bold text-primary whitespace-nowrap">
                          QAR {product.price.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
                        {product.category}
                      </span>
                      <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-text-secondary">No products found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
