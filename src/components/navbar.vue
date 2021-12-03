<template>
  <div class="main">
    <div class="menu">
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
          <el-icon class="icon" @click="isOpen = true"><search /></el-icon>
        </ul>
      </div>
    </div>
  </div>
  <div class="search_dialog">
    <el-dialog v-model="isOpen" fullscreen>
      <el-input v-model="input" placeholder="Search...">
        <template #append>
          <el-icon class="icon" @click="goSearch"><search /></el-icon>
        </template>
      </el-input>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core'
import { Search } from '@element-plus/icons'
import router from '../router'

export default defineComponent({
  name: 'Navbar',
  components: {
    Search,
  },
  props: {
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const isSign = ref(true)
    const isOpen = ref(false)
    const input = ref('')
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
    const goSearch = () => {
      console.log('search')
    }
    return {
      isSign,
      isOpen,
      input,
      goHome,
      goAbout,
      goBlogPage,
      goContact,
      goLogin,
      goSpace,
      goSearch,
      Search,
    }
  },
})
</script>

<style lang="scss">
.main {
  position: fixed;
  top: 0px;
  width: 100%;
  height: 60px;
  color: #fcfcfc;
  background-color: #121212;
  z-index: 200;
  .menu {
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
      ul .icon {
        font-size: 20px;
        padding-top: 4px;
        cursor: pointer;
        &:hover {
          color: #fff;
          font-weight: 800;
        }
      }
    }
  }
}
.search_dialog {
  .el-dialog {
    background-color: rgba(#121212, 0.8);
  }
  .el-dialog__body {
    padding-top: 40vh;
  }
  .el-input__inner {
    font-size: 35px;
    font-family: 'Coda';
    letter-spacing: 4px;
    padding-left: 20px;
    padding-bottom: 10px;
    color: #fff;
    background-color: rgba(#121212, 0);
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #fff;
  }
  .el-input-group {
    width: 95%;
    margin: 0 50px;
  }
  .el-input-group__append {
    background-color: rgba(#121212, 0);
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #fff;
  }
  .el-icon {
    font-size: 30px;
    color: rgba(#fff, 0.8);
  }
}
</style>
