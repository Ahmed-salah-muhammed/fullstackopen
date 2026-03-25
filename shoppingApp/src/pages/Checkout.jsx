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

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const toast = useToast()
  const navigate = useNavigate()
  const [method, setMethod] = useState('card')

  const handleSubmit = (e) => {
    e.preventDefault()
    toast('Order placed successfully! ARCH-9021 is being archived.', 'success')
    clearCart()
    navigate('/profile')
  }

  return (
    <Box sx={{ bgcolor: 'background.default', py: 12 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>Checkout</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>Finalize your acquisition from the Shopwave Atelier.</Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={8}>

            {/* Form */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Stack spacing={6}>
                <Paper variant="outlined" sx={{ p: 6, borderRadius: '24px' }}>
                  <Typography variant="h5" sx={{ fontWeight: 900, mb: 4 }}>Shipping Details</Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField fullWidth label="First Name" required />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField fullWidth label="Last Name" required />
                    </Grid>
                    <Grid size={12}>
                      <TextField fullWidth label="Address" required />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField fullWidth label="City" required />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField fullWidth label="Postal Code" required />
                    </Grid>
                  </Grid>
                </Paper>

                <Paper variant="outlined" sx={{ p: 6, borderRadius: '24px' }}>
                  <Typography variant="h5" sx={{ fontWeight: 900, mb: 4 }}>Payment Method</Typography>
                  <RadioGroup value={method} onChange={(e) => setMethod(e.target.value)}>
                    <Stack spacing={3}>
                      <Paper
                        variant="outlined"
                        sx={{ p: 3, borderRadius: '12px', borderColor: method === 'card' ? 'primary.main' : 'outlineVariant', bgcolor: method === 'card' ? 'surface.containerLow' : 'transparent' }}
                      >
                        <FormControlLabel value="card" control={<Radio />} label={<Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Credit / Debit Card</Typography>} />
                        {method === 'card' && (
                          <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                              <Grid size={12}>
                                <TextField fullWidth label="Card Number" placeholder="0000 0000 0000 0000" />
                              </Grid>
                              <Grid size={6}>
                                <TextField fullWidth label="Expiry Date" placeholder="MM/YY" />
                              </Grid>
                              <Grid size={6}>
                                <TextField fullWidth label="CVV" placeholder="***" />
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                      </Paper>
                      <Paper
                         variant="outlined"
                         sx={{ p: 3, borderRadius: '12px', borderColor: method === 'paypal' ? 'primary.main' : 'outlineVariant', bgcolor: method === 'paypal' ? 'surface.containerLow' : 'transparent' }}
                      >
                        <FormControlLabel value="paypal" control={<Radio />} label={<Typography variant="subtitle1" sx={{ fontWeight: 800 }}>PayPal</Typography>} />
                      </Paper>
                    </Stack>
                  </RadioGroup>
                </Paper>
              </Stack>
            </Grid>

            {/* Order Summary */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Paper
                variant="outlined"
                sx={{ p: 4, borderRadius: '24px', position: 'sticky', top: 120, bgcolor: 'surface.containerLow' }}
              >
                <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>Order Summary</Typography>
                <Stack spacing={3}>
                  {cart.map((item) => (
                    <Stack key={item.id} direction="row" justifyContent="space-between" alignItems="center">
                      <Box sx={{ maxWidth: '70%' }}>
                        <Typography variant="body2" sx={{ fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Qty: {item.quantity}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>${(item.price * item.quantity).toFixed(2)}</Typography>
                    </Stack>
                  ))}
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" sx={{ fontWeight: 900 }}>Total</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main' }}>${cartTotal.toFixed(2)}</Typography>
                  </Stack>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ py: 2, fontWeight: 900, mt: 4 }}
                  >
                    PLACE ORDER
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  )
}
