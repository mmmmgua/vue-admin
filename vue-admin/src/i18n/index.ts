import { I18n, createI18n } from 'vue-i18n'
import enUS from './en-US'
import zhCN from './zh-CN'
import * as AntdEnLocale from 'ant-design-vue/es/calendar/locale/en_US'
import * as AntdZhLocale from 'ant-design-vue/es/calendar/locale/zh_CN'
import { getStorage, setStorage } from '@/utils/storage'

const messages = {
  'en': { ...enUS, ...AntdEnLocale },
  'zh-CN': { ...zhCN, ...AntdZhLocale }
}
const i18n = initI18n()

function initI18n(): I18n<{ 'en': any; 'zh-CN': any; }, {}, {}, "en" | "zh-CN", true> {
  const locale = getLocalLanguage()
  setStorage('language', locale)
  const i18n = createI18n({ locale, messages })
  return i18n
}

function getLocalLanguage(): 'en' | 'zh-CN' {
  // 检查storeage语言
  const storageLanguage = getStorage('language') as 'en' | 'zh-CN'
  if (storageLanguage) return storageLanguage
  // 检查浏览器语言
  if (navigator.language && messages.hasOwnProperty(navigator.language)) return navigator.language  as 'en' | 'zh-CN'
  return 'zh-CN'
}

function hasLanguage(key: string) {
  const langs = Object.keys(messages)
  return langs.includes(key)
}

function setLanguage(key: string) {
  const lang: string = hasLanguage(key) ? key : getLocalLanguage()
  i18n.global.locale = lang as 'en' | 'zh-CN'
  setStorage('language', lang)
}

export { messages, i18n, getLocalLanguage, setLanguage }
