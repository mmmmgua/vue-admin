<template>
  <a-modal v-model:open="visible" :title="t('userView.assigning_roles')" :okText="t('base.confirm')"
    :cancelText="t('base.cancel')" :confirmLoading="confirmBtnLoading" @ok="setPermission">
    <a-table :loading="tableLoading" :columns="tableColumns" :dataSource="tableResource" :rowSelection="rowSelection"
      :pagination="false" rowKey="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          <span :class="generateStatusColumnClass(record.status)">
            {{ $t(`menuView.${STATUS_TYPE[record.status]}`) }}
          </span>
        </template>
      </template>
    </a-table>
  </a-modal>
</template>

<script setup lang='ts'>
import { inject, ref } from 'vue'
import { VueI18nTranslation } from 'vue-i18n'
import { MessageApi } from 'ant-design-vue/es/message'
import { getRoles } from '@/api/role'
import { role } from '../types/role'

const STATUS_TYPE = { 0: 'status_normal', 1: 'status_stop' }
const t = inject<VueI18nTranslation>('t') as VueI18nTranslation
const message = inject<MessageApi>('message') as MessageApi

const visible = ref<boolean>(false)
const userId = ref<number | undefined>()
const tableLoading = ref<boolean>()
const confirmBtnLoading = ref<boolean>()
const tableColumns = ref<object[]>(
  [
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: t('roleView.role'),
      dataIndex: 'roleName'
    },
    {
      title: t('roleView.status'),
      dataIndex: 'status'
    }
  ]
)
const tableResource = ref<role[]>([])
const selectRowKeys = ref<string[]>([])
const rowSelection = ref<object>({
  fixed: true,
  selectRowKeys: selectRowKeys.value,
  onChange: (selectedList: string[]) => selectRowKeys.value = selectedList
})

function show(id: number) {
  visible.value = true
  userId.value = id
  getRole()
}
function close() {
  visible.value = false
}
async function getRole() {
  try {
    tableLoading.value = true
    const { data } = await getRoles()
    if (data.code === 0) {
      tableResource.value = data.data.dataList
    } else {
      message.warn(data.msg)
    }
    tableLoading.value = false
  } catch (error) {
    tableLoading.value = false
    message.error(t('error.server_error'))
  }
}
function generateStatusColumnClass(status: number): string {
  if (status === 0) {
    return 'status-normal'
  } else {
    return 'status-stop'
  }
}
async function setPermission() {
  try {
    if (!selectRowKeys.value.length) {
      return message.warn(t('userView.empty_select'))
    }
    confirmBtnLoading.value = true
    await mock()
    confirmBtnLoading.value = false
    close()
    message.success(t('base.success'))
  } catch (error) {
    confirmBtnLoading.value = false
    message.error(t('error.server_error'))
  }
}
function mock() {
  return new Promise(res => {
    setTimeout(() => {
      res(null)
    }, 1500)
  })
}


defineExpose({
  show,
  close
})
</script>

<style scoped lang="scss">
.status-normal {
  color: #18ca39;
}

.status-stop {
  color: #db2214;
}
</style>@/api/role/role