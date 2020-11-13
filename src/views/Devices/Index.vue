<template lang="pug">
div.bg-light: div#devices-index
  div.flexbox
    div.right
      button.button.is-info.is-outlined.is-rounded(@click="openDeviceAddModal")
        b-icon(icon="plus")
        span 連携
  div.devices.mt-1
    div.device.box.clickable(v-for="device in devices" :key="device.id"
                             @click="onClick(device)"): div.flexbox
      div.device-active.mr-2(:class="{'is-active': device.online}")
      div 
        span.pr-1 {{ device.name }}
        span.mini-description {{ device.situation }}
      div.right(v-if="device.batteryPercent !== null")
        div: b-icon(icon="battery-full")
</template>

<script lang="ts">
  import {defineComponent, reactive, toRefs} from '@vue/composition-api'
  import DeviceAddModal from '@/components/modals/DeviceAddModal.vue'
  import {ModalProgrammatic as Modal} from 'buefy'
  import {DeviceModel} from '@/models'
  import {Device} from '@/types'

  export default defineComponent({
    setup(_, {root}) {
      const data = reactive({
        devices: [] as Device[]
      })

      new DeviceModel().getList().then(res => {
        data.devices.push(...res.data.items)
      })

      const openDeviceAddModal = () => Modal.open({
        parent: root,
        component: DeviceAddModal
      })
      const onClick = (device: Device) => {
        root.$router.push(`/devices/${device.id}`)
      }

      return {
        ...toRefs(data),
        onClick,
        openDeviceAddModal
      }
    }
  })
</script>

<style lang="sass" scoped>
  #devices-index
    padding: .75rem
    padding-bottom: calc( #{$footer-nav-height} + .75rem )
    .button
      &:not(:hover)
        background-color: white
    .devices
      .device
        padding: .75rem
        margin-bottom: 0
        border: 2px solid white
        &:hover
          border: 2px solid $primary
        & + .device
          margin-top: .5rem
        &-active
          width: .5rem
          height: .5rem
          background-color: gainsboro
          border-radius: .25rem
          &.is-active
            background-color: rgb(59, 175, 117)

</style>
