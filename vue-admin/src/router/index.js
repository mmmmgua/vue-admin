import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Layout from '@/Layout/index.vue'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        component: Home,
        name: 'Home',
        meta: { title: 'home', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    meta: { title: '404' },
    component: () => import('@/views/404/404.vue')
  },
  {
    path: '/:pathMatch(.*)',
    hidden: true,
    meta: { title: '404' },
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
