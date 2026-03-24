import { useNavigate, Link } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Skeleton,
  Divider
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  ArrowForward as ArrowIcon,
} from '@mui/icons-material'
import useFetchProducts from '../../hooks/useFetchProducts'
import ProductCard from '../Common/ProductCard'

export default function Home() {
  const { products, loading, error } = useFetchProducts()
  const navigate = useNavigate()

  const featured = products?.slice(0, 8) || []

  return (
    <Box sx={{ bgcolor: 'background.default' }}>

      {/* Hero Section - The Digital Atelier */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '70vh', md: '90vh' },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          bgcolor: 'surface.containerLow'
        }}
      >
        <Container maxWidth="xl" sx={{ zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.2em', mb: 2, display: 'block' }}>
                SPRING / SUMMER 2024
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  color: 'text.primary',
                  fontWeight: 900,
                  fontSize: { xs: '3rem', md: '5rem' },
                  lineHeight: 1.1
                }}
              >
                The Digital <br />
                <Box component="span" sx={{ color: 'primary.main' }}>Atelier</Box>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 5,
                  maxWidth: '500px',
                  color: 'text.secondary',
                  fontSize: '1.1rem'
                }}
              >
                Experience a curated collection of high-end essentials,
                where digital innovation meets timeless craftsmanship.
              </Typography>
              <Stack direction="row" spacing={3}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/shop')}
                  endIcon={<ArrowIcon />}
                  sx={{ px: 4, py: 2 }}
                >
                  SHOP COLLECTION
                </Button>
                <Button
                  variant="text"
                  size="large"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    color: 'text.primary',
                    '&:hover': { bgcolor: 'transparent', color: 'primary.main' }
                  }}
                >
                  VIEW LOOKBOOK
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>

        {/* Hero Image / Decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: { xs: '100%', md: '50%' },
            height: '100%',
            zIndex: 1,
            opacity: { xs: 0.3, md: 1 }
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to right, #faf8ff 0%, transparent 100%)'
            }}
          />
        </Box>
      </Box>

      {/* Featured Categories */}
      <Container maxWidth="xl" sx={{ py: 12 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: 'relative', height: '400px', borderRadius: '16px', overflow: 'hidden', mb: 4 }}>
              <Box component="img" src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(19, 27, 46, 0.2)', p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 900, mb: 1 }}>Couture</Typography>
                <Link to="/shop?category=women's clothing" style={{ color: 'white', fontWeight: 700, textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em' }}>DISCOVER</Link>
              </Box>
            </Box>
            <Box sx={{ bgcolor: 'surface.containerHighest', p: 4, borderRadius: '16px' }}>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>Accessories</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>The finishing touches for a modern wardrobe.</Typography>
              <Button size="small" variant="outlined" component={Link} to="/shop?category=jewelery">Shop Now</Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ position: 'relative', height: '100%', minHeight: '400px', borderRadius: '16px', overflow: 'hidden' }}>
              <Box component="img" src="https://images.unsplash.com/photo-1491336477066-31156b5e4f35?auto=format&fit=crop&q=80&w=2070" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(19, 27, 46, 0.1)', p: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="overline" sx={{ color: 'white', fontWeight: 800 }}>TAILORED PRECISION</Typography>
                <Typography variant="h2" sx={{ color: 'white', fontWeight: 900, mb: 4 }}>The Modern <br />Gentleman</Typography>
                <Button variant="contained" sx={{ width: 'fit-content' }} component={Link} to="/shop?category=men's clothing">EXPLORE ESSENTIALS</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Best Sellers Grid */}
      <Box sx={{ bgcolor: 'background.paper', py: 12 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.15em' }}>
              CURATED SELECTION
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mt: 1, letterSpacing: '-0.02em' }}>
              The Best Sellers
            </Typography>
          </Box>

          {loading ? (
            <Grid container spacing={4}>
              {[...Array(8)].map((_, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
                  <Skeleton variant="rectangular" height={300} sx={{ borderRadius: '16px' }} />
                  <Skeleton sx={{ mt: 2 }} />
                  <Skeleton width="60%" />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={4}>
              {featured.map((p) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={p.id}>
                  <ProductCard product={p} />
                </Grid>
              ))}
            </Grid>
          )}

          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/shop')}
              sx={{ px: 6 }}
            >
              LOAD MORE PIECES
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'surface.containerLow', py: 10, mt: 8 }}>
        <Container maxWidth="xl">
          <Grid container spacing={8}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>ATELIER</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 2, mb: 4 }}>
                The Digital Atelier is more than a shop. It's a destination for those who value
                craftsmanship, minimalism, and the art of the modern wardrobe.
              </Typography>
              <Stack direction="row" spacing={2}>
                {['Instagram', 'Pinterest', 'Twitter'].map(s => (
                  <Link key={s} to="#" style={{ color: '#2a14b4', fontWeight: 800, fontSize: '0.7rem', textDecoration: 'none' }}>{s.toUpperCase()}</Link>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={4}>
                {['SHOP', 'COMPANY', 'SUPPORT'].map(cat => (
                  <Grid size={{ xs: 6, sm: 4 }} key={cat}>
                    <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.primary', mb: 2, display: 'block' }}>{cat}</Typography>
                    <Stack spacing={1}>
                      {[1, 2, 3, 4].map(i => (
                        <Link key={i} to="#" style={{ color: '#515f74', textDecoration: 'none', fontSize: '0.85rem' }}>Link Item {i}</Link>
                      ))}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 8 }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', textAlign: 'center' }}>
            © 2024 ATELIER DIGITAL BOUTIQUE. ALL RIGHTS RESERVED.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
