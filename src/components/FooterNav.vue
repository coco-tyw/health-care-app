<template lang="pug">
nav#footer-nav.flexbox
  router-link.footer-nav-item(to="/" exact)
    b-icon(icon="home")
    span Home
  router-link.footer-nav-item(to="/graphs" exact)
    b-icon(icon="chart-line")
    span Graph
  router-link.footer-nav-item(to="/setting" exact)
    b-icon(icon="cog")
    span Setting
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api'

  export default defineComponent({
    setup() {

    }
  })
</script>

<style lang="sass" scoped>
  #footer-nav
    position: fixed
    bottom: 0
    width: 100vw
    height: $footer-nav-height
    z-index: 9
    box-shadow: 0 -4px 8px rgba($black, .1)
    .footer-nav-item
      display: flex
      flex-direction: column
      align-items: center
      flex: 1
      padding: .5rem 0
      color: gainsboro
      .icon
        font-size: 1.5rem
      &.router-link-active
        color: $primary
        .label
          color: currentColor
</style>
