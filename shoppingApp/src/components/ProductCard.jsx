import { Link } from 'react-router-dom'
import { Box, Typography, Button, IconButton, Chip } from '@mui/material'
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
    toast(`Gear added: ${product.title}`, 'success')
  }

  const handleWishlist = (e) => {
    e.preventDefault(); e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <Box component={Link} to={`/product/${product.id}`} sx={{ textDecoration: 'none', color: 'inherit', display: 'block', position: 'relative', '&:hover .product-actions': { opacity: 1, transform: 'translateY(0)' } }}>
      <Box sx={{ bgcolor: '#ffffff', height: 450, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
        <Box component="img" src={product.image || FALLBACK_IMAGE} sx={{ maxWidth: '70%', maxHeight: '70%', objectFit: 'contain' }} />
        <Box sx={{ position: 'absolute', top: 20, left: 20 }}><Chip label="SQUAD TECH" size="small" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 900, borderRadius: '0px' }} /></Box>
        <IconButton onClick={handleWishlist} sx={{ position: 'absolute', top: 15, right: 15, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
          {isInWishlist(product.id) ? <WishlistFilledIcon color="error" /> : <WishlistIcon />}
        </IconButton>
        <Box className="product-actions" sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, opacity: 0, transform: 'translateY(10px)', transition: '0.3s', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
          <Button fullWidth variant="contained" startIcon={<CartIcon />} onClick={handleAdd} sx={{ py: 1.5, fontWeight: 900, borderRadius: '0px' }}>QUICK DROP</Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 900, display: 'block' }}>{product.category.toUpperCase()}</Typography>
        <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase', height: '2.4em', overflow: 'hidden' }}>{product.title}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main' }}>${product.price.toFixed(2)}</Typography>
      </Box>
    </Box>
  )
}
