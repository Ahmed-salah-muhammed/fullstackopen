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
  Tooltip,
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
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import useFetchProducts from '../hooks/useFetchProducts'

const Navbar = () => {
  const { totalItems } = useCart()
  const { wishlist } = useWishlist()
  const { mode, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { products } = useFetchProducts()

  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
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

  const isDark = mode === 'dark'

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: isScrolled ? 'background.paper' : 'transparent',
        backgroundImage: 'none',
        boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.05)' : 'none',
        borderBottom: isScrolled ? '1px solid' : '1px solid transparent',
        borderColor: 'divider',
        transition: 'all 0.3s ease-in-out',
        top: 0,
        zIndex: 1100,
      }}
      className={isScrolled ? 'glass-nav' : ''}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: { xs: 70, md: 90 } }}>

          {/* Logo */}
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
              mr: { md: 8 }
            }}
          >
            SHOPWAVE
          </Typography>

          {/* Desktop Nav */}
          <Stack
            direction="row"
            spacing={5}
            sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}
          >
            {['HOME', 'SHOP', 'WISHLIST', 'PROFILE'].map((item) => (
              <Button
                key={item}
                component={RouterLink}
                to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                sx={{
                  color: 'text.primary',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
                }}
              >
                {item}
              </Button>
            ))}
          </Stack>

          {/* Search Bar */}
          <Box sx={{ position: 'relative', mr: 2, display: { xs: 'none', lg: 'block' } }}>
            <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
              <Box>
                <form onSubmit={handleSearchSubmit}>
                  <Paper
                    sx={{
                      p: '4px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      width: searchOpen ? 300 : 200,
                      borderRadius: '100px',
                      bgcolor: 'surface.containerLow',
                      border: '1px solid',
                      borderColor: searchOpen ? 'primary.main' : 'divider',
                      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: 'none'
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1, fontSize: '0.875rem', fontWeight: 600 }}
                      placeholder="Search pieces..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchOpen(true)}
                    />
                    <IconButton type="submit" sx={{ p: '8px' }}>
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
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      border: '1px solid',
                      borderColor: 'divider',
                      zIndex: 2000
                    }}
                  >
                    <List sx={{ p: 1 }}>
                      {searchResults.map((p) => (
                        <ListItem
                          key={p.id}
                          button
                          component={RouterLink}
                          to={`/product/${p.id}`}
                          onClick={() => setSearchOpen(false)}
                          sx={{ borderRadius: '12px', mb: 0.5 }}
                        >
                          <ListItemAvatar>
                            <Avatar variant="rounded" src={p.image} sx={{ bgcolor: 'white', '& img': { objectFit: 'contain', p: 0.5 } }} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={p.title}
                            secondary={`$${p.price.toFixed(2)}`}
                            primaryTypographyProps={{ variant: 'body2', fontWeight: 800, noWrap: true }}
                            secondaryTypographyProps={{ variant: 'caption', fontWeight: 700, color: 'primary.main' }}
                          />
                        </ListItem>
                      ))}
                      <Divider sx={{ my: 1 }} />
                      <Button
                        fullWidth
                        onClick={handleSearchSubmit}
                        sx={{ fontSize: '0.7rem', fontWeight: 900 }}
                      >
                        VIEW ALL RESULTS
                      </Button>
                    </List>
                  </Paper>
                </Fade>
              </Box>
            </ClickAwayListener>
          </Box>

          {/* Icons */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Toggle Theme">
              <IconButton onClick={toggleTheme} sx={{ color: 'text.primary' }}>
                {isDark ? <LightIcon /> : <DarkIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Wishlist">
              <IconButton component={RouterLink} to="/wishlist" sx={{ color: 'text.primary' }}>
                <Badge badgeContent={wishlist.length} color="primary">
                  <WishlistIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Cart">
              <IconButton component={RouterLink} to="/cart" sx={{ color: 'text.primary' }}>
                <Badge badgeContent={totalItems} color="primary">
                  <CartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title={user ? 'Profile' : 'Login'}>
              <IconButton component={RouterLink} to={user ? '/profile' : '/login'} sx={{ color: 'text.primary' }}>
                <ProfileIcon />
              </IconButton>
            </Tooltip>

            <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}>
              <MenuIcon />
            </IconButton>
          </Stack>

        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
