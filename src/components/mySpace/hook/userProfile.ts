import request from '../../../scripts/request'
import { onMounted, reactive } from 'vue'

export interface userProfileItem {
  userName: string
  userPwd: string
  sex: string
  phone: string
  email: string
  profile: string
}

export default function userProfile(_id: string) {
  const userProfileList = reactive<userProfileItem>({
    userName: '',
    userPwd: '',
    sex: '',
    phone: '',
    email: '',
    profile: '',
  })
  const getUserProfile = async () => {
    const res: userProfileItem = await request.get(`/user/findOneUser/${_id}`)
    userProfileList.userName = res.userName
    userProfileList.userPwd = res.userPwd
    userProfileList.sex = res.sex
    userProfileList.phone = res.phone
    userProfileList.email = res.email
    userProfileList.profile = res.profile
  }

  onMounted(() => {
    getUserProfile()
  })

  return { userProfileList }
}
