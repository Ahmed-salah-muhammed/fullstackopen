import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Stack,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useNavigate } from 'react-router-dom'
import { Bolt as ActionIcon } from '@mui/icons-material'

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const toast = useToast()
  const navigate = useNavigate()
  const [method, setMethod] = useState('card')

  const handleSubmit = (e) => {
    e.preventDefault()
    toast('PERFORMANCE DROP SECURED! TRACK YOUR GEAR IN PROFILE.', 'success')
    clearCart()
    navigate('/profile')
  }

  return (
    <Box sx={{ bgcolor: 'background.default', py: 12 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 10, borderLeft: '10px solid', borderColor: 'primary.main', pl: 4 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.04em' }}>SQUAD CHECKOUT</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase' }}>SECURE YOUR PERFORMANCE DROP FROM THE SHOPWAVE PERFORMANCE LAB.</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={8}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <Stack spacing={6}>
                <Paper variant="outlined" sx={{ p: 6, borderRadius: '0px', border: '2px solid', borderColor: 'divider' }}>
                  <Typography variant="overline" sx={{ fontWeight: 900, mb: 4, display: 'block', color: 'primary.main' }}>SQUAD DELIVERY DETAILS</Typography>
                  <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="FIRST NAME" required /></Grid>
                    <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="LAST NAME" required /></Grid>
                    <Grid size={12}><TextField fullWidth label="SQUAD ADDRESS" required /></Grid>
                    <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="CITY" required /></Grid>
                    <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="SQUAD ZIP CODE" required /></Grid>
                  </Grid>
                </Paper>
                <Paper variant="outlined" sx={{ p: 6, borderRadius: '0px', border: '2px solid', borderColor: 'divider' }}>
                   <Typography variant="overline" sx={{ fontWeight: 900, mb: 4, display: 'block', color: 'primary.main' }}>SQUAD PAYMENT METHOD</Typography>
                  <RadioGroup value={method} onChange={(e) => setMethod(e.target.value)}>
                    <Stack spacing={4}>
                      <Paper variant="outlined" sx={{ p: 4, borderRadius: '0px', borderColor: method === 'card' ? 'primary.main' : 'divider', bgcolor: method === 'card' ? 'surface.containerLow' : 'transparent', border: '2px solid' }}>
                        <FormControlLabel value="card" control={<Radio />} label={<Typography variant="subtitle1" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>SQUAD CREDIT / DEBIT CARD</Typography>} />
                        {method === 'card' && (
                          <Box sx={{ mt: 4 }}><Grid container spacing={3}><Grid size={12}><TextField fullWidth label="SQUAD CARD NUMBER" placeholder="0000 0000 0000 0000" /></Grid><Grid size={6}><TextField fullWidth label="EXPIRY DATE" placeholder="MM/YY" /></Grid><Grid size={6}><TextField fullWidth label="SQUAD CVV" placeholder="***" /></Grid></Grid></Box>
                        )}
                      </Paper>
                      <Paper variant="outlined" sx={{ p: 4, borderRadius: '0px', borderColor: method === 'paypal' ? 'primary.main' : 'divider', bgcolor: method === 'paypal' ? 'surface.containerLow' : 'transparent', border: '2px solid' }}>
                        <FormControlLabel value="paypal" control={<Radio />} label={<Typography variant="subtitle1" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>SQUAD PAYPAL</Typography>} />
                      </Paper>
                    </Stack>
                  </RadioGroup>
                </Paper>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Paper variant="outlined" sx={{ p: 6, borderRadius: '0px', position: 'sticky', top: 120, bgcolor: 'surface.containerLow', border: '4px solid', borderColor: 'primary.main' }}>
                <Typography variant="overline" sx={{ fontWeight: 900, mb: 4, display: 'block', color: 'primary.main' }}>GEAR SUMMARY</Typography>
                <Stack spacing={4}>
                  {cart.map((item) => (
                    <Stack key={item.id} direction="row" justifyContent="space-between" alignItems="center">
                      <Box sx={{ maxWidth: '70%' }}><Typography variant="body2" sx={{ fontWeight: 900, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>{item.title}</Typography><Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 900 }}>SQUAD QTY: {item.quantity}</Typography></Box>
                      <Typography variant="body2" sx={{ fontWeight: 900 }}>${(item.price * item.quantity).toFixed(2)}</Typography>
                    </Stack>
                  ))}
                  <Divider sx={{ borderStyle: 'solid', borderBottomWidth: '1px' }} />
                  <Stack direction="row" justifyContent="space-between"><Typography variant="h5" sx={{ fontWeight: 900 }}>SQUAD TOTAL</Typography><Typography variant="h4" sx={{ fontWeight: 900, color: 'primary.main' }}>${cartTotal.toFixed(2)}</Typography></Stack>
                  <Button type="submit" variant="contained" fullWidth size="large" startIcon={<ActionIcon />} sx={{ py: 2.5, fontWeight: 900, fontSize: '1.2rem', mt: 4 }}>SECURE DROP</Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  )
}
