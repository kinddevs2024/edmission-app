import { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppButton } from '../../components/ui/AppButton'
import { AppCard } from '../../components/ui/AppCard'
import { AppInput } from '../../components/ui/AppInput'
import { Screen } from '../../components/ui/Screen'
import { register } from '../../services/auth'
import { getApiError } from '../../services/api'
import { useAppTheme } from '../../hooks/useAppTheme'

export function RegisterScreen() {
  const { t } = useTranslation()
  const { colors } = useAppTheme()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'student' | 'university'>('student')
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)
    try {
      await register({ email: email.trim(), password, name, role })
    } catch (e) {
      Alert.alert('Error', getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen>
      <AppCard>
        <Text style={{ color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 10 }}>{t('register')}</Text>
        <AppInput label={t('name')} value={name} onChangeText={setName} />
        <AppInput label={t('email')} value={email} onChangeText={setEmail} />
        <AppInput label={t('password')} value={password} onChangeText={setPassword} secureTextEntry />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 1 }}>
            <AppButton title={t('roleStudent')} variant={role === 'student' ? 'primary' : 'secondary'} onPress={() => setRole('student')} />
          </View>
          <View style={{ flex: 1 }}>
            <AppButton title={t('roleUniversity')} variant={role === 'university' ? 'primary' : 'secondary'} onPress={() => setRole('university')} />
          </View>
        </View>
        <AppButton title={loading ? t('loading') : t('register')} onPress={onSubmit} disabled={loading || !email || !password} />
      </AppCard>
    </Screen>
  )
}
