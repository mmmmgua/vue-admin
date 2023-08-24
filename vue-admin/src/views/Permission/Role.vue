<template>
  <div class="flex column">
    <div class="flex flex-between">
      <div class="flex">
        <a-button :icon="h(PlusOutlined)" type="primary" @click="showConfigureRoleDialog('add')">
          {{ $t('roleView.add_roles') }}
        </a-button>
        <a-input class="m-l-md" :placeholder="t('roleView.search_placeholder')" allowClear></a-input>
        <a-button :icon="h(SearchOutlined)" type="primary" class="m-l-md">
          {{ $t('roleView.search') }}
        </a-button>
        <a-button :icon="h(RedoOutlined)" class="m-l-md">
          {{ $t('roleView.reset') }}
        </a-button>
      </div>
      <a-button :icon="h(DeleteOutlined)" type="primary" danger @click="batchDelete">{{ $t('roleView.batch_delete') }}</a-button>
    </div>
    <a-table class="m-t-lg" :columns="tableColumns" :rowSelection="rowSelection" :loading="tableLoading"
      :dataSource="currentData" rowKey="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          <span :class="generateStatusColumnClass(record.status)">
            {{ $t(`menuView.${STATUS_TYPE[record.status]}`) }}
          </span>
        </template>
        <template v-if="column.key === 'action'">
          <div class="flex items-center justify-between">
            <a-button class="action-button" type="link" @click="showConfigureRoleDialog('edit', record)">
              {{ $t('menuView.edit') }}
            </a-button>
            <a-dropdown>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="showDeleteModal(record)">
                    <DeleteOutlined style="font-size: 12px;" />
                    {{ $t('menuView.delete') }}
                  </a-menu-item>
                  <a-menu-item @click="showConfigureRoleDrawer(record)">
                    <UserOutlined style="font-size: 12px;" />
                    {{ $t('roleView.role_permission') }}
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button type="link">
                {{ $t('base.more') }}
                <DownOutlined style="font-size: 10px;" />
              </a-button>
            </a-dropdown>
          </div>
        </template>
      </template>
    </a-table>
    <configure-role-dialog ref="dialog"></configure-role-dialog>
    <configure-role-drawer ref="drawer"></configure-role-drawer>
  </div>
</template>

<script setup lang='ts'>
import { h, inject, onMounted, ref } from 'vue'
import { PlusOutlined, SearchOutlined, RedoOutlined, DeleteOutlined, DownOutlined, UserOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { VueI18nTranslation } from 'vue-i18n'
import { MessageApi } from 'ant-design-vue/es/message'
import ConfigureRoleDialog from './components/ConfigureRoleDialog.vue'
import ConfigureRoleDrawer from './components/ConfigureRoleDrawer.vue'
import { role } from './types/role'
import { getRoles } from '@/api/role'

const STATUS_TYPE = { 0: 'status_normal', 1: 'status_stop' }
const t = inject<VueI18nTranslation>('t') as VueI18nTranslation
const message = inject<MessageApi>('message') as MessageApi

const dialog = ref()
const drawer = ref()
const tableLoading = ref<boolean>(false)
const tableColumns = ref<object[]>(
  [
    {
      title: t('roleView.role_key'),
      dataIndex: 'roleKey'
    },
    {
      title: t('roleView.role'),
      dataIndex: 'roleName'
    },
    {
      title: t('roleView.status'),
      dataIndex: 'status'
    },
    {
      title: t('roleView.action'),
      key: 'action'
    },
  ]
)
const selectRowKeys = ref<string[]>([])
const rowSelection = ref<object>({
  fixed: true,
  selectRowKeys: selectRowKeys.value,
  onChange: (selectedList: string[]) => selectRowKeys.value = selectedList
})
const currentData = ref<role[]>()

onMounted(() => {
  getRolesList()
})

function showConfigureRoleDialog(dialogType: string, roleInfo?: role): void {
  dialog.value.show(dialogType, roleInfo)
}
async function getRolesList(): Promise<void> {
  try {
    tableLoading.value = true
    const { data } = await getRoles()
    if (data.code === 0) {
      currentData.value = data.data.dataList
    } else {
      message.warning(data.msg)
    }
    tableLoading.value = false
  } catch (error) {
    tableLoading.value = false
    message.error('error.server_error')
  }
}
function generateStatusColumnClass(status: number): string {
  if (status === 0) {
    return 'status-normal'
  } else {
    return 'status-stop'
  }
}
function showDeleteModal(record: role) {
  Modal.confirm({
    title: t('base.tips'),
    content: `${t('base.delete_tips')} ( ${t('roleView.role_key')}: ${record.roleKey} )`,
    okText: t('base.confirm'),
    cancelText: t('base.cancel'),
    maskClosable: false,
    onOk: () => deleteRole(record)
  })
}
function batchDelete() {
  if (selectRowKeys.value.length < 1) {
    return message.warn(t('roleView.empty_select'))
  }
  Modal.confirm({
    title: t('base.tips'),
    content: `${t('base.delete_tips')}`,
    okText: t('base.confirm'),
    cancelText: t('base.cancel'),
    maskClosable: false,
    onOk: () => deleteRole()
  })
}
async function deleteRole(record?: role) {
  try {
    await mock(record?.id || 1)
    message.success(t('base.success'))
  } catch (error) {
    message.error('error.server_error')
  }
}
function mock(id: number) {
  return new Promise(res => {
    setTimeout(() => {
      res(id)
    }, 1500)
  })
}
function showConfigureRoleDrawer(record: role) {
  drawer.value.show(record)
}
</script>

<style scoped>
.m-l-md {
  margin-left: 10px;
}

.m-t-lg {
  margin-top: 20px;
}

.status-normal {
  color: #18ca39;
}

.status-stop {
  color: #db2214;
}
</style>