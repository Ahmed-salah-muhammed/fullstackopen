import { Link } from 'react-router-dom'
import { Box, Container, Typography, Button, Stack, Divider, IconButton, Paper } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { DeleteOutline as RemoveIcon, ShoppingBagOutlined as CartIcon } from '@mui/icons-material'
import { useCart } from '../context/CartContext'
import QuantityControl from '../components/QuantityControl'

export default function Cart() {
  const { cart, cartTotal, removeItem, updateQuantity } = useCart()

  if (cart.length === 0) return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-gray-50 dark:bg-[#0a0a0f]">
       <div className="bg-white dark:bg-[#16161f] p-12 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-800 max-w-2xl">
          <CartIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>YOUR ARCHIVE IS EMPTY</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6, fontWeight: 600 }}>YOU HAVEN'T ADDED ANY CURATED BARÇA KITS TO YOUR CART YET. EXPLORE THE LATEST DROP.</Typography>
          <Button component={Link} to="/shop" variant="contained" size="large" sx={{ borderRadius: '100px', px: 8 }}>BROWSE COLLECTION</Button>
       </div>
    </div>
  )

  return (
    <div className="bg-white dark:bg-[#0a0a0f] py-16 transition-colors duration-500">
      <Container maxWidth="xl">
        <div className="mb-12 border-l-8 border-[#A50044] pl-6">
          <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>SQUAD CART</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600 }}>YOUR SELECTED PIECES FROM THE BARÇA ATELIER.</Typography>
        </div>

        <Grid container spacing={8}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={4}>
              {cart.map((item) => (
                <Paper key={item.id} variant="outlined" sx={{ p: 4, borderRadius: '24px', transition: 'all 0.3s ease', '&:hover': { borderColor: 'primary.main', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' } }}>
                  <Grid container spacing={4} alignItems="center">
                    <Grid size={{ xs: 4, sm: 2 }}>
                      <Box component={Link} to={`/product/${item.id}`}>
                        <img src={item.image} className="w-full h-24 object-contain bg-white rounded-xl p-2" alt={item.title} />
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 8, sm: 5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</Typography>
                      <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em' }}>{item.category}</Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }}>
                      <QuantityControl value={item.quantity} onChange={(v) => updateQuantity(item.id, v)} />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 2 }} sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>${(item.price * item.quantity).toFixed(2)}</Typography>
                      <IconButton onClick={() => removeItem(item.id)} size="small" sx={{ color: 'secondary.main', mt: 1 }}><RemoveIcon /></IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper variant="outlined" sx={{ p: 6, borderRadius: '32px', position: 'sticky', top: 120, bgcolor: 'surface.containerLow', border: '2px solid', borderColor: 'primary.main' }}>
              <Typography variant="overline" sx={{ fontWeight: 900, mb: 4, display: 'block', color: 'primary.main' }}>ORDER SUMMARY</Typography>
              <Stack spacing={3}>
                <div className="flex justify-between font-bold text-gray-600"><span>SUBTOTAL</span><span>${cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-primary"><span>SQUAD SHIPPING</span><span>FREE</span></div>
                <Divider />
                <div className="flex justify-between items-end">
                   <span className="text-xl font-black">TOTAL</span>
                   <span className="text-3xl font-black text-[#004D98]">${cartTotal.toFixed(2)}</span>
                </div>
                <Button component={Link} to="/checkout" variant="contained" fullWidth size="large" sx={{ py: 2.5, mt: 4, borderRadius: '100px' }}>SECURE CHECKOUT</Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
