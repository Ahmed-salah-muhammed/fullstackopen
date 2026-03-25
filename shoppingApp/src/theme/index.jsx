import { createTheme, alpha } from '@mui/material'

export const getAppTheme = (mode) => {
  const isDark = mode === 'dark'

  // Performance-Focused Sports Shop Palette
  const colors = {
    primary: isDark ? '#ff5252' : '#d32f2f', // Performance Red
    secondary: isDark ? '#fbc02d' : '#f9a825', // High-Viz Gold
    background: isDark ? '#0a0a0a' : '#ffffff',
    surface: isDark ? '#141414' : '#f5f5f7',
    onSurface: isDark ? '#ffffff' : '#111111',
    surfaceContainerLow: isDark ? '#1a1a1a' : '#f0f2f5',
    surfaceContainerHighest: isDark ? '#2a2a2a' : '#e4e6e9',
    outlineVariant: isDark ? '#333333' : '#dcdfe3',
  }

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
        contrastText: '#ffffff',
      },
      secondary: {
        main: colors.secondary,
      },
      background: {
        default: colors.background,
        paper: colors.surface,
      },
      text: {
        primary: colors.onSurface,
        secondary: isDark ? '#a0a0a0' : '#606060',
      },
      divider: colors.outlineVariant,
      surface: {
        main: colors.surface,
        containerLow: colors.surfaceContainerLow,
        containerHighest: colors.surfaceContainerHighest,
        outlineVariant: colors.outlineVariant,
      }
    },
    typography: {
      fontFamily: '"Inter", "Impact", "Roboto Condensed", sans-serif',
      fontSize: 15,
      h1: { fontSize: '4rem', fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase' },
      h2: { fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' },
      h3: { fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase' },
      h4: { fontSize: '1.5rem', fontWeight: 800 },
      h5: { fontSize: '1.2rem', fontWeight: 700 },
      h6: { fontSize: '1.1rem', fontWeight: 700 },
      overline: { fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase' },
      button: { fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' },
    },
    shape: {
      borderRadius: 0, // Sharp sporty look
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '14px 32px',
            borderRadius: '2px',
            transition: 'all 0.2s ease',
          },
          containedPrimary: {
            backgroundColor: colors.primary,
            '&:hover': {
              backgroundColor: '#b71c1c',
              transform: 'skewX(-10deg)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '0px',
            border: `1px solid ${colors.outlineVariant}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: colors.primary,
            },
          },
        },
      },
    },
  })
}
