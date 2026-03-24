import { useNavigate, Link } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
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
  Avatar
} from '@mui/material'
import {
  Close as CloseIcon,
  ShoppingBagOutlined as ShoppingIcon,
  ChevronRight as ChevronIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material'
import { useCart } from '../../context/CartContext'
import QuantityControl from '../Common/QuantityControl'

export default function Cart() {
  const { items, removeItem, updateQty, totalPrice } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Stack spacing={4} alignItems="center">
          <ShoppingIcon sx={{ fontSize: 80, color: 'outlineVariant' }} />
          <Typography variant="h4" sx={{ fontWeight: 900 }}>Your Cart is Empty</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>There are no pieces in your archive yet.</Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/shop')}>GO TO SHOP</Button>
        </Stack>
      </Box>
    )
  }

  const shipping = totalPrice >= 150 ? 0 : 9.99
  const grandTotal = totalPrice + shipping

  return (
    <Box sx={{ bgcolor: 'background.default', pb: 12 }}>

      {/* Breadcrumbs Header */}
      <Box sx={{ bgcolor: 'surface.containerLow', py: 8 }}>
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, letterSpacing: '-0.02em' }}>Shopping Cart</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.75rem', fontWeight: 700 }}>HOME</Link>
            <ChevronIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.75rem', fontWeight: 700 }}>SHOP</Link>
            <ChevronIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>CART</Typography>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <Grid container spacing={8}>

          {/* Cart Table */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <TableContainer component={Paper} sx={{ borderRadius: '16px', bgcolor: 'transparent' }}>
              <Table sx={{ minWidth: 650 }} aria-label="cart table">
                <TableHead>
                  <TableRow sx={{ '& th': { borderBottom: '2px solid', borderColor: 'outlineVariant', py: 3, fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' } }}>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map(({ product, qty }) => (
                    <TableRow key={product.id} sx={{ '& td': { borderBottom: '1px solid', borderColor: 'outlineVariant', py: 4 } }}>
                      <TableCell>
                        <Stack direction="row" spacing={3} alignItems="center">
                          <Avatar
                            variant="rounded"
                            src={product.image}
                            sx={{ width: 80, height: 100, bgcolor: 'background.paper', border: '1px solid', borderColor: 'outlineVariant', '& img': { objectFit: 'contain', p: 1 } }}
                          />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 800, mb: 0.5 }}>{product.title}</Typography>
                            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 900 }}>${product.price.toFixed(2)}</Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <QuantityControl value={qty} onChange={(newVal) => updateQty(product.id, newVal)} size="sm" />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 900 }}>${(product.price * qty).toFixed(2)}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => removeItem(product.id)} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 6, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/shop')}
                startIcon={<ArrowBackIcon />}
                sx={{ px: 4, fontWeight: 800 }}
              >
                CONTINUE SHOPPING
              </Button>
            </Box>
          </Grid>

          {/* Cart Summary */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper sx={{ p: 6, borderRadius: '24px', bgcolor: 'surface.containerLow', boxShadow: 'none' }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.01em' }}>Order Summary</Typography>

              <Stack spacing={3} sx={{ mb: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>Subtotal</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 900 }}>${totalPrice.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>Shipping</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 900, color: shipping === 0 ? 'primary.main' : 'inherit' }}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </Typography>
                </Box>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>Total</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: 'primary.main' }}>${grandTotal.toFixed(2)}</Typography>
                </Box>
              </Stack>

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => navigate('/checkout')}
                sx={{ py: 2, fontWeight: 900, mb: 3 }}
              >
                PROCEED TO CHECKOUT
              </Button>

              <Typography variant="caption" sx={{ textAlign: 'center', display: 'block', color: 'text.secondary', fontWeight: 600 }}>
                Secure checkout with end-to-end encryption.
              </Typography>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}
