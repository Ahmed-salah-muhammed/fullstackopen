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
  VisibilityOff as VisibilityOffIcon
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
    // Simulated login
    login({ name: 'Ahmed Salah', email })
    toast('Welcome back to the Atelier', 'success')
    navigate(from, { replace: true })
  }

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 12
      }}
    >
      <Container maxWidth="sm">
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.03em' }}>ATELIER</Typography>
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, letterSpacing: '0.2em' }}>
            THE DIGITAL BOUTIQUE
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ p: { xs: 4, md: 8 }, borderRadius: '32px' }}>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 1, textAlign: 'center' }}>Welcome back</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 6, textAlign: 'center' }}>
            Enter your credentials to access your archive.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, mb: 1, display: 'block' }}>EMAIL ADDRESS</Typography>
                <TextField
                  fullWidth
                  required
                  placeholder="name@atelier.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800 }}>PASSWORD</Typography>
                  <Link to="#" style={{ textDecoration: 'none', fontSize: '0.7rem', fontWeight: 900, color: '#5e5ce6' }}>Forgot Password?</Link>
                </Stack>
                <TextField
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ py: 2, fontWeight: 900 }}
              >
                Sign In
              </Button>

              <Divider>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', px: 2 }}>OR CONTINUE WITH</Typography>
              </Divider>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ fontWeight: 800, py: 1.5 }}>Google</Button>
                </Grid>
                <Grid size={6}>
                  <Button fullWidth variant="outlined" startIcon={<AppleIcon />} sx={{ fontWeight: 800, py: 1.5 }}>Apple</Button>
                </Grid>
              </Grid>
            </Stack>
          </form>
        </Paper>

        <Typography variant="body2" sx={{ mt: 6, textAlign: 'center', fontWeight: 700, color: 'text.secondary' }}>
          New to the Atelier? <Link to="/shop" style={{ color: '#5e5ce6', textDecoration: 'none' }}>Create an account</Link>
        </Typography>
      </Container>
    </Box>
  )
}
