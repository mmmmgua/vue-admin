import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Layout from '@/layout/layout.vue'

export const constantRoutes:Array<RouteRecordRaw> = [
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
    meta:{hidden:true},
    component: () => import('@/views/Login/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
