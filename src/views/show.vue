<template>
  <div class="container">
    <Navbar :active-tab="2"></Navbar>
    <div class="show_container">show</div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Navbar from '../components/navbar.vue'
import Footer from '../components/footer.vue'

export default defineComponent({
  name: 'Show',
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
  margin-top: 60px;
  background-color: #121212;
  .show_container {
    color: #e2e8f2;
  }
}
</style>
