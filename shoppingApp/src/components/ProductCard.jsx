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
    toast(`Kit added: ${product.title}`, 'success')
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
            bgcolor: '#ffffff',
            height: 480,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '24px',
            border: '1px solid',
            borderColor: 'divider',
            transition: 'all 0.5s ease',
            '&:hover': { borderColor: 'accent.main', transform: 'translateY(-5px)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)' }
          }}
        >
          <img
            src={product.image || FALLBACK_IMAGE}
            alt={product.title}
            className="max-w-[70%] max-h-[70%] object-contain transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute top-5 left-5">
            <Chip
              label="BARÇA TECH"
              size="small"
              sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 900, borderRadius: '8px' }}
            />
          </div>

          <IconButton
            onClick={handleWishlist}
            sx={{ position: 'absolute', top: 15, right: 15, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}
          >
            {isInWishlist(product.id) ? <WishlistFilledIcon color="error" /> : <WishlistIcon />}
          </IconButton>

          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 bg-gradient-to-t from-black/60 to-transparent">
            <Button fullWidth variant="contained" startIcon={<CartIcon />} onClick={handleAdd} sx={{ borderRadius: '12px', py: 1.5 }}>ADD TO KIT</Button>
          </div>
        </Box>

        <div className="mt-5 px-1">
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, display: 'block', mb: 0.5 }}>{product.category}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, textTransform: 'uppercase', height: '2.4em', overflow: 'hidden', lineHeight: 1.2 }}>{product.title}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main' }}>${product.price.toFixed(2)}</Typography>
        </div>
      </Link>
    </div>
  )
}
