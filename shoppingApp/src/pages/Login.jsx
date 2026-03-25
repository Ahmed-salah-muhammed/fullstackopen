import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Box, Container, Typography, TextField, Button, Paper, Stack, Divider, IconButton, InputAdornment } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Google as GoogleIcon, Apple as AppleIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth(); const toast = useToast(); const navigate = useNavigate(); const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = (e) => {
    e.preventDefault(); login({ name: 'Pau Lopez', email }); toast('WELCOME TO THE CLUB.', 'success'); navigate(from, { replace: true })
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#fcfcff] dark:bg-[#0a0a0f] py-16 px-4 transition-colors duration-500">
      <Container maxWidth="sm">
        <div className="text-center mb-12">
          <Typography variant="h1" sx={{ fontWeight: 900, mb: 1 }}>BARÇA</Typography>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.4em' }}>THE DIGITAL ATELIER</Typography>
        </div>
        <Paper variant="outlined" sx={{ p: { xs: 4, md: 8 }, borderRadius: '40px', border: '2px solid', borderColor: 'primary.main' }}>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, textAlign: 'center' }}>SQUAD ACCESS</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 8, textAlign: 'center', fontWeight: 600 }}>ENTER YOUR CREDENTIALS TO ACCESS YOUR KIT ARCHIVE.</Typography>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Typography variant="caption" sx={{ fontWeight: 800, ml: 1 }}>EMAIL ADDRESS</Typography>
              <TextField fullWidth required placeholder="CULER@BARCA.COM" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <Typography variant="caption" sx={{ fontWeight: 800 }}>PASSWORD</Typography>
                <Link to="#" className="text-xs font-black text-[#A50044] no-underline">FORGOT?</Link>
              </div>
              <TextField fullWidth required type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton></InputAdornment> }} />
            </div>
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 2, fontWeight: 900, borderRadius: '16px', fontSize: '1.1rem' }}>SIGN IN TO CLUB</Button>
            <Divider><Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', px: 2 }}>OR CONTINUE WITH</Typography></Divider>
            <div className="grid grid-cols-2 gap-4">
              <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ fontWeight: 800, py: 1.5, borderRadius: '12px' }}>GOOGLE</Button>
              <Button fullWidth variant="outlined" startIcon={<AppleIcon />} sx={{ fontWeight: 800, py: 1.5, borderRadius: '12px' }}>APPLE</Button>
            </div>
          </form>
        </Paper>
        <div className="mt-10 text-center font-bold text-gray-500">NEW CULER? <Link to="/shop" className="text-[#004D98] no-underline">JOIN THE SQUAD</Link></div>
      </Container>
    </div>
  )
}
