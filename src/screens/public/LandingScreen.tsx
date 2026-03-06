import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native'
import { Screen } from '../../components/ui/Screen'
import { AppButton } from '../../components/ui/AppButton'
import { useAppTheme } from '../../hooks/useAppTheme'
import { useTranslation } from 'react-i18next'

export function LandingScreen({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  const { colors } = useAppTheme()
  const { t } = useTranslation()

  const steps = [
    { title: t('landing.step1'), desc: t('landing.step1Desc') },
    { title: t('landing.step2'), desc: t('landing.step2Desc') },
    { title: t('landing.step3'), desc: t('landing.step3Desc') },
    { title: t('landing.step4'), desc: t('landing.step4Desc') },
  ]

  return (
    <Screen scroll={false}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { backgroundColor: colors.bg }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={[styles.heroTitle, { color: colors.text }]}>
            {t('landing.hero')}
          </Text>
          <Text style={[styles.heroSub, { color: colors.muted }]}>
            {t('landing.heroSub')}
          </Text>
        </View>

        {/* Don't let fees */}
        <View style={styles.feesBlock}>
          <Text style={[styles.feesText, { color: colors.primary }]}>
            {t('landing.dontLetFees')}
          </Text>
        </View>

        {/* How it works */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('landing.howItWorks')}
          </Text>
          {steps.map((s, i) => (
            <View key={i} style={[styles.stepRow, { borderBottomColor: colors.border }]}>
              <View style={[styles.stepNum, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: colors.text }]}>{s.title}</Text>
                <Text style={[styles.stepDesc, { color: colors.muted }]}>{s.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View style={styles.cta}>
          <AppButton title={t('landing.joinToday')} onPress={onRegister} />
          <Text style={[styles.haveAccount, { color: colors.muted }]}>
            {t('onboarding.haveAccount')}{' '}
            <Text style={{ color: colors.primary, fontWeight: '600' }} onPress={onLogin}>
              {t('login')}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
  },
  hero: {
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 36,
    marginBottom: 12,
  },
  heroSub: {
    fontSize: 16,
    lineHeight: 24,
  },
  feesBlock: {
    marginBottom: 32,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(132, 204, 22, 0.12)',
  },
  feesText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 14,
  },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  cta: {
    marginTop: 8,
  },
  haveAccount: {
    marginTop: 16,
    fontSize: 15,
    textAlign: 'center',
  },
})
