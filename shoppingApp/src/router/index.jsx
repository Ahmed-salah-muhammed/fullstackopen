import { Routes, Route, Navigate } from 'react-router-dom'
import Home   from '../pages/Home'
import Shop   from '../pages/Shop'
import ProductDetail from '../pages/ProductDetails'
import Wishlist from '../pages/WishlistPage'
import Cart   from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Login  from '../pages/Login'
import Profile from '../pages/Profile'
import ProtectedRoute from '../components/ProtectedRoute'
import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

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
          color: 'text.disabled',
          opacity: 0.1,
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
        RETURN TO SHOPWAVE
      </Button>
    </Box>
  )
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/"      element={<Home />}  />
      <Route path="/shop"  element={<Shop />}  />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart"  element={<Cart />}  />

      {/* Protected Routes */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
