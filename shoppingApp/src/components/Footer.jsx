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
  { title: 'SQUAD SUPPORT', links: ['Track Your Piece', 'Returns', 'Size Guide', 'Culer FAQ'] },
  { title: 'ARCHIVE', links: ['Official Wear', 'Club Accessories', 'Squad Footwear', 'Member Perks'] },
]

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', pt: 15, pb: 10 }}>
      <Container maxWidth="xl">
        <Grid container spacing={12}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.04em', color: 'primary.main' }}>
              BARÇA<span style={{ color: '#A50044' }}>ATELIER.</span>
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 350, mb: 8, fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.8 }}>
              CURATING PRECISION FOR THE MODERN CULER. OFFICIAL CLUB ACCESSORIES AND ACCESS TO EXCLUSIVE STREETWEAR DROPS.
            </Typography>
            <Stack direction="row" spacing={3}>
              {[GoogleIcon, GithubIcon, TwitterIcon, FacebookIcon, InstagramIcon].map((Icon, i) => (
                <IconButton key={i} size="small" sx={{ bgcolor: 'surface.containerLow', color: 'text.primary', p: 1.5, '&:hover': { bgcolor: 'primary.main', color: 'white' } }}>
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
            </Stack>
          </Grid>
          {footerLinks.map((section) => (
            <Grid size={{ xs: 12, sm: 6, md: 2 }} key={section.title}>
              <Typography variant="overline" sx={{ fontWeight: 900, mb: 4, display: 'block', color: 'secondary.main', letterSpacing: '0.2em' }}>{section.title}</Typography>
              <Stack spacing={3}>
                {section.links.map((link) => (
                  <Link key={link} href="#" underline="none" sx={{ color: 'text.secondary', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', '&:hover': { color: 'primary.main' } }}>
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="overline" sx={{ fontWeight: 900, mb: 4, display: 'block', color: 'secondary.main', letterSpacing: '0.2em' }}>JOIN THE CLUB</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 6, fontWeight: 700 }}>GET EARLY ACCESS TO BARÇA STREETWEAR DROPS AND COLLAB EXCLUSIVES.</Typography>
            <Stack direction="row" spacing={2}>
              <TextField placeholder="EMAIL ADDRESS" variant="outlined" size="small" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: '100px', bgcolor: 'surface.containerLow', '& fieldset': { border: 'none' }, fontWeight: 900 } }} />
              <Button variant="contained" sx={{ px: 4, minWidth: 'auto', borderRadius: '100px' }}><SendIcon sx={{ fontSize: 20 }} /></Button>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 10, opacity: 0.1 }} />
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
           <Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: '0.05em', color: 'text.secondary' }}>© 2026 BARÇA ATELIER. OFFICIAL FC BARCELONA PARTNER.</Typography>
           <div className="flex items-center gap-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" height={22} />
              <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" height={22} />
              <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/1/15/CUPRA_Logo.svg" height={22} />
           </div>
        </div>
      </Container>
    </Box>
  )
}
