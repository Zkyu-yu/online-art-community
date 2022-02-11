import request from '../scripts/request'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '../router'

export interface likeInfoItem {
  _id?: string
  blogId: string
  title: string
  actor: string
  date: string
  content: string
  picture: string
  likeName: string
  likeTime: string
}
export interface deleteInfoItem {
  blogId: string
  likeName: string
}

export default function likeInfo(blogId?: string) {
  // 用户是否点赞
  const isLiked = ref(false)
  const likeList = reactive<likeInfoItem[]>([])
  const userLikeList = reactive<likeInfoItem[]>([])
  // 查找单个blog的所有赞
  const findLikeByBlog = async () => {
    const res: { data: likeInfoItem[] } = await request.get(`/like/findLikeByBlog/${blogId}`)
    likeList.push(...res.data)
    for (const i in likeList) {
      if (likeList[i].likeName === localStorage.getItem('userName')) {
        isLiked.value = true
      }
    }
  }
  // 查找用户点赞列表
  const findLikeByUser = async (likeName: string) => {
    const res: { data: likeInfoItem[] } = await request.get(`/like/findLikeByUser/${likeName}`)
    userLikeList.push(...res.data)
  }
  // 点赞
  const postLike = async (params: likeInfoItem) => {
    const res: { code: number; message: string } = await request.post('/like/postLike', params)
    if (res.code === 200) {
      ElMessage.success('Success!')
      findLikeByBlog()
      router.go(0)
    }
  }
  // 取消点赞
  const deleteLike = async (params: deleteInfoItem) => {
    const res: { code: number; message: string } = await request.delete('/like/deleteLike', { data: params })
    if (res.code === 200) {
      ElMessage.success('Success!')
      findLikeByBlog()
      router.go(0)
    }
  }
  onMounted(() => {
    findLikeByBlog()
    findLikeByUser(localStorage.getItem('userName') as unknown as string)
  })
  return { likeList, userLikeList, isLiked, postLike, deleteLike }
}
