<template>
  <div class="blog_container">
    <div class="header">
      <div class="img_blur"></div>
    </div>
    <div class="top">
      <div class="mainSetting">
        <div class="title">{{ BlogDetail.title }}</div>
        <div v-if="showSetting" class="setting">
          <el-icon class="inIcon" @click="isEdit = 1"><brush /></el-icon>
          <el-popconfirm title="Are you sure to delete this blog?" icon-color="#A52A2A" @confirm="deleteThisBlog">
            <template #reference>
              <el-icon class="inIcon"><delete /></el-icon>
            </template>
          </el-popconfirm>
        </div>
      </div>
      <div class="actor">actor：</div>
      <div class="actor_name">{{ BlogDetail.actor }}</div>
      <div class="postdate">{{ BlogDetail.date }}</div>
      <div class="right">
        <div class="like">
          <el-icon class="inIcon" @click="letStar"><star v-if="!isStar" /><star-filled v-if="isStar" /></el-icon>
          <div class="rightWords">like：2600</div>
        </div>
        <div class="comment" @click="drawer = true">
          <el-icon class="inIcon"><chat-dot-round /></el-icon>
          <div class="rightWords">comment：102400</div>
        </div>
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
  <!-- 修改blog -->
  <div class="post_dialog">
    <el-dialog v-model="isEdit" fullscreen>
      <el-input v-model="BlogDetail.title" placeholder="blog title" />
      <el-input v-model="BlogDetail.content" maxlength="500" placeholder="balabalabala..." show-word-limit type="textarea" />
      <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      </el-upload>
      <el-button style="margin-right: 19vw" @click="editThisBlog">Update</el-button>
      <el-button @click="onCancel">Cancel</el-button>
    </el-dialog>
  </div>
  <!-- 评论 -->
  <div class="comment_dialog">
    <el-drawer v-model="drawer" title="Just say say :)">
      <!-- 展示评论 -->
      <div class="commentShow">
        <div v-for="(item, index) in commentList" :key="index" class="commentContainer">
          <div class="commentName">{{ item.commentName }}</div>
          <div class="commentTime">{{ item.commentTime }}</div>
          <div class="commentContent">{{ item.commentContent }}</div>
        </div>
      </div>
      <!-- 发布评论 -->
      <div class="commentPost">
        <div class="postTitle">You can say anything here:</div>
        <el-input v-model="commentPost" maxlength="100" placeholder="watch your mouth :)" show-word-limit type="textarea" resize="none" />
        <el-button style="margin-left: 65%" @click="onClear">Clear</el-button>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted } from '@vue/runtime-core'
