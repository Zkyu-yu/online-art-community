<template>
  <el-row class="card_container">
    <el-col v-for="(item, index) in cardList" :key="index" :span="6" :offset="index % 3 === 0 ? 2 : 1" style="margin-top: 30px">
      <el-card :body-style="{ padding: '0px' }" @click="openBlog(item)">
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
import { defineComponent, inject } from '@vue/runtime-core'
import blogInfo from '../hook/blogInfo'
import blogByName from '../hook/blogByName'
import blogByTitle from '../hook/blogByTitle'
import router from '../router'
import { ref } from 'vue'

export interface blogInfoItem {
  _id?: string
  title: string
  actor: string
  date: string
  content: string
  picture: string
}

export default defineComponent({
  name: 'Card',
  props: {
    // 判断展示card的情况（0：全部，1：当前用户，2：搜索title，3：搜索actor)
    cardState: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    // reactive无法获取proxy中数据
    const cardList = ref<blogInfoItem[]>([])
    // 展示全部blog
    if (props.cardState === 0) {
      const { blogInfoList } = blogInfo()
      cardList.value = blogInfoList
      // 展示当前用户blog
    } else if (props.cardState === 1) {
      const { actorBlogList } = blogByName(window.localStorage.getItem('userName') as string)
      cardList.value = actorBlogList
      // 展示搜索title blog
    } else if (props.cardState === 2) {
      const searchTitle = inject('searchTitle')
      const { titleBlogList } = blogByTitle(searchTitle as string)
      cardList.value = titleBlogList
      // 展示搜索actor title
    } else if (props.cardState === 3) {
      const searchActor = inject('searchActor')
      const { actorBlogList } = blogByName(searchActor as string)
      cardList.value = actorBlogList
    }
    // 展示blog内容
    const openBlog = (item: blogInfoItem) => {
      router.push({ name: 'BlogDetails', query: { _id: item._id } })
    }
    return { cardList, openBlog }
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
