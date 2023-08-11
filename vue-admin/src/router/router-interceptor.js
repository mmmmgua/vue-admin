import { usePermissionStore } from '@/stores/permission'
import { useUserStore } from '@/stores/user'
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
          next({ ...to, replace: true })
        } catch (error) {
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

function addRoutes(router, routes, parentKey) {
  routes.forEach((route) => {
    router.addRoute(parentKey || '', route)
    if (route.children && route.children.length > 0) {
      addRoutes(router, route.children, route.name)
    }
  })
}
