import { Container, Typography, Box, Stack, Avatar, Paper, Button, Divider, Stepper, Step, StepLabel, Chip } from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  PersonOutline as PersonIcon,
  ShoppingBagOutlined as OrdersIcon,
  MapOutlined as MapIcon,
  LogoutOutlined as LogoutIcon,
  Circle as CircleIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Profile() {
  const { user, logout } = useAuth()
  const toast = useToast()

  const route = [[30.0444, 31.2357], [31.2001, 29.9187]]
  const driverPos = [30.6, 30.5]

  const handleLogout = () => {
    logout()
    toast('SQUAD DISCONNECTED.', 'success')
  }

  return (
    <div className="bg-[#fcfcff] dark:bg-[#0a0a0f] py-16 transition-colors duration-500 min-h-screen">
      <Container maxWidth="xl">
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Paper variant="outlined" sx={{ p: 4, borderRadius: '32px', position: 'sticky', top: 120, border: '2px solid', borderColor: 'primary.main' }}>
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <Avatar sx={{ width: 120, height: 120, bgcolor: 'primary.main', fontSize: '3rem', fontWeight: 900 }}>{user?.name?.[0] ?? 'S'}</Avatar>
                  <div className="absolute bottom-1 right-1 bg-[#EDBB00] p-1 rounded-full border-4 border-white"><VerifiedIcon sx={{ fontSize: 20, color: 'white' }} /></div>
                </div>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>{user?.name}</Typography>
                <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 900, letterSpacing: '0.1em', mt: 1 }}>OFFICIAL CULER #0021</Typography>
                <Divider sx={{ width: '100%', my: 4 }} />
                <div className="w-full space-y-2">
                  <Button startIcon={<PersonIcon />} fullWidth sx={{ justifyContent: 'flex-start', fontWeight: 800, py: 2, borderRadius: '16px', bgcolor: 'surface.containerLow' }}>CLUB INFO</Button>
                  <Button startIcon={<OrdersIcon />} fullWidth sx={{ justifyContent: 'flex-start', fontWeight: 800, py: 2, borderRadius: '16px' }}>KIT ARCHIVE</Button>
                  <Button startIcon={<MapIcon />} fullWidth sx={{ justifyContent: 'flex-start', fontWeight: 800, py: 2, borderRadius: '16px' }}>GIS TRACKING</Button>
                  <Button onClick={handleLogout} startIcon={<LogoutIcon />} fullWidth sx={{ justifyContent: 'flex-start', fontWeight: 800, py: 2, borderRadius: '16px', color: 'secondary.main' }}>LEAVE CLUB</Button>
                </div>
              </div>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8, lg: 9 }}>
            <div className="space-y-12">
              <div className="border-l-8 border-[#004D98] pl-6">
                <Typography variant="h2" sx={{ fontWeight: 900, mb: 1 }}>LIVE KIT TRACKING</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600 }}>MONITOR YOUR BARÇA GEAR FROM CAMP NOU TO YOUR COLLECTION.</Typography>
              </div>

              <Paper variant="outlined" sx={{ p: { xs: 4, md: 8 }, borderRadius: '40px' }}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                  <div>
                    <Typography variant="overline" sx={{ fontWeight: 900, color: 'primary.main', letterSpacing: '0.2em' }}>KIT ORDER ID</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 900 }}>#FCB-KIT-9021</Typography>
                  </div>
                  <Chip label="IN TRANSIT TO SQUAD" color="primary" sx={{ fontWeight: 900, borderRadius: '12px', py: 3, px: 2 }} />
                </div>

                <Stepper activeStep={2} alternativeLabel sx={{ mb: 12 }}>
                  {['STITCHED', 'VETTED', 'IN TRANSIT', 'ARRIVED'].map((label) => (
                    <Step key={label}><StepLabel><Typography variant="overline" sx={{ fontWeight: 900 }}>{label}</Typography></StepLabel></Step>
                  ))}
                </Stepper>

                <div className="h-[500px] w-full rounded-[32px] overflow-hidden border-4 border-[#f4f6ff] relative shadow-inner">
                   <MapContainer center={[30.6, 30.5]} zoom={7} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Polyline positions={route} color="#004D98" weight={6} dashArray="10, 15" />
                    <Marker position={route[0]}><Popup>FCB LABS (CAIRO)</Popup></Marker>
                    <Marker position={route[1]}><Popup>CULER DESTINATION (ALEX)</Popup></Marker>
                    <Marker position={driverPos}><Popup>KIT CARRIER</Popup></Marker>
                  </MapContainer>
                </div>

                <div className="mt-10 p-6 bg-[#f4f6ff] rounded-3xl border-2 border-dashed border-[#004D98]">
                   <Typography variant="h6" sx={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: 2 }}>
                     <CircleIcon sx={{ fontSize: 14, color: 'primary.main' }} className="animate-pulse" /> CARRIER IS 45KM FROM ARRIVAL. PREPARE YOUR SQUAD.
                   </Typography>
                </div>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
