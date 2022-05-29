<template>
  <div class="comment_container">
    <div class="title">评论管理</div>
    <div class="table">
      <ul>
        <li v-for="(item, index) of tableList" :key="index">{{ item }}</li>
      </ul>
      <ul v-for="(item, index) of allCommentList" :key="index">
        <li @click="handleCopy(item.blogId)">{{ item.blogId }}</li>
        <li>{{ item.commentName }}</li>
        <li>{{ item.commentTime }}</li>
        <li>{{ item.commentContent }}</li>
        <li>
          <el-button type="text" @click="deleteOneComment(index)">删除</el-button>
        </li>
      </ul>
    </div>
    <el-button class="add" @click="addCommentDialog = true">Add Comment</el-button>

    <el-dialog v-model="addCommentDialog" title="新增评论" width="30%">
      <el-form :model="addList" label-width="120px" label-position="left" style="margin-left: 30px">
        <el-form-item label="blogId">
          <el-input v-model="addList.blogId" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="addList.commentName" style="width: 200px" disabled></el-input>
        </el-form-item>
        <el-form-item label="commentContent">
          <el-input v-model="addList.commentContent" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addCommentDialog = false">Cancel</el-button>
          <el-button type="primary" @click="postOneComment">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from '@vue/runtime-core'
import commentInfo from '../../hook/commentInfo'
import { ElMessage } from 'element-plus'
import { formatDateTime } from '../../hook/util'

export interface commentInfoItem {
  _id?: string
  blogId: string
  commentName: string
  commentContent: string
}

export default defineComponent({
  name: 'CommentControl',
  setup() {
    const addCommentDialog = ref(false)
    const addList = reactive<commentInfoItem>({ blogId: '', commentName: '管理员', commentContent: '' })
    const tableList = ['博客ID', '评论者', '时间', '内容', '操作']
    const { allCommentList, postComment, deleteComment } = commentInfo()

    // 复制博客ID
    const handleCopy = (data: string) => {
      let oInput = document.createElement('input')
      oInput.value = data
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand('Copy')
      ElMessage.success('复制成功')
      oInput.remove()
    }
    // 删除评论
    const deleteOneComment = (index: number) => {
      deleteComment(allCommentList[index]._id as unknown as string)
    }
    // 新增评论
    const postOneComment = () => {
      postComment({
        blogId: addList.blogId,
        commentName: addList.commentName,
        commentTime: formatDateTime(new Date()),
        commentContent: addList.commentContent,
      })
      addCommentDialog.value = false
      ElMessage.success('新增成功')
    }

    return {
      handleCopy,
      addCommentDialog,
      addList,
      tableList,
      allCommentList,
      deleteOneComment,
      postOneComment,
    }
  },
})
</script>

<style lang="scss" scoped>
.comment_container {
  .title {
    font-size: 18px;
    font-weight: bolder;
    margin: 33px;
    color: #121212;
  }
  .table {
    margin: 0 33px;
    padding-top: 50px;
    border: 1px solid rgba(#121212, 0.2);
    height: 500px;
    overflow: scroll;
    ul {
      li {
        display: inline-block;
        width: 215px;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:first-child {
          width: 240px;
        }
        .inIcon {
          cursor: pointer;
          margin-right: 20px;
          &:hover {
            color: #008080;
          }
        }
      }
      &:first-child {
        position: fixed;
        background-color: #b6dddd;
        margin-top: -50px;
        z-index: 10;
      }
      &:not(:first-child):hover {
        cursor: pointer;
        background-color: rgba(#008080, 0.05);
      }
    }
  }
  .add {
    margin-left: 33px;
    margin-top: 20px;
  }
}
</style>
