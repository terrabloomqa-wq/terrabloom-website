'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';

export default function AnnouncementBar() {
  const { settings } = useStore();

  return (
    <div className="bg-primary text-white h-10 flex items-center justify-center overflow-hidden">
      <p className="text-sm font-normal tracking-wide text-center px-4">
        {settings.announcement_text}
      </p>
    </div>
  );
}
