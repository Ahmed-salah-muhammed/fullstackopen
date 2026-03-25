import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Button,
  Rating,
  Stack,
  Divider,
  Skeleton,
  IconButton,
  Chip,
  Tab,
  Tabs
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  FavoriteBorder as WishlistIcon,
  Favorite as WishlistFilledIcon,
  ShoppingBagOutlined as CartIcon,
  ChevronRight as ChevronIcon
} from '@mui/icons-material'
import useFetchProduct from '../hooks/useFetchProduct'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import QuantityControl from '../components/QuantityControl'

export default function ProductDetail() {
  const { id } = useParams()
  const { product, loading, error } = useFetchProduct(id)
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const toast = useToast()

  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState(0)

  if (loading) return (
    <Container maxWidth="xl" sx={{ py: 12 }}>
      <Grid container spacing={8}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton variant="rectangular" height={600} sx={{ borderRadius: '16px' }} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton width="40%" height={40} />
          <Skeleton width="80%" height={80} sx={{ mt: 2 }} />
          <Skeleton width="30%" height={40} sx={{ mt: 4 }} />
          <Skeleton variant="rectangular" height={200} sx={{ mt: 4, borderRadius: '8px' }} />
        </Grid>
      </Grid>
    </Container>
  )

  if (error || !product) return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h5" color="error" fontWeight={900}>Product not found</Typography>
    </Box>
  )

  const handleAdd = () => {
    addItem(product, qty)
    toast(`Added ${qty} item(s) to cart`, 'success')
  }

  return (
    <Box sx={{ bgcolor: 'background.default', pb: 12 }}>

      {/* Breadcrumbs */}
      <Box sx={{ bgcolor: 'surface.containerLow', py: 4 }}>
        <Container maxWidth="xl">
          <Stack direction="row" spacing={1} alignItems="center">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.75rem', fontWeight: 700 }}>HOME</Link>
            <ChevronIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.75rem', fontWeight: 700 }}>SHOP</Link>
            <ChevronIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {product.title}
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Grid container spacing={12}>

          {/* Product Images */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: '24px',
                p: { xs: 4, md: 10 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                minHeight: '600px',
                border: '1px solid',
                borderColor: 'outlineVariant'
              }}
            >
              <Box
                component="img"
                src={product.image}
                sx={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
              />
              <IconButton
                onClick={() => toggleWishlist(product)}
                sx={{
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  bgcolor: 'background.default',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  '&:hover': { bgcolor: 'primary.main', color: 'white' }
                }}
              >
                {isInWishlist(product.id) ? <WishlistFilledIcon color="error" /> : <WishlistIcon />}
              </IconButton>
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={4}>
              <Box>
                <Chip
                  label={product.category.toUpperCase()}
                  size="small"
                  sx={{
                    bgcolor: 'surface.containerHighest',
                    fontWeight: 800,
                    borderRadius: '4px',
                    fontSize: '0.65rem',
                    mb: 2
                  }}
                />
                <Typography variant="h2" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.02em' }}>
                  {product.title}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Rating value={product.rating?.rate ?? 4} readOnly size="small" precision={0.5} />
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                    ({product.rating?.count ?? 0} CUSTOMER REVIEWS)
                  </Typography>
                </Stack>
              </Box>

              <Typography variant="h3" sx={{ fontWeight: 900, color: 'primary.main' }}>
                ${product.price.toFixed(2)}
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                {product.description}
              </Typography>

              <Divider sx={{ borderStyle: 'dashed' }} />

              <Stack direction="row" spacing={3} alignItems="center">
                <QuantityControl value={qty} onChange={setQty} />
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<CartIcon />}
                  onClick={handleAdd}
                  sx={{ py: 2, fontWeight: 900 }}
                >
                  ADD TO CART
                </Button>
              </Stack>

              <Stack direction="row" spacing={4}>
                <Box>
                  <Typography variant="caption" display="block" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>SKU</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>ATL-00${product.id}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" display="block" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>CATEGORY</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'capitalize' }}>{product.category}</Typography>
                </Box>
              </Stack>

              <Box sx={{ borderTop: 1, borderColor: 'outlineVariant', pt: 6 }}>
                <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 4 }}>
                  <Tab label="Description" sx={{ fontWeight: 800, fontSize: '0.75rem' }} />
                  <Tab label="Reviews" sx={{ fontWeight: 800, fontSize: '0.75rem' }} />
                  <Tab label="Shipping" sx={{ fontWeight: 800, fontSize: '0.75rem' }} />
                </Tabs>
                <Box sx={{ minHeight: 100 }}>
                  {tab === 0 && <Typography variant="body2" sx={{ color: 'text.secondary' }}>High-quality craftsmanship meeting contemporary design. This piece from our digital atelier is crafted using sustainable practices and premium materials. Each item is inspected for perfection before being archived and shipped.</Typography>}
                  {tab === 1 && <Typography variant="body2" sx={{ color: 'text.secondary' }}>No reviews yet for this piece. Be the first to tell us what you think.</Typography>}
                  {tab === 2 && <Typography variant="body2" sx={{ color: 'text.secondary' }}>Complimentary global shipping on orders over $150. Returns accepted within 30 days in original condition. See our policy for more details.</Typography>}
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
