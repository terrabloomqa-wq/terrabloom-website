import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms that apply to browsing our website and making product enquiries or orders.',
  alternates: { canonical: '/terms-of-service' },
};

export default function TermsOfServiceLayout({ children }: { children: ReactNode }) {
  return children;
}
