import { useState } from 'react'
import { Box, Container, Typography, Button, TextField, Paper, Stack, Divider, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart(); const toast = useToast(); const navigate = useNavigate(); const [method, setMethod] = useState('card')
  const handleSubmit = (e) => { e.preventDefault(); toast('KIT DROP SECURED! TRACK YOUR PIECES IN PROFILE.', 'success'); clearCart(); navigate('/profile') }

  return (
    <div className="bg-[#faf8ff] dark:bg-[#0a0a14] py-20 transition-colors duration-500 min-h-screen">
      <Container maxWidth="xl">
        <div className="mb-16 border-l-12 border-[#004D98] pl-8">
          <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>SQUAD CHECKOUT</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600 }}>SECURE YOUR PIECES FROM THE BARÇA ATELIER ARCHIVE.</Typography>
        </div>
        <form onSubmit={handleSubmit}><Grid container spacing={10}><Grid size={{ xs: 12, lg: 8 }}><Stack spacing={8}>
          <Paper elevation={0} sx={{ p: 8, borderRadius: '40px' }}><Typography variant="h4" sx={{ fontWeight: 900, mb: 6 }}>DELIVERY HUB</Typography>
            <Grid container spacing={4}><Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="FIRST NAME" required /></Grid><Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="LAST NAME" required /></Grid><Grid size={12}><TextField fullWidth label="CULER ADDRESS" required /></Grid><Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="CITY" required /></Grid><Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="ZIP" required /></Grid></Grid>
          </Paper>
          <Paper elevation={0} sx={{ p: 8, borderRadius: '40px' }}><Typography variant="h4" sx={{ fontWeight: 900, mb: 6 }}>PAYMENT METHOD</Typography>
            <RadioGroup value={method} onChange={(e) => setMethod(e.target.value)}><Stack spacing={4}>
              <Paper variant="outlined" sx={{ p: 4, borderRadius: '24px', borderColor: method === 'card' ? 'primary.main' : 'divider', bgcolor: method === 'card' ? 'surface.containerLow' : 'transparent', border: '2px solid' }}>
                <FormControlLabel value="card" control={<Radio />} label={<Typography variant="h6" sx={{ fontWeight: 900 }}>CREDIT / DEBIT CARD</Typography>} />
                {method === 'card' && (<Box sx={{ mt: 4 }}><Grid container spacing={3}><Grid size={12}><TextField fullWidth label="CARD NUMBER" placeholder="0000 0000 0000 0000" /></Grid><Grid size={6}><TextField fullWidth label="EXPIRY" placeholder="MM/YY" /></Grid><Grid size={6}><TextField fullWidth label="CVV" placeholder="***" /></Grid></Grid></Box>)}
              </Paper>
              <Paper variant="outlined" sx={{ p: 4, borderRadius: '24px', borderColor: method === 'paypal' ? 'primary.main' : 'divider', bgcolor: method === 'paypal' ? 'surface.containerLow' : 'transparent', border: '2px solid' }}>
                <FormControlLabel value="paypal" control={<Radio />} label={<Typography variant="h6" sx={{ fontWeight: 900 }}>SQUAD PAYPAL</Typography>} />
              </Paper>
            </Stack></RadioGroup>
          </Paper>
        </Stack></Grid>
        <Grid size={{ xs: 12, lg: 4 }}><Paper elevation={0} sx={{ p: 8, borderRadius: '48px', position: 'sticky', top: 120, bgcolor: 'surface.containerLow', border: '2px solid', borderColor: 'primary.main' }}><Typography variant="h5" sx={{ fontWeight: 900, mb: 6 }}>ORDER SUMMARY</Typography>
          <Stack spacing={4}>{cart.map((item) => (<div key={item.id} className="flex justify-between items-center"><div className="max-w-[70%]"><Typography variant="body2" sx={{ fontWeight: 900, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</Typography><Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800 }}>QTY: {item.quantity}</Typography></div><Typography variant="body1" sx={{ fontWeight: 900 }}>${(item.price * item.quantity).toFixed(2)}</Typography></div>))}
          <Divider sx={{ opacity: 0.1 }} /><div className="flex justify-between items-end"><Typography variant="h5" sx={{ fontWeight: 900 }}>TOTAL</Typography><Typography variant="h3" sx={{ fontWeight: 900, color: 'primary.main' }}>${cartTotal.toFixed(2)}</Typography></div>
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ py: 2.5, fontWeight: 900, fontSize: '1.2rem', mt: 4, borderRadius: '100px' }}>SECURE KIT</Button>
        </Stack></Paper></Grid></Grid></form>
      </Container>
    </div>
  )
}
