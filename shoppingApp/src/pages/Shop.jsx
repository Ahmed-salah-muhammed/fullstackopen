import { useState, useEffect } from 'react'
import { Box, Container, Typography, Button, Stack, TextField, Slider, Checkbox, FormControlLabel, FormGroup, Skeleton, IconButton, Drawer, Chip } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { FilterAlt as FilterIcon, Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material'
import api from '../services/api'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'

export default function Shop() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedCats, setSelectedCats] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  useEffect(() => {
    Promise.all([api.getProducts(), api.getCategories()])
      .then(([pRes, cRes]) => {
        setProducts(pRes.data); setCategories(cRes.data); setFilteredProducts(pRes.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let result = products
    if (search) result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    if (selectedCats.length > 0) result = result.filter(p => selectedCats.includes(p.category))
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    setFilteredProducts(result)
  }, [search, selectedCats, priceRange, products])

  const FilterContent = () => (
    <div className="space-y-12">
      <div className="border-l-4 border-[#004D98] pl-4">
        <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary' }}>SEARCH KIT</Typography>
        <TextField fullWidth size="small" placeholder="SEARCH..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          InputProps={{ endAdornment: <SearchIcon sx={{ color: 'primary.main' }} /> }} />
      </div>
      <div className="border-l-4 border-[#A50044] pl-4">
        <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary' }}>CATEGORIES</Typography>
        <FormGroup sx={{ mt: 2 }}>
          {categories.map(cat => (
            <FormControlLabel key={cat} control={<Checkbox checked={selectedCats.includes(cat)} onChange={() => setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])} />}
              label={<Typography variant="body2" sx={{ fontWeight: 800 }}>{cat}</Typography>} />
          ))}
        </FormGroup>
      </div>
      <div className="border-l-4 border-[#EDBB00] pl-4">
        <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary' }}>PRICE RANGE</Typography>
        <Box sx={{ mt: 4, px: 2 }}><Slider value={priceRange} onChange={(e, v) => setPriceRange(v)} valueLabelDisplay="on" min={0} max={1000} /></Box>
      </div>
      <Button variant="contained" fullWidth onClick={() => { setSearch(''); setSelectedCats([]); setPriceRange([0, 1000]) }} sx={{ fontWeight: 900, py: 1.5, borderRadius: '12px' }}>RESET FILTERS</Button>
    </div>
  )

  return (
    <div className="bg-white dark:bg-[#0a0a0f] pb-24 transition-colors duration-500">
      <div className="bg-[#f4f6ff] dark:bg-[#16161f] py-16 border-b border-gray-100 dark:border-gray-800">
        <Container maxWidth="xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="border-l-8 border-[#004D98] pl-6">
              <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.2em' }}>THE BARÇA COLLECTION</Typography>
              <Typography variant="h2" sx={{ fontWeight: 900 }}>SHOP ALL KITS</Typography>
            </div>
            <Button variant="outlined" startIcon={<FilterIcon />} onClick={() => setMobileFilterOpen(true)} sx={{ display: { xs: 'flex', lg: 'none' }, borderRadius: '12px', fontWeight: 800 }}>FILTER GEAR</Button>
          </div>
        </Container>
      </div>

      <Container maxWidth="xl" className="mt-16">
        <Grid container spacing={8}>
          <Grid size={{ xs: 0, lg: 3 }} className="hidden lg:block"><div className="sticky top-32"><FilterContent /></div></Grid>
          <Grid size={{ xs: 12, lg: 9 }}>
            {loading ? (
              <Grid container spacing={4}>{[...Array(6)].map((_, i) => (<Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}><Skeleton variant="rectangular" height={480} sx={{ borderRadius: '24px' }} /></Grid>))}</Grid>
            ) : (
              <div className="space-y-10">
                <div className="flex justify-between items-center p-6 bg-[#f4f6ff] dark:bg-[#16161f] rounded-[24px]">
                  <Typography variant="body2" sx={{ fontWeight: 900 }}>{filteredProducts.length} KITS IN ARCHIVE</Typography>
                  <Chip label="SORT BY: LATEST" variant="outlined" sx={{ fontWeight: 800, borderRadius: '8px' }} />
                </div>
                <Grid container spacing={4}>{filteredProducts.map(p => (<Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}><ProductCard product={p} /></Grid>))}</Grid>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>

      <Drawer anchor="right" open={mobileFilterOpen} onClose={() => setMobileFilterOpen(false)} PaperProps={{ sx: { width: 320, p: 4, borderRadius: '32px 0 0 32px' } }}>
        <div className="flex justify-between items-center mb-10"><Typography variant="h5" sx={{ fontWeight: 900 }}>FILTER KITS</Typography><IconButton onClick={() => setMobileFilterOpen(false)}><CloseIcon /></IconButton></div>
        <FilterContent />
      </Drawer>
    </div>
  )
}
