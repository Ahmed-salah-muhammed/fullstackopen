import { Container, Typography, Box, Stack, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Link } from 'react-router-dom'
import { ShoppingBagOutlined as ShopIcon, DeleteOutline as RemoveIcon } from '@mui/icons-material'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addItem } = useCart()
  const toast = useToast()

  const handleMoveToCart = (product) => {
    addItem(product)
    removeFromWishlist(product.id)
    toast('Moved item to cart', 'success')
  }

  if (wishlist.length === 0) return (
    <Box sx={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', px: 4 }}>
       <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>Your Wishlist is Empty</Typography>
       <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6 }}>Curate your own archive. Add pieces from the collection to see them here.</Typography>
       <Button component={Link} to="/shop" variant="contained" size="large" sx={{ fontWeight: 900, px: 6 }}>START CURATING</Button>
    </Box>
  )

  return (
    <Box sx={{ bgcolor: 'background.default', py: 12 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>Wishlist</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>Your curated archive of digital pieces.</Typography>
        </Box>

        <Grid container spacing={4}>
          {wishlist.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <Box sx={{ position: 'relative' }}>
                <ProductCard product={product} />
                <Button
                   fullWidth
                   variant="outlined"
                   sx={{ mt: 2, fontWeight: 800 }}
                   onClick={() => handleMoveToCart(product)}
                >
                  MOVE TO CART
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
