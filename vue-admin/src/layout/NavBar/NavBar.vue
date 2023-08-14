<template>
  <div class="nav-bar">
    <div @click="toggleMenu">
      <menu-fold-outlined v-if="isMenuShown" class="icon" />
      <menu-unfold-outlined v-else class="icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";

const props = defineProps(["isMenuShown"]);
const emit = defineEmits(["toggleMenu"]);

const toggleMenu = (): void => {
  emit("toggleMenu");
};
</script>

<style scoped lang="scss">
.nav-bar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
}
.icon {
  font-size: 18px;
  cursor: pointer;
}
</style>