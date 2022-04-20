<template>
  <div class="container">
    <Navbar :active-tab="1"></Navbar>
    <div class="about_container">
      <div class="text">
        <div>黑泽宇zkyu</div>
        <div>business cooperation: zkyu1024@126.com</div>
      </div>
    </div>
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
  margin-top: 60px;
  background-color: #121212;
  .about_container {
    display: flex;
    width: 100%;
    height: 100vh;
    background-image: url('../assets/img/zkyu.jpg');
    background-size: 100% 100%;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-family: 'Coda';
    color: #e2e8f2;
    .text {
      display: block;
      transform: translate(0, 250px);
    }
  }
}
</style>
