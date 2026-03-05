import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Screen } from '../../components/ui/Screen'
import { AppButton } from '../../components/ui/AppButton'
import { useAppTheme } from '../../hooks/useAppTheme'
import { useUIStore } from '../../store/uiStore'

type OnboardingStep = 0 | 1 | 2 | 3

interface OnboardingScreenProps {
  onComplete: () => void
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const { colors } = useAppTheme()
  const { t, i18n } = useTranslation()
  const language = useUIStore((s) => s.language)
  const setLanguage = useUIStore((s) => s.setLanguage)
  const setHasCompletedOnboarding = useUIStore((s) => s.setHasCompletedOnboarding)

  const [step, setStep] = useState<OnboardingStep>(0)

  const handleNext = () => {
    if (step < 2) {
      setStep((s) => (s + 1) as OnboardingStep)
    } else if (step === 2) {
      setStep(3)
    } else {
      setHasCompletedOnboarding(true)
      i18n.changeLanguage(language).catch(() => {})
      onComplete()
    }
  }

  const slides = [
    { title: t('onboarding.slide1Title'), desc: t('onboarding.slide1Desc') },
    { title: t('onboarding.slide2Title'), desc: t('onboarding.slide2Desc') },
    { title: t('onboarding.slide3Title'), desc: t('onboarding.slide3Desc') },
  ]

  if (step === 3) {
    return (
      <Screen>
        <View style={styles.content}>
          <Text style={[styles.slideTitle, { color: colors.text }]}>{t('onboarding.selectLanguage')}</Text>
          <View style={styles.langRow}>
            {(['en', 'ru', 'uz'] as const).map((lng) => (
              <View key={lng} style={styles.langCell}>
                <AppButton
                  title={lng.toUpperCase()}
                  variant={language === lng ? 'primary' : 'secondary'}
                  onPress={() => setLanguage(lng)}
                />
              </View>
            ))}
          </View>
          <View style={styles.actions}>
            <AppButton title={t('onboarding.getStarted')} onPress={handleNext} />
          </View>
        </View>
      </Screen>
    )
  }

  const slide = slides[step]
  return (
    <Screen>
      <View style={styles.content}>
        <View style={styles.slide}>
          <Text style={[styles.slideTitle, { color: colors.text }]}>{slide.title}</Text>
          <Text style={[styles.slideDesc, { color: colors.muted }]}>{slide.desc}</Text>
        </View>
        <View style={styles.dots}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === step ? colors.primary : colors.border },
              ]}
            />
          ))}
        </View>
        <View style={styles.actions}>
          <AppButton title={t('onboarding.next')} onPress={handleNext} />
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  slide: {
    marginBottom: 32,
  },
  slideTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
  },
  slideDesc: {
    fontSize: 16,
    lineHeight: 24,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  langRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  langCell: {
    flex: 1,
  },
  actions: {
    marginTop: 16,
  },
})
