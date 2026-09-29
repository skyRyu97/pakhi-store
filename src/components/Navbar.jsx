import React, { useState } from 'react';
import { ShoppingBag, Heart, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ activePage, setActivePage, setSelectedProductId }) {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page, prodId = null) => {
    setActivePage(page);
    if (prodId) setSelectedProductId(prodId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#faf6f0]/95 backdrop-blur-md border-b border-warmbrown-200/70 transition-all">
      {/* Top rustic announcement strip */}
      <div className="bg-terracotta-700 text-cream-100 text-xs sm:text-sm py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-mustard-300" />
        <span>Every pankhi hand-stitched by Nani with love in Punjab • Free shipping on orders over ₹1,500</span>
        <Sparkles className="w-3.5 h-3.5 text-mustard-300 hidden sm:inline" />
      </div>

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => navigateTo('home')}
          className="cursor-pointer group flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-terracotta-100 border-2 border-terracotta-300 flex items-center justify-center text-xl shadow-warm-sm group-hover:scale-105 transition-transform">
            🪭
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-warmbrown-900 group-hover:text-terracotta-700 transition-colors">
              Nani Di Pankhi
            </span>
            <span className="block text-[11px] font-hand text-terracotta-600 tracking-wider -mt-1">
              punjabi heritage crafts • ਹੱਥ ਦੀ ਬਣੀ
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-warmbrown-800">
          <button
            onClick={() => navigateTo('home')}
            className={`transition-colors hover:text-terracotta-600 pb-0.5 ${
              activePage === 'home' ? 'text-terracotta-700 font-semibold border-b-2 border-terracotta-500' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('catalog')}
            className={`transition-colors hover:text-terracotta-600 pb-0.5 ${
              activePage === 'catalog' ? 'text-terracotta-700 font-semibold border-b-2 border-terracotta-500' : ''
            }`}
          >
            Handmade Pankhis
          </button>
          <button
            onClick={() => {
              if (activePage !== 'home') {
                setActivePage('home');
                setTimeout(() => {
                  document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="transition-colors hover:text-terracotta-600"
          >
            Nani's Story
          </button>
          <button
            onClick={() => {
              if (activePage !== 'home') {
                setActivePage('home');
                setTimeout(() => {
                  document.getElementById('craft-process')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('craft-process')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="transition-colors hover:text-terracotta-600"
          >
            The Craft
          </button>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigateTo('cart')}
            className="relative p-2.5 rounded-full bg-cream-100 hover:bg-cream-200 border border-warmbrown-200 text-warmbrown-800 transition-colors shadow-warm-sm flex items-center justify-center group"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 text-terracotta-700 transition-transform" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-terracotta-600 text-cream-50 text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#faf6f0] animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-warmbrown-800 hover:bg-cream-200 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf6f0] border-b border-warmbrown-200 px-6 py-5 shadow-warm space-y-4 animate-fadeIn">
          <button
            onClick={() => navigateTo('home')}
            className={`block w-full text-left py-2 text-base font-medium ${
              activePage === 'home' ? 'text-terracotta-700 font-semibold' : 'text-warmbrown-800'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('catalog')}
            className={`block w-full text-left py-2 text-base font-medium ${
              activePage === 'catalog' ? 'text-terracotta-700 font-semibold' : 'text-warmbrown-800'
            }`}
          >
            Browse All Pankhis
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (activePage !== 'home') {
                setActivePage('home');
                setTimeout(() => {
                  document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="block w-full text-left py-2 text-base font-medium text-warmbrown-800"
          >
            Nani's Story
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigateTo('cart');
            }}
            className="block w-full text-left py-2 text-base font-medium text-terracotta-700"
          >
            View Cart ({totalItems} items)
          </button>
        </div>
      )}
    </header>
  );
}
