'use client';

import React from 'react';

const ANNOUNCEMENTS = [
  "Free Delivery Across Doha",
  "100% Secure Checkout",
  "Eco-Friendly Packaging",
  "Expert Plant Care Support",
  "Custom Gifts & Corporate Orders"
];

export default function AnnouncementBar() {
  return (
    <div className="bg-primary text-white h-10 flex items-center overflow-hidden whitespace-nowrap relative">
      <div className="animate-marquee flex whitespace-nowrap items-center w-max">
        {ANNOUNCEMENTS.map((msg, i) => (
          <span key={i} className="mx-8 text-sm font-medium tracking-wide flex items-center gap-8">
            {msg}
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          </span>
        ))}
        {/* Duplicate for seamless looping */}
        {ANNOUNCEMENTS.map((msg, i) => (
          <span key={`dup-${i}`} className="mx-8 text-sm font-medium tracking-wide flex items-center gap-8">
            {msg}
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          </span>
        ))}
      </div>
    </div>
  );
}
