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
        <el-button size="mini" @click="drawer = true">个人设置</el-button>
      </div>
      <div class="profile">{{ userInfoList.profile }}</div>
    </div>
  </div>
  <el-drawer v-model="drawer" title="I have a nested form inside!">
    <el-form :model="form" label-width="100px" label-position="left" style="margin-left: 30px">
      <el-form-item label="Name">
        <el-input v-model="userInfoList.userName" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="Sex">
        <el-select v-model="userInfoList.sex" placeholder="Please select your sex" style="width: 300px">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
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
    <el-button style="margin-left: 50px" @click="onCancel">取消</el-button>
    <el-button type="primary" @click="onSubmit">修改</el-button>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/runtime-core'
import userInfo from './hook/userInfo'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Introduction',
  setup() {
    const { userInfoList, editUserInfo } = userInfo('1')
    const drawer = ref(false)
    const form = reactive({
      headImg: '',
      name: '',
      sex: '',
      profile: '',
    })
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
      ElMessage({
        message: 'Congrats, this is a success message.',
        type: 'success',
      })
    }

    return {
      drawer,
      form,
      onCancel,
      onSubmit,
      userInfoList,
    }
  },
})
</script>

<style lang="scss" scoped>
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
    }
    .profile {
      margin-top: 75px;
      overflow: hidden;
    }
  }
}
</style>
