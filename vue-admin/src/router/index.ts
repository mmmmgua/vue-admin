import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/layout.vue'

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        component: () => import('@/views/Home/Home.vue'),
        name: 'Home',
        meta: { title: 'home', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { hidden: true },
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: { hidden: true, title: '404' },
    component: () => import('@/views/404/404.vue')
  },
  {
    path: '/:pathMatch(.*)',
    meta: { hidden: true, title: '404' },
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
