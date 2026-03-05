import { Animated, StyleSheet, Text, View } from 'react-native'
import { useEffect, useRef } from 'react'
import { Screen } from './Screen'
import { AppCard } from './AppCard'
import { useAppTheme } from '../../hooks/useAppTheme'

export function PlaceholderScreen({
  title,
  description,
}: {
  title: string
  description: string
}) {
  const { colors } = useAppTheme()
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(12)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start()
  }, [opacity, translateY])

  return (
    <Screen>
      <Animated.View style={{ opacity, transform: [{ translateY }] }}>
        <AppCard>
          <View style={styles.wrap}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            <Text style={[styles.desc, { color: colors.muted }]}>{description}</Text>
          </View>
        </AppCard>
      </Animated.View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  title: { fontSize: 22, fontWeight: '700' },
  desc: { fontSize: 14, lineHeight: 20 },
})
