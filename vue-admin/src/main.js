import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import messages, { getLocalLanguage } from './i18n'
import { createI18n } from 'vue-i18n'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

import App from './App.vue'
import router from './router'

const i18n = createI18n({
  locale: getLocalLanguage(),
  messages
})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(i18n)

app.mount('#app')
