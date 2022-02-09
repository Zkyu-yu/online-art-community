<template>
  <div class="in_container">
    <div class="header">
      <div class="img_blur"></div>
    </div>
    <div class="human">
      <div class="headImg">
        <img src="../../assets/img/headImg.jpg" alt="" />
      </div>
      <div class="name">{{ userInfoList.userName }}</div>
      <div class="setting">
        <el-icon class="inIcon" @click="drawer = true"><edit /></el-icon>
        <el-popconfirm title="Are you sure to logout?" icon-color="#A52A2A" @confirm="logout">
          <template #reference>
            <el-icon class="inIcon"><switch-button /></el-icon>
          </template>
        </el-popconfirm>
      </div>
      <div class="profile">{{ userInfoList.profile }}</div>
    </div>
  </div>

  <!-- 个人设置 -->
  <el-drawer v-model="drawer" title="Human Modification">
    <el-form :model="form" label-width="100px" label-position="left" style="margin-left: 30px">
      <el-form-item label="HeadImg">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="Name">
        <el-input v-model="userInfoList.userName" style="width: 300px" disabled></el-input>
      </el-form-item>
      <el-form-item label="Sex">
        <el-select v-model="userInfoList.sex" placeholder="Please select your sex" style="width: 300px">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Phone">
        <el-input v-model="userInfoList.phone" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="userInfoList.email" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="Profile">
        <el-input v-model="userInfoList.profile" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <el-button style="margin-left: 50px" @click="onCancel">Cancel</el-button>
    <el-button type="primary" @click="onSubmit">Update</el-button>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/runtime-core'
import userInfo from '../../hook/userInfo'
import { ElMessage } from 'element-plus'
import { Plus, Edit, SwitchButton } from '@element-plus/icons'
import router from '../../router'

export default defineComponent({
  name: 'Introduction',
  components: {
    Plus,
    Edit,
    SwitchButton,
  },
  setup() {
    const { userInfoList, editUserInfo } = userInfo(window.localStorage.getItem('userName') as string)
    const drawer = ref(false)
    const form = reactive({
      headImg: '',
      name: '',
      sex: '',
      profile: '',
    })
    const imageUrl = ref('')
    const logout = () => {
      window.localStorage.clear()
      router.push({ name: 'Home' })
    }
    const handleAvatarSuccess = (file: { url: string }) => {
      console.log(file.url)

      imageUrl.value = URL.createObjectURL(file.url)
    }
    const beforeAvatarUpload = (file: { type: string; size: number }) => {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        ElMessage.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    }
    const onCancel = () => {
      drawer.value = false
    }
    const onSubmit = () => {
      editUserInfo({
        userName: userInfoList.userName,
        userPwd: userInfoList.userPwd,
        sex: userInfoList.sex,
        phone: userInfoList.phone,
        email: userInfoList.email,
        profile: userInfoList.profile,
      })
      drawer.value = false
      ElMessage.success('Your information has been changed :)')
    }

    return {
      drawer,
      form,
      imageUrl,
      logout,
      handleAvatarSuccess,
      beforeAvatarUpload,
      onCancel,
      onSubmit,
      userInfoList,
    }
  },
})
</script>

<style lang="scss">
.in_container {
  background-color: #fcfcfc;
  .header {
    position: relative;
    overflow: hidden;
    .img_blur {
      width: 100%;
      height: 250px;
      background-image: url(../../assets/img/ld.jpg);
      background-position: 0 -50px;
      background-repeat: no-repeat;
      background-size: cover;
      transform: scale(1.2);
      -webkit-filter: blur(5px) brightness(55%);
      filter: blur(5px) brightness(55%);
    }
  }
  .human {
    position: absolute;
    top: 14%;
    left: 5%;
    color: #eee;
    .headImg {
      float: left;
      > img {
        width: 80%;
        height: 80%;
      }
    }
    .name {
      float: left;
      font-size: 25px;
      margin-top: 10px;
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
    .profile {
      margin-top: 75px;
      overflow: hidden;
    }
  }
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
.el-popover.el-popper {
  background-color: #000;
  border: none;
  color: #eee;
}
.el-popper.is-light .el-popper__arrow::before {
  background-color: #000;
  border: none;
}
.el-button--text {
  color: #eee;
}
.el-button + .el-button {
  background-color: #000;
  border: 1px solid #eee;
}
</style>
