import { createTheme } from '@mui/material'

export const getAppTheme = (mode) => {
  const isDark = mode === 'dark'

  // Colors from "The Digital Atelier" Stitch design
  const colors = {
    primary: '#2a14b4',
    primaryContainer: '#4338ca',
    secondary: '#515f74',
    background: isDark ? '#131b2e' : '#faf8ff',
    surface: isDark ? '#1c253b' : '#faf8ff',
    onSurface: isDark ? '#ffffff' : '#131b2e',
    surfaceContainerLow: isDark ? '#131b2e' : '#f2f3ff',
    surfaceContainerHighest: isDark ? '#283044' : '#dae2fd',
    outlineVariant: '#c7c4d7',
  }

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
        light: colors.primaryContainer,
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
      },
      // Register custom tokens so they work with 'sx' prop
      surface: {
        main: colors.surface,
        containerLow: colors.surfaceContainerLow,
        containerHighest: colors.surfaceContainerHighest,
        outlineVariant: colors.outlineVariant,
      }
    },
    typography: {
      fontFamily: '"Inter", "Nunito Sans", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.02em' },
      h2: { fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.01em' },
      h3: { fontSize: '1.75rem', fontWeight: 700 },
      h4: { fontSize: '1.5rem', fontWeight: 700 },
      h5: { fontSize: '1.25rem', fontWeight: 600 },
      h6: { fontSize: '1rem', fontWeight: 600 },
      body1: { fontSize: '1rem', lineHeight: 1.6 },
      body2: { fontSize: '0.875rem', lineHeight: 1.6 },
      overline: { fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.05em' },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 24px',
            borderRadius: '8px',
            transition: 'all 0.2s ease-in-out',
          },
          containedPrimary: {
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
            boxShadow: 'none',
            '&:hover': {
              opacity: 0.9,
              boxShadow: '0 4px 12px rgba(42, 20, 180, 0.2)',
            },
          },
          outlined: {
            borderColor: colors.outlineVariant,
            '&:hover': {
              backgroundColor: colors.surfaceContainerLow,
              borderColor: colors.primary,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderRadius: '16px',
            backgroundColor: colors.surfaceContainerLow,
            border: 'none',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: colors.surfaceContainerHighest,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'filled',
        },
        styleOverrides: {
          root: {
            '& .MuiFilledInput-root': {
              backgroundColor: colors.surfaceContainerLow,
              borderRadius: '8px',
              border: 'none',
              '&:before, &:after': {
                display: 'none',
              },
              '&:hover': {
                backgroundColor: colors.surfaceContainerHighest,
              },
              '&.Mui-focused': {
                backgroundColor: colors.background,
                boxShadow: `0 0 0 2px ${colors.primary}40`,
              },
            },
          },
        },
      },
    },
  })
}
