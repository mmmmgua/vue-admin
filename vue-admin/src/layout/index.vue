<template>
  <a-layout class="app-container">
    <slide-bar></slide-bar>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div>sb</div>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view :key="currentRoute" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SlideBar from './components/SlideBar/SlideBar.vue'

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
