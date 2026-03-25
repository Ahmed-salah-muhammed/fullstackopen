import { Link } from 'react-router-dom'
import { Box, Typography, Button, IconButton, Chip, alpha } from '@mui/material'
import {
  FavoriteBorder as WishlistIcon,
  Favorite as WishlistFilledIcon,
  ShoppingBagOutlined as CartIcon
} from '@mui/icons-material'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const toast = useToast()

  const handleAdd = (e) => {
    e.preventDefault(); e.stopPropagation()
    addItem(product)
    toast(`Added to kit: ${product.title}`, 'success')
  }

  const handleWishlist = (e) => {
    e.preventDefault(); e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <div className="group relative flex flex-col transition-all duration-500">
      <Link to={`/product/${product.id}`} className="no-underline text-inherit">
        <Box
          sx={{
            bgcolor: 'surface.containerLow',
            height: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '32px',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': { bgcolor: 'surface.containerHighest', transform: 'translateY(-12px)' }
          }}
        >
          <img
            src={product.image || FALLBACK_IMAGE}
            alt={product.title}
            className="max-w-[75%] max-h-[75%] object-contain transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute top-6 left-6">
            <Chip
              label="STITCHED"
              size="small"
              sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 900, borderRadius: '100px', fontSize: '0.65rem' }}
            />
          </div>

          <IconButton
            onClick={handleWishlist}
            sx={{ position: 'absolute', top: 20, right: 20, bgcolor: 'background.paper', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
          >
            {isInWishlist(product.id) ? <WishlistFilledIcon color="error" /> : <WishlistIcon />}
          </IconButton>

          <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 translate-y-6 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
            <Button fullWidth variant="contained" startIcon={<CartIcon />} onClick={handleAdd} sx={{ borderRadius: '100px', py: 2, fontWeight: 900 }}>ADD TO KIT</Button>
          </div>
        </Box>

        <div className="mt-8 px-2">
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, display: 'block', mb: 1 }}>{product.category}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, textTransform: 'uppercase', height: '2.4em', overflow: 'hidden', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{product.title}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main' }}>${product.price.toFixed(2)}</Typography>
        </div>
      </Link>
    </div>
  )
}
