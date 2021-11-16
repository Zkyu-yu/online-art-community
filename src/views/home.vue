<template>
  <div>Welcome to the Art Community!</div>
  <button @click="goLogin">click me!</button>
  <Test></Test>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Test from '../components/test.vue'
import router from '../router'

export default defineComponent({
  name: 'Home',
  components: {
    Test,
  },
  setup() {
    const goLogin = () => {
      router.push({ name: 'Login' })
    }
    return {
      goLogin,
    }
  },
})
</script>
