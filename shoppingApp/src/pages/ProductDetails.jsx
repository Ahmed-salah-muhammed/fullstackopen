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
    <Container maxWidth="xl" sx={{ py: 12 }}><Grid container spacing={8}><Grid size={{ xs: 12, md: 6 }}><Skeleton variant="rectangular" height={600} sx={{ borderRadius: '40px' }} /></Grid><Grid size={{ xs: 12, md: 6 }}><Skeleton width="40%" height={40} /><Skeleton width="80%" height={80} sx={{ mt: 2 }} /><Skeleton variant="rectangular" height={200} sx={{ mt: 4, borderRadius: '24px' }} /></Grid></Grid></Container>
  )

  if (error || !product) return (
    <div className="min-h-[60vh] flex items-center justify-center text-center"><Typography variant="h4" color="error" fontWeight={900}>KIT NOT FOUND IN ARCHIVE</Typography></div>
  )

  return (
    <div className="bg-white dark:bg-[#0a0a0f] pb-24 transition-colors duration-500">
      <div className="bg-[#f4f6ff] dark:bg-[#16161f] py-6 border-b border-gray-100 dark:border-gray-800">
        <Container maxWidth="xl">
          <Stack direction="row" spacing={1} alignItems="center">
            <Link to="/" className="text-[0.8rem] font-black text-inherit no-underline">CLUB</Link>
            <ChevronIcon sx={{ fontSize: 16, color: 'primary.main' }} />
            <Link to="/shop" className="text-[0.8rem] font-black text-inherit no-underline uppercase">KITS</Link>
            <ChevronIcon sx={{ fontSize: 16, color: 'primary.main' }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 900, textTransform: 'uppercase' }}>{product.title}</Typography>
          </Stack>
        </Container>
      </div>

      <Container maxWidth="xl" className="mt-16">
        <Grid container spacing={12}>
          <Grid size={{ xs: 12, md: 6 }}>
            <div className="bg-white rounded-[40px] p-12 flex items-center justify-center relative min-h-[650px] border-2 border-[#f4f6ff] group shadow-sm hover:shadow-2xl transition-all duration-700">
              <img src={product.image} className="max-w-full max-h-[500px] object-contain transition-transform duration-700 group-hover:scale-105" alt={product.title} />
              <IconButton onClick={() => toggleWishlist(product)} sx={{ position: 'absolute', top: 30, right: 30, bgcolor: 'background.paper', shadow: 1 }}>
                {isInWishlist(product.id) ? <WishlistFilledIcon color="error" /> : <WishlistIcon />}
              </IconButton>
            </div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <div className="space-y-10">
              <div>
                <Chip label={`OFFICIAL ${product.category}`} sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 900, borderRadius: '8px', mb: 3 }} />
                <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, lineHeight: 1.1 }}>{product.title}</Typography>
                <div className="flex items-center gap-4">
                  <Rating value={4.5} readOnly size="small" sx={{ color: '#EDBB00' }} />
                  <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>(250+ SQUAD REVIEWS)</Typography>
                </div>
              </div>

              <Typography variant="h3" sx={{ fontWeight: 900, color: 'primary.main' }}>${product.price.toFixed(2)}</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600, lineHeight: 1.8 }}>{product.description.toUpperCase()}</Typography>

              <Divider sx={{ borderStyle: 'dashed' }} />

              <div className="flex items-center gap-6">
                <QuantityControl value={qty} onChange={setQty} />
                <Button variant="contained" size="large" fullWidth startIcon={<CartIcon />} onClick={() => { addItem(product, qty); toast('KIT ADDED TO SQUAD CART', 'success') }} sx={{ py: 2.5, borderRadius: '16px', fontSize: '1.1rem' }}>ADD TO KIT</Button>
              </div>

              <div className="pt-10">
                <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 4, '& .MuiTab-root': { fontWeight: 900 } }}>
                  <Tab label="KIT TECH" /><Tab label="SQUAD REVIEWS" /><Tab label="SHIPPING" />
                </Tabs>
                <div className="min-h-[100px] text-gray-500 font-bold uppercase leading-relaxed text-sm">
                   {tab === 0 && "ENGINEERED FOR THE CAMP NOU. THIS PIECE USES MOISTURE-WICKING TECH VETTED BY THE WORLD'S BEST ATHLETES."}
                   {tab === 1 && "VETTED BY THE GLOBAL SQUAD. 4.9/5 RATING FOR STREETWEAR DURABILITY."}
                   {tab === 2 && "FREE GLOBAL SHIPPING FOR MEMBERS. TRACK YOUR GEAR IN REAL-TIME VIA THE PROFILE GIS HUB."}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
