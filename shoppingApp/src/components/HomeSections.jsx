import { Box, Container, Typography, Stack, Avatar, Paper } from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  Architecture as GISIcon,
  Timeline as GrowthIcon,
  AutoAwesome as SmartIcon,
  Public as GlobalIcon,
  Verified as ClubIcon
} from '@mui/icons-material'

export function BrandStory() {
  return (
    <Box sx={{ bgcolor: 'surface.containerLow', py: 25 }}>
      <Container maxWidth="xl">
        <Grid container spacing={15} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1548690312-e3b507d17a47?q=80&w=2070&auto=format&fit=crop"
              sx={{ width: '100%', height: '750px', objectFit: 'cover', borderRadius: '48px', boxShadow: '0 40px 80px rgba(0,0,0,0.08)' }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.4em' }}>THE BARÇA ATELIER STORY</Typography>
            <Typography variant="h1" sx={{ mt: 3, mb: 6, letterSpacing: '-0.04em' }}>
              MÉS QUE UN CLUB. <br /> CRAFTED FOR CULERS.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 10, lineHeight: 1.8, fontSize: '1.25rem', fontWeight: 600 }}>
              Barça Atelier is where high-end tailoring meets the spirit of Catalunya. We curate official kits, streetwear, and footwear vetted for both the Camp Nou and the global streets.
            </Typography>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack spacing={3}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, borderRadius: '16px' }}><ClubIcon /></Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>CERTIFIED KITS</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>OFFICIAL PIECES DIRECT FROM THE BARCELONA LABS.</Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack spacing={3}>
                  <Avatar sx={{ bgcolor: 'accent.main', width: 56, height: 56, borderRadius: '16px' }}><SmartIcon /></Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>STITCH DESIGN</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>EDITION-SPECIFIC TAILORING FOR THE ELITE SQUAD.</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export function Testimonials() {
  return (
    <Box sx={{ py: 25, bgcolor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 15, borderLeft: '12px solid', borderColor: 'primary.main', pl: 6 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.4em' }}>BARÇA SQUAD REVIEWS</Typography>
          <Typography variant="h2" sx={{ fontWeight: 900 }}>VETTED BY THE GLOBAL SQUAD</Typography>
        </Box>
        <Grid container spacing={8}>
          {[1, 2, 3].map((i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Paper elevation={0} sx={{ p: 8, borderRadius: '40px', bgcolor: 'surface.containerLow', transition: 'all 0.4s ease', '&:hover': { transform: 'translateY(-12px)', bgcolor: 'surface.containerHighest' } }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.primary', mb: 6, lineHeight: 1.8, fontWeight: 700 }}>
                  "THE QUALITY OF THE BARÇA ATELIER COLLECTION IS SUPERIOR TO ANY OTHER CLUB SHOP. THE NIKE X SPOTIFY COLLAB IS PURE ART."
                </Typography>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar src={`https://i.pravatar.cc/150?u=${i}`} sx={{ width: 64, height: 64, borderRadius: '20px' }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>PAU RIVERA</Typography>
                    <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em' }}>SQUAD MEMBER</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export function PartnerBrands() {
  return (
    <Box sx={{ py: 15, bgcolor: 'surface.containerLow' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 900, letterSpacing: '0.5em' }}>OFFICIAL SQUAD PARTNERS</Typography>
        </Box>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 8, md: 20 }} justifyContent="center" alignItems="center">
           <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" height={45} sx={{ filter: 'grayscale(1)', '&:hover': { filter: 'none' }, transition: 'all 0.4s', opacity: 0.7 }} />
           <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" height={45} sx={{ filter: 'grayscale(1)', '&:hover': { filter: 'none' }, transition: 'all 0.4s', opacity: 0.7 }} />
           <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/1/15/CUPRA_Logo.svg" height={45} sx={{ filter: 'grayscale(1)', '&:hover': { filter: 'none' }, transition: 'all 0.4s', opacity: 0.7 }} />
        </Stack>
      </Container>
    </Box>
  )
}
