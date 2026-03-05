import { api } from './api'

export const commonService = {
  getNotifications: () => api.get('/notifications').then((r) => r.data),
  markNotificationRead: (id: string) => api.patch(`/notifications/${id}/read`).then((r) => r.data),
  markAllRead: () => api.patch('/notifications/read-all').then((r) => r.data),
  getChats: () => api.get('/chat').then((r) => r.data),
  getChatMessages: (chatId: string) => api.get(`/chat/${chatId}/messages`).then((r) => r.data),
  sendMessage: (chatId: string, payload: unknown) => api.post(`/chat/${chatId}/messages`, payload).then((r) => r.data),
  getAIStatus: () => api.get('/ai/status').then((r) => r.data),
  askAI: (payload: unknown) => api.post('/ai/chat', payload).then((r) => r.data),
  uploadFile: (formData: FormData) =>
    api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data),
  createCheckoutSession: (payload: unknown) => api.post('/payment/create-checkout-session', payload).then((r) => r.data),
  createTicket: (payload: unknown) => api.post('/tickets', payload).then((r) => r.data),
  getTickets: () => api.get('/tickets').then((r) => r.data),
}
