import request from '../scripts/request'
import { onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'

export interface showInfoItem {
  _id?: string
  theme: string
  poster: string
  date: string
  address: string
  introduction: string
}

export default function showInfo(_id?: string) {
  const showInfoList = reactive<showInfoItem[]>([])
  const showDetail = reactive<showInfoItem>({ theme: '', poster: '', date: '', address: '', introduction: '' })
  // 查询所有展览
  const getAllShowsInfo = async () => {
    const res: { data: showInfoItem[] } = await request.get('/show/findAllShows')
    showInfoList.splice(0, showInfoList.length)
    showInfoList.push(...res.data)
  }
  // 查看展览详情
  const getShowDetail = async () => {
    const res: { data: showInfoItem } = await request.get(`/show/getShowDetail/${_id}`)
    showDetail.theme = res.data.theme
    showDetail.poster = res.data.poster
    showDetail.date = res.data.date
    showDetail.address = res.data.address
    showDetail.introduction = res.data.introduction
  }
  // 发布展览
  const postShow = async (params: showInfoItem) => {
    const res: { code: number; message: string } = await request.post('/show/postShow', params)
    if (res.code === 200) {
      getAllShowsInfo()
    }
  }
  // 修改展览
  const editShow = async (params: showInfoItem, _id?: string) => {
    const res: { code: number; message: string } = await request.post(`/show/editShow/${_id}`, params)
    if (res.code === 200) {
      ElMessage.success('Success!')
      getAllShowsInfo()
    }
  }
  // 删除展览
  const deleteShow = async (_id?: string) => {
    const res: { code: number; message: string } = await request.delete(`/show/deleteShow/${_id}`)
    if (res.code === 200) {
      ElMessage.success('Success!')
      getAllShowsInfo()
    }
  }
  onMounted(() => {
    getAllShowsInfo()
  })

  return { showInfoList, showDetail, getShowDetail, postShow, editShow, deleteShow }
}
