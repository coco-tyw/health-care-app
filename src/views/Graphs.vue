<template lang="pug">
div#graphs
  span.is-size-1 graphs
    div(v-for="user in users" :key="user.id")
      div {{ user }}
</template>

<script lang="ts">
  import {defineComponent, reactive, toRefs} from '@vue/composition-api'
  import {UserModel} from '@/models'
  import {User} from '@/types'

  export default defineComponent({
    setup() {
      const data = reactive({
        users: [] as User[]
      })
      new UserModel().getList().then(res => {
        data.users.push(...res.data)
      })
      return {
        ...toRefs(data)
      }
    }
  })
</script>

<style lang="sass" scoped>
  #graphs
</style>
