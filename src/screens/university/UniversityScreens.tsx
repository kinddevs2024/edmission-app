import { createResourceScreen } from '../createResource'
import { UniversityDashboardScreen } from './UniversityDashboardScreen'
import { universityService } from '../../services/university'

export { UniversityDashboardScreen }

export const UniversityPendingScreen = createResourceScreen({
  title: 'Pending Verification',
  description: 'University waits for admin verification with instructions and status.',
  load: () => universityService.getProfile(),
})
export const UniversityOnboardingScreen = createResourceScreen({
  title: 'University Onboarding',
  description: 'Complete profile fields, country, faculties and eligibility matrix.',
  load: () => universityService.getProfile(),
})
export const UniversityProfileScreen = createResourceScreen({
  title: 'University Profile',
  description: 'Edit full university profile and public representation.',
  load: () => universityService.getProfile(),
})
export const UniversityDiscoveryScreen = createResourceScreen({
  title: 'Discovery',
  description: 'Browse recommended students and filter by criteria.',
  load: () => universityService.getStudents(),
})
export const UniversityStudentProfileScreen = createResourceScreen({
  title: 'Student Profile View',
  description: 'View complete student profile, documents and communication shortcuts.',
  load: () => universityService.getStudents({ limit: 1 }),
})
export const UniversityPipelineScreen = createResourceScreen({
  title: 'Pipeline',
  description: 'Kanban-like interest/application pipeline with status transitions.',
  load: () => universityService.getPipeline(),
})
export const UniversityScholarshipsScreen = createResourceScreen({
  title: 'Scholarships',
  description: 'Create and manage scholarship programs and eligibility settings.',
  load: () => universityService.getScholarships(),
})
export const UniversityFacultiesScreen = createResourceScreen({
  title: 'Faculties',
  description: 'Manage faculties and programs for matching/search.',
  load: () => universityService.getFaculties(),
})
export const UniversityAnalyticsScreen = createResourceScreen({
  title: 'Analytics',
  description: 'Conversion funnel, offers performance and pipeline analytics.',
  load: () => universityService.getFunnelAnalytics(),
})
