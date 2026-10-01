import React, { useState } from 'react';
import { User, Mail, Lock, LogIn, UserPlus, MapPin, Plus, Trash2 } from 'lucide-react';

export default function LoginPage({ onLogin, onNavigate }) {
  const [isLogin, setIsLogin] = useState(true);
  
  // Login State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [addresses, setAddresses] = useState(['']);

  const [error, setError] = useState('');

  const handleAddAddress = () => {
    setAddresses([...addresses, '']);
  };

  const handleUpdateAddress = (index, value) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };

  const handleRemoveAddress = (index) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(newAddresses);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (loginUsername === 'Admin@123#' && loginPassword === 'Admin@123#') {
      onLogin({ role: 'admin', name: 'Admin' });
      onNavigate('admin');
    } else {
      // In a real app we'd check a database
      // For this simple mock, we'll just log them in if they put anything.
      if (loginUsername && loginPassword) {
        onLogin({ role: 'customer', name: loginUsername });
        onNavigate('home');
      } else {
        setError('Please enter username and password');
      }
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!signupName || !signupEmail || !signupPassword) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Valid addresses
    const validAddresses = addresses.filter(a => a.trim() !== '');
    if (validAddresses.length === 0) {
      setError('Please provide at least one address');
      return;
    }

    onLogin({ 
      role: 'customer', 
      name: signupName, 
      email: signupEmail, 
      addresses: validAddresses 
    });
    onNavigate('home');
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-cream-50 rounded-2xl shadow-warm border border-warmbrown-200">
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 rounded-full bg-terracotta-100 border-2 border-terracotta-300 flex items-center justify-center text-3xl shadow-warm-sm">
          🪭
        </div>
      </div>
      
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => { setIsLogin(true); setError(''); }}
          className={`flex-1 py-2 font-semibold text-center rounded-lg transition-colors ${
            isLogin ? 'bg-terracotta-600 text-white' : 'bg-warmbrown-100 text-warmbrown-700 hover:bg-warmbrown-200'
          }`}
        >
          Sign In
        </button>
        <button 
          onClick={() => { setIsLogin(false); setError(''); }}
          className={`flex-1 py-2 font-semibold text-center rounded-lg transition-colors ${
            !isLogin ? 'bg-terracotta-600 text-white' : 'bg-warmbrown-100 text-warmbrown-700 hover:bg-warmbrown-200'
          }`}
        >
          Sign Up
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      {isLogin ? (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-warmbrown-800 mb-1">Username / ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-warmbrown-400" />
              </div>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-warmbrown-300 rounded-lg focus:ring-terracotta-500 focus:border-terracotta-500 bg-white"
                placeholder="Admin@123# or username"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-warmbrown-800 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-warmbrown-400" />
              </div>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-warmbrown-300 rounded-lg focus:ring-terracotta-500 focus:border-terracotta-500 bg-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-2.5 bg-terracotta-700 text-white font-semibold rounded-lg hover:bg-terracotta-800 transition-colors flex justify-center items-center gap-2"
          >
            <LogIn className="w-5 h-5" /> Sign In
          </button>
        </form>
      ) : (
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-warmbrown-800 mb-1">Full Name *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-warmbrown-400" />
              </div>
              <input
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-warmbrown-300 rounded-lg focus:ring-terracotta-500 focus:border-terracotta-500 bg-white"
                placeholder="Jane Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-warmbrown-800 mb-1">Email *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-warmbrown-400" />
              </div>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-warmbrown-300 rounded-lg focus:ring-terracotta-500 focus:border-terracotta-500 bg-white"
                placeholder="jane@example.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-warmbrown-800 mb-1">Password *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-warmbrown-400" />
              </div>
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-warmbrown-300 rounded-lg focus:ring-terracotta-500 focus:border-terracotta-500 bg-white"
                placeholder="Create a strong password"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-sm font-medium text-warmbrown-800 mb-1">Addresses *</label>
            <div className="space-y-3">
              {addresses.map((address, idx) => (
                <div key={idx} className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute top-2.5 left-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-warmbrown-400" />
                    </div>
                    <textarea
                      value={address}
                      onChange={(e) => handleUpdateAddress(idx, e.target.value)}
                      rows={2}
                      className="block w-full pl-10 pr-3 py-2 border border-warmbrown-300 rounded-lg focus:ring-terracotta-500 focus:border-terracotta-500 bg-white text-sm"
                      placeholder={`Address ${idx + 1}`}
                    />
                  </div>
                  {addresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAddress(idx)}
                      className="text-red-500 hover:text-red-700 p-2 h-fit"
                      aria-label="Remove address"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddAddress}
              className="mt-2 text-sm text-terracotta-600 font-medium hover:text-terracotta-800 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add another address
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-2.5 bg-terracotta-700 text-white font-semibold rounded-lg hover:bg-terracotta-800 transition-colors flex justify-center items-center gap-2"
          >
            <UserPlus className="w-5 h-5" /> Create Account
          </button>
        </form>
      )}
    </div>
  );
}
