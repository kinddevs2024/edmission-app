import { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'
import { Screen } from '../../components/ui/Screen'
import { AppCard } from '../../components/ui/AppCard'
import { useAppTheme } from '../../hooks/useAppTheme'
import { universityService } from '../../services/university'
import { getApiError } from '../../services/api'

export function UniversityDashboardScreen() {
  const { colors } = useAppTheme()
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await universityService.getDashboard()
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
        <Text style={{ color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 10 }}>University Dashboard</Text>
        {error ? <Text style={{ color: colors.danger, marginBottom: 10 }}>{error}</Text> : null}
        <View style={{ gap: 10 }}>
          <AppCard><Text style={{ color: colors.text }}>Interested students: {String(data?.interestedCount ?? '-')}</Text></AppCard>
          <AppCard><Text style={{ color: colors.text }}>Offers sent: {String(data?.offersCount ?? '-')}</Text></AppCard>
          <AppCard><Text style={{ color: colors.text }}>Active chats: {String(data?.activeChats ?? '-')}</Text></AppCard>
        </View>
      </ScrollView>
    </Screen>
  )
}
