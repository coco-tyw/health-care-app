<template lang="pug">
div#devices-detail
  span devices-detail
</template>

<script lang="ts">
  import {defineComponent, reactive, toRefs} from '@vue/composition-api'
  import {DeviceData} from '@/types'
  import {DeviceDataModel} from '@/models'

  export default defineComponent({
    setup() {
      const data = reactive({
        deviceDatas: [] as DeviceData[]
      })
      new DeviceDataModel().getList().then(res => {
        data.deviceDatas = res.data.deviceDatas
        console.log(data.deviceDatas)
      })

      return {
        ...toRefs(data)
      }
    }
  })
</script>

<style lang="sass" scoped>
#devices-detail
</style>
