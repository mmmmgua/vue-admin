import enUS from './en-US'
import zhCN from './zh-CN'
import * as AntdEnLocale from 'ant-design-vue/es/calendar/locale/en_US'
import * as AntdZhLocale from 'ant-design-vue/es/calendar/locale/zh_CN'
const messages = {
  'en-US': {
    ...enUS,
    ...AntdEnLocale
  },
  'zh-CN': {
    ...zhCN,
    ...AntdZhLocale
  }
}

export function getLocalLanguage() {
  if (navigator) {
    return navigator.language
  }
  return 'zh-CN'
}

export function getLanguage() {
  const language = getLocalLanguage()

  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (locale.indexOf(language) > -1) {
      return locale
    }
  }
  return language
}

export default messages
