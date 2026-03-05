import { api } from './api'

export const universityService = {
  getProfile: () => api.get('/university/profile').then((r) => r.data),
  updateProfile: (payload: unknown) => api.put('/university/profile', payload).then((r) => r.data),
  getDashboard: () => api.get('/university/dashboard').then((r) => r.data),
  getStudents: (params?: Record<string, unknown>) => api.get('/university/students', { params }).then((r) => r.data),
  getStudentProfile: (studentId: string) => api.get(`/university/students/${studentId}/profile`).then((r) => r.data),
  getPipeline: () => api.get('/university/pipeline').then((r) => r.data),
  updateInterest: (id: string, payload: unknown) => api.patch(`/university/interests/${id}`, payload).then((r) => r.data),
  getScholarships: (params?: Record<string, unknown>) => api.get('/university/scholarships', { params }).then((r) => r.data),
  createScholarship: (payload: unknown) => api.post('/university/scholarships', payload).then((r) => r.data),
  updateScholarship: (id: string, payload: unknown) => api.patch(`/university/scholarships/${id}`, payload).then((r) => r.data),
  deleteScholarship: (id: string) => api.delete(`/university/scholarships/${id}`).then((r) => r.data),
  createOffer: (payload: unknown) => api.post('/university/offers', payload).then((r) => r.data),
  getRecommendations: (params?: Record<string, unknown>) => api.get('/university/recommendations', { params }).then((r) => r.data),
  getFaculties: () => api.get('/university/faculties').then((r) => r.data),
  createFaculty: (payload: unknown) => api.post('/university/faculties', payload).then((r) => r.data),
  updateFaculty: (id: string, payload: unknown) => api.patch(`/university/faculties/${id}`, payload).then((r) => r.data),
  deleteFaculty: (id: string) => api.delete(`/university/faculties/${id}`).then((r) => r.data),
  getFunnelAnalytics: () => api.get('/university/analytics/funnel').then((r) => r.data),
}
