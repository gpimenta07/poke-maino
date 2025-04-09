import { createI18n } from 'vue-i18n'
import pt from './pt.json'
import en from './en.json'
import es from './es.json'

const i18n = createI18n({
  locale: 'pt', // padrão
  fallbackLocale: 'en',
  messages: {
    pt,
    en,
    es
  }
})

export default i18n
