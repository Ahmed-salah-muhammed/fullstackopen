import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Typography, IconButton, Stack, Chip, Button, Fade } from '@mui/material'
import {
  FavoriteBorder as FavoriteIcon,
  Favorite as FavoriteFilledIcon,
  AddShoppingCart as CartIcon,
  Visibility as ViewIcon
} from '@mui/icons-material'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { motion } from 'framer-motion'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const addToast = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [imgSrc, setImgSrc] = useState(product.image)

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    addToast(`Added ${product.title} to cart`, 'success')
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
    addToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist', 'info')
  }

  return (
    <Box
      component={motion.div}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        bgcolor: 'surface.containerLow',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          bgcolor: 'background.paper',
          borderColor: 'primary.main',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
        }
      }}
    >
      {/* Image Wrapper */}
      <Box
        component={RouterLink}
        to={`/product/${product.id}`}
        sx={{
          position: 'relative',
          height: 320,
          overflow: 'hidden',
          bgcolor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4
        }}
      >
        <Box
          component="img"
          src={imgSrc}
          loading="lazy" // Image Lazy Loading
          alt={product.title}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />

        {/* Action Overlay */}
        <Fade in={isHovered}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}>
            <IconButton
              onClick={handleAddToCart}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                p: 2,
                '&:hover': { bgcolor: 'primary.light', transform: 'scale(1.1)' }
              }}
            >
              <CartIcon fontSize="small" />
            </IconButton>
            <IconButton
              component={RouterLink}
              to={`/product/${product.id}`}
              sx={{
                bgcolor: 'white',
                color: 'black',
                p: 2,
                '&:hover': { bgcolor: 'primary.main', color: 'white', transform: 'scale(1.1)' }
              }}
            >
              <ViewIcon fontSize="small" />
            </IconButton>
          </Box>
        </Fade>

        {/* Badge */}
        <Chip
          label={product.category}
          sx={{
            position: 'absolute', top: 20, left: 20,
            bgcolor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            fontWeight: 900,
            fontSize: '0.65rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            height: 24,
            border: '1px solid',
            borderColor: 'divider'
          }}
        />

        {/* Wishlist Button */}
        <IconButton
          onClick={handleToggleWishlist}
          sx={{
            position: 'absolute', top: 20, right: 20,
            bgcolor: inWishlist ? 'primary.main' : 'rgba(255,255,255,0.9)',
            color: inWishlist ? 'white' : 'text.primary',
            backdropFilter: 'blur(10px)',
            '&:hover': { bgcolor: inWishlist ? 'primary.light' : 'white' }
          }}
        >
          {inWishlist ? <FavoriteFilledIcon fontSize="small" /> : <FavoriteIcon fontSize="small" />}
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 800,
            mb: 1,
            height: 48,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.4
          }}
        >
          {product.title}
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto' }}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main' }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>
              {product.rating?.rate || 4.5}
            </Typography>
            <Typography variant="caption" sx={{ color: '#fbbf24', display: 'flex' }}>★</Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
