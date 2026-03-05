import { StatusBar } from 'expo-status-bar'
import { useAppTheme } from '../hooks/useAppTheme'

export function ThemedStatusBar() {
  const { theme } = useAppTheme()
  return <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
}
