import React from 'react';
import { Star, ShoppingBag, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-cream-50 rounded-2xl overflow-hidden border border-warmbrown-200/90 shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 flex flex-col hover:-translate-y-1 relative">
      {/* Badge */}
      {product.tag && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block bg-terracotta-600/95 backdrop-blur-sm text-cream-50 text-[11px] font-medium tracking-wider px-3 py-1 rounded-full shadow-sm">
            {product.tag}
          </span>
        </div>
      )}

      {/* Product Image Container */}
      <div 
        onClick={() => onViewDetails(product.id)}
        className="relative aspect-square w-full overflow-hidden bg-cream-200 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {/* Subtle warm overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-warmbrown-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product.id);
            }}
            className="w-full bg-cream-100/95 backdrop-blur-sm text-warmbrown-900 py-2.5 px-4 rounded-xl text-xs font-semibold shadow-warm flex items-center justify-center gap-1.5 hover:bg-cream-50 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-terracotta-600" />
            <span>Read Mom's Notes & View</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-warmbrown-500 mb-1.5">
            <span className="font-hand text-terracotta-700 text-sm">{product.subtitle}</span>
            <div className="flex items-center gap-1 text-mustard-600 font-semibold">
              <Star className="w-3.5 h-3.5 fill-mustard-500 text-mustard-500" />
              <span>{product.rating}</span>
              <span className="text-[10px] text-warmbrown-400">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => onViewDetails(product.id)}
            className="font-serif text-lg font-bold text-warmbrown-900 hover:text-terracotta-700 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-warmbrown-600 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price and Add button */}
        <div className="mt-5 pt-4 border-t border-warmbrown-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-bold text-terracotta-700">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-warmbrown-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-warmbrown-500 block font-hand">
              {product.craftTime}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 active:scale-95 text-cream-50 text-xs font-medium shadow-warm-sm flex items-center gap-1.5 transition-all"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
