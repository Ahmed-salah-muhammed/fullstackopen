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
      sx={{
        bgcolor: isScrolled ? 'background.paper' : 'transparent',
        boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.1)' : 'none',
        borderBottom: isScrolled ? '2px solid' : '1px solid transparent',
        borderColor: 'primary.main',
        transition: 'all 0.3s ease',
        top: 0,
        zIndex: 1100,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: { xs: 70, md: 80 } }}>
          <Typography
            variant="h4"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: { xs: 1, md: 0 },
              fontWeight: 900,
              letterSpacing: '-0.04em',
              textDecoration: 'none',
              color: 'text.primary',
              mr: { md: 8 },
              '& span': { color: 'primary.main' }
            }}
          >
            SHOPWAVE<span>.</span>
          </Typography>

          <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
            {['SQUAD', 'GEAR', 'WISHLIST', 'PROFILE'].map((item) => (
              <Button
                key={item}
                component={RouterLink}
                to={item === 'SQUAD' ? '/' : item === 'GEAR' ? '/shop' : `/${item.toLowerCase()}`}
                sx={{
                  color: 'text.primary',
                  fontWeight: 900,
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
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
                    variant="outlined"
                    sx={{
                      p: '4px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      width: searchOpen ? 300 : 200,
                      borderRadius: '0px',
                      borderColor: searchOpen ? 'primary.main' : 'divider',
                      transition: 'width 0.3s ease',
                      boxShadow: 'none'
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1, fontSize: '0.8rem', fontWeight: 900 }}
                      placeholder="SEARCH GEAR..."
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
                    sx={{
                      position: 'absolute',
                      top: '120%',
                      right: 0,
                      width: 350,
                      borderRadius: '0px',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      zIndex: 2000
                    }}
                  >
                    <List sx={{ p: 1 }}>
                      {searchResults.map((p) => (
                        <ListItem key={p.id} button component={RouterLink} to={`/product/${p.id}`} onClick={() => setSearchOpen(false)}>
                          <ListItemAvatar><Avatar variant="square" src={p.image} sx={{ bgcolor: 'white' }} /></ListItemAvatar>
                          <ListItemText primary={p.title} secondary={`$${p.price.toFixed(2)}`} primaryTypographyProps={{ variant: 'body2', fontWeight: 900, noWrap: true }} />
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
              <Badge badgeContent={wishlist.length} color="primary"><WishlistIcon /></Badge>
            </IconButton>
            <IconButton component={RouterLink} to="/cart" sx={{ color: 'text.primary' }}>
              <Badge badgeContent={totalItems} color="primary"><CartIcon /></Badge>
            </IconButton>
            <IconButton component={RouterLink} to={user ? '/profile' : '/login'} sx={{ color: 'text.primary' }}><ProfileIcon /></IconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
