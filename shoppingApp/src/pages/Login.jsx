import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  Google as GoogleIcon,
  Apple as AppleIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Bolt as ActionIcon
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ name: 'Ahmed Salah', email })
    toast('WELCOME BACK TO THE SQUAD.', 'success')
    navigate(from, { replace: true })
  }

  return (
    <Box sx={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', py: 12 }}>
      <Container maxWidth="sm">
        <Box textAlign="center" sx={{ mb: 10, borderBottom: '10px solid', borderColor: 'primary.main', pb: 4, width: '100%' }}>
          <Typography variant="h1" sx={{ fontWeight: 900, letterSpacing: '-0.04em' }}>SQUAD ACCESS</Typography>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.4em' }}>SHOPWAVE PERFORMANCE</Typography>
        </Box>
        <Paper variant="outlined" sx={{ p: { xs: 4, md: 10 }, border: '2px solid', borderColor: 'primary.main' }}>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, textAlign: 'center' }}>FUEL YOUR SESSION</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 8, textAlign: 'center', fontWeight: 700, textTransform: 'uppercase' }}>ENTER SQUAD CREDENTIALS TO ACCESS YOUR GEAR ARCHIVE.</Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 900, mb: 1, display: 'block', color: 'primary.main' }}>SQUAD ID / EMAIL</Typography>
                <TextField fullWidth required placeholder="ID@SQUAD.COM" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Box>
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: 'primary.main' }}>PASSWORD</Typography>
                  <Link to="#" style={{ textDecoration: 'none', fontSize: '0.75rem', fontWeight: 900, color: '#ff5252' }}>LOST ID?</Link>
                </Stack>
                <TextField fullWidth required type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                  InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'primary.main' }}>{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton></InputAdornment> }} />
              </Box>
              <Button type="submit" variant="contained" size="large" fullWidth startIcon={<ActionIcon />} sx={{ py: 2.5, fontWeight: 900, fontSize: '1.2rem' }}>GEAR IN</Button>
              <Divider><Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', px: 2 }}>SQUAD OPTIONS</Typography></Divider>
              <Grid container spacing={2}>
                <Grid size={6}><Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ fontWeight: 900, py: 2 }}>GOOGLE</Button></Grid>
                <Grid size={6}><Button fullWidth variant="outlined" startIcon={<AppleIcon />} sx={{ fontWeight: 900, py: 2 }}>APPLE</Button></Grid>
              </Grid>
            </Stack>
          </form>
        </Paper>
        <Typography variant="body2" sx={{ mt: 8, textAlign: 'center', fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase' }}>NEW SQUAD MEMBER? <Link to="/shop" style={{ color: '#ff5252', textDecoration: 'none' }}>JOIN THE SQUAD</Link></Typography>
      </Container>
    </Box>
  )
}
