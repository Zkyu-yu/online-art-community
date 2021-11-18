<template>
  <div class="main">
    <div class="header">
      <div class="logo">
        <!-- <img src="../assets/img/logo.png" /> -->
      </div>
      <div class="nav">
        <ul>
          <li>About us</li>
          <li>Blog</li>
          <li>Contact</li>
          <li @click="goLogin">Sign in</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import router from '../router'

export default defineComponent({
  name: 'Navbar',
  setup() {
    const goLogin = () => {
      router.push({ name: 'Login' })
    }
    return {
      goLogin,
    }
  },
})
</script>

<style lang="scss">
.main {
  // position: fixed;
  width: 100%;
  height: 60px;
  // z-index: 200;
  color: #fff;
  .header {
    display: flex;
    max-width: 1200px;
    padding-top: 5px;
    margin: 0 auto;
    justify-content: space-between;
    .logo img {
      display: block;
      border-radius: 50%;
    }
    .nav {
      ul li {
        float: left;
        list-style: none;
        cursor: pointer;
        margin-right: 70px;
        font-family: 'Coda';
      }
    }
  }
}
</style>
