<template>
  <div class="in_container">
    <div class="header">
      <div class="img_blur"></div>
    </div>
    <div class="human">
      <div class="headImg">
        <img src="../../assets/img/headImg.jpg" alt="" />
      </div>
      <div class="name">{{ isMaster ? userInfoList.userName : actorInfoList.userName }}</div>
      <!-- 个人设置 -->
      <div v-if="showSetting" class="setting">
        <el-icon class="inIcon" @click="drawer = true"><edit /></el-icon>
        <el-popconfirm title="Are you sure to logout?" icon-color="#A52A2A" @confirm="logout">
          <template #reference>
            <el-icon class="inIcon"><switch-button /></el-icon>
          </template>
        </el-popconfirm>
      </div>
      <!-- 关注按钮 -->
      <div v-if="!showSetting" class="followButton" @click="letFollow">
        <el-button v-if="!isFollowed" class="nofollow" size="small">follow</el-button>
        <el-button v-else class="isfollow" size="small">followed</el-button>
      </div>

      <div class="followList">
        <div class="follows">
          Follows: <strong @click="openFollowList(0)">{{ followsList.length }}</strong>
        </div>
        <div class="fans">
          Fans: <strong @click="openFollowList(1)">{{ fansList.length }}</strong>
        </div>
      </div>
      <div class="profile">{{ isMaster ? userInfoList.profile : actorInfoList.profile }}</div>
    </div>
  </div>

  <!-- 个人设置 -->
  <el-drawer v-model="drawer" title="Human Modification">
    <el-form :model="form" label-width="100px" label-position="left" style="margin-left: 30px">
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

  <!-- 关注粉丝 -->
  <div class="follow_dialog">
    <el-drawer v-model="followDrawer" :title="isFollowList ? 'Your Follows' : 'Your Fans'">
      <div class="followShow">
        <div v-for="(item, index) in isFollowList ? followsList : fansList" :key="index" class="followContainer">
          <div v-if="isFollowList" class="followName" @click="goSpace(item.followName)">{{ item.followName }}</div>
          <div v-else class="followName" @click="goSpace(item.fansName)">{{ item.fansName }}</div>
          <div class="followTime">{{ item.followTime }}</div>
          <div v-if="isFollowList && isMaster" class="followDelete">
            <el-popconfirm title="Are you sure to leave him/her?" icon-color="#A52A2A" @confirm="onUnfollow(index)">
              <template #reference>
                <el-icon class="inIcon"><delete /></el-icon>
              </template>
            </el-popconfirm>
          </div>
          <div class="followContent">{{ item.followContent }}</div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, inject } from '@vue/runtime-core'
import userInfo from '../../hook/userInfo'
import followInfo from '../../hook/followInfo'
import { ElMessage } from 'element-plus'
import { Plus, Edit, SwitchButton, Delete } from '@element-plus/icons'
import router from '../../router'
import { formatDateTime } from '../../hook/util'

export interface userInfoItem {
  userName: string
  userPwd: string
  sex: string
  phone: string
  email: string
  profile: string
}

