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
  { title: 'SQUAD SUPPORT', links: ['Track Your Gear', 'Returns', 'Size Guide', 'Member FAQ'] },
  { title: 'PERFORMANCE', links: ['Shop All', 'New Drops', 'The Lab', 'Sustainability'] },
]

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', pt: 12, pb: 8, borderTop: '2px solid', borderColor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.04em', color: 'text.primary' }}>
              SHOPWAVE<span style={{ color: '#ff5252' }}>.</span>
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 350, mb: 6, fontWeight: 700, textTransform: 'uppercase' }}>
              FUEL YOUR AMBITION. WE ARCHIVE THE TECH, YOU DO THE WORK. THE PERFORMANCE HUB FOR THE MODERN SQUAD.
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
              <Typography variant="overline" sx={{ fontWeight: 900, mb: 4, display: 'block', color: 'primary.main' }}>{section.title}</Typography>
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
            <Typography variant="overline" sx={{ fontWeight: 900, mb: 4, display: 'block', color: 'primary.main' }}>JOIN THE SQUAD</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, fontWeight: 700 }}>GET EARLY ACCESS TO PERFORMANCE DROPS AND SQUAD EXCLUSIVES.</Typography>
            <Stack direction="row" spacing={1}>
              <TextField placeholder="EMAIL ADDRESS" variant="outlined" size="small" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0px', fontWeight: 900 } }} />
              <Button variant="contained" sx={{ px: 4, minWidth: 'auto' }}><SendIcon sx={{ fontSize: 20 }} /></Button>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 8, borderStyle: 'solid', borderWidth: '1px' }} />
        <Grid container alignItems="center" justifyContent="space-between" spacing={4}>
          <Grid><Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: '0.05em', color: 'text.secondary' }}>© 2026 SHOPWAVE PERFORMANCE. BUILT FOR THE SQUAD.</Typography></Grid>
          <Grid>
            <Stack direction="row" spacing={4} alignItems="center">
              <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.primary' }}>SECURE PERFORMANCE PAYMENTS:</Typography>
              <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" height={18} sx={{ opacity: 0.8 }} />
              <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.svg" height={18} sx={{ opacity: 0.8 }} />
              <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" height={18} sx={{ opacity: 0.8 }} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
