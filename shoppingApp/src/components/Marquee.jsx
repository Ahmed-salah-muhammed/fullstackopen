import { Box, Typography } from '@mui/material'

export default function Marquee() {
  const messages = [
    "BARÇA ATELIER: OFFICIAL 2026/27 STREETWEAR COLLECTION DROPPING SOON",
    "FREE GLOBAL SHIPPING FOR CULERS ON ORDERS OVER $150",
    "MÉS QUE UN CLUB | JOIN THE BARÇA ATELIER SQUAD",
    "OFFICIAL NIKE X SPOTIFY COLLAB GEAR AVAILABLE NOW",
    "BARÇA MEMBERS GET 15% OFF ALL ACCESSORIES & KITS"
  ]

  return (
    <Box
      sx={{
        bgcolor: '#004D98',
        color: '#EDBB00',
        py: 1.5,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'relative',
        zIndex: 1200,
        borderBottom: '1px solid',
        borderColor: 'rgba(255,255,255,0.1)'
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          animation: 'marquee 35s linear infinite',
          '&:hover': { animationPlayState: 'paused' }
        }}
      >
        {[...messages, ...messages].map((msg, i) => (
          <Typography
            key={i}
            variant="overline"
            sx={{
              mx: 8,
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

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </Box>
  )
}
