import 'nprogress/nprogress.css'
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, Method } from 'axios'
import NProgress from 'nprogress'

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

interface ResType {
  code: number
  data?: any
  msg?: string
}

function request(method: Method, config: AxiosRequestConfig): Promise<ResType> {
  return new Promise((resolve, reject) => {
    NProgress.start()
    Axios.request({ ...config, method })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
      .finally(() => {
        NProgress.done()
      })
  })
}

export function httpGet(config: AxiosRequestConfig): Promise<ResType> {
  return request('GET', config)
}

export function httpPost(config: AxiosRequestConfig): Promise<ResType> {
  return request('POST', config)
}

export function httpDelete(config: AxiosRequestConfig): Promise<ResType> {
  return request('DELETE', config)
}

export function httpPut(config: AxiosRequestConfig): Promise<ResType> {
  return request('PUT', config)
}
