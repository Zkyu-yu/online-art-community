import request from '../scripts/request'
import { onMounted, reactive } from 'vue'

export interface blogInfoItem {
  _id?: string
  title: string
  actor: string
  date: string
  content: string
  picture: string
}

export default function blogByTitle(title: string) {
  const titleBlogList = reactive<blogInfoItem[]>([])
  // 根据标题查询blog
  const getBlogsByTitle = async () => {
    const res: { data: blogInfoItem[] } = await request.get(`/blog/findBlogByTitle/${title}`)
    titleBlogList.push(...res.data)
  }
  onMounted(() => {
    getBlogsByTitle()
  })

  return { titleBlogList }
}
