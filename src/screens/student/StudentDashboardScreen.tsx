import { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'
import { Screen } from '../../components/ui/Screen'
import { AppCard } from '../../components/ui/AppCard'
import { useAppTheme } from '../../hooks/useAppTheme'
import { studentService } from '../../services/student'
import { getApiError } from '../../services/api'

export function StudentDashboardScreen() {
  const { colors } = useAppTheme()
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await studentService.getDashboard()
      setData((res ?? {}) as Record<string, unknown>)
    } catch (e) {
      setError(getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load().catch(() => {})
  }, [])

  return (
    <Screen scroll={false}>
      <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={() => load().catch(() => {})} />}>
        <Text style={{ color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 10 }}>Student Dashboard</Text>
        {error ? <Text style={{ color: colors.danger, marginBottom: 10 }}>{error}</Text> : null}
        <View style={{ gap: 10 }}>
          <AppCard><Text style={{ color: colors.text }}>Profile completion: {String(data?.profileCompletionPercent ?? '-')}%</Text></AppCard>
          <AppCard><Text style={{ color: colors.text }}>Active applications: {String(data?.activeApplications ?? '-')}</Text></AppCard>
          <AppCard><Text style={{ color: colors.text }}>Offers: {String(data?.offersCount ?? '-')}</Text></AppCard>
        </View>
      </ScrollView>
    </Screen>
  )
}
