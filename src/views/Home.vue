<template lang="pug">
div.bg-light: div#home
  div.notifications
    b-notification(type="is-warning" has-icon)
      span アルコール濃度の上昇を検出しました
    b-notification
      span こまめに水分補給しましょう
    b-notification
      span 溜息が多いかも？

  div.box.mt-2
    div.bold ストレスレベル
    div.mt-2.flex: div.right
      span.is-size4.pr-1 先月比
      span.bold.is-negative 
        span.is-size1.is-negative 3
        span.is-size2 %↓
      span.pr-2
      span.is-size4.pr-1 昨日比
      span.bold.is-positive
        span.is-size2 10
        span %↑

  div.mt-2.box
    div.bold
      b-icon.is-size2(icon="walking")
      span 歩数
    div.mt-2.flex
      div.mr-3
        span.pr-1 今週の目標
        span.is-size2 5,000
        span 歩
      div.right
        button.button.is-small.is-success.is-rounded.is-outlined.bg-white 設定
    b-progress.mt-2(:max="5000")
      b-progress-bar(slot="bar" :value="4343" show-value)
      b-progress-bar(slot="bar" :value="523" type="is-primary" show-value) 今日
    div.mt-2.flex: div.right
      span.is-size4.pr-1 今日
      span.bold.is-size2 523
      span.bold 歩 
      span.pr-2
      span.is-size4.pr-1 達成率
      span.bold.is-size2 97
      span.bold %

  //- div.mt-3.box
  //-   div.bold 大気圧
  //-   div.flex: div.right
  //-     span.pr-1.is-size4 今日
  //-     span.bold.is-size2 1020
  //-     span.bold hPa
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

      return {
      }
    }
  })
</script>

<style lang="sass">
#home
  .notification
    .icon
      font-size: $size-3
</style>

<style lang="sass" scoped>
#home
  padding: .75rem
  padding-bottom: calc( #{$footer-nav-height} + .75rem )
  .notification
    border-radius: 8px
    border: 2px solid $primary
    background-color: white
    margin-bottom: 0
    padding: .75rem
    & + .notification
      margin-top: 0.5rem
    &::last-child
      margin-bottom: 2rem
  .is-positive
    color: $positive
  .is-negative
    color: $negative
</style>
