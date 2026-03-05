import { useAuthStore } from '../store/authStore'

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const accessToken = useAuthStore((s) => s.accessToken)
  const isBootstrapped = useAuthStore((s) => s.isBootstrapped)
  return {
    user,
    role: user?.role ?? null,
    isAuthenticated,
    accessToken,
    isBootstrapped,
  }
}
