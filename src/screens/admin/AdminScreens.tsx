import { createResourceScreen } from '../createResource'
import { AdminDashboardScreen } from './AdminDashboardScreen'
import { adminService } from '../../services/admin'

export { AdminDashboardScreen }

export const AdminUsersScreen = createResourceScreen({
  title: 'User Management',
  description: 'Manage users, role filters, suspension and university profile editing.',
  load: () => adminService.getUsers(),
})
export const AdminVerificationScreen = createResourceScreen({
  title: 'Verification',
  description: 'Review and approve/reject university verification queue.',
  load: () => adminService.getVerificationQueue(),
})
export const AdminDocumentsScreen = createResourceScreen({
  title: 'Documents',
  description: 'Moderate uploaded student/university documents.',
  load: () => adminService.getDocumentsPending(),
})
export const AdminOffersScreen = createResourceScreen({
  title: 'Offers',
  description: 'Inspect platform offer activity and enforce moderation policies.',
  load: () => adminService.getOffers(),
})
export const AdminInterestsScreen = createResourceScreen({
  title: 'Interests',
  description: 'Review student-university interest records and edge cases.',
  load: () => adminService.getInterests(),
})
export const AdminChatsScreen = createResourceScreen({
  title: 'Chats',
  description: 'Moderate conversations and detect abuse signals.',
  load: () => adminService.getChats(),
})
export const AdminScholarshipsScreen = createResourceScreen({
  title: 'Scholarships',
  description: 'Platform scholarship overview and moderation controls.',
  load: () => adminService.getScholarships(),
})
export const AdminSupportScreen = createResourceScreen({
  title: 'Support',
  description: 'Resolve support tickets and monitor SLA status.',
  load: () => adminService.getTickets(),
})
export const AdminLogsScreen = createResourceScreen({
  title: 'Logs',
  description: 'Audit logs and security events with filtering.',
  load: () => adminService.getLogs(),
})
export const AdminHealthScreen = createResourceScreen({
  title: 'Health',
  description: 'Backend health and key system metrics dashboard.',
  load: () => adminService.getHealth(),
})
