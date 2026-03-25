import { Box, Typography } from '@mui/material'

export default function Marquee() {
  const messages = [
    "BARÇA ATELIER: OFFICIAL 2026/27 STREETWEAR COLLECTION OUT NOW",
    "FREE GLOBAL SHIPPING ON ALL SQUAD FOOTWEAR ORDERS",
    "MÉS QUE UN CLUB | JOIN THE BARÇA ATELIER SQUAD",
    "NIKE X SPOTIFY COLLAB ACCESSORIES AVAILABLE NOW",
    "BARÇA MEMBERS GET 15% OFF ALL SQUAD GEAR"
  ]

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'accent.main',
        py: 1.5,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'relative',
        zIndex: 1200,
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          animation: 'marquee 40s linear infinite',
          '&:hover': { animationPlayState: 'paused' }
        }}
      >
        {[...messages, ...messages].map((msg, i) => (
          <Typography
            key={i}
            variant="overline"
            sx={{
              mx: 10,
              fontWeight: 900,
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {msg}
          </Typography>
        ))}
      </Box>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </Box>
  )
}
