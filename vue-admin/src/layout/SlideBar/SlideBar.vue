<template>
  <a-layout-sider :collapsed="props.isMenuShown" :trigger="null" collapsible :theme="appStore.theme">
    <div class="logo"></div>
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" :theme="appStore.theme" mode="inline"
      :items="menuItems" @click="routerLink"></a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, h, watch } from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'
import { ItemType } from 'ant-design-vue/es/menu/src/hooks/useItems'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { token } from '@/assets/theme/MaterialToken'
import { usePermissionStore } from '@/stores/permission'
import { useAppStore } from '@/stores/app'

const t: any = inject('t')
const router = useRouter()
const props = defineProps(['isMenuShown'])

const appStore = useAppStore()
const permission_routes = usePermissionStore().permission_routes
const layoutHeaderBg = ref<string>(token[appStore.theme]['layoutHeaderBg'])
const openKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const menuItems = ref<ItemType[]>([])

watch(appStore, () => {
  layoutHeaderBg.value = token[appStore.theme]['layoutHeaderBg']
})

onMounted(() => {
  menuItems.value = generateSlideBarMenu(permission_routes)
  setActiveMenu(menuItems.value)
})

function generateSlideBarMenu(routes: Array<RouteRecordRaw>): ItemType[] {
  const res: ItemType[] = []
  routes.forEach((route) => {
    if (typeof route?.meta?.hidden !== 'boolean' || !route?.meta?.hidden) {
      const icon = route?.meta?.icon as string
      const tmp: ItemType = {
        label: t('menu.' + (route?.meta?.title ?? 'menu')),
        title: t('menu.' + (route?.meta?.title ?? 'menu')),
        key: route.path,
        icon: icon ? h(SvgIcon, { name: icon }) : undefined
      }
      if (route.redirect && route?.children?.length) {
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
function routerLink(item: ItemType): void {
  router.push({ path: item?.key?.toString(), replace: true })
}
function setActiveMenu(menus: ItemType[]): void {
  if (menus.length > 0) {
    const currentPath: string = router.currentRoute.value.path
    menus.forEach(menu => {
      if (menu && currentPath === menu.key) {
        // 选中目标菜单
        selectedKeys.value.push(menu.key)
        // 展开父级菜单
        const pathList = menu.key.split('/').filter(Boolean)
        openKeys.value.push(`/${pathList.slice(0, pathList.length - 1).join('/')}`)
      }
      if (menu && menu.children && menu.children.length > 0) {
        setActiveMenu(menu.children)
      }
    })
  }
}
</script>

<style>
.ant-menu-dark {
  background: v-bind(layoutHeaderBg);
}

.ant-layout .ant-layout-sider {
  background: v-bind(layoutHeaderBg);
  /* box-shadow: 6px 0px 10px 1px rgba(20, 20, 20, 0.1); */
}

.ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline {
  background: v-bind(layoutHeaderBg);
}
</style>
