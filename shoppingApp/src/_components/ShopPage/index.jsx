import { useState, useMemo } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Skeleton,
  Button,
  InputAdornment,
  Divider,
  Fade
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  Search as SearchIcon,
  Close as CloseIcon,
  SentimentDissatisfied as EmptyIcon
} from '@mui/icons-material'
import useFetchProducts from '../../hooks/useFetchProducts'
import ProductCard from '../Common/ProductCard'

const SORT_OPTIONS = [
  { label: 'Default Sorting', value: 'default' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A-Z', value: 'name_asc' },
]

export default function Shop() {
  const { products, loading, error, refetch } = useFetchProducts()

  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [priceMax, setPriceMax] = useState(1000)
  const [sortBy, setSortBy] = useState('default')

  const allCategories = useMemo(() => {
    if (!products) return []
    return Array.from(new Set(products.map(p => p.category)))
  }, [products])

  const filtered = useMemo(() => {
    if (!products) return []

    let res = products.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
      const matchCategory = categories.length === 0 || categories.includes(p.category)
      const matchPrice = p.price <= priceMax
      return matchSearch && matchCategory && matchPrice
    })

    if (sortBy === 'price_asc') res.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price_desc') res.sort((a, b) => b.price - a.price)
    else if (sortBy === 'name_asc') res.sort((a, b) => a.title.localeCompare(b.title))

    return res
  }, [products, search, categories, priceMax, sortBy])

  const handleCategoryToggle = (cat) => {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  if (error) return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h5" color="error" fontWeight={900}>Something went wrong</Typography>
        <Typography variant="body2" color="text.secondary">{error}</Typography>
        <Button variant="contained" onClick={refetch}>Try Again</Button>
      </Stack>
    </Box>
  )

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="xl">
        <Grid container spacing={8}>

          {/* Sidebar Filters */}
          <Grid size={{ xs: 12, lg: 3 }}>
            <Stack spacing={6} sx={{ position: 'sticky', top: 120 }}>

              {/* Search */}
              <Box>
                <Typography variant="overline" sx={{ fontWeight: 800, mb: 2, display: 'block' }}>Search Pieces</Typography>
                <TextField
                  fullWidth
                  placeholder="The modern essential..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ bgcolor: 'surface.containerLow', borderRadius: '12px' }}
                />
              </Box>

              {/* Categories */}
              <Box>
                <Typography variant="overline" sx={{ fontWeight: 800, mb: 2, display: 'block' }}>Categories</Typography>
                <Stack spacing={1}>
                  {loading ? (
                    [...Array(4)].map((_, i) => <Skeleton key={i} height={24} width="80%" />)
                  ) : (
                    allCategories.map(cat => (
                      <FormControlLabel
                        key={cat}
                        control={
                          <Checkbox
                            size="small"
                            checked={categories.includes(cat)}
                            onChange={() => handleCategoryToggle(cat)}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{
                            textTransform: 'capitalize',
                            fontWeight: categories.includes(cat) ? 700 : 400,
                            color: categories.includes(cat) ? 'primary.main' : 'text.secondary'
                          }}>
                            {cat}
                          </Typography>
                        }
                      />
                    ))
                  )}
                </Stack>
                {categories.length > 0 && (
                  <Button
                    size="small"
                    startIcon={<CloseIcon />}
                    onClick={() => setCategories([])}
                    sx={{ mt: 2, fontSize: '0.65rem', fontWeight: 800 }}
                  >
                    Clear Filters
                  </Button>
                )}
              </Box>

              {/* Price Filter */}
              <Box>
                <Typography variant="overline" sx={{ fontWeight: 800, mb: 2, display: 'block' }}>Price Range</Typography>
                <Box sx={{ px: 1 }}>
                  <Slider
                    value={priceMax}
                    onChange={(e, val) => setPriceMax(val)}
                    min={0}
                    max={1000}
                    valueLabelDisplay="auto"
                    sx={{ color: 'primary.main' }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>$0</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>${priceMax >= 1000 ? '1000+' : priceMax}</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Promo Card */}
              <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 4, borderRadius: '16px' }}>
                <Typography variant="overline" sx={{ fontWeight: 900, mb: 1, display: 'block', opacity: 0.8 }}>EXCLUSIVE</Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>Unlock the <br />Archive</Typography>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>Join our circle for priority access and member shipping rates.</Typography>
                <Button variant="contained" sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}>JOIN NOW</Button>
              </Box>

            </Stack>
          </Grid>

          {/* Product Grid */}
          <Grid size={{ xs: 12, lg: 9 }}>

            {/* Grid Header */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 4, mb: 6 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-0.02em', mb: 1 }}>Collection</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Showing {filtered.length} curated pieces in the digital atelier.
                </Typography>
              </Box>

              <FormControl variant="standard" sx={{ minWidth: 200 }}>
                <InputLabel sx={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    '&:before, &:after': { display: 'none' },
                    bgcolor: 'surface.containerLow',
                    px: 2,
                    py: 1,
                    borderRadius: '8px'
                  }}
                >
                  {SORT_OPTIONS.map(opt => (
                    <MenuItem key={opt.value} value={opt.value} sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Divider sx={{ mb: 6 }} />

            {/* Grid Content */}
            {loading ? (
              <Grid container spacing={4}>
                {[...Array(9)].map((_, i) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                    <Skeleton variant="rectangular" height={350} sx={{ borderRadius: '16px' }} />
                    <Skeleton sx={{ mt: 2 }} />
                    <Skeleton width="60%" />
                  </Grid>
                ))}
              </Grid>
            ) : filtered.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 20 }}>
                <EmptyIcon sx={{ fontSize: 60, color: 'outlineVariant', mb: 3 }} />
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>The archive is empty</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>No pieces match your current criteria.</Typography>
                <Button variant="outlined" onClick={() => { setSearch(''); setCategories([]); setPriceMax(1000); }}>Reset Filters</Button>
              </Box>
            ) : (
              <Grid container spacing={4}>
                {filtered.map(p => (
                  <Fade in key={p.id}>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <ProductCard product={p} />
                    </Grid>
                  </Fade>
                ))}
              </Grid>
            )}

          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}
