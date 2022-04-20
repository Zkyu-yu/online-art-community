import request from '../scripts/request'
import { onMounted, reactive } from 'vue'

export interface blogInfoItem {
  _id?: string
  title: string
  actor: string
  date: string
  content: string
  picture: string[]
}

export default function blogByName(actor: string) {
  const actorBlogList = reactive<blogInfoItem[]>([])
  // 根据名字查询blog
  const getBlogsByName = async () => {
    const res: { data: blogInfoItem[] } = await request.get(`/blog/findBlogByName/${actor}`)
    actorBlogList.push(...res.data)
  }
  onMounted(() => {
    getBlogsByName()
  })

  return { actorBlogList }
}
