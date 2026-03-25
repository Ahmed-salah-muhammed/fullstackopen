import { createTheme, alpha } from '@mui/material'

export const getAppTheme = (mode) => {
  const isDark = mode === 'dark'

  // FC Barcelona "Atelier" / "Stitch" Palette
  // Blaugrana (#004D98, #A50044) + Barça Gold (#EDBB00)
  const colors = {
    primary: '#004D98', // Barça Blue
    secondary: '#A50044', // Barça Garnet
    accent: '#EDBB00', // Barça Gold
    background: isDark ? '#0a0a0f' : '#fcfcff',
    surface: isDark ? '#16161f' : '#ffffff',
    onSurface: isDark ? '#e2e8f0' : '#0a0a14',
    surfaceContainerLow: isDark ? '#1a1a24' : '#f4f6ff',
    surfaceContainerHighest: isDark ? '#252533' : '#e8ebff',
    outlineVariant: isDark ? '#2d2d3d' : '#e0e4f5',
  }

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
        light: alpha(colors.primary, 0.8),
        dark: '#003366',
        contrastText: '#ffffff',
      },
      secondary: {
        main: colors.secondary,
        contrastText: '#ffffff',
      },
      accent: {
        main: colors.accent,
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
      // Design Tokens (Stitch Style)
      stitch: {
        blau: colors.primary,
        grana: colors.secondary,
        oro: colors.accent,
      },
      surface: {
        main: colors.surface,
        containerLow: colors.surfaceContainerLow,
        containerHighest: colors.surfaceContainerHighest,
        outlineVariant: colors.outlineVariant,
      }
    },
    typography: {
      fontFamily: '"Inter", "Outfit", "Roboto", sans-serif',
      fontSize: 15,
      h1: { fontSize: '4rem', fontWeight: 900, letterSpacing: '-0.03em' },
      h2: { fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.02em' },
      h3: { fontSize: '2rem', fontWeight: 700 },
      h4: { fontSize: '1.6rem', fontWeight: 700 },
      h5: { fontSize: '1.3rem', fontWeight: 600 },
      h6: { fontSize: '1.1rem', fontWeight: 600 },
      body1: { fontSize: '1.05rem', lineHeight: 1.6 },
      body2: { fontSize: '0.95rem', lineHeight: 1.6 },
      overline: { fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' },
      button: { fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' },
    },
    shape: {
      borderRadius: 16, // Return to premium Atelier softness
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
            background: `linear-gradient(135deg, ${colors.primary} 0%, #003366 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, #003366 0%, ${colors.primary} 100%)`,
              boxShadow: '0 8px 24px rgba(0, 77, 152, 0.2)',
            },
          },
          containedSecondary: {
             background: `linear-gradient(135deg, ${colors.secondary} 0%, #7a0032 100%)`,
             '&:hover': {
               boxShadow: '0 8px 24px rgba(165, 0, 68, 0.2)',
             }
          }
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '24px',
            backgroundColor: colors.surface,
            border: `1px solid ${colors.outlineVariant}`,
            transition: 'all 0.4s ease',
            '&:hover': {
              borderColor: colors.accent,
              transform: 'translateY(-8px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          outlined: {
            borderRadius: '24px',
            borderColor: colors.outlineVariant,
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surface,
            backgroundImage: 'none',
            borderBottom: `1px solid ${colors.outlineVariant}`,
          }
        }
      }
    },
  })
}
