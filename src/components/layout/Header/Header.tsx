'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { useCart } from '@/context/CartContext';
import { SearchModal } from '@/components/storefront';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border-custom">
      <div className="max-w-[1280px] mx-auto px-3 md:px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <Image src="/images/logo.png" alt="Terra Bloom Logo" width={48} height={48} className="w-12 h-12 object-contain" />
          <div className="flex flex-col">
            <span className="font-heading text-xl font-bold text-primary leading-tight tracking-wide whitespace-nowrap">
              TERRA BLOOM
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary font-medium">
              A World Within Glass
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-secondary after:transition-all after:duration-300 ${
                  isActive
                    ? 'text-secondary after:w-full'
                    : 'text-text-main hover:text-secondary after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-4">
          {/* Search */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-warm transition-colors cursor-pointer text-text-main hover:text-primary" 
            aria-label="Search"
          >
            <Search strokeWidth={1.5} className="w-5 h-5" />
          </button>

          {/* Cart */}
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-warm transition-colors cursor-pointer relative text-text-main hover:text-primary group" 
            aria-label="Cart"
            onClick={openCart}
          >
            <ShoppingBag strokeWidth={1.5} className="w-5 h-5 transition-transform group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-warm transition-colors cursor-pointer text-text-main hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X strokeWidth={1.5} className="w-6 h-6" />
            ) : (
              <Menu strokeWidth={1.5} className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border-custom bg-white animate-fade-in">
          <nav className="flex flex-col py-4 px-6">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`py-3 text-base font-medium transition-colors border-b border-border-light last:border-b-0 ${
                    isActive ? 'text-secondary' : 'text-text-main hover:text-secondary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
