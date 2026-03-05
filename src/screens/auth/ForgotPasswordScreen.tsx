import { useState } from 'react'
import { Alert, Text } from 'react-native'
import { AppButton } from '../../components/ui/AppButton'
import { AppCard } from '../../components/ui/AppCard'
import { AppInput } from '../../components/ui/AppInput'
import { Screen } from '../../components/ui/Screen'
import { forgotPassword } from '../../services/auth'
import { getApiError } from '../../services/api'

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async () => {
    setLoading(true)
    try {
      await forgotPassword(email.trim())
      Alert.alert('Success', 'Reset instructions sent (if account exists).')
    } catch (e) {
      Alert.alert('Error', getApiError(e))
    } finally {
      setLoading(false)
    }
  }
  return (
    <Screen>
      <AppCard>
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8 }}>Forgot password</Text>
        <AppInput label="Email" value={email} onChangeText={setEmail} />
        <AppButton title={loading ? 'Loading...' : 'Send reset link'} onPress={submit} disabled={loading || !email} />
      </AppCard>
    </Screen>
  )
}
