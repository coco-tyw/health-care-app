<script lang="ts">
  import Vue, {PropType} from 'vue'
  import {Line, mixins} from 'vue-chartjs'
  import {ChartData, ChartOptions} from 'chart.js'

  export default Vue.extend({
    mixins: [Line, mixins.reactiveProp],
    props: {
      chartData: Object as PropType<ChartData>,
      options: Object as PropType<ChartOptions>
    },
    mounted() {
      (this as any).renderChart(this.chartData, this.options)
      this.$nextTick(() => {
        (this as any).renderChart(this.chartData, this.options)
      })
    }
  })
</script>
