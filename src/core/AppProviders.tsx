import { type ReactNode, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import i18n, { setupI18n } from '../i18n'
import { useUIStore } from '../store/uiStore'
import { useAuthStore } from '../store/authStore'
import { getMe } from '../services/auth'
import { connectSocket, disconnectSocket } from '../services/socket'

setupI18n()

function Bootstrap() {
  const language = useUIStore((s) => s.language)
  const bootstrapFromStorage = useAuthStore((s) => s.bootstrapFromStorage)
  const refreshToken = useAuthStore((s) => s.refreshToken)
  const setAccessToken = useAuthStore((s) => s.setAccessToken)
  const setUser = useAuthStore((s) => s.setUser)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  useEffect(() => {
    i18n.changeLanguage(language).catch(() => {})
  }, [language])

  useEffect(() => {
    bootstrapFromStorage().catch(() => {})
  }, [bootstrapFromStorage])

  useEffect(() => {
    if (!refreshToken) return
    // Trigger /auth/me via existing interceptor refresh flow.
    getMe()
      .then((u) => setUser(u))
      .catch(() => {
        setAccessToken(null)
        setUser(null)
      })
  }, [refreshToken, setAccessToken, setUser])

  useEffect(() => {
    if (isAuthenticated) {
      connectSocket()
      return
    }
    disconnectSocket()
  }, [isAuthenticated])

  return null
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18n}>
        <Bootstrap />
        {children}
      </I18nextProvider>
    </GestureHandlerRootView>
  )
}
