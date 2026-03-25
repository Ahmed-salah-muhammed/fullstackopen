import { useEffect, useState } from 'react'
import { Box, Container, Typography, Button, Stack, Skeleton } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Link } from 'react-router-dom'
import { ShoppingBagOutlined as ShopIcon, ArrowForward as ArrowIcon } from '@mui/icons-material'
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
      .finally(() => setLoading(false))
  }, [])

  return (
    <Box sx={{ bgcolor: 'background.default' }}>

      <HeroCarousel />

      {/* Featured Section */}
      <Container maxWidth="xl" sx={{ py: 15 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 8 }}>
          <Box>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.2em' }}>
              CURATED COLLECTION
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 1, letterSpacing: '-0.02em' }}>
              The Season's Archive
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/shop"
            endIcon={<ArrowIcon />}
            sx={{ fontWeight: 800, display: { xs: 'none', md: 'flex' } }}
          >
            EXPLORE ALL PIECES
          </Button>
        </Stack>

        <Grid container spacing={4}>
          {loading ? (
            [...Array(4)].map((_, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Skeleton variant="rectangular" height={400} sx={{ borderRadius: '16px' }} />
                <Skeleton width="60%" sx={{ mt: 2 }} />
                <Skeleton width="40%" />
              </Grid>
            ))
          ) : (
            products.map(p => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={p.id}>
                <ProductCard product={p} />
              </Grid>
            ))
          )}
        </Grid>

        <Box sx={{ display: { xs: 'flex', md: 'none' }, mt: 6, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            component={Link}
            to="/shop"
            fullWidth
            sx={{ py: 2, fontWeight: 800 }}
          >
            EXPLORE ALL PIECES
          </Button>
        </Box>
      </Container>

      <BrandStory />

      <Testimonials />

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'primary.main', py: 15, color: 'white', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.03em' }}>
            Elevate Your Everyday <br /> Digital Experience.
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9, fontWeight: 500 }}>
            Join our community and gain access to exclusive drops and limited editions.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/shop"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              px: 6,
              py: 2,
              fontWeight: 900,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
            }}
          >
            GET STARTED
          </Button>
        </Container>
      </Box>

      <PartnerBrands />
    </Box>
  )
}
