import { Pressable, StyleSheet, Text } from 'react-native'
import { useAppTheme } from '../../hooks/useAppTheme'

interface AppButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}

export function AppButton({ title, onPress, variant = 'primary', disabled }: AppButtonProps) {
  const { colors } = useAppTheme()
  const styleByVariant = {
    primary: { backgroundColor: colors.primary, borderColor: colors.primary, textColor: colors.primaryDark },
    secondary: { backgroundColor: 'transparent', borderColor: colors.border, textColor: colors.text },
    danger: { backgroundColor: colors.danger, borderColor: colors.danger, textColor: '#FFFFFF' },
  }[variant]

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: styleByVariant.backgroundColor,
          borderColor: styleByVariant.borderColor,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
      ]}
    >
      <Text style={[styles.text, { color: styleByVariant.textColor }]}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
})
