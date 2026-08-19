'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { HeroBanner } from '@/types';

interface HeroSliderProps {
  banners: HeroBanner[];
}

export default function HeroSlider({ banners }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, banners.length]);

  if (!banners.length) return null;

  const banner = banners[currentSlide];

  return (
    <section className="relative h-[85svh] min-h-[580px] md:h-[700px] md:min-h-0 overflow-hidden bg-bg-cream">
      {/* Background Image - Desktop */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${banner.mobile_image_url ? 'hidden md:block' : ''}`}
        style={{ backgroundImage: `url(${banner.image_url})` }}
      >
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-bg-cream/90 via-bg-cream/60 to-transparent" />
        {/* Fallback gradient for mobile when no mobile_image_url is set */}
        {!banner.mobile_image_url && (
          <div className="absolute inset-0 md:hidden bg-gradient-to-b from-transparent via-bg-cream/60 via-55% to-bg-cream to-85%" />
        )}
      </div>

      {/* Background Image - Mobile */}
      {banner.mobile_image_url && (
        <div
          className="absolute inset-0 bg-cover bg-top sm:bg-center transition-all duration-700 md:hidden"
          style={{ backgroundImage: `url(${banner.mobile_image_url})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-cream/60 via-55% to-bg-cream to-85%" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6 h-full flex flex-col justify-end md:flex-row md:items-center md:justify-start pb-8 sm:pb-10 md:pb-0">
        <div className="max-w-xl animate-fade-in-up flex flex-col w-full md:block" key={currentSlide}>
          {/* Badge */}
          {banner.badge_text && (
            <div className="inline-flex items-center self-start gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-2 md:mb-6">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary" />
              <span className="text-[10px] md:text-sm font-medium text-text-main uppercase md:normal-case tracking-wider md:tracking-normal">{banner.badge_text}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-primary-dark leading-[1.15] md:leading-[1.1] mb-2 md:mb-6">
            {banner.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-lg text-text-secondary leading-relaxed max-w-lg mb-5 md:mb-8">
            {banner.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-row md:flex-wrap gap-2.5 md:gap-4 w-full md:w-auto">
            <Link
              href={banner.cta_link}
              className="flex-1 md:flex-none inline-flex justify-center items-center px-4 md:px-8 py-3 md:py-4 bg-primary text-white rounded-xl md:rounded-lg font-medium text-xs sm:text-sm md:text-base hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-card transition-all duration-250"
            >
              {banner.cta_text}
            </Link>
            <Link
              href="/contact"
              className="flex-1 md:flex-none inline-flex justify-center items-center px-4 md:px-8 py-3 md:py-4 bg-white/80 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none text-primary border border-primary/40 md:border-2 md:border-primary rounded-xl md:rounded-lg font-medium text-xs sm:text-sm md:text-base hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all duration-250"
            >
              Custom Orders
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="hidden md:flex flex-wrap gap-4 mt-10">
            {['Handcrafted with care', 'Sustainable & Eco-friendly', 'Secure Packaging'].map((feature) => (
              <span key={feature} className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      {banners.length > 1 && (
        <>
          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentSlide ? 'w-8 bg-primary' : 'w-2.5 bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:bg-white transition-all z-20 cursor-pointer"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:bg-white transition-all z-20 cursor-pointer"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}
