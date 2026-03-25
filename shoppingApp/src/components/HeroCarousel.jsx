import { Box, Typography, Button, Container, Stack, IconButton } from '@mui/material'
import { useState, useEffect } from 'react'
import { ArrowBackIosNew as PrevIcon, ArrowForwardIos as NextIcon } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070',
    title: 'SUMMER ATELIER 2024',
    subtitle: 'Limited drop by Ahmed Salah',
    label: 'NEW COLLECTION'
  },
  {
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2070',
    title: 'MINIMALIST ESSENTIALS',
    subtitle: 'Crafted for timeless durability',
    label: 'QUALITY GUARANTEED'
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070',
    title: 'THE DIGITAL ARCHIVE',
    subtitle: 'Exclusive access to archival pieces',
    label: 'MEMBER EXCLUSIVE'
  },
  {
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2070',
    title: 'CONTEMPORARY TAILORING',
    subtitle: 'Precision meets digital design',
    label: 'LATEST ARRIVALS'
  }
]

const HeroCarousel = () => {
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 2000) // 2 second rotation
    return () => clearInterval(timer)
  }, [])

  const next = () => setIndex((prev) => (prev + 1) % slides.length)
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <Box sx={{ position: 'relative', height: '85vh', width: '100%', overflow: 'hidden', bgcolor: '#000' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${slides[index].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Container maxWidth="xl" sx={{ height: '100%', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 10 }}>
            <Stack spacing={4} sx={{ maxWidth: 800 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Typography variant="overline" sx={{ color: 'white', fontWeight: 900, bgcolor: 'primary.main', px: 2, py: 0.5, borderRadius: 1 }}>
                  {slides[index].label}
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Typography variant="h1" sx={{ color: 'white', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                  {slides[index].title}
                </Typography>
                <Typography variant="h4" sx={{ color: 'rgba(255,255,255,0.8)', mt: 2, fontWeight: 400 }}>
                  {slides[index].subtitle}
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/shop')}
                  sx={{
                    bgcolor: 'white',
                    color: 'black',
                    px: 6,
                    py: 2.5,
                    fontSize: '1rem',
                    '&:hover': { bgcolor: 'primary.main', color: 'white' }
                  }}
                >
                  SHOP THE DROP
                </Button>
              </motion.div>
            </Stack>
          </Container>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <IconButton
        onClick={prev}
        sx={{
          position: 'absolute', left: 40, top: '50%', transform: 'translateY(-50%)',
          color: 'white', border: '1px solid rgba(255,255,255,0.3)', p: 2,
          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
        }}
      >
        <PrevIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={next}
        sx={{
          position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)',
          color: 'white', border: '1px solid rgba(255,255,255,0.3)', p: 2,
          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
        }}
      >
        <NextIcon fontSize="small" />
      </IconButton>

      {/* Indicators */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }}
      >
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: i === index ? 40 : 12,
              height: 12,
              borderRadius: 6,
              bgcolor: i === index ? 'primary.main' : 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              transition: 'all 0.4s ease'
            }}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default HeroCarousel
