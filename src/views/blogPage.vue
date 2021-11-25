<template>
  <div class="container">
    <Navbar :active-tab="2"></Navbar>
    <Card></Card>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Navbar from '../components/navbar.vue'
import Card from '../components/home/card.vue'
import Footer from '../components/footer.vue'

export default defineComponent({
  name: 'BlogPage',
  components: {
    Navbar,
    Card,
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
