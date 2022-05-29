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

export default function blogByName(actor: string) {
  const actorBlogList = reactive<blogInfoItem[]>([])
  // 根据名字查询blog
  const getBlogsByName = async () => {
    const res: { data: blogInfoItem[] } = await request.get(`/blog/findBlogByName/${actor}`)
    res.data.forEach(item => {
      if (item.status === '已通过') {
        actorBlogList.push(item)
      }
    })
  }
  onMounted(() => {
    getBlogsByName()
  })

  return { actorBlogList }
}
