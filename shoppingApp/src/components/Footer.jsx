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
  { title: 'CLUB SUPPORT', links: ['Track Your Kit', 'Returns', 'Size Guide', 'Culer FAQ'] },
  { title: 'OFFICIAL STORE', links: ['Shop All', 'Streetwear', 'Official Kits', 'Member Perks'] },
]

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', pt: 12, pb: 8, borderTop: '2px solid', borderColor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.04em', color: 'primary.main' }}>
              BARÇA<span style={{ color: '#A50044' }}>ATELIER.</span>
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 350, mb: 6, fontWeight: 700, textTransform: 'uppercase' }}>
              CURATING PRESCISION FOR THE MODERN CULER. OFFICIAL CLUB ACCESSORIES AND ACCESS TO EXCLUSIVE STREETWEAR DROPS.
            </Typography>
            <Stack direction="row" spacing={2}>
              {[GoogleIcon, GithubIcon, TwitterIcon, FacebookIcon, InstagramIcon].map((Icon, i) => (
                <IconButton key={i} size="small" sx={{ border: '2px solid', borderColor: 'divider', color: 'text.primary', '&:hover': { color: 'primary.main', borderColor: 'primary.main' } }}>
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
            </Stack>
          </Grid>
          {footerLinks.map((section) => (
            <Grid size={{ xs: 12, sm: 6, md: 2 }} key={section.title}>
              <Typography variant="overline" sx={{ fontWeight: 900, mb: 4, display: 'block', color: 'secondary.main' }}>{section.title}</Typography>
              <Stack spacing={2}>
                {section.links.map((link) => (
                  <Link key={link} href="#" underline="none" sx={{ color: 'text.secondary', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', '&:hover': { color: 'primary.main' } }}>
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="overline" sx={{ fontWeight: 900, mb: 4, display: 'block', color: 'secondary.main' }}>JOIN THE CLUB</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, fontWeight: 700 }}>GET EARLY ACCESS TO BARÇA STREETWEAR DROPS AND COLLAB EXCLUSIVES.</Typography>
            <Stack direction="row" spacing={1}>
              <TextField placeholder="EMAIL ADDRESS" variant="outlined" size="small" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontWeight: 900 } }} />
              <Button variant="contained" sx={{ px: 4, minWidth: 'auto', borderRadius: '12px' }}><SendIcon sx={{ fontSize: 20 }} /></Button>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 8, borderStyle: 'solid', borderWidth: '1px' }} />
        <Grid container alignItems="center" justifyContent="space-between" spacing={4}>
          <Grid><Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: '0.05em', color: 'text.secondary' }}>© 2026 BARÇA ATELIER. OFFICIAL FC BARCELONA PARTNER.</Typography></Grid>
          <Grid>
            <Stack direction="row" spacing={4} alignItems="center">
              <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.primary' }}>PARTNERS:</Typography>
              <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" height={18} sx={{ opacity: 0.8 }} />
              <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" height={18} sx={{ opacity: 0.8 }} />
              <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/1/15/CUPRA_Logo.svg" height={18} sx={{ opacity: 0.8 }} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
