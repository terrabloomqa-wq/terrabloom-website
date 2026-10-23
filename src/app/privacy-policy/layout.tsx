import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read how we collect, use and protect information when you use our website and make an order enquiry.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyLayout({ children }: { children: ReactNode }) {
  return children;
}
