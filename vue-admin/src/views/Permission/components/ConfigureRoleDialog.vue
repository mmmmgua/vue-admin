<template>
  <a-modal v-model:open="visible" :title="t(`roleView.${type}_roles`)" :okText="t('base.confirm')"
    :cancelText="t('base.cancel')" :confirm-loading="confirmBtnLoading" @ok="submit" @cancel="close">
    <a-form class="form-layout" :rules="formRules" :model="currentData" ref="form">
      <a-form-item :label="t('roleView.label_name')" name="roleName">
        <a-input v-model:value="currentData.roleName"></a-input>
      </a-form-item>
      <a-form-item :label="t('roleView.role_key')" name="roleKey">
        <a-input v-model:value="currentData.roleKey"></a-input>
      </a-form-item>
      <a-form-item :label="t('roleView.label_order')" name="seq">
        <a-input-number :min="0" v-model:value="currentData.seq"></a-input-number>
      </a-form-item>
      <a-form-item :label="t('roleView.label_status')" required>
        <a-switch v-model:checked="currentSwitch" :checked-children="$t('roleView.switch_close')"
          :un-checked-children="$t('roleView.switch_using')" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang='ts'>
import { inject, markRaw, reactive, readonly, ref, toRaw } from 'vue'
import { VueI18nTranslation } from 'vue-i18n'
import { MessageApi } from 'ant-design-vue/es/message'
import { Rule } from 'ant-design-vue/es/form'
import { role } from '../types/role'

const t = inject<VueI18nTranslation>('t') as VueI18nTranslation
const message = inject<MessageApi>('message') as MessageApi

const form = ref()
const visible = ref<boolean>(false)
const confirmBtnLoading = ref<boolean>(false)
const type = ref<string>('add')
const currentSwitch = ref<boolean>(false)
const currentData = ref<role>({} as role)
const initData = {...currentData.value}
const formRules: Record<string, Rule[]> = {
  roleName: [{ required: true, message: t('error.empty_warning') }],
  roleKey: [{ required: true, message: t('error.empty_warning') }],
  seq: [{ required: true, message: t('error.empty_warning') }],
  status: [{ required: true, message: t('error.empty_warning') }]
}

function show(dialogType: string = 'add', roleInfo: role) {
  type.value = dialogType
  visible.value = true
  if (dialogType === 'edit') {
    currentData.value = {...roleInfo}
    currentSwitch.value = roleInfo.status === 0
    
  }
}
function close() {
  visible.value = false
  currentData.value = {...initData}
}
function submit() {
  form.value.validate().then(async valid => {
    confirmBtnLoading.value = true
    if (type.value === 'add') {
      await addRole()
    } else if (type.value === 'edit') {
      await editRole()
    }
    message.success(t('base.success'))
    confirmBtnLoading.value = false
    close()
  }).catch(() => {
    confirmBtnLoading.value = false
    // ignore
  })
}
async function addRole(){
  await mock()
}
async function editRole(){
  await mock()
}
function mock():any{
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

<style scoped lang="scss">
.form-layout {
  margin-top: 20px;
}
</style>