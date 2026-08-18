'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp';

export default function Footer() {
  const { settings } = useStore();
  const [email, setEmail] = useState('');

  const currentYear = new Date().getFullYear();

  const shopLinks = [
    { label: 'All Terrariums', href: '/shop' },
    { label: 'Closed Terrariums', href: '/shop?category=closed-terrariums' },
    { label: 'Open Terrariums', href: '/shop?category=open-terrariums' },
    { label: 'Paludariums', href: '/shop?category=paludariums' },
    { label: 'Terrarium Kits', href: '/kits-accessories' },
    { label: 'Accessories', href: '/kits-accessories' },
  ];

  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Our Process', href: '/about' },
    { label: 'Care Guide', href: '/about' },
    { label: 'Blog', href: '/about' },
    { label: 'Contact Us', href: '/about' },
  ];

  const helpLinks = [
    { label: 'FAQs', href: '/about' },
    { label: 'Shipping & Delivery', href: '/about' },
    { label: 'Returns & Refunds', href: '/about' },
    { label: 'Terms & Conditions', href: '/about' },
    { label: 'Privacy Policy', href: '/about' },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">
                🌿
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold leading-tight tracking-wide">
                  TERRA BLOOM
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/70">
                  A World Within Glass
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              We create sustainable terrariums that bring a little nature closer to you. 
              Our products are long-lasting, eco-friendly, and sustainable.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4">Shop</h4>
            <ul className="flex flex-col gap-2">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4">Help</h4>
            <ul className="flex flex-col gap-2">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-sm text-white/70 mb-3">
              Get tips, care guides, early offers & more to your inbox!
            </p>
            <form
              className="flex gap-0"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail('');
                alert('Thank you for subscribing!');
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-l-lg bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/15 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-white text-primary rounded-r-lg text-sm font-semibold hover:bg-white/90 transition-colors cursor-pointer"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {currentYear} Terra Bloom. All rights reserved.
          </p>
          <p className="text-xs text-white/50 flex items-center gap-1">
            Designed with <span className="text-red-400">♥</span> for nature lovers
          </p>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={buildGeneralWhatsAppUrl(settings.whatsapp_number)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-elevated hover:scale-110 transition-transform duration-300"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  );
}
