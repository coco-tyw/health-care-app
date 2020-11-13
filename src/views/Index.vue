<template lang="pug">
div#index
  header-nav
  transition(name="slide-fade" mode="out-in")
    router-view.main-view(:style="{paddingTop: `${headerNavHeight}px`}")
  footer-nav
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api'
  import HeaderNav from '@/components/HeaderNav.vue'
  import FooterNav from '@/components/FooterNav.vue'

  export default defineComponent({
    components: {HeaderNav, FooterNav},
    setup() {

    }
  })
</script>

<style lang="sass" scoped>
  #index
    position: fixed
    height: 100%
    width: 100vw
    .main-view
      // position: fixed
      height: 100%
      width: 100%
      overflow-y: auto
</style>
