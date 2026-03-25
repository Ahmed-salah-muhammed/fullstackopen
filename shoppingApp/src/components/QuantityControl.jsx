import { Box, IconButton, InputBase } from '@mui/material'
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'

export default function QuantityControl({ value, onChange, min = 1 }) {
  const handleInput = (e) => {
    const parsed = parseInt(e.target.value, 10)
    if (!isNaN(parsed)) onChange(Math.max(min, parsed))
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        bgcolor: 'surface.containerLow',
        borderRadius: '100px', // Pill style for interactive control
        px: 1,
        py: 0.5,
        transition: 'all 0.3s ease',
        '&:hover': { bgcolor: 'surface.containerHighest' }
      }}
    >
      <IconButton
        onClick={() => onChange(Math.max(min, value - 1))}
        size="small"
        sx={{ color: 'text.primary', '&:hover': { color: 'primary.main' } }}
      >
        <RemoveIcon sx={{ fontSize: 16 }} />
      </IconButton>

      <InputBase
        value={value}
        onChange={handleInput}
        inputProps={{
          style: {
            textAlign: 'center',
            fontWeight: 900,
            fontSize: '0.9rem',
            width: 35,
            padding: 0
          }
        }}
      />

      <IconButton
        onClick={() => onChange(value + 1)}
        size="small"
        sx={{ color: 'text.primary', '&:hover': { color: 'primary.main' } }}
      >
        <AddIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  )
}
