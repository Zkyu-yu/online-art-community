<template>
  <div class="show_container">
    <div class="title">艺术展览管理</div>
    <div class="table">
      <ul>
        <li v-for="(item, index) of tableList" :key="index">{{ item }}</li>
      </ul>
      <ul v-for="(item, index) of blogInfoList" :key="index">
        <li>{{ item.title }}</li>
        <li>{{ item.actor }}</li>
        <li>{{ item.date }}</li>
        <li>111</li>
        <li>{{ item.content ? item.content : '--' }}</li>
        <li>
          <el-button type="text" @click="editBlogShow(index)">修改</el-button>
          <el-button type="text" @click="deleteOneBlog(index)">删除</el-button>
        </li>
      </ul>
    </div>
    <el-button class="add" @click="addBlogDialog = true">Add Show</el-button>

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

    <el-dialog v-model="addBlogDialog" title="新增艺术作品" width="30%">
      <el-form :model="addList" label-width="100px" label-position="left" style="margin-left: 30px">
        <el-form-item label="Title">
          <el-input v-model="addList.title" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Actor">
          <el-input v-model="addList.actor" style="width: 240px" disabled></el-input>
        </el-form-item>
        <el-form-item label="Content">
          <el-input v-model="addList.content" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addBlogDialog = false">Cancel</el-button>
          <el-button type="primary" @click="postOneBlog">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from '@vue/runtime-core'
import blogInfo from '../../hook/blogInfo'

export interface blogInfoItem {
  _id?: string
  title: string
  actor: string
  date: string
  content: string
  picture: string[]
}

export default defineComponent({
  name: 'ShowControl',
  setup() {
    const editBlogDialog = ref(false)
    const addBlogDialog = ref(false)
    const editIndex = ref(0)
    const editList = reactive<blogInfoItem>({ title: '', actor: '', date: '', content: '', picture: [] })
    const addList = reactive<blogInfoItem>({ title: '', actor: '管理员', date: '', content: '', picture: [] })
    const tableList = ['主题', '海报', '时间', '地址', '介绍', '操作']
    const { blogInfoList, deleteBlog } = blogInfo()

    // 保存修改博客的原有信息
    const editBlogShow = (index: number) => {
      editList.title = blogInfoList[index].title
      editList.actor = blogInfoList[index].actor
      editList.date = blogInfoList[index].date
      editList.content = blogInfoList[index].content
      editList.picture.push(...blogInfoList[index].picture)
      editIndex.value = index
      editBlogDialog.value = true
    }
    // 删除博客
    const deleteOneBlog = (index: number) => {
      deleteBlog(blogInfoList[index]._id as unknown as string)
    }

    return {
      editBlogDialog,
      addBlogDialog,
      editIndex,
      editList,
      addList,
      tableList,
      blogInfoList,
      editBlogShow,
      deleteOneBlog,
    }
  },
})
</script>

<style lang="scss" scoped>
.show_container {
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
        width: 180px;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:nth-child(4) {
          width: 200px;
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
