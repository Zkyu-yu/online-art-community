import request from '../scripts/request'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '../router'

export interface blogItem {
  _id?: string
  title: string
  actor: string
  category: string
  date: string
  content: string
  picture: string[]
  status: string
}
export interface blogInfoItem {
  _id?: string
  title: string
  actor: string
  category: string
  date: string
  content: string
  picture: string[]
}

export default function blogInfo(_id?: string) {
  const showSetting = ref(0)
  const blogInfoList = reactive<blogItem[]>([])
  const allBlogList = reactive<blogItem[]>([])
  const filmList = reactive<blogItem[]>([])
  const artList = reactive<blogItem[]>([])
  const poemList = reactive<blogItem[]>([])
  const bookList = reactive<blogItem[]>([])
  const BlogDetail = reactive<blogItem>({ title: '', actor: '', category: '', date: '', content: '', picture: [], status: '' })
  // 查询所有blog
  const getAllBlogsInfo = async () => {
    const res: { data: blogItem[] } = await request.get('/blog/findAllBlogs')
    allBlogList.splice(0, allBlogList.length)
    allBlogList.push(...res.data)
    blogInfoList.splice(0, blogInfoList.length)
    res.data.forEach(item => {
      if (item.status === '已通过') {
        blogInfoList.push(item)
        if (item.category === 'film') {
          filmList.push(item)
        }
        if (item.category === 'art') {
          artList.push(item)
        }
        if (item.category === 'poem') {
          poemList.push(item)
        }
        if (item.category === 'book') {
          bookList.push(item)
        }
      }
    })
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
      // ElMessage.success('Success!')
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
  // 审核blog
  const checkBlog = async (_id: string, status: string) => {
    const res: { code: number; message: string } = await request.patch(`/blog/checkBlog?_id=${_id}&status=${status}`)
    if (res.code === 200) {
      ElMessage.success('Success!')
      getAllBlogsInfo()
    }
  }
  onMounted(() => {
    getAllBlogsInfo()
  })

  return {
    blogInfoList,
    allBlogList,
    filmList,
    artList,
    poemList,
    bookList,
    BlogDetail,
    showSetting,
    getBlogDetail,
    postBlog,
    editBlog,
    deleteBlog,
    checkBlog,
  }
}
