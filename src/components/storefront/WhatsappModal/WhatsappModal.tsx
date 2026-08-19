'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import { Modal, Input } from '@/components/ui';
import Button from '@/components/ui/Button/Button';
import { buildWhatsAppMessage, buildCartWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { formatPrice } from '@/lib/utils';
import type { ShippingFormData } from '@/types';

export default function WhatsappModal() {
  const { isWhatsappModalOpen, closeWhatsappModal, selectedProduct, settings } = useStore();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  
  const isCartCheckout = !selectedProduct && cartItems.length > 0;

  const [formData, setFormData] = useState<ShippingFormData>({
    name: '',
    phone: '',
    zone: '',
    street: '',
    building: '',
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
    if (!formData.zone.trim()) newErrors.zone = 'Zone is required';
    if (!formData.street.trim()) newErrors.street = 'Street is required';
    if (!formData.building.trim()) newErrors.building = 'Building is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!selectedProduct && cartItems.length === 0) return;

    setLoading(true);
    try {
      // Build WhatsApp message and redirect
      let message = '';
      if (selectedProduct) {
        message = buildWhatsAppMessage(selectedProduct, formData);
      } else {
        message = buildCartWhatsAppMessage(cartItems, formData, cartTotal);
      }
      
      const url = buildWhatsAppUrl(settings.whatsapp_number, message);
      window.open(url, '_blank');

      // Reset and close
      setFormData({ name: '', phone: '', zone: '', street: '', building: '', notes: '' });
      if (isCartCheckout) clearCart();
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
      {(selectedProduct || isCartCheckout) && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Product Summary */}
          {selectedProduct ? (
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
          ) : (
            <div className="flex flex-col gap-2 p-4 bg-bg-warm rounded-xl">
              <h4 className="font-display text-sm font-semibold text-text-main border-b border-border-custom pb-2">
                Cart Summary ({cartItems.length} items)
              </h4>
              <div className="max-h-32 overflow-y-auto scrollbar-hide pr-2 space-y-2 mt-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="truncate pr-2">{item.quantity}x {item.title}</span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-primary mt-2 pt-2 border-t border-border-custom">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>
          )}

          {/* Shipping Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-text-main flex items-center gap-2">
              Shipping Details
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
              placeholder="Mobile number"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              error={errors.phone}
            />

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Zone no *"
                name="zone"
                placeholder="Zone no"
                value={formData.zone}
                onChange={(e) => handleChange('zone', e.target.value)}
                error={errors.zone}
              />
              <Input
                label="Street no *"
                name="street"
                placeholder="Street no"
                value={formData.street}
                onChange={(e) => handleChange('street', e.target.value)}
                error={errors.street}
              />
              <Input
                label="Building no *"
                name="building"
                placeholder="Building no"
                value={formData.building}
                onChange={(e) => handleChange('building', e.target.value)}
                error={errors.building}
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
