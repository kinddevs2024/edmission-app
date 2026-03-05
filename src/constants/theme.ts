export const colors = {
  light: {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    border: '#E5E7EB',
    text: '#0F172A',
    muted: '#475569',
    primary: '#84CC16',
    primaryDark: '#0F172A',
    danger: '#EF4444',
  },
  dark: {
    bg: '#0F172A',
    card: '#111827',
    border: '#1F2937',
    text: '#F9FAFB',
    muted: '#CBD5E1',
    primary: '#84CC16',
    primaryDark: '#0F172A',
    danger: '#F87171',
  },
} as const

export type ThemeMode = 'light' | 'dark'
