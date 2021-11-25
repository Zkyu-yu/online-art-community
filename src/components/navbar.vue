<template>
  <div class="main">
    <div class="header">
      <div class="logo" @click="goHome">
        <img src="../assets/img/logo.svg" />
        <div class="logo_text">Human ByeBye</div>
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
    const goHome = () => {
      router.push({ name: 'Home' })
    }
    return {
      goLogin,
      goHome,
    }
  },
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 60px;
  color: #fcfcfc;
  .header {
    display: flex;
    width: 80%;
    font-size: 18px;
    padding-top: 20px;
    margin: 0 auto;
    justify-content: space-between;
    .logo {
      width: 20%;
      height: 30px;
      cursor: pointer;
      > img {
        float: left;
        width: 30px;
      }
      .logo_text {
        float: left;
        line-height: 30px;
        margin-left: 5px;
      }
    }
    .nav {
      ul li {
        float: left;
        list-style: none;
        cursor: pointer;
        margin-right: 70px;
        font-family: 'Coda';
        &:hover {
          color: #fff;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
