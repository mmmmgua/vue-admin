<!-- plan A -->
<!-- <template>
  <a-layout class="app-container">
    <slide-bar :is-menu-shown="isMenuShown" />
    <a-layout>
      <a-layout-header class="header">
        <nav-bar :is-menu-shown="isMenuShown" @toggle-menu="toggleMenu" />
      </a-layout-header>
      <a-layout-content class="content-layout">
        <breadcrumb class="bread-creamb"></breadcrumb>
        <div class="main-layout">
          <router-view :key="currentRoute" />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template> -->

<!-- plan B -->
<template>
  <a-layout class="app-container">
    <a-layout-header class="header">
      <nav-bar :is-menu-shown="isMenuShown" @toggle-menu="toggleMenu" />
    </a-layout-header>
    <a-layout>
      <slide-bar :is-menu-shown="isMenuShown" />
      <a-layout-content class="content-layout">
        <breadcrumb class="bread-creamb"></breadcrumb>
        <div class="main-layout">
          <router-view :key="currentRoute" />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SlideBar from './SlideBar/SlideBar.vue'
import NavBar from './NavBar/NavBar.vue'
import Breadcrumb from './Breadcrumb/Breadcrumb.vue'
import {token} from '@/assets/theme/MaterialToken'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const isMenuShown = ref<boolean>(false)
const layoutHeaderBg = ref<string>(token[appStore.theme]['layoutHeaderBg'])
const mainLayoutBg = ref<string>(token[appStore.theme]['layoutHeaderBg'])
const layoutContainerBg = ref<string>(token[appStore.theme]['layoutContainerBg'])

watch(appStore, () => {
  layoutHeaderBg.value = token[appStore.theme]['layoutHeaderBg']
  mainLayoutBg.value = token[appStore.theme]['mainLayoutBg']
  layoutContainerBg.value = token[appStore.theme]['layoutContainerBg']
})

const toggleMenu = (): void => {
  isMenuShown.value = !isMenuShown.value
}

const currentRoute = computed(() => {
  return useRoute().path
})
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
}

.header {
  background: v-bind(layoutHeaderBg);
  padding: 0;
}

.content-layout {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: v-bind(layoutContainerBg);

  .bread-creamb {
    padding: 16px;
  }

  .main-layout {
    margin: 0 16px 6px 16px;
    padding: 24px;
    min-height: 280px;
    border-radius: 6px;
    background: v-bind(mainLayoutBg);
  }
}
</style>
