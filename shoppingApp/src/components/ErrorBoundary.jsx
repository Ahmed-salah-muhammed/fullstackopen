import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import { WarningAmber as WarningIcon } from '@mui/icons-material'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
          <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
             <WarningIcon sx={{ fontSize: 80, color: 'error.main', mb: 4 }} />
             <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>Something went wrong</Typography>
             <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6 }}>
               An unexpected error occurred. Please try refreshing the page or contact support if the issue persists.
             </Typography>
             <Button
                variant="contained"
                size="large"
                onClick={() => window.location.reload()}
                sx={{ px: 8, py: 2, borderRadius: '100px', fontWeight: 900 }}
             >
               REFRESH PAGE
             </Button>
          </Container>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
