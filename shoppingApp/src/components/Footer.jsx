import { Box, Container, Typography, Stack, Link, IconButton, Divider, TextField, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  GitHub as GithubIcon,
  X as TwitterIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Google as GoogleIcon,
  Send as SendIcon
} from '@mui/icons-material'

const footerLinks = [
  { title: 'Contact Us', links: ['Ahmed Salah', 'contact@ahmedsalah.dev', '+20 123 456 7890'] },
  { title: 'Quick Links', links: ['Shop All', 'Wishlist', 'My Account', 'Order Tracking', 'FAQs'] },
]

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', pt: 12, pb: 8, borderTop: '1px solid', borderColor: 'outlineVariant' }}>
      <Container maxWidth="xl">
        <Grid container spacing={8}>

          {/* Brand & Socials */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.02em', color: 'primary.main' }}>
              SHOPWAVE
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 300, mb: 6, lineHeight: 1.8 }}>
              Curating the finest digital experiences and premium goods for the modern collector.
            </Typography>
            <Stack direction="row" spacing={2}>
              {[GoogleIcon, GithubIcon, TwitterIcon, FacebookIcon, InstagramIcon].map((Icon, i) => (
                <IconButton
                   key={i}
                   size="small"
                   variant="outlined"
                   sx={{ border: '1px solid', borderColor: 'outlineVariant', color: 'text.secondary' }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Links */}
          {footerLinks.map((section) => (
            <Grid size={{ xs: 12, sm: 6, md: 2 }} key={section.title}>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 4, fontSize: '1rem' }}>{section.title}</Typography>
              <Stack spacing={2}>
                {section.links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="none"
                    sx={{ color: 'text.secondary', fontWeight: 500, '&:hover': { color: 'primary.main' } }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Newsletter */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 4, fontSize: '1rem' }}>Stay Inspired</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
              Subscribe to receive updates, access to exclusive drops, and more.
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
              <Button variant="contained" sx={{ px: 4, minWidth: 'auto' }}>
                <SendIcon sx={{ fontSize: 20 }} />
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 8, borderStyle: 'dashed' }} />

        <Grid container alignItems="center" justifyContent="space-between" spacing={4}>
          <Grid>
            <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.05em', color: 'text.secondary' }}>
              © 2026 SHOPWAVE ATELIER. BUILT BY AHMED SALAH.
            </Typography>
          </Grid>
          <Grid>
            <Stack direction="row" spacing={4} alignItems="center">
              <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.primary' }}>SECURE PAYMENTS:</Typography>
              <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" height={20} sx={{ filter: 'grayscale(1)', opacity: 0.6 }} />
              <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.svg" height={20} sx={{ filter: 'grayscale(1)', opacity: 0.6 }} />
              <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" height={20} sx={{ filter: 'grayscale(1)', opacity: 0.6 }} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
