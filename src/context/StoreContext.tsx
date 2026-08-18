'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { StoreSettings, Product, ShippingFormData } from '@/types';
import { DEFAULT_STORE_SETTINGS } from '@/lib/constants';
import { getStoreSettings } from '@/services/settingsService';

// ---- Context Shape ----
interface StoreContextType {
  settings: StoreSettings;
  isWhatsappModalOpen: boolean;
  selectedProduct: Product | null;
  openWhatsappModal: (product: Product) => void;
  closeWhatsappModal: () => void;
  refreshSettings: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// ---- Provider ----
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const data = await getStoreSettings();
      setSettings(data);
    } catch (err) {
      console.error('Failed to fetch store settings:', err);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const openWhatsappModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsWhatsappModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeWhatsappModal = useCallback(() => {
    setIsWhatsappModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = '';
  }, []);

  const refreshSettings = useCallback(async () => {
    await fetchSettings();
  }, [fetchSettings]);

  return (
    <StoreContext value={{
      settings,
      isWhatsappModalOpen,
      selectedProduct,
      openWhatsappModal,
      closeWhatsappModal,
      refreshSettings,
    }}>
      {children}
    </StoreContext>
  );
}

// ---- Hook ----
export function useStore(): StoreContextType {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
