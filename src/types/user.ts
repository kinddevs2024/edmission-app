export type Role = 'student' | 'university' | 'admin'

export interface User {
  id: string
  email: string
  name?: string
  role: Role
  universityProfile?: { id: string; verified: boolean; universityName?: string }
}

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken?: string
}
