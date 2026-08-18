'use client';

import React from 'react';
import Link from 'next/link';
import type { Category } from '@/types';

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-bold text-text-main mb-3">Shop By Category</h2>
          <p className="text-lg text-text-secondary max-w-[600px] mx-auto">
            Explore our range of terrariums and accessories
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category, idx) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group flex flex-col items-center text-center"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/5] rounded-lg overflow-hidden mb-4 bg-[#f5f4f0] transition-all duration-300 group-hover:shadow-card group-hover:-translate-y-1">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${category.image_url})` }}
                />
              </div>

              {/* Label */}
              <h3 className="text-sm font-semibold text-text-main group-hover:text-secondary transition-colors">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-xs text-text-muted mt-1">{category.description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
