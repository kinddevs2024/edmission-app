import { useState } from 'react'
import { Alert, Text } from 'react-native'
import { AppButton } from '../../components/ui/AppButton'
import { AppCard } from '../../components/ui/AppCard'
import { AppInput } from '../../components/ui/AppInput'
import { Screen } from '../../components/ui/Screen'
import { resetPassword } from '../../services/auth'
import { getApiError } from '../../services/api'

export function ResetPasswordScreen() {
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    try {
      await resetPassword(token.trim(), newPassword)
      Alert.alert('Success', 'Password updated.')
    } catch (e) {
      Alert.alert('Error', getApiError(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen>
      <AppCard>
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8 }}>Reset password</Text>
        <AppInput label="Reset token" value={token} onChangeText={setToken} />
        <AppInput label="New password" value={newPassword} onChangeText={setNewPassword} secureTextEntry />
        <AppButton title={loading ? 'Loading...' : 'Reset'} onPress={submit} disabled={loading || !token || !newPassword} />
      </AppCard>
    </Screen>
  )
}
