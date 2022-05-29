import request from '../scripts/request'
import { onMounted, reactive } from 'vue'

export interface blogInfoItem {
  _id?: string
  title: string
  actor: string
  date: string
  content: string
  picture: string[]
  status: string
}

export default function blogByTitle(title: string) {
  const titleBlogList = reactive<blogInfoItem[]>([])
  // 根据标题查询blog
  const getBlogsByTitle = async () => {
    const res: { data: blogInfoItem[] } = await request.get(`/blog/findBlogByTitle/${title}`)
    res.data.forEach(item => {
      if (item.status === '已通过') {
        titleBlogList.push(item)
      }
    })
  }
  onMounted(() => {
    getBlogsByTitle()
  })

  return { titleBlogList }
}
