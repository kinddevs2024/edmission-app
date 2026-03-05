import { useMemo } from 'react'
import { useUIStore } from '../store/uiStore'
import { colors } from '../constants/theme'

export function useAppTheme() {
  const theme = useUIStore((s) => s.effectiveTheme())
  return useMemo(() => ({ theme, colors: colors[theme] }), [theme])
}
