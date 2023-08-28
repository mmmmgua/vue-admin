<template>
  <div class="flex column" ref="homeLayout">
    <div class="card-layout">
      <a-card class="card card-shadow">
        <div class="flex items-center flex-evenly">
          <ConsoleSqlOutlined class="icon sql-color"></ConsoleSqlOutlined>
          <div class="value-layout">
            <span>{{ $t('homeView.sql_times') }}</span>
            <span class="value">90000</span>
          </div>
        </div>
      </a-card>
      <a-card class="card card-shadow">
        <div class="flex items-center flex-evenly">
          <WechatOutlined class="icon wechat-color"></WechatOutlined>
          <div class="value-layout">
            <span>{{ $t('homeView.wechat_visitor') }}</span>
            <span class="value">1024</span>
          </div>
        </div>
      </a-card>
      <a-card class="card card-shadow">
        <div class="flex items-center flex-evenly">
          <SafetyOutlined class="icon safety-color"></SafetyOutlined>
          <div class="value-layout">
            <span>{{ $t('homeView.safety_disk') }}</span>
            <span class="value">600</span>
          </div>
        </div>
      </a-card>
      <a-card class="card card-shadow">
        <div class="flex items-center flex-evenly">
          <RiseOutlined class="icon upload-color"></RiseOutlined>
          <div class="value-layout">
            <span>{{ $t('homeView.upload_logs') }}</span>
            <span class="value">200</span>
          </div>
        </div>
      </a-card>
    </div>
    <div class="charts-layout">
      <div class="line-chart" id="lineCharts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, watch, ref, shallowRef, reactive, onBeforeMount } from 'vue'
import { ConsoleSqlOutlined, SafetyOutlined, WechatOutlined, RiseOutlined } from '@ant-design/icons-vue'
import { VueI18nTranslation } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import { token } from '@/assets/theme/MaterialToken'

const echarts = inject('echarts')
const t = inject<VueI18nTranslation>('t') as VueI18nTranslation

const appStore = useAppStore()
const homeLayout = ref()
const textPrimary = ref<string>(token[appStore.theme]['textPrimary'])
const cardBackground = ref<string>(token[appStore.theme]['cardBackground'])
const lineCharts = shallowRef()
const resizeObserver = ref<ResizeObserver>()

// tmp
const option = reactive({
  title: {
    text: t('homeView.week_visitors'),
    textStyle: { color: textPrimary.value }
  },
  xAxis: {
    type: 'category',
    data: [t('base.Mon'), t('base.Tue'), t('base.Wed'), t('base.Thu'), t('base.Fri'), t('base.Sat'), t('base.Sun')]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
})

onMounted(() => {
  initLineChart(option)
  resizeObserver.value = new ResizeObserver(() => {
    // TODO: 防抖
    lineCharts.value.resize()
  })
  resizeObserver.value.observe(homeLayout.value)
})

onBeforeMount(() => {
  if (resizeObserver.value) {
    resizeObserver.value.disconnect()
  }
})

watch(appStore, () => {
  textPrimary.value = token[appStore.theme]['textPrimary']
  cardBackground.value = token[appStore.theme]['cardBackground']
  option.title.textStyle.color = textPrimary.value
  if (lineCharts.value) {
    lineCharts.value.setOption(option, true)
  }
})

function initLineChart(option: any) {
  lineCharts.value = echarts.init(document.getElementById('lineCharts'))
  lineCharts.value.setOption(option)
}
</script>

<style lang="scss" scoped>
:deep(.ant-card) {
  background: v-bind(cardBackground);
}

.card-layout {
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 16px;
}

.icon {
  font-size: 50px;
}

.wechat-color {
  color: #7BB32E;
}

.safety-color {
  color: #c4302b;
}

.sql-color {
  color: #FFA500
}

.upload-color {
  color: #9b59b6;
}

.value-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;

  .value {
    font-size: 24px;
    font-weight: bold;
  }
}

.card {
  color: var(--color-primary);
}

.card-shadow {
  box-shadow: 2px 2px 10px rgba($color: #000000, $alpha: .3);
}

.card-shadow:hover {
  box-shadow: 0px 2px 20px rgba($color: #1677ff, $alpha: 1);
}

.charts-layout {
  width: 100%;
  margin-top: 30px;

  .line-chart {
    width: 100%;
    height: 400px;
  }
}
</style>
