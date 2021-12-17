import request from '../scripts/request'
import { onMounted, reactive } from 'vue'

export interface blogInfoItem {
  title: string
  actor: string
  date: string
  content: string
  picture: string
}

export default function blogInfo(actor?: string) {
  const blogInfoList = reactive<blogInfoItem[]>([])
  const actorBlogList = reactive<blogInfoItem[]>([])
  // 查询所有blog
  const getAllBlogsInfo = async () => {
    const res: { data: blogInfoItem[] } = await request.get('/blog/findAllBlogs')
    blogInfoList.push(...res.data)
  }
  // 根据名字查询blog
  const getBlogsByName = async () => {
    const res: { data: blogInfoItem[] } = await request.get(`/blog/findBlogByName/${actor}`)
    actorBlogList.push(...res.data)
    console.log(actorBlogList)
  }
  onMounted(() => {
    getAllBlogsInfo()
    getBlogsByName()
  })

  return { blogInfoList, actorBlogList }
}
