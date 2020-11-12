<template lang="pug">
div#devices-detail.bg-dark
  b-field(label="リアルタイム" horizontal)
    b-checkbox(v-model="realtime" :disabled="!device.online")
  b-field(label="日時" horizontal)
    b-datetimepicker(:disabled="realtime")
  b-tabs.mt-3
    b-tab-item(label="匂い")
      LineChart(:chart-data="gasChartProps.chartData" :chart-options="gasChartProps.chartOptions"
                v-if="!isFetching")
    b-tab-item(label="湿度")
      LineChart(:chart-data="humidityChartProps.chartData" :chart-options="humidityChartProps.chartOptions"
                v-if="!isFetching")
    b-tab-item(label="圧力")
      LineChart(:chart-data="pressureChartProps.chartData" :chart-options="pressureChartProps.chartOptions"
                v-if="!isFetching")
    b-tab-item(label="気温")
      LineChart(:chart-data="temperatureChartProps.chartData" :chart-options="temperatureChartProps.chartOptions"
                v-if="!isFetching")
</template>

<script lang="ts">
  import {computed, defineComponent, reactive, toRefs} from '@vue/composition-api'
  import {Device, DeviceData, Gas, Humidity, Pressure, Temperature} from '@/types'
  import {DeviceDataModel, DeviceModel} from '@/models'
  import {getChartData, getChartLabels, getDates, getGasData, getHumidityData, getPressureData, getTemperatureData} from '@/modules/deviceDataModule'

  import Vue, {PropType} from 'vue'
  import {Line, mixins} from 'vue-chartjs'
  import {ChartData, ChartOptions} from 'chart.js'

  type ChartProps = {
    chartData: ChartData,
    chartptions: ChartOptions
  } 

  const defaultChartOptions = {
    legend: {
      display: false,
      labels: {
        fontColor: '#FFF'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: 'white'
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: 'white'
        }
      }]
    }
  }

  const LineChart = Vue.extend({
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: {
      chartData: Object as PropType<ChartData>,
      chartOptions: Object as PropType<ChartOptions>
    },
    mounted() {
      (this as any).renderChart(this.chartData, this.chartOptions)
    }
  })

  export default defineComponent({
    components: {LineChart},
    setup(_ , {root}) {
      const data = reactive({
        device: {} as Device,
        deviceDatas: [] as DeviceData[],
        isFetching: false,
        realtime: false,
        chartRange: [0, 1]
      })

      const init = async () => {
        data.isFetching = true
        const deviceList = await new DeviceModel().getList()
        data.device = deviceList.data.items.find((item: Device) => item.id === Number(root.$route.params.id))
        if (!data.device.deviceName) {
          data.isFetching = false
          return
        }
        const deviceDataList = await new DeviceDataModel().getList({deviceName: data.device.deviceName})
        data.deviceDatas = deviceDataList.data.items
        data.isFetching = false

        const dates = getDates(data.deviceDatas)
        console.log(dates[0], dates[dates.length-1])
      }

      const moreFetch = async () => {
        if (data.isFetching) return
        data.isFetching = true
        const deviceDataList = await new DeviceDataModel().getList({deviceName: data.device.deviceName})
        data.deviceDatas.push(...deviceDataList.data.items)
        data.isFetching = false
      }

      const chartDateRange = computed(() => {
        const dates = getDates(data.deviceDatas)
        if (dates.length <= 100) return // 一点
        // 複数点
        console.log(dates[0], dates[dates.length-1])
        return dates
      })

      const gasChartProps = computed(() => {
        const gasData = getGasData(data.deviceDatas)
        return {
          chartData: {
            labels: getChartLabels(gasData),
            datasets: [{
              data: getChartData(gasData),
              backgroundColor: '#FFF'
            }]
          },
          chartOptions: defaultChartOptions
        }
      })

      const humidityChartProps = computed(() => {
        const humidityData = getHumidityData(data.deviceDatas)
        return {
          chartData: {
            labels: getChartLabels(humidityData),
            datasets: [{
              data: getChartData(humidityData),
              backgroundColor: '#FFF'
            }]
          },
          chartOptions: defaultChartOptions
        }
      })

      const pressureChartProps = computed(() => {
        const pressureData = getPressureData(data.deviceDatas)
        return {
          chartData: {
            labels: getChartLabels(pressureData),
            datasets: [{
              data: getChartData(pressureData),
              backgroundColor: '#FFF'
            }]
          },
          chartOptions: defaultChartOptions
        }
      })

      const temperatureChartProps = computed(() => {
        const temperatureData = getTemperatureData(data.deviceDatas)
        return {
          chartData: {
            labels: getChartLabels(temperatureData),
            datasets: [{
              data: getChartData(temperatureData),
              backgroundColor: '#FFF'
            }]
          },
          chartOptions: defaultChartOptions
        }
      })

      /** init **/
      init()

      return {
        ...toRefs(data),
        gasChartProps, humidityChartProps, pressureChartProps, temperatureChartProps
      }
    }
  })
</script>

<style lang="sass">
#devices-detail
  .label
    color: $text-white
  .tabs
    margin-bottom: 0
    ul
      border: none
      justify-content: center
      li
        a
          border: none
          color: $text-white !important
        &.is-active
          a
            font-weight: $bold
            font-size: 1.25rem
</style>

<style lang="sass" scoped>
#devices-detail
  color: $text-white
  padding: .75rem
  overflow-y: scroll
</style>
