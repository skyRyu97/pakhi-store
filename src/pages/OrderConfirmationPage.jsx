import React from 'react';
import { CheckCircle2, Heart, ArrowRight, Printer, Sparkles } from 'lucide-react';

export default function OrderConfirmationPage({ order, onNavigate }) {
  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-warmbrown-900">No active order found</h2>
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-2.5 bg-terracotta-600 text-cream-50 rounded-xl text-sm"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Thank you homely header */}
      <div className="bg-gradient-to-b from-cream-100 to-cream-50 rounded-3xl p-8 sm:p-10 border-2 border-dashed border-terracotta-300 text-center space-y-4 shadow-warm relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-sage/20 border-2 border-sage text-sage flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <span className="font-hand text-terracotta-700 text-xl font-bold">Dhanvaad Ji! 🌸</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
            Order Confirmed & Received
          </h1>
          <p className="text-sm text-warmbrown-700 mt-2 max-w-md mx-auto leading-relaxed">
            Nani has received your order request and will personally prepare your pankhi for dispatch from our home in Punjab.
          </p>
        </div>

        <div className="inline-block bg-cream-200/90 px-4 py-1.5 rounded-full border border-warmbrown-300 text-xs font-mono text-warmbrown-800">
          Order ID: <strong>{order.orderId}</strong> • Placed on {order.date}
        </div>
      </div>

      {/* Nani's personal handwritten card mockup */}
      <div className="bg-[#fffdf8] p-6 sm:p-8 rounded-2xl border border-warmbrown-300/80 shadow-warm-sm relative">
        <div className="absolute top-3 right-3 text-terracotta-400">
          <Heart className="w-5 h-5 fill-terracotta-200" />
        </div>
        <h3 className="font-serif text-base font-bold text-warmbrown-900 mb-2">
          A Message from Nani Ji:
        </h3>
        <p className="font-hand text-lg sm:text-xl text-terracotta-800 leading-relaxed italic">
          "Puttar, thank you for supporting my lifelong craft. May this pankhi bring cooling peace, good health, and sweet blessings into your home."
        </p>
        {order.customer?.giftNote && (
          <div className="mt-4 pt-4 border-t border-warmbrown-200">
            <p className="text-xs font-semibold text-warmbrown-700">Requested Gift Note:</p>
            <p className="font-hand text-base text-warmbrown-800 bg-cream-100 p-3 rounded-xl mt-1">
              "{order.customer.giftNote}"
            </p>
          </div>
        )}
      </div>

      {/* Order Summary Details */}
      <div className="bg-cream-50 rounded-2xl p-6 sm:p-8 border border-warmbrown-200 shadow-warm space-y-6">
        <h3 className="font-serif text-lg font-bold text-warmbrown-900 border-b border-warmbrown-200 pb-3">
          Order Breakdown
        </h3>

        {/* Items */}
        <div className="divide-y divide-warmbrown-100">
          {order.items?.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-warmbrown-200" />
                <div>
                  <h4 className="font-serif font-bold text-warmbrown-900">{item.name}</h4>
                  <p className="text-warmbrown-500 text-xs">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-serif font-semibold text-warmbrown-800">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing calculations */}
        <div className="border-t border-warmbrown-200 pt-3 space-y-1.5 text-xs text-warmbrown-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{order.subtotal?.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-warmbrown-900 border-t border-warmbrown-200 pt-2">
            <span>Amount Paid</span>
            <span className="text-terracotta-700 font-serif text-lg">₹{order.grandTotal?.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-[11px] text-sage font-medium pt-1">
            Status: {order.paymentStatus}
          </p>
        </div>

        {/* Shipping address details */}
        <div className="border-t border-warmbrown-200 pt-4 bg-cream-100/60 p-4 rounded-xl text-xs space-y-1">
          <p className="font-semibold text-warmbrown-900">Dispatched To:</p>
          <p className="text-warmbrown-800 font-medium">{order.customer?.name} ({order.customer?.phone})</p>
          <p className="text-warmbrown-600">{order.customer?.address}</p>
          <p className="text-warmbrown-600">{order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}</p>
          <p className="text-warmbrown-500 pt-1">Confirmation copy sent to: {order.customer?.email}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => window.print()}
          className="w-full sm:w-auto px-6 py-3 bg-cream-100 hover:bg-cream-200 border border-warmbrown-300 text-warmbrown-800 font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Printer className="w-4 h-4 text-warmbrown-600" />
          <span>Print Receipt</span>
        </button>
        <button
          onClick={() => onNavigate('catalog')}
          className="w-full sm:w-auto px-8 py-3.5 bg-terracotta-600 hover:bg-terracotta-700 text-cream-50 font-medium rounded-xl text-xs shadow-warm flex items-center justify-center gap-2 transition-all"
        >
          <span>Continue Browsing Pankhis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
