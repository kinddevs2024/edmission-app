import { type ReactNode } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { useAppTheme } from '../../hooks/useAppTheme'

export function Screen({ children, scroll = true }: { children: ReactNode; scroll?: boolean }) {
  const { colors } = useAppTheme()
  const content = <View style={styles.content}>{children}</View>
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      {scroll ? <ScrollView contentContainerStyle={styles.scroll}>{content}</ScrollView> : content}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 16 },
  content: { flex: 1, gap: 12, padding: 16 },
})
