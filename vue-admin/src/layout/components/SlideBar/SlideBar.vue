<template>
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
    <div class="logo"></div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
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

const t = inject('t')
const router = useRouter()

const collapsed = ref(false)
const permission_routes = usePermissionStore().permission_routes
const selectedKeys = ref([])
const menuItems = ref([])

onMounted(() => {
  menuItems.value = generateSlideBarMenu(permission_routes)
  selectedKeys.value.push(menuItems.value[0].key)
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
</script>

<style></style>
