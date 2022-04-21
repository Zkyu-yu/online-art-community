<template>
  <div class="user_container">
    <div class="title">用户管理</div>
    <div class="table">
      <ul>
        <li v-for="(item, index) of tableList" :key="index">{{ item }}</li>
      </ul>
      <ul v-for="(item, index) of allUserList" :key="index">
        <li>{{ item.userName ? item.userName : '--' }}</li>
        <li>{{ item.sex ? item.sex : '--' }}</li>
        <li>{{ item.phone ? item.phone : '--' }}</li>
        <li>{{ item.email ? item.email : '--' }}</li>
        <li>{{ item.profile ? item.profile : '--' }}</li>
        <li>
          <el-icon class="inIcon" @click="editUserShow(index)"><brush /></el-icon>
          <el-icon class="inIcon" @click="deleteUser(index)"><delete /></el-icon>
        </li>
      </ul>
    </div>
    <el-button class="add" @click="addUserDialog = true">Add User</el-button>

    <el-dialog v-model="editUserDialog" title="修改用户" width="30%">
      <el-form :model="editList" label-width="100px" label-position="left" style="margin-left: 30px">
        <el-form-item label="HeadImg">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3001/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :limit="1"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="Name">
          <el-input v-model="editList.userName" style="width: 240px" disabled></el-input>
        </el-form-item>
        <el-form-item label="Sex">
          <el-select v-model="editList.sex" placeholder="Please select your sex" style="width: 240px">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="editList.phone" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="editList.email" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Profile">
          <el-input v-model="editList.profile" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editUserDialog = false">Cancel</el-button>
          <el-button type="primary" @click="editUser">Confirm</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="addUserDialog" title="新增用户" width="30%">
      <el-form :model="addList" label-width="100px" label-position="left" style="margin-left: 30px">
        <el-form-item label="HeadImg">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3001/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :limit="1"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="Name">
          <el-input v-model="addList.userName" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Sex">
          <el-select v-model="addList.sex" placeholder="Please select your sex" style="width: 240px">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="addList.userPwd" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="addList.phone" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="addList.email" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="Profile">
          <el-input v-model="addList.profile" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addUserDialog = false">Cancel</el-button>
          <el-button type="primary" @click="addUser">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from '@vue/runtime-core'
import { Brush, Delete } from '@element-plus/icons'
import userInfo from '../../hook/userInfo'
import loginRegister from '../../hook/loginRegister'
import request from '../../scripts/request'
import { ElMessage } from 'element-plus'

export interface userInfoItem {
  userName: string
  userPwd: string
  sex: string
  phone: string
  email: string
  profile: string
  headImg: string
  _id?: string
}

export default defineComponent({
  name: 'UserControl',
  components: {
    Brush,
    Delete,
  },
  setup() {
    const editUserDialog = ref(false)
    const addUserDialog = ref(false)
    const editList = reactive<userInfoItem>({ userName: '', userPwd: '', sex: '', phone: '', email: '', profile: '', headImg: '' })
    const addList = reactive<userInfoItem>({ userName: '', userPwd: '', sex: '', phone: '', email: '', profile: '', headImg: '' })
    const tableList = ['用户名', '性别', '手机号', '邮箱', '简介', '操作']
    const { allUserList, editUserInfo } = userInfo()
    const { userRegister } = loginRegister()
    const imageUrl = ref('')

    // 保存修改用户的原有信息
    const editUserShow = (index: number) => {
      editList.userName = allUserList[index].userName
      editList.userPwd = allUserList[index].userPwd
      editList.sex = allUserList[index].sex
      editList.phone = allUserList[index].phone
      editList.email = allUserList[index].email
      editList.profile = allUserList[index].profile
      editList.headImg = allUserList[index].headImg
      editUserDialog.value = true
    }
    // 修改用户
    const editUser = () => {
      editUserInfo({
        userName: editList.userName,
        userPwd: editList.userPwd,
        sex: editList.sex,
        phone: editList.phone,
        email: editList.email,
        profile: editList.profile,
        headImg: imageUrl.value,
      })
      editUserDialog.value = false
      ElMessage.success('修改成功')
    }
    // 删除用户
    const deleteUser = async (index: number) => {
      const res: { code: number; message: string } = await request.delete(`/user/deleteUser/${allUserList[index]._id}`)
      if (res.code === 200) {
        ElMessage.success('删除成功')
      }
    }
    // 新增用户
    const addUser = () => {
      userRegister({
        userName: addList.userName,
        userPwd: addList.userPwd,
        sex: addList.sex,
        phone: addList.phone,
        email: addList.email,
        profile: addList.profile,
        headImg: imageUrl.value,
      })
      addUserDialog.value = false
      ElMessage.success('新增成功')
    }
    // 上传头像
    const handleAvatarSuccess = (file: { url: string }) => {
      imageUrl.value = file.url
    }
    const beforeAvatarUpload = (file: { type: string; size: number }) => {
      const fileType = file.type
      // const current = new Date().getTime()
      // const key = `image_${current}`
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

    return {
      editUserDialog,
      addUserDialog,
      editList,
      addList,
      tableList,
      allUserList,
      imageUrl,
      editUserShow,
      editUser,
      deleteUser,
      addUser,
      handleAvatarSuccess,
      beforeAvatarUpload,
    }
  },
})
</script>

<style lang="scss" scoped>
.user_container {
  .title {
    font-size: 18px;
    font-weight: bolder;
    margin: 33px;
    color: #121212;
  }
  .table {
    margin: 0 33px;
    border: 1px solid rgba(#121212, 0.2);
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
        &:first-child {
          width: 150px;
        }
        &:nth-child(2),
        &:last-child {
          width: 100px;
        }
        &:nth-child(5) {
          width: 330px;
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
        background-color: #b6dddd;
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
</style>
