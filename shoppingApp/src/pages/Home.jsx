import { useEffect, useState } from 'react'
import { Box, Container, Typography, Button, Stack, Skeleton } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Link } from 'react-router-dom'
import { ArrowForward as ArrowIcon, Bolt as ActionIcon } from '@mui/icons-material'
import HeroCarousel from '../components/HeroCarousel'
import ProductCard from '../components/ProductCard'
import { BrandStory, Testimonials, PartnerBrands } from '../components/HomeSections'
import api from '../services/api'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getProducts(4)
      .then(res => setProducts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <HeroCarousel />
      <Container maxWidth="xl" sx={{ py: 15 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 8, borderLeft: '10px solid', borderColor: 'primary.main', pl: 4 }}>
          <Box>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.4em' }}>CURRENT DROP</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 1, letterSpacing: '-0.04em' }}>THE SEASON ARCHIVE</Typography>
          </Box>
          <Button component={Link} to="/shop" endIcon={<ArrowIcon />} sx={{ fontWeight: 900, display: { xs: 'none', md: 'flex' } }}>EXPLORE THE SQUAD</Button>
        </Stack>
        <Grid container spacing={4}>
          {loading ? (
            [...Array(4)].map((_, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Skeleton variant="rectangular" height={450} sx={{ borderRadius: '0px' }} />
                <Skeleton width="80%" height={40} sx={{ mt: 2 }} /><Skeleton width="40%" height={30} />
              </Grid>
            ))
          ) : (
            products.map(p => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={p.id}><ProductCard product={p} /></Grid>
            ))
          )}
        </Grid>
      </Container>
      <BrandStory />
      <Testimonials />
      <Box sx={{ bgcolor: 'primary.main', py: 20, color: '#ffffff', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.04em' }}>FUEL YOUR AMBITION. <br /> JOIN THE SQUAD.</Typography>
          <Typography variant="h6" sx={{ mb: 8, opacity: 0.9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>PREMIUM GEAR FOR THOSE WHO NEVER QUIT. GET EXCLUSIVE DROP ACCESS.</Typography>
          <Button variant="contained" size="large" component={Link} to="/shop" startIcon={<ActionIcon />} sx={{ bgcolor: '#ffffff', color: 'primary.main', px: 8, py: 2.5, fontWeight: 900, fontSize: '1.2rem', '&:hover': { bgcolor: '#f8f9fa' } }}>GEAR UP NOW</Button>
        </Container>
      </Box>
      <PartnerBrands />
    </Box>
  )
}
