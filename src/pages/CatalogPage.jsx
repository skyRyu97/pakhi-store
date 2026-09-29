import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter, Sparkles } from 'lucide-react';

export default function CatalogPage({ products, onSelectProduct }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = products.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'under1000') return p.price < 1000;
    if (filter === 'phulkari') return p.name.toLowerCase().includes('phulkari') || p.subtitle.toLowerCase().includes('silk');
    if (filter === 'heirloom') return p.price >= 1200;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // default order
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cream-100 via-cream-200 to-terracotta-100/50 rounded-3xl p-8 border border-warmbrown-200 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-50 text-terracotta-800 text-xs font-medium border border-terracotta-200">
            <Sparkles className="w-3.5 h-3.5 text-mustard-500" />
            <span>Limited Small Batch Creations</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900">
            The Pankhi Collection
          </h1>
          <p className="text-sm text-warmbrown-700 leading-relaxed">
            Every pankhi here was carefully crafted by hand at our home in Punjab. Made with pure cotton, silken floss, natural cane, and turned wood handles.
          </p>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-cream-50 p-4 rounded-2xl border border-warmbrown-200/80 shadow-warm-sm">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${filter === 'all'
                ? 'bg-terracotta-600 text-cream-50 shadow-sm'
                : 'bg-cream-100 hover:bg-cream-200 text-warmbrown-800'
              }`}
          >
            All Pankhis ({products.length})
          </button>
          <button
            onClick={() => setFilter('phulkari')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${filter === 'phulkari'
                ? 'bg-terracotta-600 text-cream-50 shadow-sm'
                : 'bg-cream-100 hover:bg-cream-200 text-warmbrown-800'
              }`}
          >
            Phulkari Silk Work
          </button>
          <button
            onClick={() => setFilter('heirloom')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${filter === 'heirloom'
                ? 'bg-terracotta-600 text-cream-50 shadow-sm'
                : 'bg-cream-100 hover:bg-cream-200 text-warmbrown-800'
              }`}
          >
            Wedding & Heirloom
          </button>
          <button
            onClick={() => setFilter('under1000')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${filter === 'under1000'
                ? 'bg-terracotta-600 text-cream-50 shadow-sm'
                : 'bg-cream-100 hover:bg-cream-200 text-warmbrown-800'
              }`}
          >
            Under ₹1,000
          </button>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="sort-by" className="text-xs text-warmbrown-600 font-medium">Sort by:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs bg-cream-100 border border-warmbrown-300 rounded-xl px-3 py-1.5 text-warmbrown-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500 cursor-pointer"
          >
            <option value="featured">Nani's Recommendation</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-cream-50 rounded-2xl border border-warmbrown-200">
          <p className="font-serif text-lg text-warmbrown-800">No pankhis matched this filter.</p>
          <button
            onClick={() => setFilter('all')}
            className="mt-3 text-xs text-terracotta-600 underline font-medium"
          >
            Reset filters to view all
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onSelectProduct}
            />
          ))}
        </div>
      )}

      {/* Custom request notice */}
      <div className="p-6 bg-terracotta-50 rounded-2xl border border-terracotta-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif font-bold text-terracotta-900 text-base">Looking for a specific wedding shagun color?</h4>
          <p className="text-xs text-terracotta-700 mt-0.5">
            Nani often embroiders custom colorways to match bridal lehengas or festive home motifs.
          </p>
        </div>
        <a
          href="mailto:hello@nanidipankhi.store?subject=Custom%20Pankhi%20Inquiry"
          className="shrink-0 px-4 py-2 bg-terracotta-600 hover:bg-terracotta-700 text-cream-50 rounded-xl text-xs font-medium shadow-warm-sm transition-colors"
        >
          Message Nani for Custom Colors
        </a>
      </div>
    </div>
  );
}
