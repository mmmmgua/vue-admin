<template>
  <a-config-provider
    :locale="locale"
    :theme="{
      token: {
        colorPrimary: '#1677ff'
      }
    }"
  >
    <RouterView />
  </a-config-provider>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import messages, { getLanguage } from '@/i18n/index'
import { useAppStore } from './stores/app'

const locale = computed(() => {
  return messages[getLanguage()]
})

onMounted(() => {
  setThemeColor()
})

// 设置并监听系统主题
const setThemeColor = () => {
  const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)')
  useAppStore().theme = isDarkTheme.matches ? 'dark' : 'light'
  isDarkTheme.addEventListener('change', ({ matches }) => {
    useAppStore().theme = matches ? 'dark' : 'light'
  })
}
</script>

<style scoped></style>
