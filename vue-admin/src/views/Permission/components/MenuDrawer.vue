<template>
  <a-drawer :title="drawerTitle" v-model:open="visible" width="500" :maskClosable="false" @close="close">
    <a-form class="form-layout">
      <a-form-item :label="$t('menuView.type')" required>
        <a-radio-group v-model:value="currentData.menuType">
          <a-radio v-for="(type, key) in MENU_TYPE" :key="key" :value="parseInt(key)">
            {{ $t(`menuView.${type}`) }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label="$t('menuView.menu_name')" required>
        <a-input v-model:value="currentData.menuName"></a-input>
      </a-form-item>
      <a-form-item :label="$t('menuView.type_menu')">
        <a-tree-select v-model:value="treeSelected" :placeholder="$t('menuView.root')" :treeData="treeData" allow-clear></a-tree-select>
      </a-form-item>
      <a-form-item :label="$t('menuView.path_label')" required>
        <a-input v-model:value="currentData.path" :placeholder="$t('menuView.path_placeholder')"></a-input>
      </a-form-item>
      <a-form-item :label="$t('menuView.component_label')" required>
        <a-input v-model:value="currentData.component" :placeholder="$t('menuView.component_placeholder')"></a-input>
      </a-form-item>
      <a-form-item :label="$t('menuView.icon_label')">
        <a-popover content="" title="" trigger="focus">
          <a-button type="primary">{{ $t('menuView.choose_icon') }}</a-button>
        </a-popover>
      </a-form-item>
      <a-form-item :label="$t('menuView.order_label')">
        <a-input-number v-model:value="currentData.seq" :min="0"></a-input-number>
      </a-form-item>
      <a-form-item :label="$t('menuView.using')">
        <a-switch v-model:checked="currentSwitch" :checked-children="$t('menuView.close')" :un-checked-children="$t('menuView.using')" />
      </a-form-item>
      <div class="operation-layout">
        <a-button class="close-btn" @click="close">{{ $t('menuView.close') }}</a-button>
        <a-button type="primary">{{ $t('menuView.confirm') }}</a-button>
      </div>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { VueI18nTranslation } from 'vue-i18n'
import { TreeSelectProps } from 'ant-design-vue'
import { menuTree } from '../types/menu'
import { getTreeNodeById } from '@/utils/utils'

const MENU_TYPE = {
  1: 'type_directory',
  2: 'type_menu',
  3: 'type_button'
}
const t = inject<VueI18nTranslation>('t') as VueI18nTranslation
const props = defineProps(['data'])

const visible = ref<boolean>(false)
const drawerTitle = ref<string>('')
const treeData = ref<TreeSelectProps[]>([])
const treeSelected = ref<string | undefined>(undefined)
const currentData = ref<menuTree>({} as menuTree)
const currentSwitch = ref<boolean>(true)


function show(type: string, menuInfo: menuTree | undefined): void {
  drawerTitle.value = t(`menuView.${type}`)
  visible.value = true
  treeData.value =  generateTree(props.data)
  if (type === 'edit') {
    currentData.value = menuInfo as menuTree
    // 0 意味着根目录
    if (currentData.value.parentId != 0) {
      const node = getTreeNodeById(currentData.value.parentId, props.data)
      treeSelected.value = t(`menu.${node.menuName}`)
    }
    if (currentData.value.status !== 0) {
      currentSwitch.value = false
    } 
  }
}
function close(): void {
  visible.value = false
  currentData.value = {} as menuTree
}
function generateTree(menuList: menuTree[]): TreeSelectProps[] {
  let res:TreeSelectProps[] = []
  menuList.forEach(menu => {
    const node = {
      checkable:false,
      key: menu.id,
      value: menu.id,
      title: () => t(`menu.${menu.menuName}`),
      children: generateTree(menu.child || [])
    }
    res.push(node)
  })
  return res
}

// https://cn.vuejs.org/api/sfc-script-setup.html#defineexpose
defineExpose({
  show,
  close
})
</script>

<style scoped lang="scss">
.form-layout {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

  .operation-layout {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;

    .close-btn {
      margin-right: 10px;
    }
  }
}
</style>