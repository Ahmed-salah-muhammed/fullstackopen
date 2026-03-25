import { Box, Container, Typography, Stack, Avatar, Paper } from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  SmartButton as SmartIcon,
  FitnessCenter as TrainingIcon
} from '@mui/icons-material'

export function BrandStory() {
  return (
    <Box sx={{ bgcolor: 'surface.containerLow', py: 20 }}>
      <Container maxWidth="xl">
        <Grid container spacing={12} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box component="img" src="https://images.unsplash.com/photo-1548690312-e3b507d17a47?q=80&w=2070&auto=format&fit=crop" sx={{ width: '100%', height: '700px', objectFit: 'cover', border: '1px solid', borderColor: 'primary.main', p: 4, bgcolor: 'background.paper' }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.4em' }}>THE PERFORMANCE ARCHIVE</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 2, mb: 4, letterSpacing: '-0.04em' }}>BUILT FOR THE SQUAD. ENGINEERED FOR YOU.</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 8, lineHeight: 2, fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase' }}>SHOPWAVE PERFORMANCE IS NOT JUST GEAR. IT IS AN ARCHIVE OF PERFORMANCE TECH VETTED BY THE BEST ATHLETES IN THE SQUAD. WE DON'T JUST SELL SQUAD EQUIPMENT; WE FUEL YOUR AMBITION.</Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack spacing={2}><Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, borderRadius: '2px' }}><TrainingIcon /></Avatar><Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>SQUAD PRECISION</Typography><Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700 }}>REAL-TIME TECH PERFORMANCE INTEGRATED AT OUR CORE.</Typography></Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack spacing={2}><Avatar sx={{ bgcolor: '#00e5ff', width: 48, height: 48, borderRadius: '2px' }}><SmartIcon /></Avatar><Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>SMART GEAR</Typography><Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700 }}>A COLLECTION VETTED FOR ELITE ATHLETIC PERFORMANCE.</Typography></Stack>
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
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.4em' }}>SQUAD FEEDBACK</Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mt: 2, letterSpacing: '-0.02em' }}>VETTED BY THE SQUAD</Typography>
        </Box>
        <Grid container spacing={4}>
          {[1, 2, 3].map((i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Paper variant="outlined" sx={{ p: 6, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-10px)', borderColor: 'primary.main' } }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.primary', mb: 4, lineHeight: 1.8, fontWeight: 800, textTransform: 'uppercase' }}>"SHOPWAVE PERFORMANCE IS THE ONLY ARCHIVE THAT PROVIDES GEAR THAT ACTUALLY FUELS MY AMBITION. THE SMART TECH IS UNREAL."</Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={`https://i.pravatar.cc/150?u=${i}`} sx={{ width: 60, height: 60, borderRadius: '2px' }} />
                  <Box><Typography variant="h6" sx={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase' }}>SARAH AHMED</Typography><Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.1em' }}>SQUAD ATHLETE</Typography></Box>
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
        <Stack direction="row" spacing={8} justifyContent="center" alignItems="center" sx={{ opacity: 0.8 }}>
          {['TECH-PERF', 'SPEED', 'GEAR-X', 'SQUAD-O', 'FUEL'].map(brand => (<Typography key={brand} variant="h3" sx={{ fontWeight: 900, letterSpacing: '0.1em', color: 'text.disabled' }}>{brand}</Typography>))}
        </Stack>
      </Container>
    </Box>
  )
}
