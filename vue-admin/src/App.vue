<template>
  <a-config-provider
    :local="locale"
    :theme="{
      token: token[appStore.theme]
    }"
  >
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAppStore } from "@/stores/app";
import { messages, getLocalLanguage } from "@/i18n/index";
import { token } from '@/assets/theme/MaterialToken'

const appStore = useAppStore()
const locale = computed(() => {
  return messages[getLocalLanguage()];
});

onMounted(() => {
  setThemeColor();
});

// 设置并监听系统主题
const setThemeColor = (): void => {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
  useAppStore().theme = isDarkTheme.matches ? "dark" : "light";
  isDarkTheme.addEventListener("change", ({ matches }) => {
    useAppStore().theme = matches ? "dark" : "light";
  });
};
</script>

<style scoped>
</style>