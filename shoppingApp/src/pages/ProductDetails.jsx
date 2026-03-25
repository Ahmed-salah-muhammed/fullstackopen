import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Container, Typography, Button, Rating, Stack, Divider, Skeleton, IconButton, Chip, Tab, Tabs } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { FavoriteBorder as WishlistIcon, Favorite as WishlistFilledIcon, ShoppingBagOutlined as CartIcon, ChevronRight as ChevronIcon } from '@mui/icons-material'
import useFetchProduct from '../hooks/useFetchProduct'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import QuantityControl from '../components/QuantityControl'

export default function ProductDetail() {
  const { id } = useParams()
  const { product, loading, error } = useFetchProduct(id)
  const { addItem } = useCart(); const { toggleWishlist, isInWishlist } = useWishlist(); const toast = useToast()
  const [qty, setQty] = useState(1); const [tab, setTab] = useState(0)

  if (loading) return (
    <Container maxWidth="xl" sx={{ py: 20 }}><Grid container spacing={15}><Grid size={{ xs: 12, md: 6 }}><Skeleton variant="rectangular" height={750} sx={{ borderRadius: '48px' }} /></Grid><Grid size={{ xs: 12, md: 6 }}><Skeleton width="40%" height={40} /><Skeleton width="90%" height={120} sx={{ mt: 4 }} /><Skeleton variant="rectangular" height={300} sx={{ mt: 8, borderRadius: '32px' }} /></Grid></Grid></Container>
  )

  if (error || !product) return (
    <div className="min-h-[70vh] flex items-center justify-center text-center"><Typography variant="h3" fontWeight={900}>PIECE NOT FOUND</Typography></div>
  )

  return (
    <div className="bg-white dark:bg-[#0a0a14] pb-32 transition-colors duration-500">
      <div className="bg-[#f2f3ff] dark:bg-[#1a1a24] py-8">
        <Container maxWidth="xl">
          <Stack direction="row" spacing={1} alignItems="center">
            <Link to="/" className="text-[0.75rem] font-black text-inherit no-underline tracking-widest uppercase">CLUB</Link>
            <ChevronIcon sx={{ fontSize: 16, color: 'primary.main' }} />
            <Link to="/shop" className="text-[0.75rem] font-black text-inherit no-underline tracking-widest uppercase">ARCHIVE</Link>
            <ChevronIcon sx={{ fontSize: 16, color: 'primary.main' }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{product.title}</Typography>
          </Stack>
        </Container>
      </div>

      <Container maxWidth="xl" className="mt-20">
        <Grid container spacing={15}>
          <Grid size={{ xs: 12, md: 6 }}>
            <div className="bg-[#f2f3ff] dark:bg-[#1a1a24] rounded-[56px] p-20 flex items-center justify-center relative min-h-[800px] transition-all duration-700 hover:shadow-2xl">
              <img src={product.image} className="max-w-full max-h-[600px] object-contain transition-transform duration-1000 hover:scale-105" alt={product.title} />
              <IconButton onClick={() => toggleWishlist(product)} sx={{ position: 'absolute', top: 40, right: 40, bgcolor: 'background.paper', p: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                {isInWishlist(product.id) ? <WishlistFilledIcon color="error" /> : <WishlistIcon />}
              </IconButton>
            </div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <div className="space-y-12">
              <div>
                <Chip label={product.category.toUpperCase()} sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 900, borderRadius: '100px', mb: 4, px: 2 }} />
                <Typography variant="h1" sx={{ fontWeight: 900, mb: 3, lineHeight: 1.1 }}>{product.title}</Typography>
                <div className="flex items-center gap-6">
                  <Rating value={4.8} readOnly size="small" />
                  <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: '0.1em' }}>VETTED BY 1.2K CULERS</Typography>
                </div>
              </div>

              <Typography variant="h2" sx={{ fontWeight: 900, color: 'primary.main' }}>${product.price.toFixed(2)}</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600, lineHeight: 2, fontSize: '1.15rem' }}>{product.description}</Typography>

              <Divider sx={{ opacity: 0.1 }} />

              <div className="flex items-center gap-10">
                <QuantityControl value={qty} onChange={setQty} />
                <Button variant="contained" size="large" fullWidth startIcon={<CartIcon />} onClick={() => { addItem(product, qty); toast('ARCHIVED IN SQUAD CART', 'success') }} sx={{ py: 2.5, borderRadius: '100px', fontSize: '1.2rem', fontWeight: 900 }}>ADD TO KIT</Button>
              </div>

              <div className="pt-12">
                <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 6, '& .MuiTab-root': { fontWeight: 900, fontSize: '0.85rem' } }}>
                  <Tab label="ATELIER TECH" /><Tab label="CULER REVIEWS" /><Tab label="LOGISTICS" />
                </Tabs>
                <div className="min-h-[120px] text-gray-500 font-bold uppercase leading-loose text-sm tracking-wide">
                   {tab === 0 && "ENGINEERED WITH THE PRECISION OF THE CAMP NOU. THIS PIECE USES RECYCLED TITANIUM STITCHING VETTED FOR ELITE ENDURANCE."}
                   {tab === 1 && "VETTED BY THE BARCELONA SQUAD. CURRENT SCORE: 4.9/5 ACROSS ALL STREETWEAR SESSIONS."}
                   {tab === 2 && "FREE GLOBAL SHIPPING ON ORDERS OVER $200. TRACK YOUR PIECE IN REAL-TIME VIA OUR SQUAD HUB."}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
