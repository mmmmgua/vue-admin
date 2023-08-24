<template>
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
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import SlideBar from './SlideBar/SlideBar.vue'
import NavBar from './NavBar/NavBar.vue';
import Breadcrumb from './Breadcrumb/Breadcrumb.vue';

const isMenuShown = ref<boolean>(false);

const toggleMenu = (): void => {
  isMenuShown.value = !isMenuShown.value;
};

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
  background: var(--color-background);
  padding: 0;
}
.content-layout {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .bread-creamb {
    background: var(--color-background);
    margin: 12px 16px 0 16px;
    padding: 12px;
  }
  .main-layout {
    background: var(--color-background);
    margin: 12px 16px;
    padding: 24px;
    min-height: 280px;
  }
}
</style>
