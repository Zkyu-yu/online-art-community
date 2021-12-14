import router from '../router'
import request from '../scripts/request'
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
// import { ref } from 'vue'

export interface loginItem {
  userName: string
  userPwd: string
}
export interface registerItem {
  userName: string
  userPwd: string
  phone: string
  email: string
}
export interface message {
  token: string
  userid: string
}

export default function loginRegister() {
  const newPeople = reactive<loginItem>({
    userName: '',
    userPwd: '',
  })
  const userLogin = async (params: loginItem) => {
    const res: { message: message } = await request.post('/auth/login', params)
    if (res.message.token) {
      localStorage.setItem('token', res.message.token)
      localStorage.setItem('userid', res.message.userid)
      ElMessage.success('Welcome to the Human Community!')
      router.push({ name: 'Home', params: { isSign: 1 } })
    }
  }

  const userRegister = async (params: registerItem) => {
    const res: { code: number; message: string } = await request.post('/user/register', params)
    newPeople.userName = params.userName
    newPeople.userPwd = params.userPwd
    if (res.code === 200) {
      userLogin(newPeople)
    }
  }

  return { userLogin, userRegister }
}
