import { Button } from 'antd'

import useUserInfoStore from '@/store/userInfo'

export default function Home() {
  const userInfoStore = useUserInfoStore()

  const logout = () => {
    localStorage.removeItem('token')
    userInfoStore.updateToken('')
  }

  return (
    <>
      <Button type="primary" onClick={logout}>
        退出
      </Button>
    </>
  )
}
