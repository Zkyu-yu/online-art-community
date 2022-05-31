<template>
  <div class="container">
    <Navbar :active-tab="3"></Navbar>
    <div class="title">| 书评 |</div>
    <Card :card-state="8"></Card>
    <div class="title">| 插画 |</div>
    <Card :card-state="6"></Card>
    <div class="title">| 诗歌 |</div>
    <Card :card-state="7"></Card>
    <div class="title">| 摄影 |</div>
    <Card :card-state="5"></Card>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Navbar from '../components/navbar.vue'
import Card from '../components/card.vue'
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
  margin-top: 60px;
  background-color: #121212;
  .title {
    color: #121212;
    background-color: #fff;
    padding-left: 120px;
    padding-top: 20px;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
