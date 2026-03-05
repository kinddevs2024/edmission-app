import { api } from './api'
import { useAuthStore } from '../store/authStore'
import type { LoginResponse, User } from '../types/user'

export async function login(payload: { email: string; password: string }) {
  const { data } = await api.post<LoginResponse>('/auth/login', payload)
  await useAuthStore.getState().setAuth(data.user, data.accessToken, data.refreshToken)
  return data
}

export async function register(payload: { email: string; password: string; name: string; role: 'student' | 'university' }) {
  const { data } = await api.post<LoginResponse>('/auth/register', payload)
  await useAuthStore.getState().setAuth(data.user, data.accessToken, data.refreshToken)
  return data
}

export async function logout() {
  const refreshToken = useAuthStore.getState().refreshToken
  try {
    await api.post('/auth/logout', { refreshToken })
  } finally {
    await useAuthStore.getState().logout()
  }
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/auth/me')
  useAuthStore.getState().setUser(data)
  return data
}

export async function forgotPassword(email: string) {
  await api.post('/auth/forgot-password', { email })
}

export async function resetPassword(token: string, newPassword: string) {
  await api.post('/auth/reset-password', { token, newPassword })
}

export async function verifyEmail(token: string) {
  await api.get('/auth/verify-email', { params: { token } })
}
