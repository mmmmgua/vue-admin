<template>
  <svg :class="svgClass" v-bind="$attrs">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {token} from '@/assets/theme/MaterialToken'
import { useAppStore } from '@/stores/app'


const appStore = useAppStore()
const props = defineProps({
  name: String,
  color: String
})

const iconDefault = ref<string>(token[appStore.theme]['iconDefault'])
const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.name) return `svg-icon icon-${props.name}`
  return 'svg-icon'
})

watch(appStore, () => {
  iconDefault.value = token[appStore.theme]['iconDefault']
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  /* 部分svg由图片生成,以下属性曲线救国修改颜色 */
  fill: v-bind(props?.color || iconDefault);
}
</style>