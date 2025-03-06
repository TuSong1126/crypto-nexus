import 'nprogress/nprogress.css'

import { message } from 'antd'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, Method } from 'axios'
import NProgress from 'nprogress'

import { ConstEnum, ResultStatusEnum } from '@/enums'
import { ResultType } from '@/types'

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
    const accessToken = localStorage.getItem(ConstEnum.TOKEN)
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
  (res: AxiosResponse<ResultType>) => {
    // 业务请求成功
    if (res.data?.code === ResultStatusEnum.SUCCESS) {
      return res
    }

    // 业务请求错误
    return Promise.reject(res)
  },
  (error: AxiosError<ResultType>) => {
    return Promise.reject(error)
  }
)

function request(method: Method, config: AxiosRequestConfig): Promise<ResultType> {
  return new Promise((resolve) => {
    NProgress.start()
    Axios.request({ ...config, method })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        message.error(err.data.msg)
        // reject(err.data)
      })
      .finally(() => {
        NProgress.done()
      })
  })
}

export function httpGet(config: AxiosRequestConfig): Promise<ResultType> {
  return request('GET', config)
}

export function httpPost(config: AxiosRequestConfig): Promise<ResultType> {
  return request('POST', config)
}

export function httpDelete(config: AxiosRequestConfig): Promise<ResultType> {
  return request('DELETE', config)
}

export function httpPut(config: AxiosRequestConfig): Promise<ResultType> {
  return request('PUT', config)
}
