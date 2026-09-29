import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import { PANKHI_PRODUCTS } from './data/products';
import { CartProvider, useCart } from './context/CartContext';

function StoreApp() {
  const [activePage, setActivePage] = useState('home'); // home | catalog | detail | cart | checkout | confirmation
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [latestOrder, setLatestOrder] = useState(null);
  const { notification } = useCart();

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
    setActivePage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (orderData) => {
    setLatestOrder(orderData);
    setActivePage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentProduct = PANKHI_PRODUCTS.find(p => p.id === selectedProductId) || PANKHI_PRODUCTS[0];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-terracotta-200 selection:text-terracotta-900">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-warmbrown-900 text-cream-100 text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-warm-lg border border-terracotta-400 flex items-center gap-2 animate-bounce">
          <span>{notification}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        setSelectedProductId={setSelectedProductId}
      />

      {/* Dynamic Page Views */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            products={PANKHI_PRODUCTS}
            onNavigate={setActivePage}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activePage === 'catalog' && (
          <CatalogPage
            products={PANKHI_PRODUCTS}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activePage === 'detail' && (
          <ProductDetailPage
            product={currentProduct}
            onBack={() => setActivePage('catalog')}
            onNavigateToCart={() => setActivePage('cart')}
          />
        )}

        {activePage === 'cart' && (
          <CartPage
            onNavigate={setActivePage}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            onNavigate={setActivePage}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {activePage === 'confirmation' && (
          <OrderConfirmationPage
            order={latestOrder}
            onNavigate={setActivePage}
          />
        )}
      </main>

      {/* Rustic Footer */}
      <Footer onNavigate={setActivePage} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StoreApp />
    </CartProvider>
  );
}
