import request from '../scripts/request'
import { onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'

export interface commentInfoItem {
  _id?: string
  blogId: string
  commentName: string
  commentTime: string
  commentContent: string
}

export default function commentInfo(blogId?: string) {
  const allCommentList = reactive<commentInfoItem[]>([])
  const commentList = reactive<commentInfoItem[]>([])
  // 查找所有评论
  const findAllComment = async () => {
    const res: { data: commentInfoItem[] } = await request.get('/comment/findAllComment')
    allCommentList.splice(0, allCommentList.length)
    allCommentList.push(...res.data)
  }
  // 查找单个blog的所有评论
  const findCommentByBlog = async () => {
    const res: { data: commentInfoItem[] } = await request.get(`/comment/findCommentByBlog/${blogId}`)
    commentList.splice(0, commentList.length)
    commentList.push(...res.data)
  }
  // 发布评论
  const postComment = async (params: commentInfoItem) => {
    const res: { code: number; message: string } = await request.post('/comment/postComment', params)
    if (res.code === 200) {
      ElMessage.success('评论成功!')
      findCommentByBlog()
    }
  }
  // 删除评论
  const deleteComment = async (deleteId: string) => {
    const res: { code: number; message: string } = await request.delete(`/comment/deleteComment/${deleteId}`)
    if (res.code === 200) {
      ElMessage.success('删除成功!')
      findCommentByBlog()
    }
  }
  onMounted(() => {
    findAllComment()
    findCommentByBlog()
  })
  return { allCommentList, commentList, findCommentByBlog, postComment, deleteComment }
}
