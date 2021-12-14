import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'http://localhost:3001/'

const request = axios.create({
  baseURL,
  timeout: 20000, // 请求超时 20s
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    ElMessage.error('网络响应错误，请刷新或稍后再试！')
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const { data } = response
    const { code } = data
    if (code === 200) return Promise.resolve(data)
    else ElMessage.error(data.message)
    return Promise.reject(data)
  },
  error => {
    ElMessage.error('网络响应错误，请刷新或稍后再试！')
    return Promise.reject(error)
  }
)

export default request
