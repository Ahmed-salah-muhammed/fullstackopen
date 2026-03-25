import { Box, Typography } from '@mui/material'

export default function Marquee() {
  const messages = [
    "SQUAD DROP: LIMITED PERFORMANCE GEAR AVAILABLE NOW",
    "FREE GLOBAL SHIPPING ON ORDERS OVER $100",
    "FUEL YOUR AMBITION | TRAIN HARDER | SHOPWAVE PERFORMANCE",
    "JOIN THE SQUAD: MEMBERS GET 15% OFF ALL COLLECTIONS",
    "UNSTOPPABLE TECH: EXPLORE OUR NEWEST PERFORMANCE LINE"
  ]

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: '#ffffff',
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
          animation: 'marquee 40s linear infinite',
          '&:hover': { animationPlayState: 'paused' }
        }}
      >
        {[...messages, ...messages].map((msg, i) => (
          <Typography
            key={i}
            variant="overline"
            sx={{
              mx: 6,
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
