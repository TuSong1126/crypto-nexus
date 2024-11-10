import { httpGet } from '@/utils/axios'

export const fetchGetList = () => {
  return httpGet({ url: 'users/me' })
}
