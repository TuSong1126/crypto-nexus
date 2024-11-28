import { httpGet, httpPost } from '@/utils/axios'

interface LoginType {
  username: string
  password: string
}

export const fetchLogin = (data: LoginType) => {
  return httpPost({ url: 'auth/login', data })
}

export const fetchRegister = (data: LoginType) => {
  return httpPost({ url: 'auth/register', data })
}

export const fetchPermission = () => {
  return httpGet({ url: 'auth/permission' })
}
