<template>
  <div class="container">
    <Navbar :active-tab="4"></Navbar>
    <Introduction></Introduction>
    <Card :is-actor="1"></Card>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Navbar from '../components/navbar.vue'
import Introduction from '../components/mySpace/introduction.vue'
import Card from '../components/card.vue'
import Footer from '../components/footer.vue'

export default defineComponent({
  name: 'MySpace',
  components: {
    Navbar,
    Introduction,
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
}
</style>
