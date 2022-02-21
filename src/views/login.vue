<template>
  <div class="login-wrapper">
    <div :class="['login-container', type === 'login' ? 'active' : '']">
      <!-- 按钮栏 -->
      <div class="switch-wrapper">
        <div class="btn-wrapper">
          <div v-if="type === 'login'">
            <div class="welcomeTitle">Welcome back!</div>
            <div class="words">To keep connected with us, please login with your personal info.</div>
            <el-button type="primary" class="btn-login" @click="changeAndReset">Create Account</el-button>
          </div>
          <div v-else>
            <div class="welcomeTitle">Hello friend!</div>
            <div class="words">Enter your personal details and start journey with us.</div>
            <el-button type="primary" class="btn-login" @click="changeAndReset">Login</el-button>
          </div>
        </div>
      </div>
      <!-- 表单栏 -->
      <div :class="['outerBox', type === 'login' ? 'active' : '']">
        <div class="container">
          <!-- 登录From -->
          <div v-show="type === 'login'" class="login">
            <el-form ref="loginFormData" :model="loginUser" :rules="loginRules" @submit.prevent>
              <div class="title">Login</div>
              <el-form-item prop="userName">
                <el-input v-model="loginUser.userName" type="text" :prefix-icon="User" placeholder="Name" />
              </el-form-item>
              <el-form-item prop="userPwd">
                <el-input v-model="loginUser.userPwd" type="password" :prefix-icon="View" placeholder="Password" />
              </el-form-item>
              <el-form-item>
                <el-button native-type="submit" type="primary" class="btn-login" @click="login">Login</el-button>
              </el-form-item>
              <el-button type="text" @click="forgetPwd">Forget password?</el-button>
            </el-form>
          </div>
          <!-- 注册From -->
          <div v-show="type === 'register'" class="register">
            <el-form ref="registerFormData" :model="registerUser" :rules="registerRules" @submit.prevent>
              <div class="title">Create Account</div>
              <el-form-item prop="userName">
                <el-input v-model="registerUser.userName" type="text" :prefix-icon="User" placeholder="Name" />
              </el-form-item>
              <el-form-item prop="userPwd">
                <el-input v-model="registerUser.userPwd" type="password" :prefix-icon="View" placeholder="Password" />
              </el-form-item>
              <el-form-item prop="email">
                <el-input v-model="registerUser.email" type="text" :prefix-icon="Message" placeholder="Email Address" />
              </el-form-item>
              <el-form-item prop="phone">
                <el-input v-model="registerUser.phone" type="text" :prefix-icon="Phone" placeholder="Phone Number" />
              </el-form-item>
              <el-form-item>
                <el-button native-type="submit" type="primary" class="btn-login" @click="register">Create Account</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core'
import { User, Message, Phone, View } from '@element-plus/icons'
import loginRegister from '../hook/loginRegister'

export default defineComponent({
  name: 'Login',
  setup() {
    const { userLogin, userRegister } = loginRegister()

    const type = ref('login')
    const loginFormData = ref()
    const registerFormData = ref()
    const loginUser = ref({ userName: '', userPwd: '' })
    const registerUser = ref({ userName: '', userPwd: '', email: '', phone: '' })
    const loginRules = ref({
      userName: [{ required: true, message: 'Please input your name.', trigger: 'blur' }],
      userPwd: [{ required: true, message: 'Please input your password.', trigger: 'blur' }],
    })
    const registerRules = ref({
      userName: [{ required: true, message: 'Please input your name.', trigger: 'blur' }],
      userPwd: [{ required: true, message: 'Please input your password.', trigger: 'blur' }],
      email: [{ required: true, message: 'Please input email address.', trigger: 'blur' }],
      phone: [{ required: true, message: 'Please input phone number.', trigger: 'blur' }],
    })

    // 切换 & 重置表单
    const changeAndReset = () => {
      if (type.value === 'register') {
        type.value = 'login'
        registerFormData.value.resetFields()
      } else {
        type.value = 'register'
        loginFormData.value.resetFields()
      }
    }
    const login = () => {
      loginFormData.value.validate((valid: boolean) => {
        if (!valid) return
        userLogin(loginUser.value)
      })
    }
    const register = () => {
      registerFormData.value.validate((valid: boolean) => {
        if (!valid) return
        userRegister(registerUser.value)
      })
    }
    const forgetPwd = () => {
      console.log('活该')
    }
    return {
      type,
      loginFormData,
      registerFormData,
      loginUser,
      registerUser,
      loginRules,
      registerRules,
      changeAndReset,
      login,
      register,
      forgetPwd,
      User,
      Message,
      Phone,
      View,
    }
  },
})
</script>

<style lang="scss" scoped>
.login-wrapper {
  background-color: #121212;
  display: flex;
  width: 100%;
  height: 100vh;
  margin: auto;
  .login-container {
    background-color: #121212;
    position: relative;
    width: 100%;
    height: 100vh;
    margin: auto;
    overflow: hidden;
    .el-button {
      font-family: 'Coda';
    }
    .el-button--primary {
      background-color: #409eff;
      border: none;
    }
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
        background-size: 1000px 100vh;
        background-position: top left;
        width: 100%;
        height: 100%;
        transition: all 1s ease-in-out;
      }
      .btn-wrapper {
        position: absolute;
        text-align: center;
        line-height: 1.5;
        .welcomeTitle {
          color: #fcfcfc;
          font-size: 36px;
          font-family: 'Coda';
          margin-bottom: 30px;
        }
        .words {
          color: rgba(#eee, 0.9);
          font-size: 16px;
          margin-bottom: 30px;
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
        background-color: #121212;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .title {
          font-size: 36px;
          font-family: 'Coda';
          line-height: 1.5;
          text-align: center;
          margin-bottom: 30px;
          color: #fcfcfc;
        }
        .btn-login {
          width: 100%;
        }
      }
    }
  }
  .active {
    .switch-wrapper {
      transform: translateX(calc(100vw - 100%));
      &::after {
        background-position: top right;
      }
    }
    .outerBox {
      transform: translateX(calc(-100vw + 100%));
    }
    .txt :first-child {
      margin-top: -100%;
    }
  }
}
</style>
