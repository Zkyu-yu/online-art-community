<template>
  <div class="container">
    <Navbar :active-tab="1"></Navbar>
    <div>This is About me!</div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Navbar from '../components/navbar.vue'
import Footer from '../components/footer.vue'

export default defineComponent({
  name: 'About',
  components: {
    Navbar,
    Footer,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background-color: #121212;
}
</style>
