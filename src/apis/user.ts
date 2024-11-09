import Axios from '@/utils/axios'

interface RowItem {
  id: number
  fileName: string
}

interface ListModel {
  code: number
  data: RowItem[]
}

export const fetchGetList = () => {
  return Axios.get<ListModel>('users/me')
}
