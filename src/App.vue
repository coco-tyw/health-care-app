<template lang="pug">
div#app
  transition(name="slide-fade" mode="out-in")
    router-view
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api'

  export default defineComponent({
    setup() {
      
    }
  })
</script>

<style lang="sass">
#app
  height: 100%
</style>
