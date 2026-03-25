import { Box, Container, Typography, Stack, Avatar, Paper } from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  Architecture as GISIcon,
  Timeline as GrowthIcon,
  AutoAwesome as SmartIcon,
  Public as GlobalIcon
} from '@mui/icons-material'

export function BrandStory() {
  return (
    <Box sx={{ bgcolor: 'surface.containerLowest', py: 20 }}>
      <Container maxWidth="xl">
        <Grid container spacing={12} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
              sx={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: '40px' }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.2em' }}>THE BRAND STORY</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 2, mb: 4, letterSpacing: '-0.02em' }}>
              Crafting Digital Excellence for the Modern Collector.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 8, lineHeight: 2, fontSize: '1.1rem' }}>
              Shopwave was born from a vision of the "Atelier" – a workshop where digital commerce meets artisanal design. We curate pieces that are not just products, but reflections of a sophisticated digital lifestyle.
            </Typography>

            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack spacing={2}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                    <GISIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>GIS Precision</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Real-time logistics tracking integrated at our core.</Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack spacing={2}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                    <SmartIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>Smart Curation</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>A collection vetted for quality and relevance.</Typography>
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
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.2em' }}>TESTIMONIALS</Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mt: 2, letterSpacing: '-0.02em' }}>Vetted by Experts</Typography>
        </Box>
        <Grid container spacing={4}>
          {[1, 2, 3].map((i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Paper variant="outlined" sx={{ p: 6, borderRadius: '24px', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', borderColor: 'primary.main' } }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.primary', mb: 4, lineHeight: 1.8 }}>
                  "The attention to detail in the Atelier collection is unparalleled. The GIS tracking feature gives me complete peace of mind."
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={`https://i.pravatar.cc/150?u=${i}`} sx={{ width: 50, height: 50 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, fontSize: '1rem' }}>Sarah Ahmed</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>GIS ARCHITECT</Typography>
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
    <Box sx={{ py: 10, borderTop: '1px solid', borderColor: 'outlineVariant' }}>
      <Container maxWidth="xl">
        <Stack direction="row" spacing={8} justifyContent="center" alignItems="center" sx={{ opacity: 0.5 }}>
          {['TECH-NO', 'MODERN', 'ARCHIVE', 'ATELIER', 'DIGITAL'].map(brand => (
             <Typography key={brand} variant="h4" sx={{ fontWeight: 900, letterSpacing: '0.1em' }}>{brand}</Typography>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
