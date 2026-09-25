import React, { useState } from 'react';
import { ArrowLeft, Star, ShoppingBag, ShieldCheck, Heart, Clock, Truck, Check, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage({ product, onBack, onNavigateToCart }) {
  const { addToCart } = useCart();
  const [selectedImg, setSelectedImg] = useState(product?.image);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl text-warmbrown-800">Pakhi not found</h2>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2.5 bg-terracotta-600 text-cream-50 rounded-xl text-sm"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  const allImages = [product.image, ...(product.additionalImages || [])];

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-warmbrown-700 hover:text-terracotta-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all pakhis</span>
        </button>
        <span className="text-xs text-warmbrown-500 font-hand text-base">
          Maa Di Pakhi • Serial #MDP-{product.id.slice(0, 4).toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left: Product Images */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-cream-200 border-2 border-warmbrown-200 shadow-warm">
            <img
              src={selectedImg || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-terracotta-600 text-cream-50 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImg === img
                      ? 'border-terracotta-600 ring-2 ring-terracotta-300 scale-95'
                      : 'border-warmbrown-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Craft guarantee note card */}
          <div className="p-4 bg-cream-100/70 border border-warmbrown-200 rounded-2xl flex items-start gap-3 text-xs text-warmbrown-700">
            <Heart className="w-4 h-4 text-terracotta-500 shrink-0 mt-0.5" />
            <p>
              <strong className="font-serif text-warmbrown-900">Each one is unique:</strong> Because mom dyes the threads and hand-turns each wooden handle without computerized stencils, gentle variations in motif shade and tassel length are natural markers of authenticity.
            </p>
          </div>
        </div>

        {/* Right: Product Details & Buying Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="font-hand text-terracotta-600 text-lg font-bold">
              {product.subtitle}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
              {product.name}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 bg-mustard-100 px-2.5 py-1 rounded-lg text-mustard-800 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-mustard-600 text-mustard-600" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-warmbrown-500">
                Based on {product.reviewsCount} verified handmade reviews
              </span>
            </div>
          </div>

          {/* Price strip */}
          <div className="p-4 bg-cream-100/90 rounded-2xl border border-warmbrown-200/80 flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-terracotta-700">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-warmbrown-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs font-medium text-sage bg-sage/20 px-2 py-0.5 rounded-md">
                Taxes included
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-terracotta-700 block">
                {product.inStock} pieces available
              </span>
              <span className="text-[11px] text-warmbrown-500 font-hand">
                Ready to dispatch
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="prose text-sm text-warmbrown-700 leading-relaxed space-y-3">
            <p>{product.description}</p>
          </div>

          {/* Handcraft Details list */}
          <div className="space-y-2 pt-2">
            <h4 className="font-serif text-sm font-bold text-warmbrown-900 uppercase tracking-wider">
              Artisan Features & Construction:
            </h4>
            <ul className="space-y-1.5 text-xs text-warmbrown-700">
              {product.details?.map((detail, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-terracotta-500 mt-0.5">•</span>
                  <span>{detail}</span>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500 mt-0.5">•</span>
                <span>Crafting Duration: <strong>{product.craftTime}</strong></span>
              </li>
            </ul>
          </div>

          {/* Quantity and Add to Cart Section */}
          <div className="pt-4 border-t border-warmbrown-200 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Qty Selector */}
              <div className="flex items-center border border-warmbrown-300 rounded-xl bg-cream-50 overflow-hidden w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-3 text-warmbrown-700 hover:bg-cream-200 active:bg-cream-300 transition-colors font-bold text-sm"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-3 text-sm font-semibold text-warmbrown-900 min-w-[2.5rem] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(product.inStock, qty + 1))}
                  className="px-4 py-3 text-warmbrown-700 hover:bg-cream-200 active:bg-cream-300 transition-colors font-bold text-sm"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAdd}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 active:scale-95 text-cream-50 font-medium shadow-warm flex items-center justify-center gap-2 transition-all"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-cream-100" />
                    <span>Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Basket • ₹{(product.price * qty).toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick buy / direct to cart */}
            {added && (
              <div className="animate-fadeIn">
                <button
                  onClick={onNavigateToCart}
                  className="w-full py-2.5 px-4 bg-mustard-500 hover:bg-mustard-600 text-warmbrown-900 font-semibold rounded-xl text-xs transition-colors shadow-warm-sm"
                >
                  Proceed straight to Checkout →
                </button>
              </div>
            )}
          </div>

          {/* Quick Perks Badge list */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-warmbrown-200 text-xs text-warmbrown-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-terracotta-600" />
              <span>Ships in 24-48 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-mustard-600" />
              <span>Carefully packed with muslin wrap</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
