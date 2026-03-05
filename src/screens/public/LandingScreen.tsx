import { StyleSheet, Text, View } from 'react-native'
import { Screen } from '../../components/ui/Screen'
import { AppCard } from '../../components/ui/AppCard'
import { AppButton } from '../../components/ui/AppButton'
import { useAppTheme } from '../../hooks/useAppTheme'
import { useTranslation } from 'react-i18next'

export function LandingScreen({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  const { colors } = useAppTheme()
  const { t } = useTranslation()

  return (
    <Screen>
      <AppCard>
        <Text style={[styles.title, { color: colors.text }]}>{t('landingTitle')}</Text>
        <Text style={[styles.sub, { color: colors.muted }]}>
          {t('onboarding.slide1Desc')}
        </Text>
        <View style={styles.row}>
          <View style={styles.cell}>
            <AppButton title={t('register')} onPress={onRegister} />
          </View>
          <View style={styles.cell}>
            <AppButton title={t('login')} variant="secondary" onPress={onLogin} />
          </View>
        </View>
        <Text style={[styles.haveAccount, { color: colors.muted }]}>{t('onboarding.haveAccount')}</Text>
      </AppCard>
    </Screen>
  )
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700' },
  sub: { marginTop: 8, fontSize: 15, lineHeight: 22, marginBottom: 16 },
  row: { flexDirection: 'row', gap: 12, marginTop: 8 },
  cell: { flex: 1 },
  haveAccount: { marginTop: 16, fontSize: 14, textAlign: 'center' },
})
