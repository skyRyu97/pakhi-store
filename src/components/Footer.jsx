import React from 'react';
import { Heart, Sparkles, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-warmbrown-900 text-cream-200 pt-14 pb-10 border-t-4 border-terracotta-500 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mom's personal guarantee banner */}
        <div className="bg-warmbrown-800/80 border border-warmbrown-700 rounded-2xl p-6 sm:p-8 mb-12 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-full bg-terracotta-500/20 text-terracotta-400 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 fill-terracotta-400" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-cream-100">100% Handcrafted</h4>
                <p className="text-xs text-warmbrown-300">Stitched single-handedly by our mother at home.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-full bg-mustard-500/20 text-mustard-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-cream-100">Heirloom Quality</h4>
                <p className="text-xs text-warmbrown-300">Durable wooden handles & high-grade pat silken threads.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-full bg-sage/20 text-sage flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-cream-100">Pan-India Delivery</h4>
                <p className="text-xs text-warmbrown-300">Safely boxed with handcrafted muslin dust-covers.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🪭</span>
              <span className="font-serif text-2xl font-bold text-cream-50">Maa Di Pakhi</span>
            </div>
            <p className="text-sm text-warmbrown-300 max-w-sm leading-relaxed">
              Preserving the fading Punjabi tradition of hand-embroidered pakhis. Made slowly, lovingly, and sustainably in small batches from our home in Jalandhar to your home anywhere in India.
            </p>
            <div className="pt-2 font-hand text-terracotta-400 text-lg">
              "Pyaar te reet naal banayi har ik pakhi"
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-cream-100 mb-4 tracking-wide">Explore</h4>
            <ul className="space-y-2.5 text-sm text-warmbrown-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-terracotta-400 transition-colors">
                  Home & Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-terracotta-400 transition-colors">
                  All Pakhis Collection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cart')} className="hover:text-terracotta-400 transition-colors">
                  Shopping Basket
                </button>
              </li>
              <li>
                <span className="text-warmbrown-400 text-xs">Custom Wedding Shagun Orders (WhatsApp soon)</span>
              </li>
            </ul>
          </div>

          {/* Contact / Note */}
          <div>
            <h4 className="font-serif text-base font-semibold text-cream-100 mb-4 tracking-wide">Family Craft Desk</h4>
            <p className="text-xs text-warmbrown-300 leading-relaxed mb-3">
              Questions about custom colors, handle carvings, or bulk wedding favours?
            </p>
            <div className="text-xs text-terracotta-300 bg-warmbrown-800 p-3 rounded-xl border border-warmbrown-700">
              <p className="font-medium text-cream-200">Email us directly:</p>
              <p className="font-mono text-terracotta-300 mt-0.5">hello@maadipakhi.store</p>
              <p className="text-[11px] text-warmbrown-400 mt-2">Punjab, India</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-warmbrown-800 text-center text-xs text-warmbrown-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Maa Di Pakhi. Built with care for family craft.</p>
          <div className="flex items-center gap-1 font-hand text-sm text-cream-300">
            <span>Made with love by a proud child for Mum's craft</span>
            <Heart className="w-4 h-4 text-terracotta-400 inline fill-terracotta-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
