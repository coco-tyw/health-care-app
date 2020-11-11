<template lang="pug">
div#devices-detail
  b-loading(:active="isFetching")
  div.tile.box
    div.bold Gas
    LineChart.mt-1(:chart-data="gasChartProps.chartData" :chart-options="gasChartProps.chartOptions"
              v-if="!isFetching")
  div.tile.box
    div.bold Humidity
    LineChart.mt-1(:chart-data="humidityChartProps.chartData" :chart-options="humidityChartProps.chartOptions"
              v-if="!isFetching")
  div.tile.box
    div.bold Pressure
    LineChart.mt-1(:chart-data="pressureChartProps.chartData" :chart-options="pressureChartProps.chartOptions"
              v-if="!isFetching")
  div.tile.box
    div.bold temperature
    LineChart.mt-1(:chart-data="temperatureChartProps.chartData" :chart-options="temperatureChartProps.chartOptions"
              v-if="!isFetching")
</template>

<script lang="ts">
  import {computed, defineComponent, reactive, toRefs} from '@vue/composition-api'
  import {Device, DeviceData, Gas, Humidity, Pressure, Temperature} from '@/types'
  import {DeviceDataModel, DeviceModel} from '@/models'
  import {getChartData, getChartLabels, getGasData, getHumidityData, getPressureData, getTemperatureData} from '@/modules/deviceDataModule'

  import Vue, {PropType} from 'vue'
  import {Line} from 'vue-chartjs'
  import {ChartData, ChartOptions} from 'chart.js'

  type ChartProps = {
    chartData: ChartData,
    chartptions: ChartOptions
  }

  const LineChart = Vue.extend({
    extends: Line,
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
        isFetching: true
      })

      const init = async () => {
        const deviceList = await new DeviceModel().getList()
        data.device = deviceList.data.items.find((item: Device) => item.id === Number(root.$route.params.id))
        if (!data.device.deviceName) {
          data.isFetching = false
          return
        }
        const deviceDataList = await new DeviceDataModel().getList({deviceName: data.device.deviceName})
        data.deviceDatas = deviceDataList.data.items
        data.isFetching = false
      }

      const gasChartProps = computed(() => {
        const gasData = getGasData(data.deviceDatas)
        return {
          chartData: {
            labels: getChartLabels(gasData),
            datasets: [{
              data: getChartData(gasData)
            }]
          },
          chartOptions: {
            legend: {
              display: false
            }
          }
        }
      })

      const humidityChartProps = computed(() => {
        const humidityData = getHumidityData(data.deviceDatas)
        return {
          chartData: {
            labels: getChartLabels(humidityData),
            datasets: [{
              data: getChartData(humidityData)
            }]
          },
          chartOptions: {
            legend: {
              display: false
            }
          }
        }
      })

      const pressureChartProps = computed(() => {
        const pressureData = getPressureData(data.deviceDatas)
        return {
          chartData: {
            labels: getChartLabels(pressureData),
            datasets: [{
              data: getChartData(pressureData)
            }]
          },
          chartOptions: {
            legend: {
              display: false
            }
          }
        }
      })

      const temperatureChartProps = computed(() => {
        const temperatureData = getTemperatureData(data.deviceDatas)
        return {
          chartData: {
            labels: getChartLabels(temperatureData),
            datasets: [{
              data: getChartData(temperatureData)
            }]
          },
          chartOptions: {
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
        gasChartProps, humidityChartProps, pressureChartProps, temperatureChartProps
      }
    }
  })
</script>

<style lang="sass" scoped>
#devices-detail
  padding: .75rem
  overflow-y: scroll
</style>
