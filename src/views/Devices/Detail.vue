<template lang="pug">
div#devices-detail.bg-dark
  b-field
    b-radio(v-model="showType" native-value="latest" :disabled="!device.online") 最新
    b-radio(v-model="showType" native-value="past") 過去
  b-field(label="日時" horizontal)
    b-datetimepicker(v-model="datetime" :disabled="showType !== 'past'" :timepicker="{enableSeconds: true}"
                     locale="ja-JP" :mobile-native="false" :focusable="false"
                     :min-datetime="chartDateRange[0]" :max-datetime="chartDateRange[1]")
  div.mt-3.flex: button.button.is-rounded.right(@click="moreFetch") 更新
  b-tabs
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
  import {computed, defineComponent, onMounted, reactive, toRefs, watch} from '@vue/composition-api'
  import {Device, DeviceData, Gas, Humidity, Pressure, Temperature} from '@/types'
  import {DeviceDataModel, DeviceModel} from '@/models'
  import {getChartData, getChartLabels, getGasData, getHumidityData, getPressureData, getTemperatureData} from '@/modules/deviceDataModule'

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
    tooltips: {
      enabled: false
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: 'white'
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: 'white',
          maxTicksLimit: 1,
          maxRotation: 0
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
        datetime: new Date() as Date,
        showType: 'latest'
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

        if (!data.device.online) data.showType = 'past'

        const length = data.deviceDatas.length
        let index
        if (length <= 100) index = 0
        else index = length - 100
        data.datetime = data.deviceDatas[index].createdAt
      }

      const moreFetch = async () => {
        if (data.isFetching) return
        if (data.deviceDatas.length === 0) return
        data.isFetching = true
        const createdAt = data.deviceDatas[data.deviceDatas.length-1].createdAt
        const from = `${createdAt.getFullYear()}-${createdAt.getMonth()+1}-${createdAt.getDate()}-${createdAt.getHours()}-${createdAt.getMinutes()}-${createdAt.getSeconds()+1}`
        const deviceDataList = await new DeviceDataModel().getList({deviceName: data.device.deviceName, from})
        data.deviceDatas.push(...deviceDataList.data.items)
        data.isFetching = false
      }

      const chartDateRange = computed(() => {
        if (data.isFetching) return [new Date(), new Date()]
        if (data.deviceDatas.length <= 100) {
          return [data.deviceDatas[0].createdAt, data.deviceDatas[0].createdAt]
        } else {
          return [data.deviceDatas[0].createdAt, data.deviceDatas[data.deviceDatas.length-100].createdAt]
        }
      })

      const chartData = computed(() => {
        if (data.showType === 'latest') return data.deviceDatas.slice(data.deviceDatas.length-100)
        const index = data.deviceDatas.findIndex(deviceData => {
          return deviceData.createdAt.getTime() >= data.datetime.getTime()
        })
        return data.deviceDatas.slice(index, index+100)
      })

      const gasChartProps = computed(() => {
        const gasData = getGasData(chartData.value)
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
        const humidityData = getHumidityData(chartData.value)
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
        const pressureData = getPressureData(chartData.value)
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
        const temperatureData = getTemperatureData(chartData.value)
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
        gasChartProps, 
        humidityChartProps, pressureChartProps, temperatureChartProps,
        chartDateRange,
        moreFetch
      }
    }
  })
</script>

<style lang="sass">
#devices-detail
  .control-label
    color: white
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
