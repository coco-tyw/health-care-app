<template lang="pug">
nav#footer-nav.flexbox.bg-white
  router-link.footer-nav-item(to="/" exact)
    b-icon(icon="home")
    span.is-size5 ホーム
  router-link.footer-nav-item(to="/devices")
    b-icon(icon="microchip")
    span.is-size5 ディバイス
  router-link.footer-nav-item(to="/setting" exact)
    b-icon(icon="cog")
    span.is-size5 設定
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
    border-radius: 32px 32px 0 0
    padding: 0 2rem
    background-color: white
    overflow: hidden
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
