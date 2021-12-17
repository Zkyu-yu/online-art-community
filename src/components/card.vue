<template>
  <el-row class="card_container">
    <el-col
      v-for="(item, index) in isActor ? actorBlogList : blogInfoList"
      :key="index"
      :span="6"
      :offset="index % 3 === 0 ? 2 : 1"
      style="margin-top: 30px"
    >
      <el-card :body-style="{ padding: '0px' }" @click="openBlog">
        <div class="pic">
          <img src="../assets/img/ld.jpg" alt="" />
        </div>
        <div class="title">{{ item.title }}</div>
        <div class="content">{{ item.content }}</div>
        <div class="personal">
          <div class="actor">{{ item.actor }}</div>
          <div class="date">{{ item.date }}</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import blogInfo from '../hook/blogInfo'
import router from '../router'

export default defineComponent({
  name: 'Card',
  props: {
    // 判断是否在mySpace
    isActor: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const { blogInfoList, actorBlogList } = blogInfo(window.localStorage.getItem('userName') as string)
    const openBlog = () => {
      router.push({ name: 'BlogContent' })
    }
    return { openBlog, blogInfoList, actorBlogList }
  },
})
</script>

<style lang="scss" scoped>
.card_container {
  background-color: #fcfcfc;
  padding-bottom: 30px;
  cursor: pointer;
  .pic {
    img {
      width: 100%;
      height: 280px;
    }
  }
  .title {
    font-size: 24px;
    padding: 20px 0 20px 20px;
    color: #505153;
    &:hover {
      text-decoration: underline;
    }
  }
  .content {
    font-size: 16px;
    padding-left: 20px;
    color: #505153;
  }
  .personal {
    font-size: 15px;
    margin-top: 50px;
    padding: 20px 0 20px 20px;
    border-top: 1px solid #f0f0f0;
    color: #aaa;
    .date {
      padding-top: 10px;
    }
  }
}
</style>
