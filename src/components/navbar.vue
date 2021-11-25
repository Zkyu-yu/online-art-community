<template>
  <div class="main">
    <div class="header">
      <div class="logo" @click="goHome">
        <img src="../assets/img/logo.svg" />
        <div class="logo_text">Human ByeBye</div>
      </div>
      <div class="nav">
        <ul>
          <li :class="{ active: activeTab === 1 }" @click="goAbout">About us</li>
          <li :class="{ active: activeTab === 2 }" @click="goBlogPage">Blog</li>
          <li :class="{ active: activeTab === 3 }" @click="goContact">Contact</li>
          <li v-if="!isSign" @click="goLogin">Sign in</li>
          <li v-else :class="{ active: activeTab === 4 }" @click="goSpace">My Space</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core'
import router from '../router'

export default defineComponent({
  name: 'Navbar',
  props: {
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const isSign = ref(false)
    const goHome = () => {
      router.push({ name: 'Home' })
    }
    const goAbout = () => {
      router.push({ name: 'About' })
    }
    const goBlogPage = () => {
      router.push({ name: 'BlogPage' })
    }
    const goContact = () => {
      router.push({ name: 'Contact' })
    }
    const goLogin = () => {
      router.push({ name: 'Login' })
    }
    const goSpace = () => {
      router.push({ name: 'MySpace' })
    }
    return {
      isSign,
      goHome,
      goAbout,
      goBlogPage,
      goContact,
      goLogin,
      goSpace,
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
      ul .active {
        text-decoration: underline;
      }
    }
  }
}
</style>
