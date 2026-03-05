import { createResourceScreen } from '../createResource'
import { StudentDashboardScreen } from './StudentDashboardScreen'
import { studentService } from '../../services/student'
import { StudentDocumentsScreen } from './StudentDocumentsScreen'

export { StudentDashboardScreen, StudentDocumentsScreen }

export const StudentProfileScreen = createResourceScreen({
  title: 'Student Profile',
  description: 'Edit personal, academic and portfolio data with completion progress.',
  load: () => studentService.getProfile(),
})
export const ExploreUniversitiesScreen = createResourceScreen({
  title: 'Explore Universities',
  description: 'Search, filter and compare universities with interactive cards and statuses.',
  load: () => studentService.getUniversities(),
})
export const UniversityDetailScreen = createResourceScreen({
  title: 'University Detail',
  description: 'Detailed faculty, scholarship, requirements and CTA actions.',
  load: () => studentService.getUniversities({ limit: 1 }),
})
export const StudentApplicationsScreen = createResourceScreen({
  title: 'Applications',
  description: 'Track applications by stage, status and required actions.',
  load: () => studentService.getApplications(),
})
export const StudentOffersScreen = createResourceScreen({
  title: 'Offers',
  description: 'Review and respond to university offers.',
  load: () => studentService.getOffers(),
})
export const StudentCompareScreen = createResourceScreen({
  title: 'Compare',
  description: 'Compare selected universities side-by-side.',
  load: () => studentService.getCompare(),
})
