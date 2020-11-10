<template lang="pug">
div#home.bg-gray
  div.columns.is-mobile
    div.column.is-6
      div.box
        div.bold ストレスレベル
        div.flex.mt-3: div.right.flexbox
          div.is-size4.mr-2 先月比
          div.bold.is-size1.is-negative
            span 3%
            span ↓
        div.flex.mt-3: div.right.flexbox
          div.is-size5.mr-2 昨日比
          div.bold.is-positive
            span 10%
            span ↑

      div.box
        div.bold
          b-icon(icon="walking")
          span 歩数
        div.mt-1.flexbox
          div 今週の目標 5,000歩
          div.right: button.button.right.is-info.is-outlined.is-small 設定
        div.columns.is-mobile.mt-1
          div.column.is-6
            span.is-size4 今日 
            span.bold 323
            span.is-size4 歩
          div.column.is-6
            span.is-size4 今週 
            span.bold 4,343
            span.is-size4 歩
        WalkingChart.mt-1(v-if="!isFetching" :chart-data="walkingGraph.chartData", :options="walkingGraph.options" :styles="{'display':'flex', 'justify-content':'center'}")


    div.column.is-6
      div.box
        div.bold 大気圧
        div.flex: div.bold.right 1020Pa
        PressureChart(v-if="!isFetching" :chart-data="pressureGraph.chartData", :options="pressureGraph.options")
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue'
  import {Doughnut, Line} from 'vue-chartjs'
  import {computed, defineComponent, reactive, toRefs} from '@vue/composition-api'
  import {ChartData, ChartOptions} from 'chart.js'
  import {DeviceDataModel} from '@/models'
  import {DeviceData} from '@/types'

  const PressureChart = Vue.extend({
    extends: Line,
    props: {
      chartData: Object as PropType<ChartData>,
      options: Object as PropType<ChartOptions>
    },
    mounted() {
      (this as any).renderChart(this.chartData, this.options)
    }
  })

  const WalkingChart = Vue.extend({
    extends: Doughnut,
    props: {
      chartData: Object as PropType<ChartData>,
      options: Object as PropType<ChartOptions>
    },
    mounted() {
      (this as any).renderChart(this.chartData, this.options)
    }
  })

  export default defineComponent({
    components: {PressureChart, WalkingChart},
    setup() {
      const data = reactive({
        deviceDatas: [] as DeviceData[],
        isFetching: true
      })
      new DeviceDataModel().getList().then(res => {
        data.deviceDatas = res.data.deviceDatas
      }).finally(() => {
        data.isFetching = false
      })

      const pressureGraph = computed(() => {
        const _data = [] as number[]
        data.deviceDatas.forEach(deviceData => {
          _data.push(deviceData.pressure)
        })
        return {
          chartData: {
            datasets: [{
              data: _data
            }]
          },
          options: {
            legend: {
              display: false
            }
          }
        }
      })

      const walkingGraph = computed(() => {
        const _data = [] as number[]
        return {
          chartData: {
            labels: ['今日まで', '今日', '残り'],
            datasets: [{
              data: [75, 5, 20],
              backgroundColor: ['#f87979', '#aa4c8f', '#38b48b']
            }]
          },
          options: {
            cutoutPercentage: 75,
            legend: {
              display: false
            }
          }
        }
      })

      return {
        ...toRefs(data),
        pressureGraph, walkingGraph
      }
    }
  })
</script>

<style lang="sass" scoped>
  #home
    padding: .75rem
    .is-positive
      color: $positive
    .is-negative
      color: $negative
</style>
