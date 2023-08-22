<template>
  <div class="flex column">
    <div class="flex flex-between">
      <div class="flex">
        <a-button :icon="h(PlusOutlined)" type="primary" @click="show">
          {{ $t('roleView.add_roles') }}
        </a-button>
        <a-input class="m-l-md" :placeholder="t('roleView.search_placeholder')"></a-input>
        <a-button :icon="h(SearchOutlined)" type="primary" class="m-l-md">
          {{ $t('roleView.search') }}
        </a-button>
        <a-button :icon="h(RedoOutlined)" class="m-l-md">
          {{ $t('roleView.reset') }}
        </a-button>
      </div>
      <a-button :icon="h(DeleteOutlined)" type="primary" danger>{{ $t('roleView.batch_delete') }}</a-button>
    </div>
    <a-table class="m-t-lg" :columns="tableColumns" :rowSelection="rowSelection"></a-table>
    <configure-role-dialog ref="dialog"></configure-role-dialog>
  </div>
</template>

<script setup lang='ts'>
import { h, inject, ref } from 'vue'
import { PlusOutlined, SearchOutlined, RedoOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { VueI18nTranslation } from 'vue-i18n'
import ConfigureRoleDialog from './components/ConfigureRoleDialog.vue';

const t = inject<VueI18nTranslation>('t') as VueI18nTranslation

const dialog = ref()
const tableColumns = ref<object[]>(
  [
    {
      title: t('roleView.role_key'),
      dataIndex: 'roleKey',
      key: 'id'
    },
    {
      title: t('roleView.role'),
      dataIndex: 'roleKey',
      key: 'id'
    },
    {
      title: t('roleView.status'),
      dataIndex: 'status',
      key: 'id'
    },
    {
      title: t('roleView.action'),
      key: 'action'
    },
  ]
)
const rowSelection = ref<object>({
  fixed:true
})

function show():void{
  dialog.value.show()
}

</script>

<style scoped>
.m-l-md {
  margin-left: 10px;
}
.m-t-lg {
  margin-top: 20px;
}
</style>