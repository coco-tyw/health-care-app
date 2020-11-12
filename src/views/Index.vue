<template lang="pug">
div#index
  transition(name="slide-fade" mode="out-in")
    router-view.main-view
  footer-nav
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api'
  import FooterNav from '@/components/FooterNav.vue'

  export default defineComponent({
    components: {FooterNav},
    setup() {

    }
  })
</script>

<style lang="sass" scoped>
  #index
    height: 100%
    width: 100vw
    .main-view
      position: fixed
      height: 100%
      width: 100%
      overflow-y: auto
</style>
