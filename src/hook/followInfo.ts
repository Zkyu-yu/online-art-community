import request from '../scripts/request'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '../router'

export interface followInfoItem {
  _id?: string
  followName: string
  fansName: string
  followTime: string
}
export interface deleteInfoItem {
  followName: string
  fansName: string
}

export default function followInfo() {
  // 用户是否关注
  const isFollowed = ref(false)
  const followsList = reactive<followInfoItem[]>([])
  const fansList = reactive<followInfoItem[]>([])
  // 查看用户关注列表
  const findFollowsList = async (fansName: string) => {
    const res: { data: followInfoItem[] } = await request.get(`/follow/findFollowsList/${fansName}`)
    followsList.push(...res.data)
    for (const i in followsList) {
      if (followsList[i].followName === router.currentRoute.value.query.actor) {
        isFollowed.value = true
      }
    }
  }
  // 查看用户粉丝列表
  const findFansList = async (followName: string) => {
    const res: { data: followInfoItem[] } = await request.get(`/follow/findFansList/${followName}`)
    fansList.push(...res.data)
  }
  // 新增关注
  const postFollow = async (params: followInfoItem) => {
    const res: { code: number; message: string } = await request.post('/follow/followSomeone', params)
    if (res.code === 200) {
      ElMessage.success('Success!')
      router.go(0)
    }
  }
  // 取消关注
  const deleteFollow = async (params: deleteInfoItem) => {
    const res: { code: number; message: string } = await request.delete('/follow/deleteFollow', { data: params })
    if (res.code === 200) {
      ElMessage.success('Success!')
      router.go(0)
    }
  }
  onMounted(() => {
    findFollowsList(localStorage.getItem('userName') as unknown as string)
    findFansList(localStorage.getItem('userName') as unknown as string)
  })
  return { followsList, fansList, isFollowed, postFollow, deleteFollow }
}
