import { useCallback, useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text } from 'react-native'
import { AppCard } from '../components/ui/AppCard'
import { Screen } from '../components/ui/Screen'
import { useAppTheme } from '../hooks/useAppTheme'
import { getApiError } from '../services/api'

interface ResourceScreenOptions {
  title: string
  description: string
  load: () => Promise<unknown>
}

function summarize(data: unknown): string {
  if (Array.isArray(data)) return `Items: ${data.length}`
  if (data && typeof data === 'object') {
    const keys = Object.keys(data as Record<string, unknown>)
    return `Fields: ${keys.length}${keys.length ? ` (${keys.slice(0, 6).join(', ')})` : ''}`
  }
  return data == null ? 'No data' : String(data)
}

export function createResourceScreen({ title, description, load }: ResourceScreenOptions) {
  return function ResourceScreen() {
    const { colors } = useAppTheme()
    const [data, setData] = useState<unknown>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchData = useCallback(async () => {
      setLoading(true)
      setError('')
      try {
        const result = await load()
        setData(result)
      } catch (e) {
        setError(getApiError(e))
      } finally {
        setLoading(false)
      }
    }, [load])

    useEffect(() => {
      fetchData().catch(() => {})
    }, [fetchData])

    return (
      <Screen scroll={false}>
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={() => fetchData().catch(() => {})} />}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
          <AppCard>
            <Text style={[styles.description, { color: colors.muted }]}>{description}</Text>
            <Text style={[styles.summary, { color: colors.text }]}>{summarize(data)}</Text>
          </AppCard>
        </ScrollView>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10 },
  error: { marginBottom: 10 },
  description: { fontSize: 14, lineHeight: 20 },
  summary: { marginTop: 10, fontSize: 14, fontWeight: '600' },
})
