import { useState, useMemo, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Skeleton,
  Button,
  InputAdornment,
  Divider,
  Fade,
  Drawer,
  IconButton,
  Badge,
  Rating
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  Search as SearchIcon,
  Close as CloseIcon,
  FilterList as FilterIcon,
  SentimentDissatisfied as EmptyIcon,
  RestartAlt as ResetIcon
} from '@mui/icons-material'
import useFetchProducts from '../hooks/useFetchProducts'
import ProductCard from '../components/ProductCard'
import { useLocation } from 'react-router-dom'

const SORT_OPTIONS = [
  { label: 'Featured', value: 'default' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating: High to Low', value: 'rating_desc' },
  { label: 'Name: A-Z', value: 'name_asc' },
]

export default function Shop() {
  const { products, loading, error, refetch } = useFetchProducts()
  const location = useLocation()

  // States
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('default')
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Sync URL search param
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get('search')
    if (q) setSearch(q)
  }, [location.search])

  const allCategories = useMemo(() => {
    if (!products) return []
    return Array.from(new Set(products.map(p => p.category)))
  }, [products])

  const filtered = useMemo(() => {
    if (!products) return []

    let res = products.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
      const matchCategory = categories.length === 0 || categories.includes(p.category)
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
      const matchRating = (p.rating?.rate || 0) >= minRating
      return matchSearch && matchCategory && matchPrice && matchRating
    })

    if (sortBy === 'price_asc') res.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price_desc') res.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating_desc') res.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    else if (sortBy === 'name_asc') res.sort((a, b) => a.title.localeCompare(b.title))

    return res
  }, [products, search, categories, priceRange, minRating, sortBy])

  const handleCategoryToggle = (cat) => {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const resetFilters = () => {
    setSearch('')
    setCategories([])
    setPriceRange([0, 1000])
    setMinRating(0)
    setSortBy('default')
  }

  const FilterContent = () => (
    <Stack spacing={6} sx={{ p: { xs: 4, lg: 0 } }}>
      {/* Search */}
      <Box>
        <Typography variant="overline" sx={{ fontWeight: 800, mb: 2, display: 'block' }}>Search Pieces</Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="What are you looking for?"
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
        <Stack spacing={0.5}>
          {loading ? (
            [...Array(4)].map((_, i) => <Skeleton key={i} height={32} width="80%" />)
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
      </Box>

      {/* Price Filter */}
      <Box>
        <Typography variant="overline" sx={{ fontWeight: 800, mb: 2, display: 'block' }}>Price Range</Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            value={priceRange}
            onChange={(e, val) => setPriceRange(val)}
            min={0}
            max={1000}
            valueLabelDisplay="auto"
            sx={{ color: 'primary.main' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>${priceRange[0]}</Typography>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>${priceRange[1]}+</Typography>
          </Box>
        </Box>
      </Box>

      {/* Rating Filter */}
      <Box>
        <Typography variant="overline" sx={{ fontWeight: 800, mb: 2, display: 'block' }}>Minimum Rating</Typography>
        <Stack spacing={1}>
          {[4, 3, 2, 1].map((r) => (
            <FormControlLabel
              key={r}
              control={
                <Checkbox
                  size="small"
                  checked={minRating === r}
                  onChange={() => setMinRating(prev => prev === r ? 0 : r)}
                />
              }
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Rating value={r} readOnly size="small" />
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>& Up</Typography>
                </Stack>
              }
            />
          ))}
        </Stack>
      </Box>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<ResetIcon />}
        onClick={resetFilters}
        sx={{ fontWeight: 800 }}
      >
        RESET FILTERS
      </Button>
    </Stack>
  )

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="xl">

        {/* Mobile Filter Toggle */}
        <Box sx={{ display: { xs: 'flex', lg: 'none' }, mb: 4, justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            startIcon={<FilterIcon />}
            variant="contained"
            onClick={() => setDrawerOpen(true)}
            sx={{ borderRadius: '100px' }}
          >
            Filters
          </Button>
          <Typography variant="caption" sx={{ fontWeight: 800 }}>{filtered.length} Results</Typography>
        </Box>

        <Grid container spacing={8}>

          {/* Sidebar - Desktop */}
          <Grid size={{ xs: 0, lg: 3 }} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <Box sx={{ position: 'sticky', top: 120 }}>
              <FilterContent />
            </Box>
          </Grid>

          {/* Product Grid */}
          <Grid size={{ xs: 12, lg: 9 }}>

            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-0.02em', mb: 1 }}>Collection</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Curated essentials for the modern atelier.
                </Typography>
              </Box>

              <FormControl variant="standard" sx={{ minWidth: 160 }}>
                <InputLabel sx={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  sx={{ fontWeight: 800, fontSize: '0.85rem' }}
                >
                  {SORT_OPTIONS.map(opt => (
                    <MenuItem key={opt.value} value={opt.value} sx={{ fontWeight: 700, fontSize: '0.85rem' }}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Divider sx={{ mb: 6 }} />

            {/* Content */}
            {loading ? (
              <Grid container spacing={4}>
                {[...Array(6)].map((_, i) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                    <Skeleton variant="rectangular" height={400} sx={{ borderRadius: '24px' }} />
                  </Grid>
                ))}
              </Grid>
            ) : filtered.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 20, bgcolor: 'surface.containerLow', borderRadius: '32px' }}>
                <EmptyIcon sx={{ fontSize: 80, color: 'outlineVariant', mb: 3 }} />
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>No matches found</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>Try adjusting your search or filters to find what you're looking for.</Typography>
                <Button variant="contained" onClick={resetFilters} sx={{ px: 6 }}>Reset all filters</Button>
              </Box>
            ) : (
              <Grid container spacing={4}>
                {filtered.map((p, i) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
                    <Fade in timeout={500 + i * 50}>
                      <Box>
                        <ProductCard product={p} />
                      </Box>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            )}

          </Grid>
        </Grid>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 320, borderRadius: '0 24px 24px 0' } }}
      >
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>Filters</Typography>
          <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 4, overflowY: 'auto' }}>
          <FilterContent />
        </Box>
      </Drawer>
    </Box>
  )
}
