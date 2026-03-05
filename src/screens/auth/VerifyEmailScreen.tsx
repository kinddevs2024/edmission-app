import { useState } from 'react'
import { Alert, Text } from 'react-native'
import { AppButton } from '../../components/ui/AppButton'
import { AppCard } from '../../components/ui/AppCard'
import { AppInput } from '../../components/ui/AppInput'
import { Screen } from '../../components/ui/Screen'
import { verifyEmail } from '../../services/auth'
import { getApiError } from '../../services/api'

export function VerifyEmailScreen() {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    try {
      await verifyEmail(token.trim())
      Alert.alert('Success', 'Email verified.')
    } catch (e) {
      Alert.alert('Error', getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen>
      <AppCard>
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8 }}>Verify email</Text>
        <AppInput label="Verification token" value={token} onChangeText={setToken} />
        <AppButton title={loading ? 'Loading...' : 'Verify'} onPress={submit} disabled={loading || !token} />
      </AppCard>
    </Screen>
  )
}
