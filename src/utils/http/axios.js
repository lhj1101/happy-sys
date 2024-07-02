import axios from 'axios'
const baseURL = 'http://xxx.xxx.xxx.xxx:8080'

// 创建 Axios 实例
const instance = axios.create({
  baseURL: baseURL, // 替换为您的 API 地址
  timeout: 60000 // 请求超时时间
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求发送之前可以进行一些处理
    console.log('请求拦截器', config)
    const token = localStorage.getItem('xxxtoken')
    config.headers['Content-Type'] = 'application/json'
    // 如果 token 存在，则在请求头中添加 Authorization 字段
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 在响应数据之前可以进行一些处理
    console.log('响应拦截器', response)
    const { data, status } = response
    console.log(data, status)
    if (status === 200) {
      if (data.success) {
        return Promise.resolve(data.data)
      } else {
        return Promise.reject(data.msg)
      }
    }
  },
  (error) => {
    const { response } = error
    const { status } = response
    console.log(error, status)
    return Promise.reject(error)
  }
)

export default instance
