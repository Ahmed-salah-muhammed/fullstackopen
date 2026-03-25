import { Container, Typography, Box, Stack, Avatar, Paper, Button, Divider, Stepper, Step, StepLabel, Chip } from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  PersonOutline as PersonIcon,
  ShoppingBagOutlined as OrdersIcon,
  MapOutlined as MapIcon,
  LogoutOutlined as LogoutIcon,
  Circle as CircleIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Profile() {
  const { user, logout } = useAuth()
  const toast = useToast()

  // Cairo to Alexandria Mock Route
  const route = [[30.0444, 31.2357], [31.2001, 29.9187]]
  const driverPos = [30.6, 30.5] // Somewhere in between

  const handleLogout = () => {
    logout()
    toast('Signed out successfully', 'success')
  }

  return (
    <Box sx={{ bgcolor: 'background.default', py: 12 }}>
      <Container maxWidth="xl">
        <Grid container spacing={8}>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Paper variant="outlined" sx={{ p: 4, borderRadius: '24px', position: 'sticky', top: 120 }}>
              <Stack spacing={4} alignItems="center" textAlign="center">
                <Avatar
                  sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: '2.5rem', fontWeight: 900 }}
                >
                  {user?.name?.[0] ?? 'U'}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 900 }}>{user?.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>{user?.email}</Typography>
                </Box>
                <Divider sx={{ width: '100%' }} />
                <Stack spacing={1} sx={{ width: '100%' }}>
                  <Button startIcon={<PersonIcon />} fullWidth sx={{ justifyContent: 'flex-start', fontWeight: 800, py: 1.5, bgcolor: 'surface.containerLow' }}>ACCOUNT INFO</Button>
                  <Button startIcon={<OrdersIcon />} fullWidth sx={{ justifyContent: 'flex-start', fontWeight: 800, py: 1.5 }}>ORDER HISTORY</Button>
                  <Button startIcon={<MapIcon />} fullWidth sx={{ justifyContent: 'flex-start', fontWeight: 800, py: 1.5 }}>GIS TRACKING</Button>
                  <Button onClick={handleLogout} startIcon={<LogoutIcon />} fullWidth sx={{ justifyContent: 'flex-start', fontWeight: 800, py: 1.5, color: 'error.main' }}>LOGOUT</Button>
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8, lg: 9 }}>
            <Stack spacing={6}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.02em' }}>Live Tracking</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>Track your digital piece from our warehouse in Cairo to your doorstep in Alexandria.</Typography>
              </Box>

              {/* Order Progress */}
              <Paper variant="outlined" sx={{ p: 6, borderRadius: '24px' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>ORDER ID</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>#ATL-ARCH-9021</Typography>
                  </Box>
                  <Chip label="IN TRANSIT" color="primary" sx={{ fontWeight: 900, borderRadius: '4px' }} />
                </Stack>

                <Stepper activeStep={2} alternativeLabel sx={{ mb: 8 }}>
                  {['Archived', 'Processing', 'In Transit', 'Delivered'].map((label) => (
                    <Step key={label}>
                      <StepLabel><Typography variant="caption" sx={{ fontWeight: 800 }}>{label.toUpperCase()}</Typography></StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {/* GIS Map */}
                <Box sx={{ height: 400, width: '100%', borderRadius: '16px', overflow: 'hidden', position: 'relative', border: '1px solid', borderColor: 'outlineVariant' }}>
                   <MapContainer center={[30.6, 30.5]} zoom={7} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Polyline positions={route} color="#5e5ce6" dashArray="10, 10" />
                    <Marker position={route[0]}><Popup>Warehouse (Cairo)</Popup></Marker>
                    <Marker position={route[1]}><Popup>Delivery (Alexandria)</Popup></Marker>
                    <Marker position={driverPos}><Popup>Courier Tracking</Popup></Marker>
                  </MapContainer>
                </Box>

                <Box sx={{ mt: 4 }}>
                   <Typography variant="body2" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                     <CircleIcon sx={{ fontSize: 10, color: 'primary.main' }} /> Courier is currently 45km from Alexandria destination.
                   </Typography>
                </Box>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
