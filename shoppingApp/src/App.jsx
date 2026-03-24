// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider }  from './context/AuthContext'
import { CartProvider }  from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

import Navbar from './components/Navbar'
import Home   from './pages/Home'
import Shop   from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Wishlist from './pages/Wishlist'
import Cart   from './pages/Cart'
import Checkout from './pages/Checkout'
import Login  from './pages/Login'

import './styles/global.css'

function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        {/* Navbar renders announcement bar + sticky glass header internally */}
        <Navbar />

        <Routes>
          <Route path="/"      element={<Home />}  />
          <Route path="/shop"  element={<Shop />}  />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart"  element={<Cart />}  />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div
                className="min-h-screen flex flex-col items-center justify-center gap-6 px-8"
                style={{ backgroundColor: 'var(--color-surface)' }}
              >
                <p
                  className="text-8xl font-black tracking-tighter"
                  style={{ color: 'var(--color-surface-container-highest)' }}
                >
                  404
                </p>
                <p
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: 'var(--color-on-surface)' }}
                >
                  Page not found
                </p>
                <a
                  href="/"
                  className="signature-gradient text-white px-8 py-4 rounded-lg
                             font-bold uppercase tracking-widest text-xs
                             transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  Return to Atelier
                </a>
              </div>
            }
          />
        </Routes>
      </AppProviders>
    </BrowserRouter>
  )
}
