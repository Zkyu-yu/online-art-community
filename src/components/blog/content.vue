<template>
  <div class="blog_container">
    <div class="header">
      <div class="img_blur"></div>
    </div>
    <div class="top">
      <div class="mainSetting">
        <div class="title">{{ BlogDetail.title }}</div>
        <div v-if="showSetting" class="setting">
          <el-icon class="inIcon" @click="drawer = true"><brush /></el-icon>
          <el-popconfirm title="Are you sure to delete this blog?" icon-color="#A52A2A" @confirm="deleteThisBlog">
            <template #reference>
              <el-icon class="inIcon"><delete /></el-icon>
            </template>
          </el-popconfirm>
        </div>
      </div>

      <div class="actor">作者：</div>
      <div class="actor_name">{{ BlogDetail.actor }}</div>
      <div class="date">{{ BlogDetail.date }}</div>
      <div class="right">
        <div class="agree">推荐：2600</div>
        <div class="watch">阅读：102400</div>
      </div>
    </div>
    <div class="article">{{ BlogDetail.content }}</div>
    <div class="picture">
      <!-- {{ BlogDetail.picture }} -->
      <img src="../../assets/img/1.jpg" />
      <img src="../../assets/img/2.jpg" />
      <img src="../../assets/img/3.jpg" />
      <img src="../../assets/img/4.jpg" />
      <img src="../../assets/img/5.jpg" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted } from '@vue/runtime-core'
import blogInfo from '../../hook/blogInfo'
import { Brush, Delete } from '@element-plus/icons'

export default defineComponent({
  name: 'Content',
  components: {
    Brush,
    Delete,
  },
  setup() {
    // 接收父组件传来的Id
    const blogId = inject('blogId')
    const { BlogDetail, showSetting, getBlogDetail, deleteBlog } = blogInfo(blogId as unknown as string)
    // 删除blog
    const deleteThisBlog = () => {
      deleteBlog()
    }

    onMounted(() => {
      getBlogDetail()
    })

    return { blogId, showSetting, BlogDetail, deleteThisBlog }
  },
})
</script>

<style lang="scss" scoped>
.blog_container {
  background-color: #fcfcfc;
  padding-bottom: 30px;
  .header {
    position: relative;
    overflow: hidden; // 去除白边
    .img_blur {
      width: 100%;
      height: 350px;
      background-image: url(../../assets/img/5.jpg);
      background-position: 0 -50px;
      background-repeat: no-repeat;
      background-size: cover;
      transform: scale(1.2); // 去除白边
      -webkit-filter: blur(5px) brightness(55%); // 浏览器兼容
      filter: blur(5px) brightness(55%); // 变暗模糊
    }
  }
  .top {
    position: absolute;
    top: 28%;
    left: 25%;
    width: 50%;
    color: #eee;
    .mainSetting {
      float: left;
      width: 100%;
      .title {
        float: left;
        font-size: 40px;
      }
      .setting {
        float: left;
        margin-top: 15px;
        margin-left: 25px;
        .inIcon {
          font-size: 20px;
          cursor: pointer;
          margin-right: 20px;
        }
      }
    }

    .actor {
      float: left;
      font-size: 16px;
      margin-top: 30px;
    }
    .actor_name {
      float: left;
      font-size: 16px;
      font-weight: 600;
      margin-top: 30px;
      text-decoration: underline;
    }
    .date {
      float: left;
      font-size: 14px;
      color: rgba(#eee, 0.8);
      margin: 34px 0 0 30px;
    }
    .right {
      float: right;
      margin-top: 30px;
      font-size: 14px;
      color: rgba(#eee, 0.8);
      .agree {
        float: left;
      }
      .watch {
        float: left;
        margin-left: 20px;
      }
    }
  }
  .article {
    width: 40%;
    color: #aaa;
    margin: 50px auto;
    text-align: center;
    line-height: 30px;
  }
  .picture {
    margin: 0 auto;
    width: 70%;
    > img {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
