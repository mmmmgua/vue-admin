<template>
  <div class="nav-bar">
    <div @click="toggleMenu">
      <menu-unfold-outlined v-if="isMenuShown" class="icon" />
      <menu-fold-outlined v-else class="icon" />
    </div>
    <div>
      <logout-outlined :title="t('base.log_out')" class="icon" @click="showExitModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const t = inject("t");
const router = useRouter()

const props = defineProps(["isMenuShown"]);
const emit = defineEmits(["toggleMenu"]);

const toggleMenu = (): void => {
  emit("toggleMenu");
};
const showExitModal = (): void => {
  Modal.confirm({
    title: t("base.notice"),
    content: `${t("base.exit_content")}?`,
    centered: true,
    cancelText: t("base.cancel"),
    okText: t("base.confirm"),
    onOk: async(close) => {
      await useUserStore().logout()
      close()
      router.replace('/login')
    }
  });
};
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
  color: var(--icon-color);
}
</style>