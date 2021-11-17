<template>
  <div class="login-wrapper">
    <div :class="['login-container', type == 'login' ? 'active' : '']">
      <!-- 按钮栏 -->
      <div class="switch-wrapper">
        <div class="btn-wrapper">
          <div v-if="type == 'login'" class="txt" @click="type = 'register'">去注册</div>
          <div v-else class="txt" @click="type = 'login'">去登录</div>
        </div>
      </div>
      <!-- 表单栏 -->
      <div :class="['outerBox', type == 'login' ? 'active' : '']">
        <div class="container">
          <!-- 登录From -->
          <div v-show="type == 'login'" class="login">
            <el-form ref="loginForm" :model="loginUser" :rules="loginRules" status-icon>
              <div class="title">登录</div>
              <el-form-item prop="userName">
                <el-input v-model="loginUser.userName" type="text" placeholder="请输入账号 / 手机号 / 邮箱" />
              </el-form-item>
              <el-form-item prop="userPwd">
                <el-input v-model="loginUser.userPwd" type="userPwd" prefix-icon="el-icon-view" placeholder="请输入密码" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="btn-login" @click="login">登录</el-button>
              </el-form-item>
              <!-- <div class="w100 aCenter jSb">
                <el-button type="text" class="forgetuserPwd" @click="onOpenForgetuserPwd">忘记密码</el-button>
              </div> -->
            </el-form>
          </div>
          <!-- 注册From -->
          <div v-show="type == 'register'" class="register">
            <el-form ref="registerForm" :model="registerUser" :rules="registerRules" status-icon>
              <div class="title">注册</div>
              <el-form-item prop="userName">
                <el-input v-model="registerUser.userName" type="text" prefix-icon="el-icon-user" placeholder="请输入账号 / 手机号 / 邮箱" />
              </el-form-item>
              <el-form-item prop="email">
                <el-input v-model="registerUser.email" type="text" prefix-icon="el-icon-message" placeholder="请输入邮箱地址" />
              </el-form-item>
              <el-form-item prop="mobile">
                <el-input v-model="registerUser.mobile" type="number" prefix-icon="el-icon-mobile" placeholder="请输入手机号码" />
              </el-form-item>
              <el-form-item prop="userPwd">
                <el-input v-model="registerUser.userPwd" type="userPwd" prefix-icon="el-icon-view" placeholder="请输入密码" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="btn-login" @click="register">确认注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/runtime-core'
export interface loginUser {
  userName: string
  userPwd: string
}
export interface registerUser {
  userName: string
  userPwd: string
  email: string
  mobile: string
}
export interface RuleInput {
  required: boolean
  message: string
  trigger: string
}
export interface loginRules {
  userName: RuleInput[]
  userPwd: RuleInput[]
}
export interface registerRules {
  userName: RuleInput[]
  userPwd: RuleInput[]
  email: RuleInput[]
  mobile: RuleInput[]
}
export default defineComponent({
  name: 'Login',
  setup() {
    const type = ref('login')
    const loginUser = reactive<loginUser>({ userName: '', userPwd: '' })
    const registerUser = reactive<registerUser>({ userName: '', userPwd: '', email: '', mobile: '' })
    const loginRules = reactive<loginRules>({
      userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    })
    const registerRules = reactive<registerRules>({
      userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }],
      mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
    })
    const login = () => {
      console.log('登录成功~')
    }
    const register = () => {
      console.log('注册成功~')
    }
    return { type, loginUser, registerUser, loginRules, registerRules, login, register }
  },
})
</script>

<style lang="scss" scoped>
.login-wrapper {
  background-color: #ededed;
  display: flex;
  width: 100vw;
  height: 100vh;
  margin: auto;
  .login-container {
    background-color: #fff;
    position: relative;
    width: 1000px;
    height: 600px;
    margin: auto;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 0 10px 5px #ddd;
    .switch-wrapper {
      position: absolute;
      z-index: 99;
      left: 0;
      width: 32%;
      height: 100%;
      transition: transform 1s ease-in-out;
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      &::after {
        content: '';
        display: block;
        background-image: url('../assets/img/ld.jpg');
        background-size: 1000px 550px;
        background-position: top left;
        width: 100%;
        height: 100%;
        transition: all 1s ease-in-out;
      }
      .btn-wrapper {
        position: absolute;
        width: 100px;
        height: 36px;
        color: #fffffe;
        background-color: #6689e2;
        font-size: 15px;
        border-radius: 30px;
        cursor: pointer;
        flex-wrap: wrap;
        overflow: hidden;
        .txt {
          width: 100%;
          height: 100%;
          transition: all 1s ease-in-out;
          display: flex;
          display: -webkit-flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .outerBox {
      position: absolute;
      z-index: 3;
      left: 32%;
      overflow: hidden;
      width: 68%;
      height: 100%;
      transition: all 1s ease-in-out;
      .container {
        width: 100%;
        height: 100%;
        background-color: #fffffe;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .title {
          font-size: 36px;
          line-height: 1.5;
          text-align: center;
          margin-bottom: 30px;
          color: #666;
        }
        .btn-login {
          width: 100%;
        }
      }
    }
  }
  .active {
    .switch-wrapper {
      transform: translateX(calc(1000px - 100%));
      &::after {
        background-position: top right;
      }
    }
    .outerBox {
      transform: translateX(calc(-1000px + 100%));
    }
    .txt :first-child {
      margin-top: -100%;
    }
  }
}
</style>
