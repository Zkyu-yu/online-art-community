<template>
  <div class="control_container">
    <div class="control_head">
      线上艺术社区平台后台管理系统
      <el-icon class="inIcon" @click="loginOut"><switch-button /></el-icon>
      <el-icon class="inIcon" @click="goHome"><house /></el-icon>
    </div>
    <div class="control_main">
      <div class="control_aside">
        <div v-for="(item, index) of asideList" :key="index" @click="activeTab = index">
          <div class="aside_item" :class="{ active: activeTab === index }">{{ item }}</div>
        </div>
      </div>
      <div class="control_body">
        <UserControl v-if="activeTab === 0"></UserControl>
        <BlogControl v-if="activeTab === 1"></BlogControl>
        <CommentControl v-if="activeTab === 2"></CommentControl>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/runtime-core'
import { House, SwitchButton } from '@element-plus/icons'
import router from '../router'
import UserControl from '../components/control/userControl.vue'
import BlogControl from '../components/control/blogsControl.vue'
import CommentControl from '../components/control/commentsControl.vue'

export default defineComponent({
  name: 'Control',
  components: {
    House,
    SwitchButton,
    UserControl,
    BlogControl,
    CommentControl,
  },
  setup() {
    const activeTab = ref(0)
    const asideList = reactive(['用户管理', '博客管理', '评论管理'])
    const loginOut = () => {
      window.localStorage.clear()
      router.push({ name: 'Home' })
    }
    const goHome = () => {
      router.push({ name: 'Home' })
    }

    return { activeTab, asideList, loginOut, goHome }
  },
})
</script>

<style lang="scss" scoped>
.control_container {
  width: 100vw;
  height: 100vh;
  .control_head {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    color: #fcfcfc;
    background-color: #121212;
    font-size: 18px;
    .inIcon {
      cursor: pointer;
      float: right;
      margin-right: 20px;
      margin-top: 22px;
    }
  }
  .control_main {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    .control_aside {
      width: 200px;
      height: 100%;
      background-color: rgba(#121212, 0.99);
      .aside_item {
        cursor: pointer;
        height: 50px;
        line-height: 50px;
        padding-left: 45px;
        margin: 20px 20px 0;
        color: rgba(#fcfcfc, 0.8);
        border-bottom: 1px solid rgba(#fcfcfc, 0.5);
      }
      .active {
        font-weight: bolder;
        color: #008080;
      }
    }
    .control_body {
      width: calc(100% - 200px);
      color: #121212;
    }
  }
}
</style>
