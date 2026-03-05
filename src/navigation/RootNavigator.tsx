import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useAuth } from '../hooks/useAuth'
import { useAppTheme } from '../hooks/useAppTheme'
import { useUIStore } from '../store/uiStore'
import { Screen } from '../components/ui/Screen'
import { Text } from 'react-native'
import { LandingScreen } from '../screens/public/LandingScreen'
import { OnboardingScreen } from '../screens/public/OnboardingScreen'
import { LoginScreen } from '../screens/auth/LoginScreen'
import { RegisterScreen } from '../screens/auth/RegisterScreen'
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen'
import { ResetPasswordScreen } from '../screens/auth/ResetPasswordScreen'
import { VerifyEmailScreen } from '../screens/auth/VerifyEmailScreen'
import {
  AIChatScreen,
  ChatScreen,
  NotificationsScreen,
  PaymentScreen,
  ProfileScreen,
  SettingsScreen,
  SupportScreen,
} from '../screens/common/CommonScreens'
import {
  ExploreUniversitiesScreen,
  StudentApplicationsScreen,
  StudentCompareScreen,
  StudentDashboardScreen,
  StudentDocumentsScreen,
  StudentOffersScreen,
  StudentProfileScreen,
  UniversityDetailScreen,
} from '../screens/student/StudentScreens'
import {
  UniversityAnalyticsScreen,
  UniversityDashboardScreen,
  UniversityDiscoveryScreen,
  UniversityFacultiesScreen,
  UniversityOnboardingScreen,
  UniversityPendingScreen,
  UniversityPipelineScreen,
  UniversityProfileScreen,
  UniversityScholarshipsScreen,
  UniversityStudentProfileScreen,
} from '../screens/university/UniversityScreens'
import {
  AdminChatsScreen,
  AdminDashboardScreen,
  AdminDocumentsScreen,
  AdminHealthScreen,
  AdminInterestsScreen,
  AdminLogsScreen,
  AdminOffersScreen,
  AdminScholarshipsScreen,
  AdminSupportScreen,
  AdminUsersScreen,
  AdminVerificationScreen,
} from '../screens/admin/AdminScreens'

const RootStack = createNativeStackNavigator()
const StudentTabs = createBottomTabNavigator()
const UniversityTabs = createBottomTabNavigator()
const AdminTabs = createBottomTabNavigator()

function StudentNavigator() {
  return (
    <StudentTabs.Navigator screenOptions={{ headerShown: true }}>
      <StudentTabs.Screen name="Dashboard" component={StudentDashboardScreen} />
      <StudentTabs.Screen name="Explore" component={ExploreUniversitiesScreen} />
      <StudentTabs.Screen name="Applications" component={StudentApplicationsScreen} />
      <StudentTabs.Screen name="Offers" component={StudentOffersScreen} />
      <StudentTabs.Screen name="Profile" component={StudentProfileScreen} />
      <StudentTabs.Screen name="Documents" component={StudentDocumentsScreen} />
      <StudentTabs.Screen name="Compare" component={StudentCompareScreen} />
      <StudentTabs.Screen name="UniversityDetail" component={UniversityDetailScreen} />
      <StudentTabs.Screen name="Chat" component={ChatScreen} />
      <StudentTabs.Screen name="AI" component={AIChatScreen} />
      <StudentTabs.Screen name="Notifications" component={NotificationsScreen} />
      <StudentTabs.Screen name="Payment" component={PaymentScreen} />
      <StudentTabs.Screen name="Support" component={SupportScreen} />
      <StudentTabs.Screen name="Settings" component={SettingsScreen} />
    </StudentTabs.Navigator>
  )
}

