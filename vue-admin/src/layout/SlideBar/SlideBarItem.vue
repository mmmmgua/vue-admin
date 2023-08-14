<template>
  <div v-if="!item.hidden">
    <a-menu-item ref="subMenu" :key="item.path">
      <span v-if="item.meta">{{ $t(`menu.${item?.meta?.title ?? 'menu'}`) }}</span>
    </a-menu-item>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps(['item', 'basePath'])

onMounted(() => {
  console.log(props.item)
})
</script>

<style></style>
