<template lang="pug">
nav.header-nav(:style="{minHeight: `${headerNavHeight}px`}")
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>

<style lang="sass" scoped>
.header-nav
  position: fixed
  top: 0
  width: 100vw
  z-index: 7
  box-shadow: 0 1px 2px rgba($bg-white, .5)
  transition: all .3s ease-in-out
</style>
