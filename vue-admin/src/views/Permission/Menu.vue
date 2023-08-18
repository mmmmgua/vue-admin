<template>
  <div class="menu-container">
    <a-button class="add" type="primary">{{ $t('base.add') }}</a-button>
    <div class="table-layout">
      <a-table :dataSource="tableResource" :columns="tableColumns" :loading="tableLoading"
        :rowClassName="customColumnClass" childrenColumnName="child">
        <template #bodyCell="{column, record}">
          <template v-if="column.key === 'status'">
            <span :class="record.status === 0 ? 'status-normal' : 'status-stop'">
              {{ $t(`menuView.${STATUS_TYPE[record.status]}`) }}
            </span>
          </template>
          <template v-if="column.key === 'action'">
            <div class="flex items-center justify-between">
              <a-button class="action-button" type="text">{{ $t('menuView.edit') }}</a-button>
              <a-button class="action-button"  type="text">{{ $t('menuView.delete') }}</a-button>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { MessageApi } from 'ant-design-vue/es/message'
import { VueI18nTranslation } from 'vue-i18n'
import { getAllMenuTree } from '@/api/menu'

type menuTree = {
  child: menuTree[],
  status: number
}
const MENU_TYPE = {
  1: 'type_directory',
  2: 'type_menu',
  3: 'type_button'
}
const STATUS_TYPE = { 0: 'status_normal', 1: 'status_stop' }

const t = inject<VueI18nTranslation>('t') as VueI18nTranslation
const message = inject<MessageApi>('message') as MessageApi

const tableColumns = ref<object[]>(
  [
    {
      title: t('menuView.menu_name'),
      dataIndex: 'menuName',
      key: 'id',
      customRender: ({ text }: any) => t(`menu.${text}`)
    },
    {
      title: t('menuView.type'),
      dataIndex: 'menuType',
      key: 'menuType',
      customRender: ({ text }) => t(`menuView.${MENU_TYPE[text]}`)
    },
    {
      title: t('menuView.component'),
      dataIndex: 'component',
      key: 'component'
    },
    {
      title: t('menuView.path'),
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: t('menuView.seq'),
      dataIndex: 'seq',
      key: 'seq'
    },
    {
      title: t('menuView.status'),
      dataIndex: 'status',
      key: 'status',
      customRender: ({ text }) => t(`menuView.${STATUS_TYPE[text]}`)
    },
    {
      title: t('menuView.permission'),
      dataIndex: 'perms',
      key: 'perms'
    },
    {
      title: t('menuView.action'),
      key: 'action',
      width: 120
    }
  ]
)
const tableResource = ref<menuTree[]>([])
const tableLoading = ref<boolean>(false)

onMounted(() => {
  getMenuTree()
})

async function getMenuTree() {
  try {
    tableLoading.value = true
    const { data } = await getAllMenuTree()
    tableLoading.value = false
    if (data.code === 0) {
      tableResource.value = data.data as menuTree[]
    } else {
      message.error(data.msg)
    }
  } catch (error) {
    message.error(JSON.stringify(error))
  }
}

function customColumnClass(record: menuTree) {
  return generateStatusColumnClass(record.status)
}

function generateStatusColumnClass(status: number): string {
  if (status === 0) {
    return 'status-normal'
  } else {
    return 'status-stop'
  }
}
</script>

<style scoped lang="scss">
.menu-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .add {
    width: 80px;
  }
  .table-layout {
    margin-top: 20px;
  }
  .status-normal {
    color: #18ca39;
  }
  .status-stop {
    color: #db2214;
  }
  .action-button {
    color: var(--primary-color);
  }
}
</style>
