import { Button } from 'antd'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { CircleLoading } from '@/components/basic/circle-loading'
import { ConstEnum } from '@/enums'
import useUserInfoStore from '@/store/userInfo'

export default function AboutPage() {
  const userInfoStore = useUserInfoStore()

  const logout = () => {
    localStorage.removeItem(ConstEnum.TOKEN)
    userInfoStore.updateToken('')
  }

  return (
    <>
      <div>关于</div>
      <Button type="primary" onClick={logout}>
        退出
      </Button>
      <br />
      <Suspense fallback={<CircleLoading />}>
        <Outlet />
      </Suspense>
    </>
  )
}
