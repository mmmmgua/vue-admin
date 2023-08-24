<template>
  <div class="flex column">
    <div class="flex flex-between">
      <div class="flex">
        <a-button :icon="h(PlusOutlined)" type="primary" @click="showConfigureRoleDialog('add')">
          {{ $t('userView.add_user') }}
        </a-button>
        <a-input class="m-l-md" :placeholder="t('userView.search_placeholder')" allowClear></a-input>
        <a-button :icon="h(SearchOutlined)" type="primary" class="m-l-md">
          {{ $t('userView.search') }}
        </a-button>
        <a-button :icon="h(RedoOutlined)" class="m-l-md">
          {{ $t('userView.reset') }}
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
    <configure-user-dialog ref="dialog"></configure-user-dialog>
    <set-permission-dialog ref="permissionDialog"></set-permission-dialog>
  </div>
</template>

<script setup lang='ts'>
import { h, inject, onMounted, ref } from 'vue'
import { PlusOutlined, SearchOutlined, RedoOutlined, DeleteOutlined, DownOutlined, UserOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { VueI18nTranslation } from 'vue-i18n'
import { MessageApi } from 'ant-design-vue/es/message'
import ConfigureUserDialog from './components/ConfigureUserDialog.vue'
import SetPermissionDialog from './components/SetPermissionDialog.vue'
import { user } from './types/user'
import { getUserList } from '@/api/user'

const STATUS_TYPE = { 0: 'status_stop', 1: 'status_normal' }
const t = inject<VueI18nTranslation>('t') as VueI18nTranslation
const message = inject<MessageApi>('message') as MessageApi

const dialog = ref()
const permissionDialog = ref()
const drawer = ref()
const tableLoading = ref<boolean>(false)
const tableColumns = ref<object[]>(
  [
    {
      title: t('userView.id'),
      dataIndex: 'id'
    },
    {
      title: t('userView.username'),
      dataIndex: 'username'
    },
    {
      title: t('userView.phone'),
      dataIndex: 'phone'
    },
    {
      title: t('userView.email'),
      dataIndex: 'email'
    },
    {
      title: t('userView.create_time'),
      dataIndex: 'createTime'
    },
    {
      title: t('userView.status'),
      dataIndex: 'status'
    },
    {
      title: t('userView.action'),
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
const currentData = ref<user[]>()

onMounted(() => {
  getRolesList()
})

function showConfigureRoleDialog(dialogType: string, userInfo?: user): void {
  dialog.value.show(dialogType, userInfo)
}
async function getRolesList(): Promise<void> {
  try {
    tableLoading.value = true
    const { data } = await getUserList()
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
    return 'status-stop'
  } else {
    return 'status-normal'
  }
}
function showDeleteModal(record: user) {
  Modal.confirm({
    title: t('base.tips'),
    content: `${t('base.delete_tips')} ( ${t('userView.username')}: ${record.username} )`,
    okText: t('base.confirm'),
    cancelText: t('base.cancel'),
    maskClosable: false,
    onOk: () => deleteRole(record)
  })
}
function batchDelete() {
  if (selectRowKeys.value.length < 1) {
    return message.warn(t('userView.empty_select'))
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
async function deleteRole(record?: user) {
  try {
    await mock(record?.id || '1')
    message.success(t('base.success'))
  } catch (error) {
    message.error('error.server_error')
  }
}
function mock(id: string) {
  return new Promise(res => {
    setTimeout(() => {
      res(id)
    }, 1500)
  })
}
function showConfigureRoleDrawer(record: user) {
  permissionDialog.value.show(record)
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