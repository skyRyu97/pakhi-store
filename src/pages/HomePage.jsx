import React from 'react';
import { ArrowRight, Heart, Sparkles, ShieldCheck, Sun, Scissors, Gift } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function HomePage({ products, onNavigate, onSelectProduct }) {
  const featured = products.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#fcf6ee] via-cream-100 to-terracotta-50/60 rounded-3xl p-6 sm:p-12 lg:p-16 border border-warmbrown-200/80 shadow-warm relative">

            {/* Background handmade floral accents */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 opacity-10 pointer-events-none text-7xl sm:text-9xl select-none font-serif">
              🪭
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Organic badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-100 border border-terracotta-300 text-terracotta-800 text-xs sm:text-sm font-medium shadow-warm-sm">
                  <span className="text-base">🌾</span>
                  <span className="font-hand text-base font-bold">Har Taanka Pyaar Naal</span>
                  <span className="text-warmbrown-400">•</span>
                  <span>Handcrafted in Punjab</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-warmbrown-900 leading-[1.15] tracking-tight">
                  Heirloom Punjabi <span className="text-terracotta-600 underline decoration-mustard-400 decoration-wavy underline-offset-8">Pankhis</span>, stitched by my Nani.
                </h1>

                <p className="text-base sm:text-lg text-warmbrown-700 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                  In an age of noisy plastic fans, my Nani sits in our verandah with silk floss, khaddar cloth, and Sheesham wood — carrying forward centuries of Punjabi craft. Every piece brings a gentle, soul-cooling breeze into your home.
                </p>

                {/* CTA actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button
                    onClick={() => onNavigate('catalog')}
                    className="w-full sm:w-auto px-8 py-4 bg-terracotta-600 hover:bg-terracotta-700 active:scale-95 text-cream-50 font-medium rounded-2xl shadow-warm flex items-center justify-center gap-2 group transition-all text-base"
                  >
                    <span>Browse Nani's Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-6 py-4 bg-cream-50 hover:bg-cream-200 border border-warmbrown-300 text-warmbrown-800 font-medium rounded-2xl shadow-warm-sm flex items-center justify-center gap-2 transition-all text-sm"
                  >
                    <span>Read The Story</span>
                  </button>
                </div>

                {/* Trust mini-counters */}
                <div className="pt-6 grid grid-cols-3 gap-2 border-t border-warmbrown-200/80 text-center lg:text-left">
                  <div>
                    <p className="font-serif text-xl sm:text-2xl font-bold text-terracotta-700">100%</p>
                    <p className="text-xs text-warmbrown-600">Hand Needlework</p>
                  </div>
                  <div>
                    <p className="font-serif text-xl sm:text-2xl font-bold text-terracotta-700">12-18 hrs</p>
                    <p className="text-xs text-warmbrown-600">Per Pankhi Crafting</p>
                  </div>
                  <div>
                    <p className="font-serif text-xl sm:text-2xl font-bold text-terracotta-700">Natural</p>
                    <p className="text-xs text-warmbrown-600">Khaddar & Silk</p>
                  </div>
                </div>
              </div>

              {/* Hero Image Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-sm sm:max-w-md">
                  {/* Decorative background framing */}
                  <div className="absolute -inset-3 bg-mustard-200/60 rounded-3xl transform rotate-2 blur-[1px]"></div>
                  <div className="absolute -inset-2 bg-terracotta-200/60 rounded-3xl transform -rotate-2"></div>

                  <div className="relative bg-cream-50 rounded-2xl overflow-hidden border-2 border-warmbrown-200 shadow-warm-lg p-2.5">
                    <img src=".\Products pics\homepic.png"

                      className="w-full h-80 sm:h-96 object-cover rounded-xl"
                    />
                    <div className="p-4 bg-cream-100 rounded-xl mt-2 flex items-center justify-between border border-warmbrown-200/70">
                      <div>
                        <span className="text-[11px] font-hand text-terracotta-600 font-semibold tracking-wider">FRESHLY FINISHED BY NANI</span>
                        <h4 className="font-serif font-bold text-warmbrown-900 text-sm">Phulkari Gulab Pankhi</h4>
                        <p className="text-xs text-warmbrown-600">Rose silk thread with Sheesham handle</p>
                      </div>
                      <button
                        onClick={() => onSelectProduct('phulkari-gulab')}
                        className="p-2 rounded-xl bg-terracotta-600 text-cream-50 hover:bg-terracotta-700 transition-colors shadow-warm-sm"
                        title="View detail"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-terracotta-600 font-hand text-lg font-bold">
              <span>🌾 Chonwein Tukde</span>
              <span>• Hand-Selected</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-warmbrown-900">
              Nani's Featured Pankhis
            </h2>
            <p className="text-sm text-warmbrown-600 mt-1 max-w-md">
              Each piece is created in single quantities or tiny batches. No two are completely identical.
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta-700 hover:text-terracotta-800 transition-colors pb-1 border-b border-terracotta-400 group self-start sm:self-auto"
          >
            <span>See entire collection ({products.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section id="our-story" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fcf7ee] rounded-3xl p-8 sm:p-14 border border-warmbrown-200/90 shadow-warm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-warmbrown-300 shadow-warm">
                  <img
                    src="/Products pics/1.jpg"
                    alt="Nani hand-embroidering needlework"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Nani quote polaroid card */}
                <div className="absolute -bottom-6 -right-3 sm:-bottom-6 sm:-right-6 bg-cream-50 p-4 rounded-xl border border-warmbrown-300 shadow-warm max-w-[240px]">
                  <p className="font-hand text-base text-terracotta-700 leading-snug">
                    "Jad hawa chaldi hai pankhi ton, lage jive pind di dhoop vi thandi ho gayi."
                  </p>
                  <p className="text-[11px] text-warmbrown-500 mt-2 font-medium">
                    — Nani Ji's words
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <div className="inline-block px-3 py-1 rounded-full bg-mustard-100 text-mustard-800 text-xs font-semibold tracking-wider">
                OUR HUMBLE ROOTS
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 leading-tight">
                Not a factory. Just my Nani's peaceful afternoon verandah.
              </h2>

              <p className="text-sm sm:text-base text-warmbrown-700 leading-relaxed">
                Growing up in Punjab, summers were always greeted by the gentle flutter of hand-fans during electricity power-cuts. Grandmothers and mothers would pass down embroidered pankhis as treasured dowry heirlooms and gifts of comfort.
              </p>

              <p className="text-sm sm:text-base text-warmbrown-700 leading-relaxed">
                As the years passed, mass-produced plastic took over and the art was being forgotten. But my Nani never stopped stitching. When friends visited and fell in love with her needlework, I decided to build her this small storefront to share her timeless craft directly with you.
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-cream-100/80 border border-warmbrown-200">
                  <h4 className="font-serif font-bold text-warmbrown-900 text-sm flex items-center gap-2">
                    <Sun className="w-4 h-4 text-mustard-600" />
                    Slow & Sustainable
                  </h4>
                  <p className="text-xs text-warmbrown-600 mt-1">
                    Zero plastic. Made using pure cotton fabric, cotton threads, and natural cane frames.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-cream-100/80 border border-warmbrown-200">
                  <h4 className="font-serif font-bold text-warmbrown-900 text-sm flex items-center gap-2">
                    <Gift className="w-4 h-4 text-terracotta-600" />
                    Shagun & Wedding Gifts
                  </h4>
                  <p className="text-xs text-warmbrown-600 mt-1">
                    Cherished gifts for brides, housewarmings, or authentic ethnic home decor.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Craft Steps / How it's made section */}
      <section id="craft-process" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-hand text-terracotta-600 text-xl font-bold">Kala Te Hunar</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
            How Nani Hand-Crafts Each Pankhi
          </h2>
          <p className="text-sm text-warmbrown-600 mt-2">
            No machines, no printing stamps. Pure patience and muscle memory from 35+ years of needlework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-cream-100 rounded-2xl p-6 border border-warmbrown-200 shadow-warm-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-serif text-2xl font-bold mb-4 border border-terracotta-300">
              1
            </div>
            <h3 className="font-serif font-bold text-lg text-warmbrown-900 mb-2">Bane & Frame Shaping</h3>
            <p className="text-xs text-warmbrown-600 leading-relaxed">
              Nani bends treated seasoned river-cane or bamboo into a sturdy circular rim, secured with tight cotton cord wrapping.
            </p>
          </div>

          <div className="bg-cream-100 rounded-2xl p-6 border border-warmbrown-200 shadow-warm-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-mustard-100 text-mustard-700 flex items-center justify-center font-serif text-2xl font-bold mb-4 border border-mustard-300">
              2
            </div>
            <h3 className="font-serif font-bold text-lg text-warmbrown-900 mb-2">Phulkari & Cross-Stitch</h3>
            <p className="text-xs text-warmbrown-600 leading-relaxed">
              Counting threads meticulously by eye on khaddar fabric, stitching silk floss (pat) in geometric floral motifs.
            </p>
          </div>

          <div className="bg-cream-100 rounded-2xl p-6 border border-warmbrown-200 shadow-warm-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-sage/20 text-warmbrown-800 flex items-center justify-center font-serif text-2xl font-bold mb-4 border border-sage">
              3
            </div>
            <h3 className="font-serif font-bold text-lg text-warmbrown-900 mb-2">Tassels & Handle Fitting</h3>
            <p className="text-xs text-warmbrown-600 leading-relaxed">
              Hand-turning the wooden handle, knotting vibrant fringe tassels with ghungroos along the rim for that classic rustling breeze.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
