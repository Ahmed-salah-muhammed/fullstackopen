import { useState, useEffect } from 'react'
import { Fab, Zoom, useScrollTrigger } from '@mui/material'
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material'

const ScrollToTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
  })

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    )

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Zoom in={trigger}>
      <Fab
        onClick={handleClick}
        color="primary"
        size="small"
        aria-label="scroll back to top"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(42, 20, 180, 0.3)',
          '&:hover': {
            transform: 'scale(1.1)',
          }
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  )
}

export default ScrollToTop
