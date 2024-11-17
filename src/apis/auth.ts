import { httpGet } from '@/utils/axios'

interface LoginType {
  username: string
  password: string
}

export const fetchLogin = (params: LoginType) => {
  return httpGet({ url: 'auth/login', params })
}

export const fetchPermission = () => {
  return httpGet({ url: 'auth/permission' })
}
