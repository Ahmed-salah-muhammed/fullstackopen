import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'

import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider }  from './context/AuthContext'
import { CartProvider }  from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

import Navbar from './_shared/ui/Navbar'
import Home   from './_components/HomePage'
import Shop   from './_components/ShopPage'
import ProductDetail from './_components/ProductDetails'
import Wishlist from './_components/WishlistPage'
import Cart   from './_components/CartPage'
import Checkout from './_components/CheckoutPage'
import Login  from './_components/AuthPage'

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

function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        px: 4,
        bgcolor: 'background.default'
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '6rem', md: '12rem' },
          fontWeight: 900,
          letterSpacing: '-0.05em',
          color: 'surface.containerHighest',
          lineHeight: 1
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary' }}
      >
        Page not found
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
        The piece you're looking for has moved or no longer exists.
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        size="large"
        sx={{ px: 6, py: 2 }}
      >
        RETURN TO ATELIER
      </Button>
    </Box>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppProviders>
    </BrowserRouter>
  )
}
