import { Appearance, Platform } from 'react-native'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import * as SecureStore from 'expo-secure-store'
import type { ThemeMode } from '../constants/theme'

type ThemePreference = 'system' | ThemeMode

interface UIState {
  themePreference: ThemePreference
  language: 'en' | 'ru' | 'uz'
  hasCompletedOnboarding: boolean
  setThemePreference: (theme: ThemePreference) => void
  setLanguage: (language: 'en' | 'ru' | 'uz') => void
  setHasCompletedOnboarding: (value: boolean) => void
  effectiveTheme: () => ThemeMode
}

const isWeb = Platform.OS === 'web'

const secureStorage = isWeb
  ? {
      getItem: async (name: string) => {
        try {
          if (typeof localStorage !== 'undefined') return localStorage.getItem(name) ?? null
        } catch {}
        return null
      },
      setItem: async (name: string, value: string) => {
        try {
          if (typeof localStorage !== 'undefined') localStorage.setItem(name, value)
        } catch {}
      },
      removeItem: async (name: string) => {
        try {
          if (typeof localStorage !== 'undefined') localStorage.removeItem(name)
        } catch {}
      },
    }
  : {
      getItem: async (name: string) => (await SecureStore.getItemAsync(name)) ?? null,
      setItem: async (name: string, value: string) => {
        await SecureStore.setItemAsync(name, value)
      },
      removeItem: async (name: string) => {
        await SecureStore.deleteItemAsync(name)
      },
    }

function detectInitialLanguage(): 'en' | 'ru' | 'uz' {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase()
  if (locale.startsWith('ru')) return 'ru'
  if (locale.startsWith('uz')) return 'uz'
  return 'en'
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      themePreference: 'system',
      language: detectInitialLanguage(),
      hasCompletedOnboarding: false,
      setThemePreference: (themePreference) => set({ themePreference }),
      setLanguage: (language) => set({ language }),
      setHasCompletedOnboarding: (hasCompletedOnboarding) => set({ hasCompletedOnboarding }),
      effectiveTheme: () => {
        const pref = get().themePreference
        if (pref === 'system') {
          return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'
        }
        return pref
      },
    }),
    {
      name: 'edmission-ui-mobile',
      storage: createJSONStorage(() => secureStorage),
      partialize: (s) => ({
        themePreference: s.themePreference,
        language: s.language,
        hasCompletedOnboarding: s.hasCompletedOnboarding,
      }),
    }
  )
)
