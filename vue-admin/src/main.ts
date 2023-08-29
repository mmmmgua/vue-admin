import './assets/main.css'
import './assets/flex.css'
import { createApp } from 'vue'
import App from './App.vue'
// 全局状态 https://pinia.web3doc.top/introduction.html
import { createPinia } from 'pinia'
import { storagePlugin } from '@/stores/plugins/sotrage-plugin.ts'
// UI库 https://www.antdv.com/components/overview-cn
import Antd, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
// 路由 https://router.vuejs.org/zh/introduction.html
import router from './router'
import './router/router-interceptor'
// 国际化 https://vue-i18n.intlify.dev/guide/
import { i18n } from '@/i18n/index'
// 自定义svg
import SvgIcon from './components/SvgIcon/SvgIcon.vue'
// 图表 https://echarts.apache.org/handbook/zh/get-started
import * as echarts from 'echarts'

const app = createApp(App)
app.component('svg-icon', SvgIcon)

// global message: https://www.antdv.com/components/message-cn
app.provide('message', message)
// global translate: https://kazupon.github.io/vue-i18n/zh/api/#t
// avoid ts warning: 类型实例化过深，且可能无限
const global = i18n.global
app.provide('t', global.t)
// global echarts: https://echarts.apache.org/examples/zh/index.html
app.provide('echarts', echarts)

const pinia = createPinia()
pinia.use(storagePlugin)

app.use(pinia)
app.use(router)
app.use(Antd)
app.use(i18n)

app.mount('#app')
