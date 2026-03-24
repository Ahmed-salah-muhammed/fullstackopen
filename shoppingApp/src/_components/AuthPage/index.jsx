import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Divider,
  Grid,
  IconButton
} from '@mui/material'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export default function Login() {
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Email is invalid'
    if (!pass) e.pass = 'Password is required'
    else if (pass.length < 6) e.pass = 'Password must be at least 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setTimeout(() => {
      login({ name: email.split('@')[0], email })
      toast('Welcome back to the Atelier', 'success')
      navigate('/')
      setLoading(false)
    }, 1500)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background radial gradient decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(42, 20, 180, 0.03) 0%, rgba(250, 248, 255, 0) 70%)',
          zIndex: 0
        }}
      />

      <Container maxWidth="sm" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1, py: 8 }}>

        {/* Brand Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '2rem',
              fontWeight: 900,
              letterSpacing: '0.1em',
              mb: 0.5,
              color: 'text.primary'
            }}
          >
            ATELIER
          </Typography>
          <Typography
            variant="overline"
            sx={{
              color: 'text.secondary',
              letterSpacing: '0.2em',
              fontWeight: 400
            }}
          >
            THE DIGITAL BOUTIQUE
          </Typography>
        </Box>

        {/* Login Card */}
        <Paper
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: '16px',
            bgcolor: 'background.lowest', // White in light mode
            boxShadow: '0 20px 40px rgba(19, 27, 46, 0.06)',
            width: '100%',
            maxWidth: '480px',
            mx: 'auto'
          }}
        >
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
            Welcome back
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
            Enter your credentials to access your archive.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="overline"
                display="block"
                sx={{ mb: 1, fontWeight: 700, color: 'text.secondary' }}
              >
                EMAIL ADDRESS
              </Typography>
              <TextField
                fullWidth
                placeholder="name@atelier.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography
                  variant="overline"
                  sx={{ fontWeight: 700, color: 'text.secondary' }}
                >
                  PASSWORD
                </Typography>
                <Link
                  href="#"
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>
              <TextField
                fullWidth
                type="password"
                placeholder="••••••••"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                error={!!errors.pass}
                helperText={errors.pass}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ py: 2, fontSize: '1rem' }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <Divider sx={{ my: 4 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', px: 1 }}>
              OR CONTINUE WITH
            </Typography>
          </Divider>

          <Grid container spacing={2}>
            <Grid size={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <Box component="img" src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" sx={{ width: 18 }} />
                }
                sx={{
                  bgcolor: 'surface.containerLow',
                  border: 'none',
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'surface.containerHighest' }
                }}
              >
                Google
              </Button>
            </Grid>
            <Grid size={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <Box component="svg" sx={{ width: 18 }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </Box>
                }
                sx={{
                  bgcolor: 'surface.containerLow',
                  border: 'none',
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'surface.containerHighest' }
                }}
              >
                Apple
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            New to the Atelier?{' '}
            <Link
              href="#"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Create an account
            </Link>
          </Typography>
        </Box>
      </Container>

      {/* Footer (matches screenshot) */}
      <Box
        component="footer"
        sx={{
          py: 4,
          px: { xs: 4, md: 8 },
          bgcolor: 'surface.containerLow',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: 2,
          mt: 'auto'
        }}
      >
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 0.5, fontSize: '1rem' }}>ATELIER</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.05em' }}>
            © 2024 ATELIER. ALL RIGHTS RESERVED.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['PRIVACY POLICY', 'TERMS OF SERVICE', 'SHIPPING & RETURNS', 'CONTACT'].map((item) => (
            <Link
              key={item}
              href="#"
              sx={{
                fontSize: '0.65rem',
                fontWeight: 600,
                color: 'text.secondary',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {item}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
