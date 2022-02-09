import request from '../scripts/request'
import { onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import router from '../router'

export interface commentInfoItem {
  _id?: string
  blogId: string
  commentName: string
  commentTime: string
  commentContent: string
}

export default function commentInfo(blogId?: string) {
  const commentList = reactive<commentInfoItem[]>([])
  // 查找单个blog的所有评论
  const findCommentByBlog = async () => {
    const res: { data: commentInfoItem[] } = await request.get(`/comment/findCommentByBlog/${blogId}`)
    commentList.push(...res.data)
  }
  // 发布评论
  const postComment = async (params: commentInfoItem) => {
    const res: { code: number; message: string } = await request.post('/comment/postComment', params)
    if (res.code === 200) {
      ElMessage.success('Success!')
      findCommentByBlog()
      router.go(0)
    }
  }
  // 删除评论
  const deleteComment = async (deleteId: string) => {
    const res: { code: number; message: string } = await request.delete(`/comment/deleteComment/${deleteId}`)
    if (res.code === 200) {
      ElMessage.success('Success!')
      findCommentByBlog()
      router.go(0)
    }
  }
  onMounted(() => {
    findCommentByBlog()
  })
  return { commentList, postComment, deleteComment }
}
