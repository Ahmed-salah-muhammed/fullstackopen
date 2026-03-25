import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  Stack,
  Divider,
  Paper,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  Close as CloseIcon,
  ShoppingBagOutlined as ShoppingIcon,
  ArrowBack as ArrowBackIcon,
  LocalShippingOutlined as ShippingIcon,
  VerifiedUserOutlined as SecureIcon,
  DeleteOutline as DeleteIcon
} from '@mui/icons-material'
import { useCart } from '../context/CartContext'
import QuantityControl from '../components/QuantityControl'
import { motion, AnimatePresence } from 'framer-motion'

export default function Cart() {
  const { items, removeItem, updateQty, totalPrice } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Container maxWidth="sm">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <ShoppingIcon sx={{ fontSize: 100, color: 'outlineVariant', mb: 4, opacity: 0.5 }} />
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>Your archive is empty</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6 }}>
              You haven't added any curated pieces to your cart yet. Explore our latest drop to find your next essential.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/shop')}
              sx={{ px: 8, py: 2, borderRadius: '100px', fontWeight: 900 }}
            >
              BROWSE COLLECTION
            </Button>
          </motion.div>
        </Container>
      </Box>
    )
  }

  const shipping = totalPrice >= 150 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const grandTotal = totalPrice + shipping + tax

  return (
    <Box sx={{ bgcolor: 'background.default', pt: 8, pb: 16 }}>
      <Container maxWidth="xl">
        <Typography variant="h2" sx={{ fontWeight: 900, mb: 8, letterSpacing: '-0.02em' }}>
          Shopping Cart <Typography component="span" variant="h4" sx={{ color: 'text.secondary', ml: 2, fontWeight: 500 }}>({items.length} Items)</Typography>
        </Typography>

        <Grid container spacing={8}>

          {/* Items List */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={4}>
              <AnimatePresence>
                {items.map(({ product, qty }) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Paper
                      sx={{
                        p: 4,
                        borderRadius: '24px',
                        bgcolor: 'surface.containerLow',
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.3s ease',
                        '&:hover': { borderColor: 'primary.main', bgcolor: 'background.paper' }
                      }}
                    >
                      <Grid container spacing={4} alignItems="center">
                        <Grid size={{ xs: 4, sm: 2 }}>
                          <Box
                            component={RouterLink}
                            to={`/product/${product.id}`}
                            sx={{
                              bgcolor: 'white',
                              borderRadius: '16px',
                              p: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              aspectRatio: '1/1'
                            }}
                          >
                            <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 8, sm: 5 }}>
                          <Stack spacing={0.5}>
                            <Typography
                              variant="body1"
                              component={RouterLink}
                              to={`/product/${product.id}`}
                              sx={{ fontWeight: 800, textDecoration: 'none', color: 'text.primary', '&:hover': { color: 'primary.main' } }}
                            >
                              {product.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              {product.category}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3 }}>
                          <Stack direction="row" spacing={4} alignItems="center" justifyContent={{ xs: 'flex-start', sm: 'center' }}>
                            <QuantityControl value={qty} onChange={(newVal) => updateQty(product.id, newVal)} size="sm" />
                          </Stack>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 2 }}>
                          <Stack alignItems="flex-end" spacing={1}>
                            <Typography variant="h6" sx={{ fontWeight: 900 }}>
                              ${(product.price * qty).toFixed(2)}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => removeItem(product.id)}
                              sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'error.main' + '15' } }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Paper>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Button
                component={RouterLink}
                to="/shop"
                startIcon={<ArrowBackIcon />}
                sx={{ alignSelf: 'flex-start', fontWeight: 800, mt: 4 }}
              >
                CONTINUE SHOPPING
              </Button>
            </Stack>
          </Grid>

          {/* Sticky Summary Sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ position: 'sticky', top: 120 }}>
              <Paper
                sx={{
                  p: 6,
                  borderRadius: '32px',
                  bgcolor: 'surface.containerLow',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.02)'
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 6, letterSpacing: '-0.01em' }}>Order Summary</Typography>

                <Stack spacing={3} sx={{ mb: 6 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600 }}>Subtotal</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800 }}>${totalPrice.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600 }}>Estimated Shipping</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: shipping === 0 ? 'primary.main' : 'inherit' }}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600 }}>Estimated Tax (8%)</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800 }}>${tax.toFixed(2)}</Typography>
                  </Box>
                  <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Typography variant="h5" sx={{ fontWeight: 900 }}>Total</Typography>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: 'primary.main' }}>
                      ${grandTotal.toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>

                <Stack spacing={3}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => navigate('/checkout')}
                    sx={{
                      py: 2.5,
                      fontWeight: 900,
                      fontSize: '1rem',
                      borderRadius: '100px',
                      boxShadow: '0 10px 20px rgba(42, 20, 180, 0.2)'
                    }}
                  >
                    PROCEED TO CHECKOUT
                  </Button>

                  <Stack direction="row" spacing={2} sx={{ bgcolor: 'background.paper', p: 3, borderRadius: '20px' }}>
                    <SecureIcon sx={{ color: 'primary.main' }} />
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 800, display: 'block' }}>SECURE PAYMENT</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>Your transaction is end-to-end encrypted.</Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} sx={{ bgcolor: 'background.paper', p: 3, borderRadius: '20px' }}>
                    <ShippingIcon sx={{ color: 'primary.main' }} />
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 800, display: 'block' }}>RELIABLE SHIPPING</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>Free express delivery on all orders over 50.</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}
