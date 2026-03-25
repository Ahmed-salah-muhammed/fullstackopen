import { Breadcrumbs as MUIBreadcrumbs, Typography, Link, Container, Box } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material'

const Breadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  if (location.pathname === '/') return null

  return (
    <Box sx={{ bgcolor: 'surface.containerLow', py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <MUIBreadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ '& .MuiBreadcrumbs-li': { fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' } }}
        >
          <Link
            underline="hover"
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            HOME
          </Link>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1
            const to = `/${pathnames.slice(0, index + 1).join('/')}`

            return last ? (
              <Typography color="text.primary" key={to} sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                {value.replace(/-/g, ' ')}
              </Typography>
            ) : (
              <Link
                underline="hover"
                component={RouterLink}
                to={to}
                color="inherit"
                key={to}
              >
                {value.replace(/-/g, ' ')}
              </Link>
            )
          })}
        </MUIBreadcrumbs>
      </Container>
    </Box>
  )
}

export default Breadcrumbs
