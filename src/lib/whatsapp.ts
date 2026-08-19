// ============================================================
// Terra Bloom — WhatsApp Link Builder
// ============================================================

import type { Product, ShippingFormData, CartItem } from '@/types';
import { formatPrice } from './utils';

/**
 * Build a pre-populated WhatsApp message for a product order enquiry.
 */
export function buildWhatsAppMessage(
  product: Product,
  customer: ShippingFormData,
  quantity: number = 1
): string {
  const totalAmount = product.price * quantity;

  const lines = [
    `🌿 *New Order Enquiry — Terra Bloom* 🌿`,
    ``,
    `📦 *Product Details:*`,
    `• Name: ${product.title}`,
    `• Price: ${formatPrice(product.price)}`,
    `• Quantity: ${quantity}`,
    `• Total: ${formatPrice(totalAmount)}`,
    ``,
    `👤 *Customer Details:*`,
    `• Name: ${customer.name}`,
    `• Phone: ${customer.phone}`,
    `• Zone: ${customer.zone}`,
    `• Street: ${customer.street}`,
    `• Building: ${customer.building}`,
    ...(customer.notes ? [``, `📝 *Notes:* ${customer.notes}`] : []),
    ``,
    `Please confirm availability and delivery details! 🌱`,
  ];

  return lines.join('\n');
}

/**
 * Build a pre-populated WhatsApp message for a full cart order enquiry.
 */
export function buildCartWhatsAppMessage(
  cartItems: CartItem[],
  customer: ShippingFormData,
  totalAmount: number
): string {
  const lines = [
    `🌿 *New Cart Order Enquiry — Terra Bloom* 🌿`,
    ``,
    `📦 *Order Details:*`,
    ...cartItems.map(
      (item, i) =>
        `${i + 1}. ${item.title} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}`
    ),
    ``,
    `*Total Amount:* ${formatPrice(totalAmount)}`,
    ``,
    `👤 *Customer Details:*`,
    `• Name: ${customer.name}`,
    `• Phone: ${customer.phone}`,
    `• Zone: ${customer.zone}`,
    `• Street: ${customer.street}`,
    `• Building: ${customer.building}`,
    ...(customer.notes ? [``, `📝 *Notes:* ${customer.notes}`] : []),
    ``,
    `Please confirm availability and delivery details! 🌱`,
  ];

  return lines.join('\n');
}

/**
 * Build the full WhatsApp URL to open chat with a pre-filled message.
 * @param whatsappNumber - The store's WhatsApp number (without + prefix, e.g. "919876543210")
 * @param message - The pre-populated message text
 */
export function buildWhatsAppUrl(whatsappNumber: string, message: string): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

/**
 * Build a general WhatsApp enquiry URL (non-product).
 */
export function buildGeneralWhatsAppUrl(whatsappNumber: string): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    `Hi Terra Bloom! 🌿\n\nI'd like to enquire about your terrariums. Could you help me?`
  );
  return `https://wa.me/${cleanNumber}?text=${message}`;
}
