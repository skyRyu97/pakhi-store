import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import { PANKHI_PRODUCTS } from './data/products';
import { CartProvider, useCart } from './context/CartContext';

const PRODUCTS_STORAGE_KEY = 'nani_pankhi_products';

function loadProducts() {
  try {
    const savedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    return savedProducts ? JSON.parse(savedProducts) : PANKHI_PRODUCTS;
  } catch {
    return PANKHI_PRODUCTS;
  }
}

function StoreApp() {
  const [activePage, setActivePage] = useState('home');
  const [products, setProducts] = useState(loadProducts);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [latestOrder, setLatestOrder] = useState(null);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nani_pankhi_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
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

  const handleSaveProduct = (product) => {
    const nextProducts = products.some(item => item.id === product.id)
      ? products.map(item => item.id === product.id ? product : item)
      : [...products, product];

    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(nextProducts));
      setProducts(nextProducts);
      return { success: true };
    } catch {
      return { success: false, error: 'Could not save. The browser may be out of storage space; try smaller photos.' };
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('nani_pankhi_user', JSON.stringify(userData));
    } catch { /* silent */ }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nani_pankhi_user');
    setActivePage('home');
  };

  const handleDeleteProduct = (productId) => {
    const nextProducts = products.filter(product => product.id !== productId);

    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(nextProducts));
      setProducts(nextProducts);
      return { success: true };
    } catch {
      return { success: false, error: 'Could not update the saved product list.' };
    }
  };

  const currentProduct = products.find(p => p.id === selectedProductId) || products[0];

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
        user={user}
        onLogout={handleLogout}
      />

      {/* Dynamic Page Views */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            products={products}
            onNavigate={setActivePage}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activePage === 'catalog' && (
          <CatalogPage
            products={products}
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

        {activePage === 'login' && (
          <LoginPage
            onLogin={handleLogin}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'admin' && (
          user?.role === 'admin'
            ? <AdminPage
                products={products}
                onSaveProduct={handleSaveProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            : <LoginPage onLogin={handleLogin} onNavigate={setActivePage} />
        )}

        {/* 404 fallback */}
        {!['home','catalog','detail','cart','checkout','confirmation','login','admin'].includes(activePage) && (
          <div className="max-w-md mx-auto py-24 text-center space-y-4">
            <div className="text-5xl">🪭</div>
            <h2 className="font-serif text-2xl font-bold text-warmbrown-900">Page not found</h2>
            <p className="text-sm text-warmbrown-600">Nani couldn't find that page either.</p>
            <button
              onClick={() => setActivePage('home')}
              className="px-6 py-2.5 bg-terracotta-600 text-cream-50 rounded-xl text-sm font-medium hover:bg-terracotta-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
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
