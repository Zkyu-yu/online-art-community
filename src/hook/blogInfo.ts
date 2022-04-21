import request from '../scripts/request'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '../router'

export interface blogInfoItem {
  _id?: string
  title: string
  actor: string
  date: string
  content: string
  picture: string[]
}

export default function blogInfo(_id?: string) {
  const showSetting = ref(0)
  const blogInfoList = reactive<blogInfoItem[]>([])
  const BlogDetail = reactive<blogInfoItem>({ title: '', actor: '', date: '', content: '', picture: [] })
  // 查询所有blog
  const getAllBlogsInfo = async () => {
    const res: { data: blogInfoItem[] } = await request.get('/blog/findAllBlogs')
    blogInfoList.push(...res.data)
  }
  // 查看blog详情
  const getBlogDetail = async () => {
    const res: { data: blogInfoItem } = await request.get(`/blog/getBlogDetail/${_id}`)
    BlogDetail.title = res.data.title
    BlogDetail.actor = res.data.actor
    BlogDetail.date = res.data.date
    BlogDetail.content = res.data.content
    BlogDetail.picture = res.data.picture
    // 判断当前登录用户是否是发贴者，如果是，则显示setting图标
    showSetting.value = res.data.actor === window.localStorage.getItem('userName') ? 1 : 0
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
  const editBlog = async (params: blogInfoItem, _id?: string) => {
    const res: { code: number; message: string } = await request.post(`/blog/editBlog/${_id}`, params)
    if (res.code === 200) {
      ElMessage.success('Success!')
      // 只有管理员会传_id,如果管理员操作就查看博客详情
      if (!_id) {
        getBlogDetail()
      }
      getAllBlogsInfo()
    }
  }
  // 删除blog
  const deleteBlog = async (_id?: string) => {
    const res: { code: number; message: string } = await request.delete(`/blog/deleteBlog/${_id}`)
    if (res.code === 200) {
      ElMessage.success('Success!')
      getAllBlogsInfo()
      // 只有管理员会传_id,如果管理员操作就不退回主页
      if (!_id) {
        router.back()
      }
    }
  }
  onMounted(() => {
    getAllBlogsInfo()
  })

  return { blogInfoList, BlogDetail, showSetting, getBlogDetail, postBlog, editBlog, deleteBlog }
}
