import { createTheme } from '@mui/material'

export const getAppTheme = (mode) => {
  const isDark = mode === 'dark'

  // Refined "The Digital Atelier" / "ShopWave" Palette
  const colors = {
    primary: isDark ? '#6366f1' : '#2a14b4',
    primaryContainer: isDark ? '#818cf8' : '#4338ca',
    secondary: isDark ? '#94a3b8' : '#515f74',
    background: isDark ? '#0f172a' : '#faf8ff',
    surface: isDark ? '#1e293b' : '#ffffff',
    onSurface: isDark ? '#e2e8f0' : '#0f172a', // Mid-contrast for dark mode
    surfaceContainerLow: isDark ? '#141e33' : '#f2f3ff',
    surfaceContainerHighest: isDark ? '#334155' : '#dae2fd',
    outlineVariant: isDark ? '#334155' : '#e2e8f0',
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
        secondary: isDark ? '#94a3b8' : '#515f74',
      },
      divider: colors.outlineVariant,
      // Register custom tokens
      surface: {
        main: colors.surface,
        containerLow: colors.surfaceContainerLow,
        containerHighest: colors.surfaceContainerHighest,
        outlineVariant: colors.outlineVariant,
      }
    },
    typography: {
      fontFamily: '"Inter", "Nunito Sans", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 15, // Slightly increased from default 14
      h1: { fontSize: '3.75rem', fontWeight: 900, letterSpacing: '-0.02em' },
      h2: { fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.01em' },
      h3: { fontSize: '2rem', fontWeight: 700 },
      h4: { fontSize: '1.625rem', fontWeight: 700 },
      h5: { fontSize: '1.375rem', fontWeight: 600 },
      h6: { fontSize: '1.125rem', fontWeight: 600 },
      body1: { fontSize: '1.0625rem', lineHeight: 1.6 },
      body2: { fontSize: '0.9375rem', lineHeight: 1.6 },
      overline: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em' },
      button: { fontWeight: 700, letterSpacing: '0.02em' },
    },
    shape: {
      borderRadius: 12, // Increased for a more modern feel
    },
    components: {
      MuiIcon: {
        styleOverrides: {
          root: {
            fontSize: '1.25rem', // Scale up icons
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: '1.35rem', // Scale up MUI icons
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            padding: '12px 28px',
            borderRadius: '10px',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          containedPrimary: {
            background: isDark
              ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`
              : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
            boxShadow: 'none',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: isDark
                ? '0 10px 20px rgba(99, 102, 241, 0.25)'
                : '0 10px 20px rgba(42, 20, 180, 0.2)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderRadius: '20px',
            backgroundColor: colors.surfaceContainerLow,
            border: `1px solid ${colors.outlineVariant}`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              borderColor: colors.primary,
              backgroundColor: isDark ? colors.surface : '#ffffff',
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            },
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            '& .MuiAlert-root': {
              borderRadius: '14px',
              padding: '12px 24px',
              fontWeight: 700,
              boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
            }
          }
        }
      }
    },
  })
}
