import request from '../scripts/request'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '../router'

export interface likeInfoItem {
  _id?: string
  blogId: string
  likeName: string
  likeTime: string
}

export default function likeInfo(blogId?: string) {
  // 用户是否点赞
  const isLiked = ref(false)
  const likeList = reactive<likeInfoItem[]>([])
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
  const deleteLike = async (deleteName: string) => {
    const res: { code: number; message: string } = await request.delete(`/like/deleteLike/${deleteName}`)
    if (res.code === 200) {
      ElMessage.success('Success!')
      findLikeByBlog()
      router.go(0)
    }
  }
  onMounted(() => {
    findLikeByBlog()
  })
  return { likeList, isLiked, postLike, deleteLike }
}