export default defineComponent({
  name: 'Introduction',
  components: {
    Plus,
    Edit,
    SwitchButton,
    Delete,
  },
  setup() {
    const actor = inject('actor')
    // 是否是当前用户
    const isMaster = actor === window.localStorage.getItem('userName') ? 1 : 0
    // 是否显示设置按钮
    const showSetting = ref(false)
    showSetting.value = isMaster ? true : false
    const { userInfoList, actorInfoList, editUserInfo } = userInfo(actor as string)
    const { followsList, fansList, isFollowed, postFollow, deleteFollow } = followInfo(actor as string)
    // 设置弹框
    const drawer = ref(false)
    // 关注粉丝弹框
    const followDrawer = ref(false)
    // 展示关注列表(true，false则展示粉丝列表)
    const isFollowList = ref(true)
    const form = reactive({
      headImg: '',
      name: '',
      sex: '',
      phone: '',
      email: '',
      profile: '',
    })
    const imageUrl = ref('')
    // 上传凭证
    const uploadToken = ref('')
    // 退登
    const logout = () => {
      window.localStorage.clear()
      router.push({ name: 'Home' })
    }
    // 关注用户
    const letFollow = () => {
      if (!isFollowed.value) {
        postFollow({
          followName: actor as string,
          fansName: localStorage.getItem('userName') as unknown as string,
          followTime: formatDateTime(new Date()),
        })
        isFollowed.value = !isFollowed.value
      } else {
        deleteFollow({
          followName: actor as string,
          fansName: localStorage.getItem('userName') as unknown as string,
        })
        isFollowed.value = !isFollowed.value
      }
    }
    // 打开关注粉丝弹框
    const openFollowList = (type: number) => {
      followDrawer.value = true
      if (type) {
        isFollowList.value = false
      } else {
        isFollowList.value = true
      }
    }
    // 在关注列表取关
    const onUnfollow = (index: number) => {
      deleteFollow({
        followName: followsList[index].followName as string,
        fansName: localStorage.getItem('userName') as unknown as string,
      })
    }
    // 在关注列表打开用户主页
    const goSpace = (actor: string) => {
      router.push({ name: 'MySpace', query: { actor: actor } })
    }

    // 获取上传 token
    const getUploadToken = () => {
      // const resp = util.ajax.get('//cms.sojex.net/get/upload/token')
      // uploadToken.value = resp.token
    }
    const handleAvatarSuccess = (file: { url: string }) => {
      ElMessage.success('Success！')
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
      // try {
      //   const token = await this.getPicToken()
      //   form = {
      //     key,
      //     token,
      //   }
      //   return true
      // } catch (error) {
      //   return error
      // }
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
      actor,
      isMaster,
      showSetting,
      isFollowed,
      isFollowList,
      userInfoList,
      actorInfoList,
      drawer,
      followDrawer,
      followsList,
      fansList,
      form,
      imageUrl,
      uploadToken,
      logout,
      letFollow,
      openFollowList,
      onUnfollow,
      goSpace,
      getUploadToken,
      handleAvatarSuccess,
      beforeAvatarUpload,
      onCancel,
      onSubmit,
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
    .followButton {
      float: left;
      margin-left: 20px;
      margin-top: 10px;
      .nofollow {
        color: rgba(#fcfcfc, 0.8);
        background-color: rgba(#000, 0.5);
        border-color: rgba(#fcfcfc, 0.8);
      }
      .isfollow {
        color: rgba(#fcfcfc, 0.8);
        background-color: rgba(pink, 0.5);
        border-color: rgba(#fcfcfc, 0.8);
      }
    }
    .followList {
      margin-top: 55px;
      font-size: 15px;
      color: rgba(#eee, 0.9);
      .follows {
        float: left;
      }
      .fans {
        overflow: hidden;
        padding-left: 30px;
      }
      strong {
        padding: 0 5px;
        text-decoration: underline;
        cursor: pointer;
        font-weight: normal;
      }
    }
    .profile {
      width: 500px;
      margin-top: 15px;
      margin-left: 20px;
    }
  }
}
.follow_dialog {
  .el-drawer__body {
    overflow: auto !important;
  }
  .followShow {
    height: 100%;
    overflow: auto;
    .followContainer {
      height: 70px;
      padding: 10px;
      border: 1px dashed rgba(#dcdfe6, 0.6);
      border-top: none;
      font-family: 'Coda';
      color: rgba(#fcfcfc, 0.8);
      &:first-child {
        border-top: 1px dashed rgba(#dcdfe6, 0.6);
      }
      .followName {
        float: left;
        font-size: 20px;
        color: #fcfcfc;
        cursor: pointer;
      }
      .followTime {
        margin-top: 30px;
        font-size: 10px;
        color: rgba(#fcfcfc, 0.6);
      }
      .followDelete {
        float: right;
        margin-top: -42px;
        cursor: pointer;
      }
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
.el-drawer.rtl {
  background-color: rgba(#121212, 0.9);
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
.el-form-item__label {
  color: rgba(#eee, 0.8);
}
.el-input.is-disabled .el-input__inner {
  background-color: #606266;
  border: none;
  color: rgba(#eee, 0.7);
}
.el-input__inner,
.el-textarea__inner {
  background-color: #000;
  border: none;
  color: #eee;
}
</style>
