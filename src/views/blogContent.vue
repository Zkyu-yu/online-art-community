<template>
  <div class="container">
    <Navbar></Navbar>
    <Content></Content>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/runtime-core'
import Navbar from '../components/navbar.vue'
import Content from '../components/blog/content.vue'
import Footer from '../components/footer.vue'
import router from '../router'

export default defineComponent({
  name: 'BlogContent',
  components: {
    Navbar,
    Content,
    Footer,
  },
  setup() {
    const blogId = router.currentRoute.value.params._id
    // 父传子
    provide('blogId', blogId)
    return { blogId }
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
