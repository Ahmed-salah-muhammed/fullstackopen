import { useState, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Container,
  Stack,
  Button,
  InputBase,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Fade,
  ClickAwayListener
} from '@mui/material'
import {
  ShoppingBagOutlined as CartIcon,
  FavoriteBorderOutlined as WishlistIcon,
  Search as SearchIcon,
  PersonOutline as ProfileIcon,
  DarkModeOutlined as DarkIcon,
  LightModeOutlined as LightIcon,
  Menu as MenuIcon
} from '@mui/icons-material'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

const Navbar = () => {
  const { totalItems } = useCart()
  const { wishlist } = useWishlist()
  const { dark, toggle } = useTheme()
  const { user } = useAuth()

  const [products, setProducts] = useState([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    api.getProducts().then(res => setProducts(res.data)).catch(() => {})
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = products
        .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 3)
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, products])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <AppBar
      position="sticky"
      className={isScrolled ? 'glass-header' : ''}
      sx={{
        bgcolor: isScrolled ? 'rgba(255,255,255,0.8)' : 'transparent',
        transition: 'all 0.4s ease',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: { xs: 70, md: 100 } }}>
          <Typography
            variant="h4"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: { xs: 1, md: 0 },
              fontWeight: 900,
              letterSpacing: '-0.04em',
              textDecoration: 'none',
              color: 'primary.main',
              mr: { md: 10 },
              '& span': { color: 'accent.main' }
            }}
          >
            BARÇA<span>ATELIER.</span>
          </Typography>

          <Stack direction="row" spacing={6} sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
            {['COLLECTION', 'ACCESSORIES', 'FOOTWEAR', 'PROFILE'].map((item) => (
              <Button
                key={item}
                component={RouterLink}
                to={item === 'COLLECTION' ? '/' : item === 'PROFILE' ? '/profile' : '/shop'}
                sx={{
                  color: 'text.primary',
                  fontWeight: 800,
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
                }}
              >
                {item}
              </Button>
            ))}
          </Stack>

          <Box sx={{ position: 'relative', mr: 2, display: { xs: 'none', lg: 'block' } }}>
            <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
              <Box>
                <form onSubmit={handleSearchSubmit}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: '6px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      width: searchOpen ? 320 : 240,
                      borderRadius: '100px',
                      bgcolor: 'surface.containerLow',
                      transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1, fontSize: '0.85rem', fontWeight: 600 }}
                      placeholder="Search archive..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchOpen(true)}
                    />
                    <IconButton type="submit" sx={{ p: '8px', color: 'primary.main' }}>
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  </Paper>
                </form>

                <Fade in={searchOpen && searchResults.length > 0}>
                  <Paper
                    elevation={0}
                    sx={{
                      position: 'absolute',
                      top: '120%',
                      right: 0,
                      width: 380,
                      borderRadius: '24px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(19, 27, 46, 0.08)',
                      bgcolor: 'background.paper',
                      zIndex: 2000
                    }}
                  >
                    <List sx={{ p: 2 }}>
                      {searchResults.map((p) => (
                        <ListItem key={p.id} button component={RouterLink} to={`/product/${p.id}`} onClick={() => setSearchOpen(false)} sx={{ borderRadius: '16px', mb: 1 }}>
                          <ListItemAvatar><Avatar variant="rounded" src={p.image} sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'divider' }} /></ListItemAvatar>
                          <ListItemText primary={p.title} secondary={`$${p.price.toFixed(2)}`} primaryTypographyProps={{ variant: 'body2', fontWeight: 800, noWrap: true }} secondaryTypographyProps={{ variant: 'caption', fontWeight: 800, color: 'primary.main' }} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Fade>
              </Box>
            </ClickAwayListener>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton onClick={toggle} sx={{ color: 'text.primary' }}>{dark ? <LightIcon /> : <DarkIcon />}</IconButton>
            <IconButton component={RouterLink} to="/wishlist" sx={{ color: 'text.primary' }}>
              <Badge badgeContent={wishlist.length} color="secondary"><WishlistIcon /></Badge>
            </IconButton>
            <IconButton component={RouterLink} to="/cart" sx={{ color: 'text.primary' }}>
              <Badge badgeContent={totalItems} color="primary"><CartIcon /></Badge>
            </IconButton>
            <IconButton component={RouterLink} to={user ? '/profile' : '/login'} sx={{ color: 'text.primary' }}><ProfileIcon /></IconButton>
            <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}><MenuIcon /></IconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
