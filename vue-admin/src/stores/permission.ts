import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { getUserMenuTree } from '../api/user'
import { constantRoutes } from '../router/index'
import Layout from '../layout/layout.vue'

const modules = import.meta.glob("../views/**/**.vue")
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
function filterAsyncRoutes(menuTree: Array<any>) {
  const res: Array<any> = []

  menuTree.forEach((menu) => {
    const Directory = 1 // menu类型: 目录
    const Menu = 2 // menu类型: 菜单
    const Button = 3 // menu类型: 按钮
    if (menu.menuType !== Button) {
      const tmp: any = {
        path: menu.path,
        meta: { title: menu.menuName, icon: menu.icon }
      }
      if (menu.menuType === Directory) {
        tmp.component = Layout
      } else if (menu.menuType === Menu) {
        tmp.component =  modules[`../views${menu.component}.vue`]
      }
      if (menu.child && menu.child.length > 0) {
        tmp.children = filterAsyncRoutes(menu.child)
      }
      res.push(tmp)
    }
  })

  return res
}

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      permission_routes: []
    }
  },
  actions: {
    getUserMenu(): unknown[] | any {
      return new Promise((resolve, reject) => {
        // prettier-ignore
        getUserMenuTree().then((response) => {
          const { data } = response
          resolve(data.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    generateRoutes(menuTree: RouteRecordRaw[]) {
      return new Promise((resolve) => {
        let accessedRoutes: Array<RouteRecordRaw> = []
        if (menuTree && menuTree.length) {
          accessedRoutes = filterAsyncRoutes(menuTree)
        }
        this.permission_routes = constantRoutes.concat(accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
})
