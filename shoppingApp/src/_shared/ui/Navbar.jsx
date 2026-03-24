import { NavLink, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Container,
  useScrollTrigger,
  Tooltip,
  Divider,
  Button
} from '@mui/material'
import {
  Search as SearchIcon,
  FavoriteBorder as FavoriteIcon,
  ShoppingBagOutlined as CartIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  PersonOutline as UserIcon
} from '@mui/icons-material'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

function ElevationScroll({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        transition: 'all 0.3s ease-in-out',
        ...(trigger ? {
          boxShadow: '0 4px 20px rgba(19, 27, 46, 0.08)',
        } : {})
      }}
    >
      {children}
    </Box>
  )
}

export default function Navbar() {
  const { totalCount, totalPrice } = useCart()
  const { wishlist } = useWishlist()
  const { dark, toggle } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Wishlist', path: '/wishlist' },
  ]

  return (
    <>
      {/* Announcement Bar */}
      <Box
        sx={{
          bgcolor: 'text.primary',
          color: 'background.paper',
          py: 1,
          textAlign: 'center'
        }}
      >
        <Typography
          variant="overline"
          sx={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            display: 'block'
          }}
        >
          FREE SHIPPING ON ALL ORDERS OVER $99. THE DIGITAL ATELIER.
        </Typography>
      </Box>

      <ElevationScroll>
        <AppBar
          position="static"
          sx={{
            bgcolor: dark ? 'rgba(19, 27, 46, 0.8)' : 'rgba(250, 248, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            color: 'text.primary',
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: 'outlineVariant',
            transition: 'background-color 0.3s ease',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ height: 80, justifyContent: 'space-between' }}>

              {/* Logo */}
              <Typography
                variant="h6"
                noWrap
                component={NavLink}
                to="/"
                sx={{
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  color: 'inherit',
                  textDecoration: 'none',
                  fontSize: '1.5rem'
                }}
              >
                ATELIER
              </Typography>

              {/* Navigation Links */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      color: 'inherit',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      borderBottom: isActive ? '2px solid #2a14b4' : '2px solid transparent',
                      paddingBottom: '4px',
                      transition: 'all 0.2s ease'
                    })}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </Box>

              {/* Action Icons */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>

                <Tooltip title="Search">
                  <IconButton color="inherit" size="small">
                    <SearchIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Wishlist">
                  <IconButton color="inherit" size="small" component={NavLink} to="/wishlist">
                    <Badge badgeContent={wishlist.length} color="primary">
                      <FavoriteIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Cart">
                  <IconButton color="inherit" size="small" component={NavLink} to="/cart">
                    <Badge badgeContent={totalCount} color="primary">
                      <CartIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Box sx={{ display: { xs: 'none', lg: 'block' }, ml: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 900, fontSize: '0.7rem' }}>
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, alignSelf: 'center' }} />

                <Tooltip title="Toggle Theme">
                  <IconButton onClick={toggle} color="inherit" size="small">
                    {dark ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Tooltip>

                {user ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', display: { xs: 'none', sm: 'block' } }}>
                      {user.name}
                    </Typography>
                    <Button
                      onClick={() => { logout(); navigate('/') }}
                      sx={{ fontSize: '0.65rem', fontWeight: 800, color: 'primary.main', minWidth: 'auto' }}
                    >
                      LOGOUT
                    </Button>
                  </Box>
                ) : (
                  <IconButton component={NavLink} to="/login" color="inherit" size="small">
                    <UserIcon />
                  </IconButton>
                )}

              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
    </>
  )
}
