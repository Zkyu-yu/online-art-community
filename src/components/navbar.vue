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
          <el-dropdown v-else class="mySpace">
            <li :class="{ active: activeTab === 4 }" @click="goSpace">My Space</li>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="isPost = true">Post Blog</el-dropdown-item>
                <el-dropdown-item>Message</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-icon class="icon" @click="isOpen = true"><search /></el-icon>
        </ul>
      </div>
    </div>
  </div>
  <!-- 搜索 -->
  <div class="search_dialog">
    <el-dialog v-model="isOpen" fullscreen>
      <el-input v-model="searchInput" placeholder="Search...">
        <template #append>
          <el-icon class="icon" @click="goSearch"><search /></el-icon>
        </template>
      </el-input>
      <!-- 根据标题查找 -->
      <div class="atTitle" @click="atTitle">
        <div class="button" :style="{ background: onAtTitle ? '#fff' : '' }"></div>
        <div class="word" :style="{ color: onAtTitle ? '#fff' : '' }">title</div>
      </div>
      <!-- 根据用户查找 -->
      <div class="atActor" @click="atActor">
        <div class="button" :style="{ background: onAtActor ? '#fff' : '' }"></div>
        <div class="word" :style="{ color: onAtActor ? '#fff' : '' }">actor</div>
      </div>
    </el-dialog>
  </div>
  <!-- 发布 -->
  <div class="post_dialog">
    <el-dialog v-model="isPost" fullscreen>
      <el-input v-model="blogTitle" placeholder="blog title" />
      <el-input v-model="blogContent" maxlength="500" placeholder="balabalabala..." show-word-limit type="textarea" />
      <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      </el-upload>
      <el-button style="margin-right: 19vw" @click="onSubmit">Submit</el-button>
      <el-button @click="onCancel">Cancel</el-button>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core'
import { Search } from '@element-plus/icons'
import { ElMessage } from 'element-plus'
import { formatDateTime } from '../hook/util'
import router from '../router'
import userInfo from '../hook/blogInfo'

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
    const { postBlog } = userInfo(window.localStorage.getItem('userName') as string)
    const isOpen = ref(false)
    const searchInput = ref('')
    const isPost = ref(false)
    const blogTitle = ref('')
    const blogContent = ref('')
    const isSign = localStorage.getItem('userName') !== null ? 1 : 0
    const onAtTitle = ref(false)
    const onAtActor = ref(false)
    // 根据标题查找
    const atTitle = () => {
      if (!onAtTitle.value) {
        onAtTitle.value = true
        onAtActor.value = false
      } else {
        onAtTitle.value = false
      }
    }
    // 根据用户查找
    const atActor = () => {
      if (!onAtActor.value) {
        onAtActor.value = true
        onAtTitle.value = false
      } else {
        onAtActor.value = false
      }
    }
    // 查找
    const goSearch = () => {
      if (onAtTitle.value) {
        isOpen.value = false
        router.push({ name: 'SearchResult', query: { title: searchInput.value } })
      } else if (onAtActor.value) {
        isOpen.value = false
        router.push({ name: 'SearchResult', query: { actor: searchInput.value } })
      } else {
        ElMessage.error('Please select at least one!')
      }
    }
    // nav跳转
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
    // 取消发布blog
    const onCancel = () => {
      isPost.value = false
    }
    // 发布blog
    const onSubmit = () => {
      if (!blogTitle.value) {
        ElMessage.error('You cannot say nothing!')
      } else {
        postBlog({
          title: blogTitle.value,
          actor: localStorage.getItem('userName') as unknown as string,
          date: formatDateTime(new Date()),
          content: blogContent.value,
          picture: '111',
        })
        isPost.value = false
        ElMessage.success('Sumbit Success :)')
      }
    }
    return {
      isOpen,
      searchInput,
      isPost,
      blogTitle,
      blogContent,
      isSign,
      onAtTitle,
      onAtActor,
      atTitle,
      atActor,
      goHome,
      goAbout,
      goBlogPage,
      goContact,
      goLogin,
      goSpace,
      goSearch,
      onCancel,
      onSubmit,
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
      .mySpace li {
        font-size: 18px;
        color: #fcfcfc;
        margin-top: -19px;
      }
    }
  }
}
// 下拉框样式
.el-dropdown__popper.el-popper[role='tooltip'] {
  border: none;
  top: 60px !important;
  margin-left: -35px !important;
}
.el-dropdown-menu {
  background-color: #121212;
  border-radius: 0%;
}
.el-dropdown-menu__item {
  color: #fcfcfc;
  padding-bottom: 5px;
  margin: 0 5px;
  text-align: center;
  font-size: 16px;
  letter-spacing: 1px;
  font-family: 'Coda';
  &:first-child {
    border-bottom: 1px solid rgba(#fff, 0.5);
  }
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #121212;
  color: #fff;
  font-weight: 800;
}
.el-dropdown__popper.el-popper[role='tooltip'] .el-popper__arrow::before {
  background-color: #121212;
  border: none;
}
.search_dialog {
  .atTitle,
  .atActor {
    float: left;
    margin-top: 30px;
    margin-left: 70px;
    color: rgba(#fcfcfc, 0.5);
    font-size: 25px;
    font-family: 'Coda';
    cursor: pointer;
    .button {
      float: left;
      width: 15px;
      height: 15px;
      margin-top: 11px;
      border: 2px solid rgba(#fcfcfc, 0.5);
    }
    .word {
      float: left;
      margin-left: 10px;
    }
    &:hover {
      color: #fff;
      .button {
        border: 2px solid #fff;
      }
    }
  }
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
    cursor: pointer;
    font-size: 30px;
    color: rgba(#fff, 0.8);
  }
}
.post_dialog {
  .el-dialog {
    background-color: rgba(#121212, 0.8);
  }
  .el-dialog__body {
    padding-top: 60px;
    padding-left: 20vw;
  }
  .el-input {
    width: 20vw;
  }
  .el-input__inner {
    font-size: 30px;
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
  .el-textarea {
    display: flex;
    width: 60vw;
    margin: 30px 0;
  }
  .el-textarea__inner {
    min-height: 12vw !important;
    font-size: 20px;
    font-family: 'Coda';
    letter-spacing: 4px;
    padding-top: 10px;
    color: #fff;
    background-color: rgba(#121212, 0);
  }
  .el-input__count {
    font-size: 12px;
    font-family: 'Coda';
    letter-spacing: 4px;
    color: #fff;
    background-color: rgba(#121212, 0);
  }
  .el-upload-dragger {
    color: #fff;
    width: 60vw;
    height: 20vw;
    background-color: rgba(#121212, 0);
    &:hover {
      border: 1px solid #fff;
    }
  }
  .el-upload__text {
    margin-top: 17vw;
    font-size: 15px;
    font-family: 'Coda';
    letter-spacing: 2px;
    em {
      color: #fff;
    }
  }
  .el-button {
    float: right;
    margin-top: 30px;
    margin-right: 2vw;
    font-family: 'Coda';
    background-color: rgba(#121212, 0);
    color: #fff;
  }
  .el-button + .el-button {
    background-color: #eee;
    color: #121212;
    border: 2px solid #121212;
  }
  .el-icon {
    font-size: 30px;
    color: rgba(#fff, 0.8);
  }
}
</style>
