<template>
  <div>
    <a-dropdown>
      <svg-icon name="language" :color="color" class="icon"></svg-icon>
      <template #overlay> 
        <a-menu selectable :selectedKeys="selectedKeys" @select="selectLanguage">
          <a-menu-item v-for="(, name) in messages" :key="name">
            {{ t(`base.${name}`) }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang='ts'>
import { inject, onMounted, ref, watch } from "vue"
import { VueI18nTranslation } from "vue-i18n"
import { getLocalLanguage, messages, setLanguage } from "@/i18n"
import { token } from "@/assets/theme/MaterialToken"
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"
import { useAppStore } from "@/stores/app"
import { useRouter } from "vue-router"

const router = useRouter()
const t = inject<VueI18nTranslation>('t') as VueI18nTranslation

const appStore = useAppStore()
const color = ref<string>(token[appStore.theme]['colorPrimary'])
const selectedKeys = ref<string[]>()

onMounted(() => {
  const language = getLocalLanguage()
  selectedKeys.value = [language]
  appStore.language = language
})

watch(appStore, () => {
  color.value = token[appStore.theme]['colorPrimary']
})

function selectLanguage({ key }: any) {
  selectedKeys.value = [key]
  appStore.language = key
  setLanguage(key)
  router.go(0)
}
</script>

<style scoped lang="scss">
.icon {
  font-size: 18px;
  margin-bottom: 4px;
  cursor: pointer;
}
</style>