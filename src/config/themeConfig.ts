export interface ThemeTokens {
  canvas: string
  surface: string
  surfaceAlt: string
  textPrimary: string
  textSecondary: string
  accent: string
  accentForeground: string
  accentSupport: string
  accentSoft: string
  accentSoftForeground: string
  border: string
  shadowCard: string
}

export interface ThemeConfig {
  light: ThemeTokens
  dark: ThemeTokens
  fonts: { display: string; sans: string }
  radius: { card: string; pill: string }
}

export const themeConfig: ThemeConfig = {
  light: {
    canvas: '#f7f6f2',
    surface: '#ffffff',
    surfaceAlt: '#f1efe9',
    textPrimary: '#1c1e1b',
    textSecondary: '#5a6059',
    accent: '#c25a33',
    accentForeground: '#ffffff',
    accentSupport: '#2d4030',
    accentSoft: '#e2e8e0',
    accentSoftForeground: '#2d4030',
    border: '#e5e3dc',
    shadowCard: '0 2px 8px rgba(0, 0, 0, 0.04)',
  },
  dark: {
    canvas: '#141611',
    surface: '#1d201a',
    surfaceAlt: '#242821',
    textPrimary: '#f2f1ec',
    textSecondary: '#a7ada2',
    accent: '#d77247',
    accentForeground: '#ffffff',
    accentSupport: '#4c6b50',
    accentSoft: '#2a3328',
    accentSoftForeground: '#c7d6c4',
    border: '#2c2f27',
    shadowCard: '0 2px 10px rgba(0, 0, 0, 0.35)',
  },
  fonts: { display: 'Anton', sans: 'Inter' },
  radius: { card: '12px', pill: '9999px' },
}
