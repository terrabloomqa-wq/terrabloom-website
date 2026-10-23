import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Our return, cancellation, exchange and refund policy for customer orders.',
  alternates: { canonical: '/refund-policy' },
};

export default function RefundPolicyLayout({ children }: { children: ReactNode }) {
  return children;
}
