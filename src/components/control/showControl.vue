<template>
  <div class="show_container">
    <div class="title">艺术展览管理</div>
    <div class="table">
      <ul>
        <li v-for="(item, index) of tableList" :key="index">{{ item }}</li>
      </ul>
      <ul v-for="(item, index) of showInfoList" :key="index">
        <li>{{ item.theme }}</li>
        <li>
          <img :src="item.poster" style="width: 100%" />
        </li>
        <li>{{ item.date }}</li>
        <li>{{ item.address }}</li>
        <li>{{ item.introduction }}</li>
        <li>
          <el-button type="text" @click="isShowEidt(index)">修改</el-button>
          <el-button type="text" @click="deleteOneShow(index)">删除</el-button>
        </li>
      </ul>
    </div>
    <el-button class="add" @click="addShowDialog = true">Add Show</el-button>

    <el-dialog v-model="editShowDialog" title="修改艺术展览" width="30%">
      <el-form :model="editList" label-width="100px" label-position="left" style="margin-left: 30px">
        <el-form-item label="Theme">
          <el-input v-model="editList.theme" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Poster">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3003/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :limit="1"
          >
            <img v-if="editList.poster" :src="editList.poster" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="Date">
          <el-input v-model="editList.date" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="editList.address" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Introduction">
          <el-input v-model="editList.introduction" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editShowDialog = false">Cancel</el-button>
          <el-button type="primary" @click="editOneShow">Confirm</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="addShowDialog" title="新增艺术展览" width="30%">
      <el-form :model="addList" label-width="100px" label-position="left" style="margin-left: 30px">
        <el-form-item label="Theme">
          <el-input v-model="addList.theme" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Poster">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3003/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :limit="1"
          >
            <img v-if="addList.poster" :src="addList.poster" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="Date">
          <el-input v-model="addList.date" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="addList.address" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Introduction">
          <el-input v-model="addList.introduction" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addShowDialog = false">Cancel</el-button>
          <el-button type="primary" @click="postOneShow">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from '@vue/runtime-core'
import showInfo from '../../hook/showInfo'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons'

export interface showInfoItem {
  _id?: string
  theme: string
  poster: string
  date: string
  address: string
  introduction: string
}

export default defineComponent({
  name: 'ShowControl',
  components: {
    Plus,
  },
  setup() {
    const editShowDialog = ref(false)
    const addShowDialog = ref(false)
    const editIndex = ref(0)
    const editList = reactive<showInfoItem>({ theme: '', poster: '', date: '', address: '', introduction: '' })
    const addList = reactive<showInfoItem>({ theme: '', poster: '', date: '', address: '', introduction: '' })
    const tableList = ['主题', '海报', '时间', '地址', '介绍', '操作']
    const { showInfoList, postShow, editShow, deleteShow } = showInfo()

    // 上传海报
    const handleAvatarSuccess = (file: { url: string }) => {
      addList.poster = file.url
    }
    const beforeAvatarUpload = (file: { type: string; size: number }) => {
      const fileType = file.type
      const isJPG = fileType === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        ElMessage.error('Avatar picture must be JPG format!')
        return isJPG
      }
      if (!isLt2M) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return isLt2M
      }
    }
    // 发布展览
    const postOneShow = () => {
      postShow({
        theme: addList.theme,
        poster: addList.poster,
        date: addList.date,
        address: addList.address,
        introduction: addList.introduction,
      })
      addShowDialog.value = false
      addList.theme = ''
      addList.poster = ''
      addList.date = ''
      addList.address = ''
      addList.introduction = ''
    }
    // 保存修改展览的原有信息
    const isShowEidt = (index: number) => {
      editList.theme = showInfoList[index].theme
      editList.poster = showInfoList[index].poster
      editList.date = showInfoList[index].date
      editList.address = showInfoList[index].address
      editList.introduction = showInfoList[index].introduction
      editIndex.value = index
      editShowDialog.value = true
    }
    // 修改展览
    const editOneShow = () => {
      editShow(
        {
          theme: editList.theme,
          poster: editList.poster,
          date: editList.date,
          address: editList.address,
          introduction: editList.introduction,
        },
        showInfoList[editIndex.value]._id as unknown as string
      )
      editShowDialog.value = false
    }
    // 删除展览
    const deleteOneShow = (index: number) => {
      deleteShow(showInfoList[index]._id as unknown as string)
    }

    return {
      editShowDialog,
      addShowDialog,
      editIndex,
      editList,
      addList,
      tableList,
      showInfoList,
      handleAvatarSuccess,
      beforeAvatarUpload,
      postOneShow,
      isShowEidt,
      editOneShow,
      deleteOneShow,
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
        // width: 275px;
        height: 100px;
        line-height: 100px;
        padding: 0 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:nth-child(1) {
          // width: 277px;
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
        li {
          height: 50px;
          line-height: 50px;
        }
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  .avatar-uploader-icon svg {
    margin-top: 74px; /* (178px - 28px) / 2 - 1px */
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.el-button--text {
  background-color: rgba(255, 255, 255, 0);
  border: none;
}
</style>
