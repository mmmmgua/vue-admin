<template>
  <a-breadcrumb class="breadcrumb-container">
    <a-breadcrumb-item v-for="(route, index) in routeList" :key="index">

      {{ $t(`menu.${route.meta.title}`) }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { usePermissionStore } from "@/stores/permission"
import { RouteRecordNormalized, RouteRecordRaw, useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const permission_routes = usePermissionStore().permission_routes

const routeList = ref<RouteRecordRaw[]>([])

watch(route, () => generateBreadcrumbs())

onMounted(() => {
  generateBreadcrumbs()
})

function generateBreadcrumbs(): void {
  routeList.value = getRouteListByPath(route.fullPath, router.getRoutes())

  function getRouteListByPath(path: string, routeList: RouteRecordRaw[], data: RouteRecordRaw[] = [], deep: number = 0): RouteRecordRaw[] {
    const pathAsList = path.split('/').filter(Boolean)
    if (deep >= pathAsList.length) {
      return data
    } else {
      const currentPath = `/${pathAsList.slice(0, deep + 1 ).join('/')}`
      const currentNode = routeList.filter(route => route.path === currentPath)
      data = data.concat(currentNode)
      return getRouteListByPath(path, routeList, data, deep + 1)
    }
  }
}
</script>

<style scoped lang="scss">
.breadcrumb-container {
  padding-left: 10px;
  margin-top: -4px;
}
</style>