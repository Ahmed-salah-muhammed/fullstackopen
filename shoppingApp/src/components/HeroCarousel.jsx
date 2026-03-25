import { useState, useEffect } from 'react'
import { Box, Typography, Button, Container, Stack, IconButton, Fade } from '@mui/material'
import { Link } from 'react-router-dom'
import {
  ChevronLeft as PrevIcon,
  ChevronRight as NextIcon,
  FiberManualRecord as DotIcon,
  Bolt as ActionIcon
} from '@mui/icons-material'

const slides = [
  {
    title: "FCB ATELIER COLLECTION",
    subtitle: "STREETWEAR DROPPING FOR CULERS GLOBALLY",
    cta: "SHOP STREETWEAR",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop",
    color: "#004D98"
  },
  {
    title: "NIKE X SPOTIFY COLLAB",
    subtitle: "ENGINEERED FOR THE CAMP NOU. AVAILABLE NOW.",
    cta: "EXPLORE KITS",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    color: "#A50044"
  },
  {
    title: "THE CLUB ACCESSORIES",
    subtitle: "OFFICIAL BARÇA GEAR VETTED FOR PERFORMANCE.",
    cta: "GET EQUIPPED",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    color: "#EDBB00"
  }
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleNext = () => setCurrent((current + 1) % slides.length)
  const handlePrev = () => setCurrent((current - 1 + slides.length) % slides.length)

  return (
    <Box sx={{ position: 'relative', height: { xs: '70vh', md: '90vh' }, bgcolor: '#000', overflow: 'hidden' }}>
      {slides.map((slide, i) => (
        <Fade in={current === i} key={i} timeout={1200}>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: current === i ? 'block' : 'none',
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)'
              }
            }}
          >
            <Box component="img" src={slide.image} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <Container maxWidth="xl" sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
              <Stack spacing={4} sx={{ maxWidth: { xs: '100%', md: '70%' } }}>
                <Box>
                  <Typography variant="overline" sx={{ color: '#EDBB00', fontWeight: 900, letterSpacing: '0.4em' }}>
                    {slide.subtitle}
                  </Typography>
                  <Typography variant="h1" sx={{ color: 'white', mt: 2, fontSize: { xs: '3rem', md: '5.5rem' }, textShadow: '0 10px 40px rgba(0,0,0,0.4)' }}>
                    {slide.title}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={3}>
                  <Button variant="contained" size="large" component={Link} to="/shop" sx={{ bgcolor: slide.color, px: 6, py: 2.5 }}>{slide.cta}</Button>
                  <Button variant="outlined" size="large" sx={{ color: 'white', borderColor: 'white', px: 6, py: 2.5 }}>MÉS QUE UN CLUB</Button>
                </Stack>
              </Stack>
            </Container>
          </Box>
        </Fade>
      ))}
      <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 40, right: 40, zIndex: 10 }}>
        <IconButton onClick={handlePrev} sx={{ color: 'white', border: '2px solid rgba(255,255,255,0.2)' }}><PrevIcon /></IconButton>
        <IconButton onClick={handleNext} sx={{ color: 'white', border: '2px solid rgba(255,255,255,0.2)' }}><NextIcon /></IconButton>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        {slides.map((_, i) => (
          <DotIcon key={i} sx={{ color: current === i ? 'accent.main' : 'rgba(255,255,255,0.2)', fontSize: 12, cursor: 'pointer' }} onClick={() => setCurrent(i)} />
        ))}
      </Stack>
    </Box>
  )
}
