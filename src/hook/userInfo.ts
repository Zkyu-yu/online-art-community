import request from '../scripts/request'
import { onMounted, reactive } from 'vue'

export interface userInfoItem {
  userName: string
  userPwd: string
  sex: string
  phone: string
  email: string
  profile: string
  headImg: string
}

export default function userInfo(userName: string) {
  const userInfoList = reactive<userInfoItem>({
    userName: '',
    userPwd: '',
    sex: '',
    phone: '',
    email: '',
    profile: '',
    headImg: '',
  })
  const actorInfoList = reactive<userInfoItem>({
    userName: '',
    userPwd: '',
    sex: '',
    phone: '',
    email: '',
    profile: '',
    headImg: '',
  })
  // 查询用户信息
  const getUserInfo = async () => {
    const res: { data: userInfoItem } = await request.get(`/user/findOneUserByName/${userName}`)
    userInfoList.userName = res.data.userName
    userInfoList.userPwd = res.data.userPwd
    userInfoList.sex = res.data.sex
    userInfoList.phone = res.data.phone
    userInfoList.email = res.data.email
    userInfoList.profile = res.data.profile
    userInfoList.headImg = res.data.headImg
    if (res.data.userName !== window.localStorage.getItem('userName')) {
      actorInfoList.userName = res.data.userName
      actorInfoList.userPwd = res.data.userPwd
      actorInfoList.sex = res.data.sex
      actorInfoList.phone = res.data.phone
      actorInfoList.email = res.data.email
      actorInfoList.profile = res.data.profile
      userInfoList.headImg = res.data.headImg
    }
    console.log(userInfoList)
  }
  // 修改用户信息
  const editUserInfo = async (params: userInfoItem) => {
    await request.post(`/user/editUser`, params)
    getUserInfo()
  }

  onMounted(() => {
    getUserInfo()
  })

  return { userInfoList, actorInfoList, editUserInfo }
}
