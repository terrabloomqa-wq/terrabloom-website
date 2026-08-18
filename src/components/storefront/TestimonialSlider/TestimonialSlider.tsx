'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DEFAULT_TESTIMONIALS } from '@/lib/constants';
import type { Testimonial } from '@/types';

export default function TestimonialSlider() {
  const testimonials: Testimonial[] = DEFAULT_TESTIMONIALS;
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const testimonial = testimonials[current];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="font-heading text-4xl font-bold text-text-main mb-3 italic">
          Loved by Plant Parents
        </h2>

        {/* Testimonial */}
        <div className="mt-10 animate-fade-in" key={current}>
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <svg key={i} className="w-5 h-5 text-accent-light" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-xl md:text-2xl text-text-main font-heading italic leading-relaxed mb-6">
            &ldquo;{testimonial.text}&rdquo;
          </blockquote>

          {/* Author */}
          <p className="text-base font-semibold text-text-main">— {testimonial.name}</p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === current ? 'bg-primary scale-125' : 'bg-primary/25 hover:bg-primary/40'
              }`}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
