<template lang="pug">
div#device-add-modal.bg-white
  b-steps(animated)
    b-step-item(step="1" label="デバイス選択")
      div.flex
        b-dropdown.right(v-model="selectedDevice")
          button.button(slot="trigger")
            span(v-if="selectedDevice") {{ selectedDevice.name }}
            span(v-else) デバイス
            b-icon(icon="caret-down")
          b-dropdown-item(v-for="device in devices" :key="device.id" :value="device") {{ device.name }}

    b-step-item(step="2" label="認証")
      div.text-centered アクティベーションコード
      div.flexbox
        input.input(type="number")
        input.input(type="number")
        input.input(type="number")
        div -
        input.input(type="number")
        input.input(type="number")
        input.input(type="number")
        input.input(type="number")
        input.input(type="number")

    b-step-item(step="3" label="完了")
      div.text-centered 連携が完了しました
      div.mt-1.flex.has-centered: button.button.is-success.is-outlined.bg-pure-white(@click="close") 終了

</template>

<script lang="ts">
  import {defineComponent, reactive, toRefs} from '@vue/composition-api'

  export default defineComponent({
    setup(_, {emit}) {
      const data = reactive({
        devices: [
          {
            id: 1,
            name: 'スマートフォン / タブレット'
          }, {
            id: 2,
            name: 'Apple watch'
          }, {
            id: 3,
            name: 'Bit mask'
          }, {
            id: 4,
            name: 'Bit earphone'
          }, {
            id: 5,
            name: 'Bit chair'
          }
        ],
        selectedDevice: null
      })

      const close = () => {
        emit('close')
      }

      return {
        ...toRefs(data),
        close
      }
    }
  })
</script>

<style lang="sass">
#device-add-modal
  .step-details
    margin-top: .25rem
  .step-navigation
    display: flex
    .pagination-next
      margin-left: auto
</style>

<style lang="sass" scoped>
#device-add-modal
  padding: .75rem
</style>
