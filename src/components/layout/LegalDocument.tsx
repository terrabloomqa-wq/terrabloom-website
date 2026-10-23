'use client';

import type { ReactNode } from 'react';
import AnnouncementBar from '@/components/layout/AnnouncementBar/AnnouncementBar';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { useStore } from '@/context/StoreContext';

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface LegalDocumentProps {
  title: string;
  summary: string;
  sections: LegalSection[];
  children?: ReactNode;
}

export default function LegalDocument({ title, summary, sections, children }: LegalDocumentProps) {
  const { settings } = useStore();
  const storeName = (settings.store_name || '').trim();
  const email = (settings.contact_email || '').trim();
  const whatsapp = settings.whatsapp_number || '';
  const phone = (settings.contact_phone || whatsapp).trim();
  const whatsappNumber = whatsapp.replace(/\D/g, '');
  const address = (settings.address || '').trim();

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="min-h-screen bg-bg-cream">
        <section className="bg-primary px-6 py-16 text-center text-white md:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              {[storeName, address].filter(Boolean).join(' · ')}
            </p>
            <h1 className="font-heading text-4xl font-bold md:text-5xl">{title}</h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/80">{summary}</p>
          </div>
        </section>

        <article className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
          <div className="rounded-2xl border border-border-custom bg-white p-6 shadow-soft md:p-10">
            <div className="space-y-9">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="mb-3 font-heading text-xl font-semibold text-primary md:text-2xl">{section.title}</h2>
                  {section.paragraphs?.map((paragraph, index) => (
                    <p key={index} className="mb-3 leading-7 text-text-secondary last:mb-0">{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-text-secondary">
                      {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  )}
                </section>
              ))}
              {children}
              <section className="rounded-xl bg-bg-cream p-5">
                <h2 className="mb-3 font-heading text-xl font-semibold text-primary">
                  {storeName ? `Contact ${storeName}` : 'Contact us'}
                </h2>
                <p className="leading-7 text-text-secondary">
                  For questions about this page or your order, contact us
                  {email && <> at{' '}
                    <a className="font-medium text-primary underline underline-offset-2" href={`mailto:${email}`}>{email}</a>
                  </>}
                  {email && phone && ' or'}
                  {phone && <> {whatsappNumber ? 'by phone or WhatsApp at' : 'by phone at'}{' '}
                    <a
                      className="font-medium text-primary underline underline-offset-2"
                      href={whatsappNumber ? `https://wa.me/${whatsappNumber}` : `tel:${phone.replace(/[^\d+]/g, '')}`}
                    >
                      {phone}
                    </a>
                  </>}
                  {!email && !phone && ' using the contact details provided with your order'}
                  {address && <>. Address: {address}</>}.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
