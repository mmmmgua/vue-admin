<template>
  <svg :class="svgClass" v-bind="$attrs">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: String,
  color: String
})

console.log(props.color)

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.name) return `svg-icon icon-${props.name}`
  return 'svg-icon'
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
  /* 部分svg由图片生成,以下属性曲线救国修改颜色 */
  filter: drop-shadow(v-bind(props['color']) 100px 0);
  transform: translateX(-100px);
}
</style>