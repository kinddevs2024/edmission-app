import { api } from './api'

export const studentService = {
  getDashboard: () => api.get('/student/dashboard').then((r) => r.data),
  getProfile: () => api.get('/student/profile').then((r) => r.data),
  updateProfile: (payload: unknown) => api.patch('/student/profile', payload).then((r) => r.data),
  getUniversities: (params?: Record<string, unknown>) => api.get('/student/universities', { params }).then((r) => r.data),
  getUniversityById: (id: string) => api.get(`/student/universities/${id}`).then((r) => r.data),
  showInterest: (id: string) => api.post(`/student/universities/${id}/interest`).then((r) => r.data),
  getApplications: (params?: Record<string, unknown>) => api.get('/student/applications', { params }).then((r) => r.data),
  getOffers: (params?: Record<string, unknown>) => api.get('/student/offers', { params }).then((r) => r.data),
  acceptOffer: (id: string) => api.post(`/student/offers/${id}/accept`).then((r) => r.data),
  declineOffer: (id: string) => api.post(`/student/offers/${id}/decline`).then((r) => r.data),
  getRecommendations: (params?: Record<string, unknown>) => api.get('/student/recommendations', { params }).then((r) => r.data),
  getCompare: (params?: Record<string, unknown>) => api.get('/student/compare', { params }).then((r) => r.data),
  getDocuments: () => api.get('/student/documents').then((r) => r.data),
  addDocument: (payload: unknown) => api.post('/student/documents', payload).then((r) => r.data),
}
