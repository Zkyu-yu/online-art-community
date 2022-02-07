import request from '../scripts/request'
import { onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'

export interface blogInfoItem {
  title: string
  actor: string
  date: string
  content: string
  picture: string
}

export default function blogInfo(_id?: string) {
  const blogInfoList = reactive<blogInfoItem[]>([])
  const BlogDetail = reactive<blogInfoItem>({ title: '', actor: '', date: '', content: '', picture: '' })
  // 查询所有blog
  const getAllBlogsInfo = async () => {
    const res: { data: blogInfoItem[] } = await request.get('/blog/findAllBlogs')
    blogInfoList.push(...res.data)
  }
  // 查看blog详情
  const getBlogDetail = async () => {
    const res: { data: blogInfoItem } = await request.get(`/blog/getBlogDetail/${_id}`)
    console.log(111)

    BlogDetail.title = res.data.title
    BlogDetail.actor = res.data.actor
    BlogDetail.date = res.data.date
    BlogDetail.content = res.data.content
    BlogDetail.picture = res.data.picture
  }
  // 发布blog
  const postBlog = async (params: blogInfoItem) => {
    const res: { code: number; message: string } = await request.post('/blog/postBlog', params)
    if (res.code === 200) {
      ElMessage.success('Success!')
      getAllBlogsInfo()
    }
  }
  // 修改blog
  const editBlog = async (params: blogInfoItem) => {
    const res: { code: number; message: string } = await request.post(`/blog/editBlog/${_id}`, params)
    if (res.code === 200) {
      ElMessage.success('Success!')
      getAllBlogsInfo()
    }
  }
  // 删除blog
  const deleteBlog = async () => {
    const res: { code: number; message: string } = await request.delete(`/blog/editBlog/${_id}`)
    if (res.code === 200) {
      ElMessage.success('Success!')
      getAllBlogsInfo()
    }
  }
  onMounted(() => {
    getAllBlogsInfo()
  })

  return { blogInfoList, BlogDetail, getBlogDetail, postBlog, editBlog, deleteBlog }
}
