<template>
  <a-config-provider :locale="locale">
    <RouterView />
  </a-config-provider>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import messages, { getLanguage } from './i18n/index'

const locale = computed(() => {
  return messages[getLanguage()]
})

onMounted(() => {
  setThemeColor()
})

const setThemeColor = () => {
  const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)') // 是深色
  if (isDarkTheme.matches) {
    // 是深色
    // 主题设置为深色。
  } else {
    // 不是深色
    // 主题设置为浅色。
  }
}
</script>

<style scoped></style>
