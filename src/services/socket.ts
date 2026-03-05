import { io, type Socket } from 'socket.io-client'
import { useAuthStore } from '../store/authStore'

let socket: Socket | null = null

function resolveSocketBase() {
  const candidate =
    process.env.EXPO_PUBLIC_SOCKET_URL ??
    process.env.EXPO_PUBLIC_API_URL?.replace('/api', '') ??
    'http://localhost:4000'

  if (!__DEV__) {
    const isSecure = candidate.startsWith('https://') || candidate.startsWith('wss://')
    if (!isSecure) {
      throw new Error('Socket URL must be secure (HTTPS/WSS) in production builds.')
    }
  }
  return candidate
}

export function getSocket() {
  if (socket) return socket
  const base = resolveSocketBase()
  socket = io(base, {
    autoConnect: false,
    transports: ['websocket'],
    auth: () => ({ token: useAuthStore.getState().accessToken }),
  })
  return socket
}

export function connectSocket() {
  const s = getSocket()
  if (!s.connected) s.connect()
  return s
}

export function disconnectSocket() {
  if (socket?.connected) socket.disconnect()
}
