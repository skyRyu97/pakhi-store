import React, { useState } from 'react';
import { ArrowLeft, Lock, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutPage({ onNavigate, onOrderSuccess }) {
  const { cartItems, subtotal, shipping, grandTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Punjab',
    pincode: '',
    giftNote: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-warmbrown-900">Your basket is empty</h2>
        <p className="text-sm text-warmbrown-600">Please select a pankhi before proceeding to checkout.</p>
        <button
          onClick={() => onNavigate('catalog')}
          className="px-6 py-2.5 bg-terracotta-600 text-cream-50 rounded-xl text-sm font-medium"
        >
          View Collection
        </button>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide recipient full name';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Valid 10-digit phone is needed for courier updates';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required for the receipt';
    if (!formData.address.trim()) errs.address = 'Delivery address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) errs.pincode = '6-digit PIN code required';
    return errs;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsProcessing(true);

    // Simulate Razorpay payment modal / verification flow
    setTimeout(() => {
      const orderDetails = {
        orderId: `PANKHI-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        customer: formData,
        items: [...cartItems],
        subtotal,
        shipping,
        grandTotal,
        paymentStatus: 'Paid via Razorpay (Simulated)'
      };

      clearCart();
      setIsProcessing(false);
      onOrderSuccess(orderDetails);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('cart')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-warmbrown-700 hover:text-terracotta-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to basket</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Shipping Form */}
        <div className="lg:col-span-7">
          <div className="bg-cream-50 rounded-2xl p-6 sm:p-8 border border-warmbrown-200/90 shadow-warm">
            <div className="border-b border-warmbrown-200 pb-4 mb-6">
              <span className="font-hand text-terracotta-600 text-lg font-bold">Ghar Da Pata</span>
              <h2 className="font-serif text-2xl font-bold text-warmbrown-900">
                Delivery Details
              </h2>
              <p className="text-xs text-warmbrown-600 mt-1">
                Tell us where Nani should send your handcrafted pankhi package.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-warmbrown-800 mb-1">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Simran Kaur"
                  className={`w-full px-3.5 py-2.5 bg-cream-100/70 border rounded-xl text-sm text-warmbrown-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500 ${errors.name ? 'border-red-400' : 'border-warmbrown-300'
                    }`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Contact row: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-warmbrown-800 mb-1">
                    Phone Number (for Courier SMS) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 9876543210"
                    className={`w-full px-3.5 py-2.5 bg-cream-100/70 border rounded-xl text-sm text-warmbrown-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500 ${errors.phone ? 'border-red-400' : 'border-warmbrown-300'
                      }`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warmbrown-800 mb-1">
                    Email Address (for Receipt) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="simran@example.com"
                    className={`w-full px-3.5 py-2.5 bg-cream-100/70 border rounded-xl text-sm text-warmbrown-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500 ${errors.email ? 'border-red-400' : 'border-warmbrown-300'
                      }`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-xs font-semibold text-warmbrown-800 mb-1">
                  Full Street Address & Landmark *
                </label>
                <textarea
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House / Flat No., Street, Landmark"
                  className={`w-full px-3.5 py-2.5 bg-cream-100/70 border rounded-xl text-sm text-warmbrown-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500 resize-none ${errors.address ? 'border-red-400' : 'border-warmbrown-300'
                    }`}
                />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>

              {/* City, State, PIN */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-warmbrown-800 mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Amritsar"
                    className={`w-full px-3.5 py-2.5 bg-cream-100/70 border rounded-xl text-sm text-warmbrown-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500 ${errors.city ? 'border-red-400' : 'border-warmbrown-300'
                      }`}
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warmbrown-800 mb-1">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-cream-100/70 border border-warmbrown-300 rounded-xl text-sm text-warmbrown-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Other">Other State</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warmbrown-800 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="143001"
                    className={`w-full px-3.5 py-2.5 bg-cream-100/70 border rounded-xl text-sm text-warmbrown-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500 ${errors.pincode ? 'border-red-400' : 'border-warmbrown-300'
                      }`}
                  />
                  {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                </div>
              </div>

              {/* Gift message note for Nani */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-warmbrown-800 mb-1 flex items-center justify-between">
                  <span>Gift Note (Optional — Nani will handwrite this on a card)</span>
                  <span className="font-hand text-terracotta-600 text-xs">A special touch 💌</span>
                </label>
                <textarea
                  name="giftNote"
                  rows={2}
                  value={formData.giftNote}
                  onChange={handleInputChange}
                  placeholder="e.g. Dearest Dadi Ji, wishing you peaceful cool afternoons. Love from Aman."
                  className="w-full px-3.5 py-2 bg-cream-100/70 border border-warmbrown-300 rounded-xl text-xs text-warmbrown-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500 resize-none font-hand text-sm"
                />
              </div>

              {/* Razorpay Placeholder badge */}
              <div className="pt-4 border-t border-warmbrown-200">
                <div className="bg-[#f0f4fc] p-4 rounded-xl border border-[#c6d7f8] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0c2340] text-white flex items-center justify-center font-bold text-xs tracking-tighter">
                      RZP
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0c2340]">Razorpay Payment Gateway</p>
                      <p className="text-[11px] text-[#425466]">Instant UPI (GPay, PhonePe, Paytm), Cards & NetBanking</p>
                    </div>
                  </div>
                  <Lock className="w-4 h-4 text-[#0c2340]" />
                </div>
              </div>

              {/* Pay Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-6 bg-terracotta-600 hover:bg-terracotta-700 active:scale-95 disabled:opacity-60 text-cream-50 font-medium rounded-xl text-base shadow-warm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-cream-100 border-t-transparent rounded-full animate-spin"></div>
                      <span>Connecting to Razorpay...</span>
                    </div>
                  ) : (
                    <span>Pay ₹{grandTotal.toLocaleString('en-IN')} with Razorpay</span>
                  )}
                </button>
                <p className="text-center text-[11px] text-warmbrown-500 mt-2">
                  🔒 Test mode active: clicking will safely simulate payment & produce your receipt.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Cart Review Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-cream-50 rounded-2xl p-6 border border-warmbrown-200/90 shadow-warm space-y-4">
            <h3 className="font-serif text-lg font-bold text-warmbrown-900 border-b border-warmbrown-200 pb-3">
              Items in this Package ({cartItems.length})
            </h3>

            <div className="divide-y divide-warmbrown-100 max-h-72 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-warmbrown-200" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs font-bold text-warmbrown-900 truncate">{item.name}</h4>
                    <p className="text-[11px] text-warmbrown-500">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <span className="font-serif text-xs font-bold text-warmbrown-800">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-warmbrown-200 pt-3 space-y-2 text-xs text-warmbrown-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span>{shipping === 0 ? <strong className="text-sage">FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div className="border-t border-warmbrown-200 pt-2 flex justify-between items-baseline font-bold">
                <span className="font-serif text-sm text-warmbrown-900">Total Due</span>
                <span className="font-serif text-xl text-terracotta-700">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-cream-100/60 rounded-2xl border border-warmbrown-200 text-xs text-warmbrown-600 space-y-2">
            <div className="flex items-center gap-2 text-terracotta-700 font-semibold">
              <Heart className="w-4 h-4 fill-terracotta-500 text-terracotta-500" />
              <span>Direct Family Support</span>
            </div>
            <p className="leading-relaxed">
              100% of proceeds go directly toward funding Nani's materials, threads, wood lathes, and encouraging young girls in our village to learn traditional needle crafts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
