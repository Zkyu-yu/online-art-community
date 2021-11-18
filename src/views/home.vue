<template>
  <div class="container">
    <Navbar></Navbar>
    <Carousel></Carousel>
    <CardHome></CardHome>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Navbar from '../components/navbar.vue'
import Carousel from '../components/carousel.vue'
import CardHome from '../components/cardHome.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Navbar,
    Carousel,
    CardHome,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.container {
  width: 100%;
  background-color: #000;
}
</style>
