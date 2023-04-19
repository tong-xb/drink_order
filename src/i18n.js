import { createI18n } from 'vue-i18n';

/*
 * The i18n resources in the path specified in the plugin `include` option can be read
 * as vue-i18n optimized locale messages using the import syntax
 */
import en from '@/locales/en.json';
import zh_tw from '@/locales/zh_tw.json';

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: import.meta.env.VITE_APP_I18N_LOCALE || 'zh_tw',
  fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || 'zh_tw',
  messages: {
    en,
    zh_tw,
  },
});
