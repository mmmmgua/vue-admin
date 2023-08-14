<template>
  <a-layout class="app-container">
    <slide-bar :is-menu-shown="isMenuShown" />
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <nav-bar :is-menu-shown="isMenuShown" @toggle-menu="toggleMenu" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view :key="currentRoute" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import SlideBar from './SlideBar/SlideBar.vue'
import NavBar from './NavBar/NavBar.vue';

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
</style>
