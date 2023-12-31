import './assets/main.css'
import './assets/flex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import messages, { getLocalLanguage } from './i18n'
import Antd, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { storagePlugin } from './stores/plugins/sotrage-plugin'

import App from './App.vue'
import router from './router'
import './router/router-interceptor'

const i18n = createI18n({
  locale: getLocalLanguage(),
  messages
})
const app = createApp(App)

// global message: https://www.antdv.com/components/message-cn
app.provide('message', message)
// global translate: https://kazupon.github.io/vue-i18n/zh/api/#t
app.provide('t', i18n.global.t)

const pinia = createPinia()
pinia.use(storagePlugin)

app.use(pinia)
app.use(router)
app.use(Antd)
app.use(i18n)

app.mount('#app')
