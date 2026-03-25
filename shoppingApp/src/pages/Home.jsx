import { useEffect, useState } from 'react'
import { Box, Container, Typography, Button, Stack, Skeleton } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Link } from 'react-router-dom'
import { ArrowForward as ArrowIcon } from '@mui/icons-material'
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
    <div className="bg-white dark:bg-[#0a0a0f] min-h-screen transition-colors duration-500">
      <HeroCarousel />

      <Container maxWidth="xl" sx={{ py: 15 }}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-l-8 border-[#004D98] pl-6">
          <div>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 900, letterSpacing: '0.4em' }}>THE 2026/27 DROP</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 1, letterSpacing: '-0.03em' }}>FCB ATELIER ARCHIVE</Typography>
          </div>
          <Button component={Link} to="/shop" endIcon={<ArrowIcon />} sx={{ fontWeight: 900, display: { xs: 'none', md: 'flex' } }}>EXPLORE ALL KITS</Button>
        </div>

        <Grid container spacing={4}>
          {loading ? (
            [...Array(4)].map((_, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Skeleton variant="rectangular" height={480} sx={{ borderRadius: '24px' }} />
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

      <div className="bg-[#004D98] py-24 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <Container maxWidth="md" className="relative z-10">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.04em' }}>MÉS QUE UN CLUB. <br /> JOIN THE ATELIER.</Typography>
          <Typography variant="h6" sx={{ mb: 8, opacity: 0.9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>OFFICIAL BARÇA STREETWEAR FOR THE MODERN CULER. JOIN THE SQUAD FOR EXCLUSIVES.</Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/shop"
            sx={{ bgcolor: '#EDBB00', color: '#000', px: 8, py: 2.5, fontWeight: 900, fontSize: '1.2rem', '&:hover': { bgcolor: '#fbc02d' } }}
          >
            JOIN THE CLUB
          </Button>
        </Container>
      </div>

      <PartnerBrands />
    </div>
  )
}
