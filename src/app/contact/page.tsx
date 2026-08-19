'use client';

import React from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { AnnouncementBar, Header, Footer } from '@/components/layout';
import { WhatsappModal } from '@/components/storefront';
import { useStore } from '@/context/StoreContext';

export default function ContactPage() {
  const { settings } = useStore();

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative py-24 md:py-32 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" />
          <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-lg text-white/80 max-w-[600px] mx-auto">
              Have a question or looking for a custom terrarium? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20 md:py-28">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-main mb-4">Get in Touch</h2>
              <p className="text-text-secondary max-w-[500px] mx-auto text-lg">
                Reach out to us for any inquiries. Our team is always here to help you bring nature indoors.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {/* Email */}
              <div className="flex flex-col items-center text-center p-8 bg-white border border-border-custom rounded-2xl hover:shadow-elevated transition-shadow duration-300">
                <div className="w-14 h-14 bg-bg-cream rounded-full flex items-center justify-center mb-6 text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-text-main mb-3">Email Us</h3>
                <a href={`mailto:${settings.contact_email}`} className="text-text-secondary hover:text-primary transition-colors">
                  {settings.contact_email}
                </a>
              </div>

              {/* Phone */}
              <div className="flex flex-col items-center text-center p-8 bg-white border border-border-custom rounded-2xl hover:shadow-elevated transition-shadow duration-300">
                <div className="w-14 h-14 bg-bg-cream rounded-full flex items-center justify-center mb-6 text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-text-main mb-3">Call Us</h3>
                <a href={`tel:${settings.contact_phone}`} className="text-text-secondary hover:text-primary transition-colors">
                  {settings.contact_phone}
                </a>
              </div>

              {/* Visit */}
              <div className="flex flex-col items-center text-center p-8 bg-white border border-border-custom rounded-2xl hover:shadow-elevated transition-shadow duration-300">
                <div className="w-14 h-14 bg-bg-cream rounded-full flex items-center justify-center mb-6 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-text-main mb-3">Visit Us</h3>
                <span className="text-text-secondary leading-relaxed">
                  {settings.address}
                </span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-20 text-center bg-bg-cream rounded-3xl p-10 md:p-16 border border-border-custom">
              <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#25D366]">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-text-main">Send us a WhatsApp</h3>
              <p className="text-text-secondary mb-8 max-w-[500px] mx-auto text-lg">
                For quick responses, bulk orders, or custom terrarium inquiries, drop us a direct message.
              </p>
              <a
                href={`https://wa.me/${(settings.whatsapp_number || '').replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-medium hover:bg-[#128C7E] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappModal />
    </>
  );
}
