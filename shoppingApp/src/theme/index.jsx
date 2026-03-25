import { createTheme, alpha } from '@mui/material'

export const getAppTheme = (mode) => {
  const isDark = mode === 'dark'

  // "The Digital Atelier" (Stitch) Core Palette
  const colors = {
    primary: '#2a14b4',
    primaryContainer: '#4338ca',
    secondary: '#515f74',
    accent: '#A50044', // Barça Garnet Accent
    background: isDark ? '#0a0a14' : '#faf8ff',
    surface: isDark ? '#13131f' : '#ffffff',
    onSurface: isDark ? '#e2e8f0' : '#131b2e',
    surfaceContainerLow: isDark ? '#1a1a24' : '#f2f3ff',
    surfaceContainerHighest: isDark ? '#2a2a38' : '#dae2fd',
    outlineVariant: isDark ? '#2d2d3d' : '#c7c4d7',
  }

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
        light: colors.primaryContainer,
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
        secondary: isDark ? '#94a3b8' : '#515f74',
      },
      divider: alpha(colors.outlineVariant, 0.15), // "Ghost Border" principle
      surface: {
        main: colors.surface,
        containerLow: colors.surfaceContainerLow,
        containerHighest: colors.surfaceContainerHighest,
        outlineVariant: colors.outlineVariant,
      }
    },
    typography: {
      fontFamily: '"Inter", "Outfit", sans-serif',
      fontSize: 15,
      h1: {
        fontSize: '4.5rem',
        fontWeight: 900,
        letterSpacing: '-0.03em',
        lineHeight: 1.1
      },
      h2: {
        fontSize: '3rem',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        lineHeight: 1.2
      },
      h3: { fontSize: '2.25rem', fontWeight: 700 },
      h4: { fontSize: '1.75rem', fontWeight: 700 },
      h5: { fontSize: '1.3rem', fontWeight: 600 },
      h6: { fontSize: '1.1rem', fontWeight: 600 },
      body1: { fontSize: '1.0625rem', lineHeight: 1.6 },
      body2: { fontSize: '0.95rem', lineHeight: 1.6 },
      overline: { fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' },
      button: { fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: colors.background,
            color: colors.onSurface,
            transition: 'background-color 0.4s ease, color 0.4s ease',
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '12px 28px',
            borderRadius: '12px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              transform: 'translateY(-2px)',
            },
          },
          containedPrimary: {
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${colors.primaryContainer} 0%, ${colors.primary} 100%)`,
              boxShadow: `0 12px 24px ${alpha(colors.primary, 0.2)}`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderRadius: '24px',
            backgroundColor: colors.surfaceContainerLow,
            border: 'none', // No-Line Rule
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: colors.surfaceContainerHighest,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          outlined: {
            borderRadius: '24px',
            borderColor: alpha(colors.outlineVariant, 0.15),
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: alpha(colors.surface, 0.8),
            backdropFilter: 'blur(20px)',
            backgroundImage: 'none',
            boxShadow: 'none',
            borderBottom: 'none',
          }
        }
      }
    },
  })
}
