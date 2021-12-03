import request from '../../../scripts/request'
import { onMounted, reactive } from 'vue'

export interface userInfoItem {
  userName: string
  userPwd: string
  sex: string
  phone: string
  email: string
  profile: string
}

export default function userInfo(_id: string) {
  const userInfoList = reactive<userInfoItem>({
    userName: '',
    userPwd: '',
    sex: '',
    phone: '',
    email: '',
    profile: '',
  })
  // 查询用户信息
  const getUserInfo = async () => {
    const res: userInfoItem = await request.get(`/user/findOneUser/${_id}`)
    userInfoList.userName = res.userName
    userInfoList.userPwd = res.userPwd
    userInfoList.sex = res.sex
    userInfoList.phone = res.phone
    userInfoList.email = res.email
    userInfoList.profile = res.profile
  }
  // 修改用户信息
  const editUserInfo = async (params: userInfoItem) => {
    await request.put(`/user/editUser/${_id}`, params)
    getUserInfo()
  }

  onMounted(() => {
    getUserInfo()
  })

  return { userInfoList, editUserInfo }
}