import blogInfo from '../../hook/blogInfo'
import { Brush, Delete, Star, StarFilled, ChatDotRound } from '@element-plus/icons'
import { ref } from 'vue'
import { formatDateTime } from '../../hook/util'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Details',
  components: {
    Brush,
    Delete,
    Star,
    StarFilled,
    ChatDotRound,
  },
  setup() {
    const commentList = [
      {
        commentName: 'zkyu',
        commentTime: '2022-2-8 18:11',
        commentContent: 'lalalala',
      },
      {
        commentName: '444',
        commentTime: '2022-2-9 10:27',
        commentContent: 'babarfrvfharhfdvadbhdgggggggggggggggggggggggg',
      },
      {
        commentName: 'test',
        commentTime: '2022-2-8 18:11',
        commentContent: '4444',
      },
      {
        commentName: '111',
        commentTime: '2022-2-8 18:11',
        commentContent:
          '我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的',
      },
      {
        commentName: 'zkyu',
        commentTime: '2022-2-8 18:11',
        commentContent: 'lalalala',
      },
      {
        commentName: '444',
        commentTime: '2022-2-9 10:27',
        commentContent: 'babarfrvfharhfdvadbhdgggggggggggggggggggggggg',
      },
      {
        commentName: 'test',
        commentTime: '2022-2-8 18:11',
        commentContent: '4444',
      },
      {
        commentName: '111',
        commentTime: '2022-2-8 18:11',
        commentContent:
          '我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的',
      },
      {
        commentName: 'zkyu',
        commentTime: '2022-2-8 18:11',
        commentContent: 'lalalala',
      },
      {
        commentName: '444',
        commentTime: '2022-2-9 10:27',
        commentContent: 'babarfrvfharhfdvadbhdgggggggggggggggggggggggg',
      },
      {
        commentName: 'test',
        commentTime: '2022-2-8 18:11',
        commentContent: '4444',
      },
      {
        commentName: '111',
        commentTime: '2022-2-8 18:11',
        commentContent:
          '我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的',
      },
      {
        commentName: 'zkyu',
        commentTime: '2022-2-8 18:11',
        commentContent: 'lalalala',
      },
      {
        commentName: '444',
        commentTime: '2022-2-9 10:27',
        commentContent: 'babarfrvfharhfdvadbhdgggggggggggggggggggggggg',
      },
      {
        commentName: 'test',
        commentTime: '2022-2-8 18:11',
        commentContent: '4444',
      },
      {
        commentName: '111',
        commentTime: '2022-2-8 18:11',
        commentContent:
          '我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的我是有折有遥的',
      },
    ]
    // 点赞
    const isStar = ref(false)
    // 修改blog弹框
    const isEdit = ref(0)
    // 评论弹框
    const drawer = ref(false)
    // 发布评论内容
    const commentPost = ref('')
    // 接收父组件传来的Id
    const blogId = inject('blogId')
    const { BlogDetail, showSetting, getBlogDetail, editBlog, deleteBlog } = blogInfo(blogId as unknown as string)
    // 修改blog
    const editThisBlog = () => {
      editBlog({
        title: BlogDetail.title,
        actor: BlogDetail.actor,
        date: formatDateTime(new Date()),
        content: BlogDetail.content,
        picture: BlogDetail.picture,
      })
      isEdit.value = 0
    }
    // 删除blog
    const deleteThisBlog = () => {
      deleteBlog()
    }
    // 点赞
    const letStar = () => {
      isStar.value = !isStar.value
    }
    // 清空评论
    const onClear = () => {
      commentPost.value = ''
    }
    const onSubmit = () => {
      if (!commentPost.value) {
        ElMessage.error('You cannot say nothing!')
      }
    }
    onMounted(() => {
      getBlogDetail()
    })

    return {
      commentList,
      isStar,
      isEdit,
      drawer,
      commentPost,
      blogId,
      showSetting,
      BlogDetail,
      editThisBlog,
      deleteThisBlog,
      letStar,
      onClear,
      onSubmit,
    }
  },
})
</script>

<style lang="scss">
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
    left: 20%;
    width: 60%;
    color: #eee;
    font-family: 'Coda';
    .mainSetting {
      float: left;
      width: 100%;
      .title {
        float: left;
        font-size: 40px;
      }
      .setting {
        float: left;
        margin-top: 20px;
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
    .postdate {
      float: left;
      font-size: 14px;
      color: rgba(#eee, 0.8);
      margin: 32px 0 0 30px;
    }
    .right {
      float: right;
      margin-top: 35px;
      font-size: 14px;
      color: rgba(#eee, 0.8);
      .like,
      .comment {
        float: left;
        cursor: pointer;
        .rightWords {
          float: left;
          margin-left: 8px;
        }
        .inIcon {
          float: left;
          font-size: 17px;
          margin-top: 2px;
          margin-left: 25px;
        }
        &:hover {
          color: #eee;
        }
      }
      .like {
        margin-top: 1px;
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
.comment_dialog {
  .el-drawer__body {
    overflow: auto !important;
  }
  .commentShow {
    height: 70%;
    overflow: auto;
    border-top: 1px dashed #dcdfe6;
    border-bottom: 1px dashed #dcdfe6;
    .commentContainer {
      padding: 10px;
      border: 1px dashed #dcdfe6;
      border-bottom: none;
      font-family: 'Coda';
      color: rgba(#121212, 0.8);
      &:first-child {
        border-top: none;
      }
      .commentName {
        float: left;
        font-size: 20px;
      }
      .commentTime {
        margin-top: 9px;
        padding-left: 50px;
        font-size: 10px;
        color: rgba(#121212, 0.6);
      }
      .commentContent {
        margin-top: 10px;
        font-size: 17px;
        word-break: break-word;
      }
    }
  }
  .commentPost {
    font-family: 'Coda';
    color: rgba(#121212, 0.9);
    .postTitle {
      margin: 20px 0;
      font-size: 17px;
    }
    .el-textarea {
      display: flex;
      height: 120px;
      margin-bottom: 20px;
    }
  }
}
</style>
