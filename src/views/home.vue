<template>
  <div class="container">
    <Navbar :sign="isSign"></Navbar>
    <Carousel></Carousel>
    <Card></Card>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Navbar from '../components/navbar.vue'
import Carousel from '../components/home/carousel.vue'
import Card from '../components/card.vue'
import Footer from '../components/footer.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Home',
  components: {
    Navbar,
    Carousel,
    Card,
    Footer,
  },
  setup() {
    let route = useRoute()
    let isSign = Number(route.params.isSign)
    return { isSign }
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin-top: 60px;
  background-color: #121212;
}
</style>
