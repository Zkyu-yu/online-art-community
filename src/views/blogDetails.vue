<template>
  <div class="container">
    <Navbar></Navbar>
    <Details></Details>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/runtime-core'
import Navbar from '../components/navbar.vue'
import Details from '../components/blog/details.vue'
import Footer from '../components/footer.vue'
import router from '../router'

export default defineComponent({
  name: 'BlogDetails',
  components: {
    Navbar,
    Details,
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
