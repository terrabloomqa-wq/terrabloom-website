'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import Button from '@/components/ui/Button/Button';
import { formatPrice } from '@/lib/utils';

export default function CartSlideOver() {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    cartCount
  } = useCart();
  
  const { openWhatsappModal } = useStore();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity"
        onClick={closeCart}
      />
      
      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 z-[101] w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-custom bg-bg-warm">
          <h2 className="text-lg font-heading font-bold text-text-main flex items-center gap-2">
            Your Cart <span className="text-sm font-normal text-text-secondary">({cartCount} items)</span>
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 -mr-2 text-text-muted hover:text-text-main transition-colors rounded-full hover:bg-black/5"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-text-muted">
              <svg className="w-16 h-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-lg font-medium">Your cart is empty</p>
              <Button variant="outline" onClick={closeCart}>Continue Shopping</Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-border-light bg-white shadow-sm">
                <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden relative bg-bg-warm">
                  <Image 
                    src={item.image_url} 
                    alt={item.title} 
                    fill 
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-medium text-text-main line-clamp-2 text-sm leading-tight">
                      {item.title}
                    </h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-text-muted hover:text-red-500 transition-colors p-1 -mt-1 -mr-1"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-bold text-primary">
                      {formatPrice(item.price)}
                    </p>
                    
                    <div className="flex items-center bg-bg-warm rounded-lg border border-border-custom">
                      <button 
                        className="w-8 h-8 flex items-center justify-center text-text-main hover:text-primary transition-colors disabled:opacity-50"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button 
                        className="w-8 h-8 flex items-center justify-center text-text-main hover:text-primary transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-border-custom p-6 bg-white shrink-0">
            <div className="flex justify-between items-center mb-6">
              <span className="text-text-secondary font-medium">Subtotal</span>
              <span className="text-xl font-bold text-text-main">{formatPrice(cartTotal)}</span>
            </div>
            <p className="text-sm text-text-muted mb-4 text-center">
              Shipping is calculated on WhatsApp
            </p>
            <Button 
              fullWidth 
              size="lg" 
              variant="primary"
              onClick={() => {
                closeCart();
                // We pass null to openWhatsappModal to indicate a cart checkout
                // But wait, openWhatsappModal expects a Product.
                // I need to modify openWhatsappModal to accept a product OR null/undefined for cart checkout.
                // Let's pass a dummy object or fix the types.
                // I will modify StoreContext to make openWhatsappModal product optional.
                openWhatsappModal(null as any); 
              }}
              className="!bg-[#25D366] !border-[#25D366] hover:!bg-[#20BD5A]"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Checkout on WhatsApp
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
