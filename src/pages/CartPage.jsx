import React from 'react';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage({ onNavigate, onSelectProduct }) {
  const { cartItems, updateQuantity, removeFromCart, subtotal, shipping, grandTotal, totalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-cream-200 border-2 border-warmbrown-200 flex items-center justify-center text-4xl mx-auto">
          🪭
        </div>
        <div>
          <h2 className="font-serif text-3xl font-bold text-warmbrown-900">Your basket is resting empty</h2>
          <p className="text-sm text-warmbrown-600 mt-2 max-w-sm mx-auto">
            Nani has stitched several beautiful new pankhis with silk floss waiting for a cozy corner in your home.
          </p>
        </div>
        <button
          onClick={() => onNavigate('catalog')}
          className="px-8 py-3.5 bg-terracotta-600 hover:bg-terracotta-700 text-cream-50 font-medium rounded-xl text-sm shadow-warm transition-all"
        >
          Explore Nani's Pankhis
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-warmbrown-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-warmbrown-900">
            Your Craft Basket
          </h1>
          <p className="text-xs sm:text-sm text-warmbrown-600 mt-1">
            {totalItems} hand-stitched {totalItems === 1 ? 'pankhi' : 'pankhis'} prepared with care
          </p>
        </div>
        <button
          onClick={() => onNavigate('catalog')}
          className="text-xs sm:text-sm font-medium text-terracotta-700 hover:text-terracotta-800 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Add more pankhis</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-cream-50 rounded-2xl p-4 sm:p-5 border border-warmbrown-200/90 shadow-warm-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all"
            >
              {/* Product Thumbnail */}
              <div
                onClick={() => onSelectProduct(item.id)}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-cream-200 border border-warmbrown-200 shrink-0 cursor-pointer"
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* Item Info */}
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-hand text-terracotta-600 font-bold">
                  {item.subtitle || 'Traditional Handcrafted'}
                </span>
                <h3
                  onClick={() => onSelectProduct(item.id)}
                  className="font-serif text-base font-bold text-warmbrown-900 hover:text-terracotta-700 transition-colors cursor-pointer truncate"
                >
                  {item.name}
                </h3>
                <p className="text-xs text-warmbrown-500 font-mono mt-0.5">
                  ₹{item.price.toLocaleString('en-IN')} each
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-warmbrown-100">
                <div className="flex items-center border border-warmbrown-300 rounded-xl bg-cream-100 overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 px-3 text-warmbrown-700 hover:bg-cream-200 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-semibold text-warmbrown-900 min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 px-3 text-warmbrown-700 hover:bg-cream-200 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal for Item */}
                <div className="text-right min-w-[5rem]">
                  <span className="font-serif text-base font-bold text-terracotta-700 block">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-warmbrown-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Homely packaging note */}
          <div className="p-4 bg-terracotta-50/70 border border-terracotta-200/80 rounded-2xl flex items-center gap-3 text-xs text-warmbrown-700">
            <span className="text-xl">🎁</span>
            <p>
              <strong>Hand-wrapped gift packaging:</strong> Every pankhi arrives wrapped in breathable soft muslin with a handwritten thank-you blessing from Nani.
            </p>
          </div>
        </div>

        {/* Order Summary & Checkout Card */}
        <div className="lg:col-span-4">
          <div className="bg-cream-50 rounded-2xl p-6 border border-warmbrown-200/90 shadow-warm space-y-5 sticky top-24">
            <h3 className="font-serif text-lg font-bold text-warmbrown-900 border-b border-warmbrown-200 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-warmbrown-700">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-medium text-warmbrown-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Standard Pan-India Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-sage font-semibold uppercase text-xs">FREE</span>
                  ) : (
                    <span>₹{shipping}</span>
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <div className="text-[11px] text-terracotta-700 bg-terracotta-50 p-2 rounded-lg border border-terracotta-200">
                  Add ₹{(1500 - subtotal).toLocaleString('en-IN')} more to unlock <strong>Free Shipping</strong>!
                </div>
              )}
              <div className="border-t border-warmbrown-200 pt-3 flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-warmbrown-900">Total Amount</span>
                <span className="font-serif text-2xl font-bold text-terracotta-700">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('checkout')}
              className="w-full py-4 px-6 bg-terracotta-600 hover:bg-terracotta-700 active:scale-95 text-cream-50 font-medium rounded-xl text-sm shadow-warm flex items-center justify-center gap-2 group transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="pt-2 text-center text-[11px] text-warmbrown-500 space-y-1">
              <p>Safe and direct UPI / Card / NetBanking via Razorpay</p>
              <p className="font-hand text-xs text-terracotta-600">No factory middle-men • direct to artisan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
