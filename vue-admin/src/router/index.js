import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/Home.vue'

const constantRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
