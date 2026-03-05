import { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { AppButton } from '../../components/ui/AppButton'
import { AppCard } from '../../components/ui/AppCard'
import { Screen } from '../../components/ui/Screen'
import { commonService } from '../../services/common'
import { getApiError } from '../../services/api'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'

async function uploadAsset(uri: string, name: string, type: string) {
  const form = new FormData()
  form.append('file', { uri, name, type } as never)
  return commonService.uploadFile(form)
}

export function StudentDocumentsScreen() {
  const [uploading, setUploading] = useState(false)
  const [lastUpload, setLastUpload] = useState('')

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 })
    if (res.canceled || !res.assets[0]) return
    await handleUpload(res.assets[0].uri, res.assets[0].fileName ?? 'image.jpg', res.assets[0].mimeType ?? 'image/jpeg')
  }

  const pickDocument = async () => {
    const res = await DocumentPicker.getDocumentAsync({ multiple: false, copyToCacheDirectory: true })
    if (res.canceled || !res.assets[0]) return
    await handleUpload(res.assets[0].uri, res.assets[0].name, res.assets[0].mimeType ?? 'application/octet-stream')
  }

  const handleUpload = async (uri: string, name: string, type: string) => {
    setUploading(true)
    try {
      const uploaded = await uploadAsset(uri, name, type)
      setLastUpload(JSON.stringify(uploaded))
      Alert.alert('Success', 'File uploaded')
    } catch (e) {
      Alert.alert('Error', getApiError(e))
    } finally {
      setUploading(false)
    }
  }

  return (
    <Screen>
      <AppCard>
        <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 10 }}>Student Documents</Text>
        <View style={{ gap: 8 }}>
          <AppButton title={uploading ? 'Uploading...' : 'Upload image'} onPress={() => pickImage().catch(() => {})} disabled={uploading} />
          <AppButton title={uploading ? 'Uploading...' : 'Upload document'} onPress={() => pickDocument().catch(() => {})} disabled={uploading} variant="secondary" />
        </View>
      </AppCard>
      <AppCard>
        <Text style={{ fontWeight: '700', marginBottom: 6 }}>Last upload response</Text>
        <Text>{lastUpload || '-'}</Text>
      </AppCard>
    </Screen>
  )
}
