'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Mail } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp';

export default function Footer() {
  const { settings } = useStore();

  const currentYear = new Date().getFullYear();

  const shopLinks = [
    { label: 'All Terrariums', href: '/shop' },
    { label: 'Closed Terrariums', href: '/shop?category=closed-terrariums' },
    { label: 'Open Terrariums', href: '/shop?category=open-terrariums' },
    { label: 'Paludariums', href: '/shop?category=paludariums' },
  ];

  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/images/logo.png" alt="Terra Bloom Logo" width={48} height={48} className="w-12 h-12 object-contain" />
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

          {/* Customer Care */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4">Customer Care</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`https://wa.me/${(settings.whatsapp_number || '').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.contact_email}`} className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {settings.contact_email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 pt-6 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-xs text-white/50">
            © {currentYear} Terra Bloom. All rights reserved.
          </p>
          <p className="text-xs text-white/50">
            Crafted by <a href="https://www.ekodrix.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ekodrix</a>
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
