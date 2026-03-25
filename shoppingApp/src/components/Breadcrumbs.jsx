import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Breadcrumbs as MUIBreadcrumbs, Typography, Container, Box, Stack } from '@mui/material'
import { ChevronRight as ChevronIcon, FiberManualRecord as DotIcon } from '@mui/icons-material'

const Breadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  if (location.pathname === '/' || location.pathname.includes('/product/')) return null

  return (
    <Box sx={{ bgcolor: 'surface.containerLow', py: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <MUIBreadcrumbs
          separator={<ChevronIcon sx={{ fontSize: 16, color: 'text.disabled' }} />}
          aria-label="breadcrumb"
        >
          <Stack direction="row" spacing={1} alignItems="center" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'text.primary', '&:hover': { color: 'primary.main' } }}>
             <DotIcon sx={{ fontSize: 8, color: 'secondary.main' }} />
             <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>CLUB</Typography>
          </Stack>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1
            const to = `/${pathnames.slice(0, index + 1).join('/')}`

            return last ? (
              <Typography
                key={to}
                variant="caption"
                sx={{ color: 'primary.main', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                {value.replace(/-/g, ' ')}
              </Typography>
            ) : (
              <Typography
                key={to}
                component={RouterLink}
                to={to}
                variant="caption"
                sx={{
                  textDecoration: 'none',
                  color: 'text.secondary',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {value.replace(/-/g, ' ')}
              </Typography>
            )
          })}
        </MUIBreadcrumbs>
      </Container>
    </Box>
  )
}

export default Breadcrumbs
