import { createI18n } from 'vue-i18n'

const messages = {
  pt: {
    welcome: 'Bem-vindo',
    // outros textos...
  },
  en: {
    welcome: 'Welcome',
    // outros textos...
  },
  es: {
    welcome: 'Bienvenido',
    // outros textos...
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'en',
  messages
})

export default i18n
