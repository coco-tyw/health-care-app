<template lang="pug">
div#index
  transition(name="slide-fade" mode="out-in")
    router-view.container
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
    width: 100%
    > .container
      height: 100%
      width: 100%
</style>
