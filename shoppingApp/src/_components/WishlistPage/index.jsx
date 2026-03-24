import { useNavigate, Link } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Stack,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton
} from '@mui/material'
import {
  Close as CloseIcon,
  FavoriteBorder as WishlistIcon,
  ChevronRight as ChevronIcon,
  ShoppingBagOutlined as CartIcon
} from '@mui/icons-material'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist()
  const { addItem } = useCart()
  const toast = useToast()
  const navigate = useNavigate()

  if (wishlist.length === 0) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Stack spacing={4} alignItems="center">
          <WishlistIcon sx={{ fontSize: 80, color: 'outlineVariant' }} />
          <Typography variant="h4" sx={{ fontWeight: 900 }}>Your Wishlist is Empty</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Save pieces you love for later.</Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/shop')}>GO TO SHOP</Button>
        </Stack>
      </Box>
    )
  }

  const handleAddToCart = (product) => {
    addItem(product, 1)
    toast(`Added "${product.title.slice(0, 20)}..." to cart`, 'success')
  }

  return (
    <Box sx={{ bgcolor: 'background.default', pb: 12 }}>

      {/* Breadcrumbs Header */}
      <Box sx={{ bgcolor: 'surface.containerLow', py: 8 }}>
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, letterSpacing: '-0.02em' }}>Wishlist</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.75rem', fontWeight: 700 }}>HOME</Link>
            <ChevronIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.75rem', fontWeight: 700 }}>SHOP</Link>
            <ChevronIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>WISHLIST</Typography>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <TableContainer component={Paper} sx={{ borderRadius: '16px', bgcolor: 'transparent', boxShadow: 'none' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ '& th': { borderBottom: '2px solid', borderColor: 'outlineVariant', py: 3, fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' } }}>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell align="center">Actions</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wishlist.map((product) => (
                <TableRow key={product.id} sx={{ '& td': { borderBottom: '1px solid', borderColor: 'outlineVariant', py: 4 } }}>
                  <TableCell>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Avatar
                        variant="rounded"
                        src={product.image}
                        sx={{ width: 80, height: 100, bgcolor: 'background.paper', border: '1px solid', borderColor: 'outlineVariant', '& img': { objectFit: 'contain', p: 1 } }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>{product.title}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 900, color: 'primary.main' }}>${product.price.toFixed(2)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ fontWeight: 900, color: 'success.main', textTransform: 'uppercase' }}>In Stock</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<CartIcon fontSize="small" />}
                      onClick={() => handleAddToCart(product)}
                      sx={{ fontSize: '0.7rem', fontWeight: 800 }}
                    >
                      ADD TO CART
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => toggleWishlist(product)} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={() => navigate('/shop')} sx={{ px: 4, fontWeight: 800 }}>BACK TO COLLECTION</Button>
        </Box>
      </Container>
    </Box>
  )
}
