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
    e.preventDefault(); login({ name: 'Pau Rivera', email }); toast('WELCOME BACK TO THE ATELIER.', 'success'); navigate(from, { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8ff] dark:bg-[#0a0a14] py-20 px-4 transition-colors duration-500">
      <Container maxWidth="sm">
        <div className="text-center mb-16">
          <Typography variant="h1" sx={{ fontWeight: 900, mb: 1 }}>BARÇA</Typography>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.4em' }}>THE DIGITAL ATELIER</Typography>
        </div>
        <Paper elevation={0} sx={{ p: { xs: 6, md: 10 }, borderRadius: '48px', bgcolor: 'background.paper', boxShadow: '0 40px 80px rgba(19, 27, 46, 0.05)' }}>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, textAlign: 'center' }}>SQUAD ACCESS</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 8, textAlign: 'center', fontWeight: 600 }}>ENTER YOUR SQUAD ID TO ACCESS THE ARCHIVE.</Typography>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <Typography variant="caption" sx={{ fontWeight: 800, ml: 2, letterSpacing: '0.1em' }}>SQUAD ID / EMAIL</Typography>
              <TextField fullWidth required placeholder="CULER@BARCA.COM" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '100px', bgcolor: 'surface.containerLow', '& fieldset': { border: 'none' } } }} />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center px-2">
                <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.1em' }}>PASSWORD</Typography>
                <Link to="#" className="text-xs font-black text-[#A50044] no-underline tracking-widest">FORGOT?</Link>
              </div>
              <TextField fullWidth required type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '100px', bgcolor: 'surface.containerLow', '& fieldset': { border: 'none' } } }}
                InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton></InputAdornment> }} />
            </div>
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 2.5, fontWeight: 900, borderRadius: '100px', fontSize: '1.2rem', mt: 4 }}>SIGN IN TO CLUB</Button>
            <Divider sx={{ opacity: 0.1 }}><Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', px: 3, letterSpacing: '0.2em' }}>OR</Typography></Divider>
            <div className="grid grid-cols-2 gap-6">
              <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ fontWeight: 800, py: 2, borderRadius: '100px', border: '1px solid', borderColor: 'divider' }}>GOOGLE</Button>
              <Button fullWidth variant="outlined" startIcon={<AppleIcon />} sx={{ fontWeight: 800, py: 2, borderRadius: '100px', border: '1px solid', borderColor: 'divider' }}>APPLE</Button>
            </div>
          </form>
        </Paper>
        <div className="mt-12 text-center font-bold text-gray-500 tracking-wide uppercase text-sm">NEW CULER? <Link to="/shop" className="text-[#2a14b4] no-underline border-b-2 border-[#2a14b4]">JOIN THE SQUAD</Link></div>
      </Container>
    </div>
  )
}
