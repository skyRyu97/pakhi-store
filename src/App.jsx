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
  const [user, setUser] = useState(null);
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
        onLogout={() => {
          setUser(null);
          setActivePage('home');
        }}
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
            onLogin={setUser}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'admin' && user?.role === 'admin' && (
          <AdminPage
            products={products}
            onSaveProduct={handleSaveProduct}
            onDeleteProduct={handleDeleteProduct}
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
