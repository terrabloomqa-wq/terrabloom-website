'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Palette, Sprout, ArrowRight } from 'lucide-react';
import { AnnouncementBar, Header, Footer } from '@/components/layout';
import { WhatsappModal } from '@/components/storefront';
import { useStore } from '@/context/StoreContext';

export default function AboutPage() {
  const { settings } = useStore();

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative py-24 md:py-32 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/banners/about-bg.jpg')] bg-cover bg-center opacity-20" />
          <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">About Terra Bloom</h1>
            <p className="text-lg text-white/80 max-w-[600px] mx-auto">
              Bringing the beauty of nature into your everyday spaces, one terrarium at a time.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 md:py-28">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-8">Our Story</h2>
            <div className="prose max-w-none text-text-secondary leading-relaxed space-y-6 text-lg text-center md:text-left">
              <p>
                Terra Bloom was born out of a deep love for nature and a desire to bring the calming 
                presence of greenery into everyday spaces. Founded in Bangalore, India, we handcraft 
                each terrarium with care, using sustainably sourced plants and eco-friendly materials.
              </p>
              <p>
                What started as a hobby at a small home studio has grown into a passionate team of 
                artisans dedicated to creating miniature worlds within glass. Every terrarium we make 
                is a living piece of art — a self-sustaining ecosystem that brings joy, reduces stress, 
                and adds a natural touch to any environment.
              </p>
              <p>
                We believe in the power of plants to transform spaces and moods. Whether it&apos;s a 
                compact moss jar for your desk or a grand paludarium for your living room, each creation 
                is designed to inspire wonder and connection with the natural world.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28 bg-bg-cream">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-16">What We Stand For</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {[
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: 'Sustainability First',
                  desc: 'We use recycled glass, sustainably harvested moss, and plastic-free packaging in everything we do.',
                },
                {
                  icon: <Palette className="w-8 h-8" />,
                  title: 'Artisan Craftsmanship',
                  desc: 'Each terrarium is individually handcrafted by our skilled artisans with attention to every tiny detail.',
                },
                {
                  icon: <Sprout className="w-8 h-8" />,
                  title: 'Spreading Green Joy',
                  desc: 'We believe everyone deserves a little piece of nature. Our mission is to make terrariums accessible to all.',
                },
              ].map((value) => (
                <div key={value.title} className="flex flex-col items-center text-center p-10 bg-white border border-border-custom rounded-2xl hover:shadow-elevated transition-shadow duration-300">
                  <div className="w-16 h-16 bg-bg-cream rounded-full flex items-center justify-center mb-6 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-4 text-text-main">{value.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 md:py-28">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <div className="bg-primary/5 rounded-3xl p-12 md:p-20 border border-primary/10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-text-main">Ready to bring nature indoors?</h2>
              <p className="text-text-secondary text-lg mb-10 max-w-[500px] mx-auto">
                Explore our collection or get in touch with us for custom orders, bulk inquiries, or just to say hi!
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary-light hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappModal />
    </>
  );
}
