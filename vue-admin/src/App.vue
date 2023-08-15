<template>
  <a-config-provider
    :local="locale"
    :theme="{
      token: {
        colorPrimary: '#1677ff'
      },
    }"
  >
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAppStore } from "@/stores/app";
import messages, { getLanguage } from "@/i18n/index";

const appStore = useAppStore()
const locale = computed(() => {
  return messages[getLanguage()];
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