function UniversityNavigator() {
  return (
    <UniversityTabs.Navigator screenOptions={{ headerShown: true }}>
      <UniversityTabs.Screen name="Dashboard" component={UniversityDashboardScreen} />
      <UniversityTabs.Screen name="Pending" component={UniversityPendingScreen} />
      <UniversityTabs.Screen name="Onboarding" component={UniversityOnboardingScreen} />
      <UniversityTabs.Screen name="Profile" component={UniversityProfileScreen} />
      <UniversityTabs.Screen name="Discovery" component={UniversityDiscoveryScreen} />
      <UniversityTabs.Screen name="StudentProfile" component={UniversityStudentProfileScreen} />
      <UniversityTabs.Screen name="Pipeline" component={UniversityPipelineScreen} />
      <UniversityTabs.Screen name="Scholarships" component={UniversityScholarshipsScreen} />
      <UniversityTabs.Screen name="Faculties" component={UniversityFacultiesScreen} />
      <UniversityTabs.Screen name="Analytics" component={UniversityAnalyticsScreen} />
      <UniversityTabs.Screen name="Chat" component={ChatScreen} />
      <UniversityTabs.Screen name="AI" component={AIChatScreen} />
      <UniversityTabs.Screen name="Notifications" component={NotificationsScreen} />
      <UniversityTabs.Screen name="Support" component={SupportScreen} />
      <UniversityTabs.Screen name="Settings" component={SettingsScreen} />
    </UniversityTabs.Navigator>
  )
}

function AdminNavigator() {
  return (
    <AdminTabs.Navigator screenOptions={{ headerShown: true }}>
      <AdminTabs.Screen name="Dashboard" component={AdminDashboardScreen} />
      <AdminTabs.Screen name="Users" component={AdminUsersScreen} />
      <AdminTabs.Screen name="Verification" component={AdminVerificationScreen} />
      <AdminTabs.Screen name="Documents" component={AdminDocumentsScreen} />
      <AdminTabs.Screen name="Offers" component={AdminOffersScreen} />
      <AdminTabs.Screen name="Interests" component={AdminInterestsScreen} />
      <AdminTabs.Screen name="Chats" component={AdminChatsScreen} />
      <AdminTabs.Screen name="Scholarships" component={AdminScholarshipsScreen} />
      <AdminTabs.Screen name="Support" component={AdminSupportScreen} />
      <AdminTabs.Screen name="Logs" component={AdminLogsScreen} />
      <AdminTabs.Screen name="Health" component={AdminHealthScreen} />
      <AdminTabs.Screen name="Notifications" component={NotificationsScreen} />
      <AdminTabs.Screen name="Profile" component={ProfileScreen} />
      <AdminTabs.Screen name="Settings" component={SettingsScreen} />
    </AdminTabs.Navigator>
  )
}

function GuestNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: true }}>
      <RootStack.Screen name="Landing" options={{ headerShown: false }}>
        {({ navigation }) => (
          <LandingScreen
            onLogin={() => navigation.navigate('Login')}
            onRegister={() => navigation.navigate('Register')}
          />
        )}
      </RootStack.Screen>
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Register" component={RegisterScreen} />
      <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <RootStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <RootStack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    </RootStack.Navigator>
  )
}

export function RootNavigator() {
  const { role, isAuthenticated, isBootstrapped } = useAuth()
  const { theme, colors } = useAppTheme()

  const navTheme = theme === 'dark' ? DarkTheme : DefaultTheme
  const linking = {
    prefixes: ['edmission://', 'https://edmission.uz'],
    config: {
      screens: {
        Landing: '',
        Login: 'login',
        Register: 'register',
        ForgotPassword: 'forgot-password',
        ResetPassword: 'reset-password',
        VerifyEmail: 'verify-email',
      },
    },
  }

  if (!isBootstrapped) {
    return (
      <Screen>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}>Loading...</Text>
      </Screen>
    )
  }

  const hasCompletedOnboarding = useUIStore((s) => s.hasCompletedOnboarding)

  if (!isAuthenticated && !hasCompletedOnboarding) {
    return (
      <Screen>
        <OnboardingScreen onComplete={() => {}} />
      </Screen>
    )
  }

  return (
    <NavigationContainer theme={navTheme} linking={linking}>
      {!isAuthenticated ? (
        <GuestNavigator />
      ) : role === 'student' ? (
        <StudentNavigator />
      ) : role === 'university' ? (
        <UniversityNavigator />
      ) : (
        <AdminNavigator />
      )}
    </NavigationContainer>
  )
}
