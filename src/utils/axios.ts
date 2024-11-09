import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

/*
 * 创建实例
 */
const Axios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API
})

/**
 * 请求拦截器
 */
Axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('token') || 'no-token'
    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
Axios.interceptors.response.use(
  (config: AxiosResponse) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default Axios
