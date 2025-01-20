// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    'nuxt-i18n-micro',
    '@nuxtjs/storybook'
  ],

  i18n: {
    locales: [
      { code: 'en', iso: 'en_EN', displayName: 'English' },
      { code: 'de', iso: 'de_DE', displayName: 'German' },
      { code: 'ru', iso: 'ru_RU', displayName: 'Russian' },
      { code: 'fr', iso: 'fr_FR', displayName: 'French' },
      { code: 'ch', iso: 'ch_CH', displayName: 'Chinese' },
    ],
    meta: true,
    metaBaseUrl: 'http://localhost:3000/',
    defaultLocale: 'en',
    translationDir: 'locales',
    autoDetectLanguage: true,
    autoDetectPath: '/',

    // 'no_prefix' | 'prefix_except_default' | 'prefix' | 'prefix_and_default'
    strategy: 'prefix',
  },
})
