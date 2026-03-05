import { create } from 'zustand'
import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import type { User } from '../types/user'

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isBootstrapped: boolean
  isAuthenticated: boolean
  setAuth: (user: User, accessToken: string, refreshToken?: string) => Promise<void>
  setAccessToken: (accessToken: string | null) => void
  setUser: (user: User | null) => void
  bootstrapFromStorage: () => Promise<void>
  logout: () => Promise<void>
}

const REFRESH_KEY = 'edmission-refresh-token'
const isWeb = Platform.OS === 'web'

async function getStoredRefreshToken(): Promise<string | null> {
  if (isWeb) {
    try {
      if (typeof localStorage !== 'undefined') return localStorage.getItem(REFRESH_KEY)
    } catch {}
    return null
  }
  try {
    return await SecureStore.getItemAsync(REFRESH_KEY)
  } catch {
    return null
  }
}

async function setStoredRefreshToken(value: string | null): Promise<void> {
  if (isWeb) {
    try {
      if (typeof localStorage !== 'undefined') {
        if (value) localStorage.setItem(REFRESH_KEY, value)
        else localStorage.removeItem(REFRESH_KEY)
      }
    } catch {}
    return
  }
  try {
    if (value) await SecureStore.setItemAsync(REFRESH_KEY, value)
    else await SecureStore.deleteItemAsync(REFRESH_KEY)
  } catch {}
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isBootstrapped: false,
  isAuthenticated: false,
  setAuth: async (user, accessToken, refreshToken) => {
    const nextRefresh = refreshToken ?? get().refreshToken
    if (nextRefresh) await setStoredRefreshToken(nextRefresh)
    set({
      user,
      accessToken,
      refreshToken: nextRefresh ?? null,
      isAuthenticated: true,
    })
  },
  setAccessToken: (accessToken) => set((s) => ({ accessToken, isAuthenticated: !!accessToken && !!s.user })),
  setUser: (user) => set((s) => ({ user, isAuthenticated: !!s.accessToken && !!user })),
  bootstrapFromStorage: async () => {
    try {
      const refreshToken = await getStoredRefreshToken()
      set({ refreshToken: refreshToken ?? null, isBootstrapped: true })
    } catch {
      set({ refreshToken: null, isBootstrapped: true })
    }
  },
  logout: async () => {
    await setStoredRefreshToken(null)
    set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false, isBootstrapped: true })
  },
}))
