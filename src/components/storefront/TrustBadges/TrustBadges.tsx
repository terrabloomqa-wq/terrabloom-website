'use client';

import React from 'react';
import { Leaf, Truck, Recycle, MessageCircle } from 'lucide-react';

const TRUST_BADGES = [
  {
    icon: Leaf,
    title: 'Live Arrival Guarantee',
    description: 'Plants arrive fresh & healthy',
    iconColor: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    icon: Truck,
    title: 'Pan India Delivery',
    description: 'Secure & free shipping',
    iconColor: 'text-orange-500',
    bg: 'bg-orange-50'
  },
  {
    icon: Recycle,
    title: 'Eco-Friendly Packaging',
    description: 'Sustainable & plastic-free',
    iconColor: 'text-teal-500',
    bg: 'bg-teal-50'
  },
  {
    icon: MessageCircle,
    title: 'Expert Support',
    description: "We're here to help",
    iconColor: 'text-indigo-500',
    bg: 'bg-indigo-50'
  },
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-bg-warm border-y border-border-custom">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex items-center gap-4 justify-center md:justify-start group"
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-full ${badge.bg} transition-transform duration-300 group-hover:scale-110 shrink-0`}>
                  <Icon className={`w-6 h-6 ${badge.iconColor}`} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-main">{badge.title}</h4>
                  <p className="text-xs text-text-muted mt-0.5">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
