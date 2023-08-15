<template>
  <a-layout-sider
    :collapsed="props.isMenuShown"
    :theme="appStore.theme"
    :trigger="null"
    collapsible
  >
    <div class="logo"></div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      :theme="appStore.theme"
      mode="inline"
      :items="menuItems"
      @click="routerLink"
    ></a-menu>
  </a-layout-sider>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePermissionStore } from '@/stores/permission'
import { useAppStore } from '@/stores/app'

const t = inject('t')
const router = useRouter()
const props = defineProps(['isMenuShown'])

const appStore = useAppStore()
const permission_routes = usePermissionStore().permission_routes
const selectedKeys = ref([])
const menuItems = ref([])

onMounted(() => {
  menuItems.value = generateSlideBarMenu(permission_routes)
  setActiveMenu(menuItems.value)
})

function generateSlideBarMenu(routes) {
  const res = []
  routes.forEach((route) => {
    if (typeof route.hidden !== 'boolean' || !route.hidden) {
      const tmp = {
        path: route.path,
        label: t('menu.' + (route?.meta?.title ?? 'menu')),
        title: t('menu.' + (route?.meta?.title ?? 'menu')),
        key: route.path
      }
      if (route.redirect) {
        tmp.path = route.children[0].path
        tmp.label = t('menu.' + route.children[0]?.meta?.title ?? 'menu')
        tmp.title = t('menu.' + route.children[0]?.meta?.title ?? 'menu')
        tmp.key = route.children[0].path
      } else {
        if (route.children && route.children.length > 0) {
          tmp.children = generateSlideBarMenu(route.children)
        }
      }
      res.push(tmp)
    }
  })

  return res
}

function routerLink({ key }) {
  router.push({ path: key })
}

function setActiveMenu(menus) {
  if (menus.length) {
    const currentPath = router.currentRoute.value.path
    menus.forEach((menu) => {
      if (currentPath === menu.key) {
        selectedKeys.value.push(menu.key)
      }
      if (menu.children && menu.children.length > 0) {
        setActiveMenu(menu.children)
      }
    })
  }
}
</script>

<style>
.ant-menu-dark {
  background: var(--color-background);
}
.ant-layout .ant-layout-sider {
  background: var(--color-background);
  box-shadow: 6px 0px 10px 1px rgba(20, 20, 20, 0.1);
}
.ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline {
  background: var(--color-background);
}
</style>
