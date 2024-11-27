import { Button } from 'antd'

import useUserInfoStore from '@/store/userInfo'

import { ConstEnum } from '@/enums'

export default function Home() {
  const userInfoStore = useUserInfoStore()

  const logout = () => {
    localStorage.removeItem(ConstEnum.TOKEN)
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
