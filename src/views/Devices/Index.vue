<template lang="pug">
div#devices-index
  div.flexbox
    div.right
      button.button.is-info.is-outlined(@click="openDeviceAddModal")
        b-icon(icon="plus")
        span 連携
  div.devices.mt-3
    div.device.box.clickable(v-for="device in devices" :key="device.id"
                             @click="onClick(device)"): div.flexbox
      div.device-active.mr-3(:class="{'is-active': device.online}")
      div {{ device.name }}
      div.right(v-if="device.batteryPercent !== null")
        div: b-icon(icon="battery-full")
</template>

<script lang="ts">
  import {defineComponent, reactive, toRefs} from '@vue/composition-api'
  import DeviceAddModal from '@/components/modals/DeviceAddModal.vue'
  import {ModalProgrammatic as Modal} from 'buefy' 

  type Device = {
    id: number,
    online: boolean,
    name: string,
    batteryPercent: number | null
  }

  export default defineComponent({
    setup(_, {root}) {
      const data = reactive({
        devices: [] as Device[]
      })

      data.devices.push(...[
        {
          id: 1,
          online: true,
          name: 'Bit Mask ver.1',
          batteryPercent: 100
        }, {
          id: 2,
          online: false,
          name: 'Apple watch',
          batteryPercent: null
        }, {
          id: 3,
          online: false,
          name: 'iPhone X',
          batteryPercent: null
        }
      ])

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
    .button
      &:not(:hover)
        background-color: white
    .devices
      .device
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
