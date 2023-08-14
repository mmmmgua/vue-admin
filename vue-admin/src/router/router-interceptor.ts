import { usePermissionStore } from '@/stores/permission'
import { useUserStore } from '@/stores/user'
import { RouteRecordRaw } from 'vue-router'
import router from './index'

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  const token = useUserStore().user_token

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasPermissionRoutes =
        usePermissionStore().permission_routes && usePermissionStore().permission_routes.length > 0
        
      if (hasPermissionRoutes) {
        next()
      } else {
        try {
          const userMenuTree = await usePermissionStore().getUserMenu()
          const accessRoutes = await usePermissionStore().generateRoutes(userMenuTree)
          addRoutes(router, accessRoutes)
          if (to.redirectedFrom) {
            router.replace(to.redirectedFrom)
            next()
          } else {
            next({ ...to, replace: true })
          }
        } catch (error: any) {
          // for debug
          console.warn('generate menu tree failed: ', JSON.stringify(error.message))
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 无身份跳转到白名单以外
      next(`/login?redirect=${to.path}`)
    }
  }
})

function addRoutes(router: any, routes: Array<RouteRecordRaw>, parentKey?: string) {
  routes.forEach((route: RouteRecordRaw) => {
    router.addRoute(parentKey || '', route)
  })
}
