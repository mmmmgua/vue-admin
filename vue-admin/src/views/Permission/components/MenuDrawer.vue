<template>
  <a-drawer :title="t(`menuView.${drawerType}`)" v-model:open="visible" width="500" :maskClosable="false" @close="close">
    <a-form ref="form" class="form-layout" :rules="formRules" :model="currentData">
      <a-form-item name="menuType" :label="$t('menuView.type')" required>
        <a-radio-group v-model:value="currentData.menuType">
          <a-radio v-for="(type, key) in MENU_TYPE" :key="key" :value="parseInt(key)">
            {{ $t(`menuView.${type}`) }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item name="menuName" :label="$t(`menuView.${MENU_TYPE[currentData.menuType]}`) + $t('menuView.name')"
        required>
        <a-input v-model:value="currentData.menuName"></a-input>
      </a-form-item>
      <a-form-item :label="$t('menuView.type_menu')">
        <a-tree-select v-model:value="treeSelected" :placeholder="$t('menuView.root')" :treeData="treeData"
          allow-clear></a-tree-select>
      </a-form-item>
      <a-form-item v-if="currentData.menuType === 2" name="path" :label="$t('menuView.path_label')" required>
        <a-input v-model:value="currentData.path" :placeholder="$t('menuView.path_placeholder')"></a-input>
      </a-form-item>
      <a-form-item v-if="currentData.menuType === 2" name="component" :label="$t('menuView.component_label')" required>
        <a-input v-model:value="currentData.component" :placeholder="$t('menuView.component_placeholder')"></a-input>
      </a-form-item>
      <a-form-item v-if="currentData.menuType !== 3" :label="$t('menuView.icon_label')">
        <a-popover content="" title="" trigger="focus">
          <a-button type="primary">{{ $t('menuView.choose_icon') }}</a-button>
        </a-popover>
      </a-form-item>
      <a-form-item v-if="currentData.menuType === 3" :label="$t('menuView.permission')">
        <a-input v-model:value="currentData.perms"></a-input>
      </a-form-item>
      <a-form-item :label="$t('menuView.order_label')">
        <a-input-number v-model:value="currentData.seq" :min="0"></a-input-number>
      </a-form-item>
      <a-form-item :label="$t('menuView.using')">
        <a-switch v-model:checked="currentSwitch" :checked-children="$t('menuView.close')"
          :un-checked-children="$t('menuView.using')" />
      </a-form-item>
      <div class="operation-layout">
        <a-button class="close-btn" @click="close">{{ $t('menuView.close') }}</a-button>
        <a-button type="primary" @click="submit" :loading="confirmBtnLoading">
          {{ $t('menuView.confirm') }}
        </a-button>
      </div>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import { inject, ref, toRaw } from 'vue'
import { VueI18nTranslation } from 'vue-i18n'
import { TreeSelectProps } from 'ant-design-vue'
import { Rule } from 'ant-design-vue/es/form'
import { MessageApi } from 'ant-design-vue/es/message'
import { menuTree } from '../types/menu'
import { getTreeNodeById } from '@/utils/utils'

const MENU_TYPE:any = {
  1: 'type_directory',
  2: 'type_menu',
  3: 'type_button'
}
const t = inject<VueI18nTranslation>('t') as VueI18nTranslation
const message = inject<MessageApi>('message') as MessageApi
const props = defineProps(['data'])

// form控件实例
const form = ref()
// 是否显示drawer
const visible = ref<boolean>(false)
// type: add | edit
const drawerType = ref<string>('add') 
// tree-select组件数据源
const treeData = ref<TreeSelectProps[]>([])
// tree-select选中的值
const treeSelected = ref<string | undefined>(undefined)
// form表单的值
const currentData = ref<menuTree>({ menuType: 1 } as menuTree)
// 初始化的form表单值,用于close drawer后初始化currentData
const initData = toRaw(currentData.value)
// 表单内switch值
const currentSwitch = ref<boolean>(true)
// 表单确认按钮loading
const confirmBtnLoading = ref<boolean>(false)
// 表单校验规则
const formRules: Record<string, Rule[]> = {
  menuType: [{ required: true }],
  menuName: [{ required: true, message: t('error.empty_warning') }],
  path: [{ required: true, message: t('error.empty_warning') }],
  component: [{ required: true, message: t('error.empty_warning') }]
}

function show(type: string, menuInfo: menuTree | undefined): void {
  drawerType.value = type
  visible.value = true
  treeData.value = generateTree(props.data)
  if (type === 'edit') {
    currentData.value = {...menuInfo} as menuTree
    // 0 意味着根目录
    if (currentData.value.parentId != 0) {
      const node = getTreeNodeById(currentData.value.parentId, props.data)
      treeSelected.value = t(`menu.${node.menuName}`)
    } else {
      treeSelected.value = undefined
    }
    if (currentData.value.status !== 0) {
      currentSwitch.value = false
    }
  }
}
function close(): void {
  form.value.clearValidate(['menuName', 'path', 'component'])
  visible.value = false
  resetForm()
}
function resetForm(){
  currentData.value = {...initData}
  treeSelected.value = undefined
}
function generateTree(menuList: menuTree[]): TreeSelectProps[] {
  let res: TreeSelectProps[] = []
  menuList.forEach(menu => {
    const node = {
      checkable: false,
      key: menu.id,
      value: menu.id,
      title: () => t(`menu.${menu.menuName}`),
      children: generateTree(menu.child || [])
    }
    res.push(node)
  })
  return res
}
function submit() {
  form.value.validate().then(async(formData: any) => {
    if (drawerType.value === 'add') {
      // add menu
    }else if (drawerType.value === 'edit') {
      // edit menu
    }
    confirmBtnLoading.value = true
    await temp()
    confirmBtnLoading.value = false
    message.success(t('menuView.submit_success'))
    close()
  }).catch(() => {
    confirmBtnLoading.value = false
    // ignore
  })
}

function temp(){ 
  return new Promise(res => {
    setTimeout(() => {
      res(null)
    }, 1000);
  })
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