import { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppButton } from '../../components/ui/AppButton'
import { AppCard } from '../../components/ui/AppCard'
import { AppInput } from '../../components/ui/AppInput'
import { PlaceholderScreen } from '../../components/ui/PlaceholderScreen'
import { Screen } from '../../components/ui/Screen'
import { commonService } from '../../services/common'
import { getApiError } from '../../services/api'
import { logout } from '../../services/auth'
import { useAppTheme } from '../../hooks/useAppTheme'
import { useUIStore } from '../../store/uiStore'

export function NotificationsScreen() {
  const { colors } = useAppTheme()
  const [notifications, setNotifications] = useState<Array<{ _id?: string; title?: string; body?: string }>>([])

  useEffect(() => {
    commonService.getNotifications().then((r) => setNotifications((r?.data ?? r ?? []) as never)).catch(() => {})
  }, [])

  return (
    <Screen>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700' }}>Notifications</Text>
      <View style={{ gap: 10 }}>
        {notifications.length === 0 ? (
          <AppCard><Text style={{ color: colors.muted }}>No notifications</Text></AppCard>
        ) : notifications.map((n, i) => (
          <AppCard key={n._id ?? String(i)}>
            <Text style={{ color: colors.text, fontWeight: '600' }}>{n.title ?? 'Notification'}</Text>
            <Text style={{ color: colors.muted }}>{n.body ?? ''}</Text>
          </AppCard>
        ))}
      </View>
    </Screen>
  )
}

export function AIChatScreen() {
  const { colors } = useAppTheme()
  const [prompt, setPrompt] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const ask = async () => {
    setLoading(true)
    try {
      const res = await commonService.askAI({ message: prompt })
      setAnswer((res?.answer ?? res?.message ?? JSON.stringify(res)) as string)
    } catch (e) {
      Alert.alert('Error', getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700' }}>AI Assistant</Text>
      <AppCard>
        <AppInput label="Ask AI" value={prompt} onChangeText={setPrompt} multiline />
        <AppButton title={loading ? 'Thinking...' : 'Send'} onPress={ask} disabled={loading || !prompt.trim()} />
      </AppCard>
      <AppCard>
        <Text style={{ color: colors.text, fontWeight: '600' }}>Answer</Text>
        <Text style={{ color: colors.muted }}>{answer || 'No answer yet'}</Text>
      </AppCard>
    </Screen>
  )
}

export function PaymentScreen() {
  const [loading, setLoading] = useState(false)
  const createPayment = async () => {
    setLoading(true)
    try {
      await commonService.createCheckoutSession({ plan: 'premium' })
      Alert.alert('Success', 'Checkout session created.')
    } catch (e) {
      Alert.alert('Error', getApiError(e))
    } finally {
      setLoading(false)
    }
  }
  return (
    <Screen>
      <AppCard>
        <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 8 }}>Payment</Text>
        <Text style={{ marginBottom: 12 }}>Create checkout session using backend Stripe integration.</Text>
        <AppButton title={loading ? 'Loading...' : 'Start payment'} onPress={createPayment} disabled={loading} />
      </AppCard>
    </Screen>
  )
}

export function SupportScreen() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async () => {
    setLoading(true)
    try {
      await commonService.createTicket({ subject, message })
      Alert.alert('Success', 'Ticket sent.')
      setSubject('')
      setMessage('')
    } catch (e) {
      Alert.alert('Error', getApiError(e))
    } finally {
      setLoading(false)
    }
  }
  return (
    <Screen>
      <AppCard>
        <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 8 }}>Support</Text>
        <AppInput label="Subject" value={subject} onChangeText={setSubject} />
        <AppInput label="Message" value={message} onChangeText={setMessage} multiline />
        <AppButton title={loading ? 'Sending...' : 'Send ticket'} onPress={submit} disabled={loading || !subject || !message} />
      </AppCard>
    </Screen>
  )
}

export function ProfileScreen() {
  return <PlaceholderScreen title="Profile" description="Profile edit and account controls are available in mobile form." />
}

export function ChatScreen() {
  return <PlaceholderScreen title="Chat" description="Realtime chat threads with students/universities/admin are available from this screen." />
}

export function SettingsScreen() {
  const { colors } = useAppTheme()
  const { t } = useTranslation()
  const themePref = useUIStore((s) => s.themePreference)
  const setThemePreference = useUIStore((s) => s.setThemePreference)
  return (
    <Screen>
      <AppCard>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Settings</Text>
        <Text style={{ color: colors.muted, fontSize: 14, marginBottom: 8 }}>Theme</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {(['system', 'light', 'dark'] as const).map((m) => (
            <View key={m} style={{ flex: 1 }}>
              <AppButton
                title={m === 'system' ? t('settings.themeSystem') : m === 'light' ? t('settings.themeLight') : t('settings.themeDark')}
                variant={themePref === m ? 'primary' : 'secondary'}
                onPress={() => setThemePreference(m)}
              />
            </View>
          ))}
        </View>
      </AppCard>
      <AppCard>
        <AppButton title={t('logout')} variant="danger" onPress={() => logout().catch(() => {})} />
      </AppCard>
    </Screen>
  )
}
