import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from './resources'
import { useUIStore } from '../store/uiStore'

export function setupI18n() {
  if (i18n.isInitialized) return i18n
  const lng = useUIStore.getState().language
  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })
  return i18n
}

export default i18n
