<template lang="pug">
div#index.bg-white
  div.main-view-wrapper: transition(name="slide-fade" mode="out-in")
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
    position: fixed
    height: 100%
    width: 100vw
    overflow-y: auto
    .main-view
      height: 100%
      width: 100%
      &-wrapper
        padding-bottom: $footer-nav-height
</style>
