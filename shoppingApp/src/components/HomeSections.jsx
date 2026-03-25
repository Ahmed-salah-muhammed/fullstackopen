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
    <Box sx={{ bgcolor: 'surface.containerLow', py: 20 }}>
      <Container maxWidth="xl">
        <Grid container spacing={12} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1548690312-e3b507d17a47?q=80&w=2070&auto=format&fit=crop"
              sx={{ width: '100%', height: '700px', objectFit: 'cover', borderRadius: '40px', border: '1px solid', borderColor: 'outlineVariant', p: 4, bgcolor: 'background.paper' }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.4em' }}>THE BARÇA STORY</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 2, mb: 4, letterSpacing: '-0.04em' }}>
              MÉS QUE UN CLUB. <br /> CRAFTED FOR CULERS.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 8, lineHeight: 2, fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase' }}>
              BARÇA ATELIER IS WHERE FOOTBALL PASSION MEETS TAILORED STYLE. WE ARCHIVE THE TECH OF THE GAME TO PROVIDE KITS AND ACCESSORIES VETTED FOR PERFORMANCE AND THE STREETS.
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack spacing={2}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, borderRadius: '12px' }}>
                    <ClubIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>OFFICIAL PARTNER</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700 }}>CERTIFIED KITS DIRECT FROM THE CAMP NOU LABS.</Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack spacing={2}>
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48, borderRadius: '12px' }}>
                    <SmartIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>ATELIER DESIGN</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700 }}>STITCHED WITH PRECISION. VETTED FOR THE GLOBAL SQUAD.</Typography>
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
    <Box sx={{ py: 20 }}>
      <Container maxWidth="xl">
        <Box textAlign="center" sx={{ mb: 12 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.4em' }}>BARÇA SQUAD REVIEWS</Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mt: 2, letterSpacing: '-0.02em' }}>VETTED BY CULERS</Typography>
        </Box>
        <Grid container spacing={4}>
          {[1, 2, 3].map((i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Paper variant="outlined" sx={{ p: 6, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-10px)', borderColor: 'primary.main' } }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.primary', mb: 4, lineHeight: 1.8, fontWeight: 800, textTransform: 'uppercase' }}>
                  "THE QUALITY OF THE STREETWEAR KITS AT BARÇA ATELIER IS UNMATCHED. THE SPOTIFY X NIKE COLLAB IS A MUST-HAVE."
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={`https://i.pravatar.cc/150?u=${i}`} sx={{ width: 60, height: 60, borderRadius: '12px' }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase' }}>PAU LOPEZ</Typography>
                    <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.1em' }}>SQUAD MEMBER</Typography>
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
    <Box sx={{ py: 10, borderTop: '2px solid', borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Stack direction="row" spacing={12} justifyContent="center" alignItems="center" sx={{ opacity: 0.6 }}>
           <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" height={40} className="gold-glow" />
           <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" height={40} className="gold-glow" />
           <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/1/15/CUPRA_Logo.svg" height={40} className="gold-glow" />
        </Stack>
      </Container>
    </Box>
  )
}
