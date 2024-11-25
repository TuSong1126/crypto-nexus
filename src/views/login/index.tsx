import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

import useUserInfoStore from '@/store/userInfo'

import { fetchLogin, fetchPermission } from '@/apis/auth'

const Login = () => {
  const userInfoStore = useUserInfoStore()
  const navigation = useNavigate()

  const login = async () => {
    const params = { username: 'admin', password: '123456' }
    const { code, data } = await fetchLogin(params)

    if (code === 200) {
      const { token, userInfo } = data
      userInfoStore.updateToken(token)
      userInfoStore.updateUserInfo(userInfo)

      const { data: perm } = await fetchPermission()
      userInfoStore.updatePermission({
        btns: perm.btns,
        routes: perm.routes
      })

      navigation('/home')
    }
  }

  return (
    <div>
      <Button type="primary" onClick={login}>
        登录
      </Button>
    </div>
  )
}

export default Login
