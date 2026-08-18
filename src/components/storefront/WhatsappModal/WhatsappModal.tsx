'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Modal, Input } from '@/components/ui';
import Button from '@/components/ui/Button/Button';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { formatPrice } from '@/lib/utils';
import type { ShippingFormData } from '@/types';

export default function WhatsappModal() {
  const { isWhatsappModalOpen, closeWhatsappModal, selectedProduct, settings } = useStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ShippingFormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<ShippingFormData>>({});

  const handleChange = (field: keyof ShippingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<ShippingFormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode.trim())) newErrors.pincode = 'Enter a valid 6-digit pincode';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !selectedProduct) return;

    setLoading(true);
    try {
      // Build WhatsApp message and redirect
      const message = buildWhatsAppMessage(selectedProduct, formData);
      const url = buildWhatsAppUrl(settings.whatsapp_number, message);
      window.open(url, '_blank');

      // Reset and close
      setFormData({ name: '', phone: '', email: '', address: '', city: '', pincode: '', notes: '' });
      closeWhatsappModal();
    } catch (err) {
      console.error('Error processing order:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isWhatsappModalOpen}
      onClose={closeWhatsappModal}
      title="Complete Your Order"
      maxWidth="520px"
    >
      {selectedProduct && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Product Summary */}
          <div className="flex gap-4 p-4 bg-bg-warm rounded-xl">
            <div
              className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0"
              style={{ backgroundImage: `url(${selectedProduct.image_url})` }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-display text-sm font-semibold text-text-main truncate">
                {selectedProduct.title}
              </h4>
              <p className="text-lg font-bold text-primary mt-1">
                {formatPrice(selectedProduct.price)}
              </p>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-text-main flex items-center gap-2">
              📦 Shipping Details
            </h4>

            <Input
              label="Full Name *"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
            />

            <Input
              label="Phone Number *"
              name="phone"
              type="tel"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              error={errors.phone}
            />

            <Input
              label="Email (Optional)"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />

            <Input
              label="Delivery Address *"
              name="address"
              placeholder="House/Flat No., Street, Locality"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              error={errors.address}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City *"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                error={errors.city}
              />
              <Input
                label="Pincode *"
                name="pincode"
                type="text"
                placeholder="6-digit pincode"
                value={formData.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                error={errors.pincode}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-text-main">Notes (Optional)</label>
              <textarea
                name="notes"
                placeholder="Any special instructions..."
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={2}
                className="px-4 py-3 border-[1.5px] border-border-custom rounded-lg text-base text-text-main bg-white outline-none transition-all duration-150 placeholder:text-text-muted focus:border-primary focus:ring-[3px] focus:ring-primary/10 resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            className="!bg-[#25D366] !border-[#25D366] hover:!bg-[#20BD5A] mt-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order via WhatsApp
          </Button>

          <p className="text-xs text-text-muted text-center">
            You&apos;ll be redirected to WhatsApp to confirm your order
          </p>
        </form>
      )}
    </Modal>
  );
}
