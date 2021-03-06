<template>
  <el-row v-if="cardList.length" class="card_container">
    <el-col v-for="(item, index) in cardList" :key="index" :span="6" :offset="index % 3 === 0 ? 2 : 1" style="margin-top: 30px">
      <el-card :body-style="{ padding: '0px' }" @click="openBlog(item)">
        <div class="pic">
          <img v-if="item.picture[0]" :src="item.picture[0]" alt="" />
          <img v-else src="../assets/img/ld.jpg" alt="" />
        </div>
        <div class="title">{{ item.title }}</div>
        <div class="content">{{ cutContent(item.content) }}</div>
        <div class="personal">
          <div class="actor">{{ item.actor }}</div>
          <div class="date">{{ item.date }}</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <div v-else class="empty">Nothing here :)</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from '@vue/runtime-core'
import blogInfo from '../hook/blogInfo'
import blogByName from '../hook/blogByName'
import blogByTitle from '../hook/blogByTitle'
import likeInfo from '../hook/likeInfo'
import router from '../router'

export interface blogInfoItem {
  _id?: string
  blogId?: string
  title: string
  actor: string
  date: string
  content: string
  picture: string[]
}

export default defineComponent({
  name: 'Card',
  props: {
    // 判断展示card的情况（0：全部，1：当前用户，2：搜索title，3：搜索actor, 4：点赞列表, 5: 摄影, 6: 插画, 7: 诗歌, 8:书评
    cardState: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const actor = inject('actor')
    // 判断是否是从like界面进入
    const isLike = ref(false)
    // reactive无法获取proxy中数据
    const cardList = ref<blogInfoItem[]>([])
    // 展示全部blog
    if (props.cardState === 0) {
      const { blogInfoList } = blogInfo()
      cardList.value = blogInfoList
      // 展示当前用户blog
    } else if (props.cardState === 1) {
      const { actorBlogList } = blogByName(actor as string)
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
      // 展示用户点赞列表
    } else if (props.cardState === 4) {
      const { userLikeList } = likeInfo(window.localStorage.getItem('userName') as string)
      cardList.value = userLikeList
      isLike.value = true
    } else if (props.cardState === 5) {
      const { filmList } = blogInfo()
      cardList.value = filmList
    } else if (props.cardState === 6) {
      const { artList } = blogInfo()
      cardList.value = artList
    } else if (props.cardState === 7) {
      const { poemList } = blogInfo()
      cardList.value = poemList
    } else if (props.cardState === 8) {
      const { bookList } = blogInfo()
      cardList.value = bookList
    }
    // 展示blog内容
    const openBlog = (item: blogInfoItem) => {
      if (!isLike.value) {
        router.push({ name: 'BlogDetails', query: { _id: item._id } })
      } else {
        router.push({ name: 'BlogDetails', query: { _id: item.blogId } })
      }
    }
    // 截取展示内容第一段
    const cutContent = (content: string) => {
      return content.split('\n')[0]
    }
    return { actor, isLike, cardList, openBlog, cutContent }
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
      height: 250px;
      object-fit: cover;
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
    height: 70px;
    font-size: 16px;
    padding: 0 20px 20px;
    color: #505153;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .personal {
    font-size: 15px;
    padding: 20px 0 20px 20px;
    border-top: 1px solid #f0f0f0;
    color: #aaa;
    .date {
      padding-top: 10px;
    }
  }
}
.empty {
  display: flex;
  background-color: #fcfcfc;
  color: #505153;
  width: 100%;
  height: 380px;
  align-items: center;
  justify-content: center;
}
</style>
