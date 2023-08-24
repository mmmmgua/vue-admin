<template>
  <a-drawer v-model:open="drawerVisible" :title="t('roleView.role_permission')" :maskClosable="false">
    <a-tree v-model:checkedKeys="checkedKeys" v-model:selectedKeys="selectedKeys" :treeData="treeResource" checkable></a-tree>
    <template #footer>
      <div class="flex flex-end">
        <a-button type="primary" :loading="saveBtnLoading" @click="savePermission">{{ $t('base.save') }}</a-button>
      </div>
    </template>
  </a-drawer>
</template>

<script setup lang='ts'>
import { inject, ref } from 'vue'
import { VueI18nTranslation } from 'vue-i18n'
import { MessageApi } from 'ant-design-vue/es/message'
import { TreeNodeProps } from 'ant-design-vue/es/vc-tree'
import { role } from '../types/role'
import { getAllMenuTree } from '@/api/menu'
import { menuTree } from '../types/menu'

const t = inject<VueI18nTranslation>('t') as VueI18nTranslation
const message = inject<MessageApi>('message') as MessageApi

const drawerVisible = ref<boolean>(false)
const treeResource = ref<TreeNodeProps[]>()
const checkedKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const saveBtnLoading = ref<boolean>(false)

function show(roleInfo: role) {
  drawerVisible.value = true
  getMenuTree()  
}
function close() {
  drawerVisible.value = false
}
async function getMenuTree() {
  try {
    const { data } = await getAllMenuTree()
    if (data.code === 0) {
      treeResource.value = generateTree(data.data)
    } else {
      message.error(data.msg)
    }
  } catch (error) {
    message.error(JSON.stringify(error))
  }
}
function generateTree(menuList: menuTree[]): TreeNodeProps[] {
  let res: TreeNodeProps[] = []
  menuList.forEach(menu => {
    const node = {
      key: menu.id,
      value: menu.id,
      title: () => t(`menu.${menu.menuName}`),
      children: generateTree(menu.child || [])
    }
    res.push(node)
  })
  return res
}
async function savePermission() {
  try {
    saveBtnLoading.value = true
    await mock()
    saveBtnLoading.value = false
    close()
    message.success(t('base.success'))
  } catch (error) {
    saveBtnLoading.value = false
    message.error(t('error.server_error'))
  }
}
function mock() {
  return new Promise(res => {
    setTimeout(() => {
      res(null)
    }, 1500);
  })
}

defineExpose({
  show,
  close
})

</script>

<style scoped>

</style>