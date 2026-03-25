import { BrowserRouter } from 'react-router-dom'
import { Box } from '@mui/material'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider }  from './context/AuthContext'
import { CartProvider }  from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Breadcrumbs from './components/Breadcrumbs'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import AppRouter from './router'

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
    <ErrorBoundary>
      <BrowserRouter>
        <AppProviders>
          <Box id="back-to-top-anchor" />
          <Marquee />
          <Navbar />
          <Breadcrumbs />
          <Box component="main" sx={{ minHeight: 'calc(100vh - 160px)' }}>
            <AppRouter />
          </Box>
          <Footer />
          <ScrollToTop />
        </AppProviders>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
