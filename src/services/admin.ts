import { api } from './api'

export const adminService = {
  getDashboard: () => api.get('/admin/dashboard').then((r) => r.data),
  getUsers: (params?: Record<string, unknown>) => api.get('/admin/users', { params }).then((r) => r.data),
  createUser: (payload: unknown) => api.post('/admin/users', payload).then((r) => r.data),
  updateUser: (id: string, payload: unknown) => api.patch(`/admin/users/${id}`, payload).then((r) => r.data),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`).then((r) => r.data),
  suspendUser: (id: string, suspend: boolean) => api.patch(`/admin/users/${id}/suspend`, { suspend }).then((r) => r.data),
  getVerificationQueue: () => api.get('/admin/universities/verification').then((r) => r.data),
  verifyUniversity: (id: string, approve: boolean) => api.post(`/admin/universities/${id}/verify`, { approve }).then((r) => r.data),
  getDocumentsPending: () => api.get('/admin/documents/pending').then((r) => r.data),
  reviewDocument: (id: string, decision: 'approved' | 'rejected', rejectionReason?: string) =>
    api.patch(`/admin/documents/${id}/review`, { decision, rejectionReason }).then((r) => r.data),
  getOffers: (params?: Record<string, unknown>) => api.get('/admin/offers', { params }).then((r) => r.data),
  getInterests: (params?: Record<string, unknown>) => api.get('/admin/interests', { params }).then((r) => r.data),
  getChats: (params?: Record<string, unknown>) => api.get('/admin/chats', { params }).then((r) => r.data),
  getLogs: (params?: Record<string, unknown>) => api.get('/admin/logs', { params }).then((r) => r.data),
  getHealth: () => api.get('/admin/health').then((r) => r.data),
  getScholarships: () => api.get('/admin/scholarships').then((r) => r.data),
  getTickets: (params?: Record<string, unknown>) => api.get('/admin/tickets', { params }).then((r) => r.data),
}
