import { useState } from 'react'
import { Alert, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppButton } from '../../components/ui/AppButton'
import { AppCard } from '../../components/ui/AppCard'
import { AppInput } from '../../components/ui/AppInput'
import { Screen } from '../../components/ui/Screen'
import { login } from '../../services/auth'
import { getApiError } from '../../services/api'
import { useAppTheme } from '../../hooks/useAppTheme'

export function LoginScreen() {
  const { t } = useTranslation()
  const { colors } = useAppTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)
    try {
      await login({ email: email.trim(), password })
    } catch (e) {
      Alert.alert('Error', getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen>
      <AppCard>
        <Text style={{ color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 10 }}>{t('login')}</Text>
        <AppInput label={t('email')} value={email} onChangeText={setEmail} />
        <AppInput label={t('password')} value={password} onChangeText={setPassword} secureTextEntry />
        <AppButton title={loading ? t('loading') : t('login')} onPress={onSubmit} disabled={loading || !email || !password} />
      </AppCard>
    </Screen>
  )
}
