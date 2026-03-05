import { type ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { useAppTheme } from '../../hooks/useAppTheme'

export function AppCard({ children }: { children: ReactNode }) {
  const { colors } = useAppTheme()
  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
})
