import axios, { type AxiosError } from 'axios'
import { useAuthStore } from '../store/authStore'

const configuredBaseURL = process.env.EXPO_PUBLIC_API_URL
const baseURL = configuredBaseURL ?? 'http://localhost:4000/api'

if (!__DEV__) {
  if (!configuredBaseURL) {
    throw new Error('EXPO_PUBLIC_API_URL must be configured for production builds.')
  }
  if (!configuredBaseURL.startsWith('https://')) {
    throw new Error('EXPO_PUBLIC_API_URL must use HTTPS in production builds.')
  }
}

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

let isRefreshing = false
let waiting: Array<(token: string | null) => void> = []

function notifyWaiting(token: string | null) {
  waiting.forEach((cb) => cb(token))
  waiting = []
}

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as typeof error.config & { _retry?: boolean }
    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true
      const store = useAuthStore.getState()
      if (!store.refreshToken) {
        await store.logout()
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          waiting.push((token) => {
            if (!token || !original.headers) return reject(error)
            original.headers.Authorization = `Bearer ${token}`
            resolve(api(original))
          })
        })
      }

      isRefreshing = true
      try {
        const { data } = await axios.post<{ accessToken: string; user?: unknown }>(
          `${baseURL}/auth/refresh`,
          { refreshToken: store.refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        )
        store.setAccessToken(data.accessToken)
        if (data.user) store.setUser(data.user as never)
        notifyWaiting(data.accessToken)
        if (original.headers) original.headers.Authorization = `Bearer ${data.accessToken}`
        return api(original)
      } catch (refreshError) {
        notifyWaiting(null)
        await store.logout()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)

export function getApiError(error: unknown): string {
  if (axios.isAxiosError(error) && error.response?.data) {
    const data = error.response.data as { message?: string }
    return data.message ?? 'Request failed'
  }
  return error instanceof Error ? error.message : 'Unknown error'
}
