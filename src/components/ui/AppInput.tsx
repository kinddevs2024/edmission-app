import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useAppTheme } from '../../hooks/useAppTheme'

interface AppInputProps {
  label: string
  value: string
  onChangeText: (value: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  multiline?: boolean
}

export function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  multiline,
}: AppInputProps) {
  const { colors } = useAppTheme()
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text,
            minHeight: multiline ? 100 : 44,
            textAlignVertical: multiline ? 'top' : 'center',
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
})
