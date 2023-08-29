<template>
  <div class="nav-bar">
    <div class="flex items-center">
      <div class="flex items-center">
        <span class="title">预设标题</span>
      </div>
      <div @click="toggleMenu" style="margin-left: 12px;">
        <menu-unfold-outlined v-if="isMenuShown" class="icon" />
        <menu-fold-outlined v-else class="icon" />
      </div>
    </div>
    <div class="flex items-center">
      <language class="m-r-md"></language>
      <logout-outlined :title="t('base.log_out')" class="icon" @click="showExitModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { VueI18nTranslation } from "vue-i18n"
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, } from "@ant-design/icons-vue"
import { Modal } from "ant-design-vue"
import Language from "../Language/Language.vue"
import { token } from '@/assets/theme/MaterialToken'
import { useUserStore } from "@/stores/user"
import { useAppStore } from "@/stores/app"

const t = inject<VueI18nTranslation>("t") as VueI18nTranslation
const router = useRouter()

defineProps(["isMenuShown"])
const emit = defineEmits(["toggleMenu"])
const appStore = useAppStore()
const iconColor = ref<string>(token[appStore.theme]['iconDefault'])

watch(appStore, () => {
  iconColor.value = token[appStore.theme]['iconDefault']
})

const toggleMenu = (): void => {
  emit("toggleMenu")
}
const showExitModal = (): void => {
  Modal.confirm({
    title: t("base.notice"),
    content: `${t("base.exit_content")}?`,
    centered: true,
    cancelText: t("base.cancel"),
    okText: t("base.confirm"),
    onOk: async (close) => {
      await useUserStore().logout()
      close()
      router.replace("/login")
    },
  })
}
</script>

<style scoped lang="scss">
.nav-bar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.icon {
  font-size: 18px;
  cursor: pointer;
  color: v-bind(iconColor);
}

.title {
  color: var(--text-primary);
  font-size: 24px;
  font-weight: bold;
  margin-left: 12px;
}
.m-r-md {
  margin-right: 20px;
}
</style>