<template>
  <div class="container">
    <Navbar></Navbar>
    <Content></Content>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Navbar from '../components/navbar.vue'
import Content from '../components/blog/content.vue'
import Footer from '../components/footer.vue'

export default defineComponent({
  name: 'BlogContent',
  components: {
    Navbar,
    Content,
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
