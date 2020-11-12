<template lang="pug">
div#home.bg-light
  div.notification.box
    ul.is-size4
      li アルコール濃度の上昇を検出しました
      li こまめに水分補給しましょう
      li 溜息が多いかも？

  div.box
    div.bold ストレスレベル
    div.mt-2.flex: div.right
      span.is-size4.pr-1 先月比
      span.bold.is-size1.is-negative 3%↓
      span.pr-2
      span.is-size4.pr-1 昨日比
      span.bold.is-size2.is-positive 10%↑

  div.mt-3.box
    div.bold
      b-icon.is-size2(icon="walking")
      span 歩数
    div.mt-2.flex
      div.mr-3
        span.pr-1 今週の目標
        span.is-size2 5,000歩
      div.right
        button.button.is-small.is-success.is-rounded.is-outlined.bg-white 設定
    b-progress.mt-2(:max="5000")
      b-progress-bar(slot="bar" :value="4343" show-value)
      b-progress-bar(slot="bar" :value="523" type="is-primary" show-value) 今日
    div.mt-2.flex: div.right
      span.is-size4.pr-1 今日
      span.bold.is-size2 523歩 
      span.pr-2
      span.is-size4.pr-1 達成率
      span.bold.is-size2 97%

  div.mt-3.box
    div.bold 大気圧
    div.flex: div.right
      span.pr-1.is-size4 今日
      span.bold.is-size2 1020Pa
    PressureChart(v-if="!isFetching" :chart-data="pressureGraph.chartData", :options="pressureGraph.options" style="width: 80%")
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue'
  import {Bar} from 'vue-chartjs'
  import {computed, defineComponent, reactive, toRefs} from '@vue/composition-api'
  import {ChartData, ChartOptions} from 'chart.js'
  import {DeviceDataModel, DeviceModel} from '@/models'
  import {Device, DeviceData} from '@/types'

  const PressureChart = Vue.extend({
    extends: Bar,
    props: {
      chartData: Object as PropType<ChartData>,
      options: Object as PropType<ChartOptions>
    },
    mounted() {
      (this as any).renderChart(this.chartData, this.options)
    }
  })

  export default defineComponent({
    components: {PressureChart},
    setup() {
      const data = reactive({
        deviceDatas: [] as DeviceData[],
        isFetching: true
      })

      const init = async () => {
        const deviceList = await new DeviceModel().getList()
        const device = deviceList.data.items.find((item: Device) => item.id === 1)
        if (!device.deviceName) {
          data.isFetching = false
          return
        }
        const deviceDataList = await new DeviceDataModel().getList({deviceName: device.deviceName})
        data.deviceDatas = deviceDataList.data.items
        data.isFetching = false
      }

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

      /** init **/
      init()

      return {
        ...toRefs(data),
        pressureGraph
      }
    }
  })
</script>

<style lang="sass" scoped>
#home
  padding: .75rem
  padding-bottom: calc( #{$footer-nav-height} + .75rem )
  .notification
    border-radius: 8px
    border: 2px solid $primary
    background-color: white
    li + li
      margin-top: .5rem
  .is-positive
    color: $positive
  .is-negative
    color: $negative
</style>
