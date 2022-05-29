<template>
  <div class="blog_container">
    <div class="title">艺术作品管理</div>
    <div class="table">
      <ul>
        <li v-for="(item, index) of tableList" :key="index">{{ item }}</li>
      </ul>
      <ul v-for="(item, index) of allBlogList" :key="index">
        <li>{{ item.title }}</li>
        <li>{{ item.actor }}</li>
        <li>{{ item.date }}</li>
        <li>{{ item.category }}</li>
        <li>{{ item.content ? item.content : '--' }}</li>
        <li>{{ item.status }}</li>
        <li>
          <el-button type="text" @click="editBlogShow(index)">修改</el-button>
          <el-button type="text" @click="deleteOneBlog(index)">删除</el-button>
          <el-button v-if="item.status === '待审核'" type="text" @click="checkBlogShow(index)">审核</el-button>
        </li>
      </ul>
    </div>

    <el-dialog v-model="editBlogDialog" title="修改艺术作品" width="30%">
      <el-form :model="editList" label-width="100px" label-position="left" style="margin-left: 30px">
        <el-form-item label="Title">
          <el-input v-model="editList.title" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Actor">
          <el-input v-model="editList.actor" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Content">
          <el-input v-model="editList.content" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editBlogDialog = false">Cancel</el-button>
          <el-button type="primary" @click="editOneBlog">Confirm</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="checkBlogDialog" title="审核艺术作品" width="30%">
      <el-radio-group v-model="checkStatus" class="ml-4">
        <el-radio label="已通过">通过</el-radio>
        <el-radio label="未通过">不通过</el-radio>
      </el-radio-group>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="checkBlogDialog = false">Cancel</el-button>
          <el-button type="primary" @click="checkOneBlog">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from '@vue/runtime-core'
import blogInfo from '../../hook/blogInfo'
import { formatDateTime } from '../../hook/util'

export interface blogInfoItem {
  _id?: string
  title: string
  actor: string
  category: string
  date: string
  content: string
  picture: string[]
}

export default defineComponent({
  name: 'BlogControl',
  setup() {
    const editBlogDialog = ref(false)
    const addBlogDialog = ref(false)
    const checkBlogDialog = ref(false)
    const editIndex = ref(0)
    const checkIndex = ref(0)
    const checkStatus = ref('')
    const editList = reactive<blogInfoItem>({ title: '', actor: '', category: '', date: '', content: '', picture: [] })
    const addList = reactive<blogInfoItem>({ title: '', actor: '管理员', category: '', date: '', content: '', picture: [] })
    const tableList = ['标题', '作者', '时间', '栏目', '内容', '审核状态', '操作']
    const { allBlogList, editBlog, deleteBlog, checkBlogOk, checkBlogError } = blogInfo()

    // 保存修改博客的原有信息
    const editBlogShow = (index: number) => {
      editList.title = allBlogList[index].title
      editList.actor = allBlogList[index].actor
      editList.date = allBlogList[index].date
      editList.content = allBlogList[index].content
      editList.picture.push(...allBlogList[index].picture)
      editIndex.value = index
      editBlogDialog.value = true
    }
    // 修改博客
    const editOneBlog = () => {
      editBlog(
        {
          title: editList.title,
          actor: editList.actor,
          category: editList.category,
          date: formatDateTime(new Date()),
          content: editList.content,
          picture: editList.picture,
        },
        allBlogList[editIndex.value]._id as unknown as string
      )
      editBlogDialog.value = false
    }
    // 删除博客
    const deleteOneBlog = (index: number) => {
      deleteBlog(allBlogList[index]._id as unknown as string)
    }
    // 打开审核博客弹窗
    const checkBlogShow = (index: number) => {
      checkIndex.value = index
      checkBlogDialog.value = true
    }
    const checkOneBlog = () => {
      if (checkStatus.value === '已通过') {
        checkBlogOk(allBlogList[checkIndex.value]._id as unknown as string)
      } else {
        checkBlogError(allBlogList[checkIndex.value]._id as unknown as string)
      }
      checkBlogDialog.value = false
    }

    return {
      editBlogDialog,
      addBlogDialog,
      checkBlogDialog,
      editIndex,
      checkStatus,
      editList,
      addList,
      tableList,
      allBlogList,
      editBlogShow,
      editOneBlog,
      deleteOneBlog,
      checkBlogShow,
      checkOneBlog,
    }
  },
})
</script>

<style lang="scss" scoped>
.blog_container {
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
        width: 155px;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:nth-child(5) {
          width: 170px;
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
.el-button--text {
  background-color: rgba(255, 255, 255, 0);
  border: none;
}
</style>
