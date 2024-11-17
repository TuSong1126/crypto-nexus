import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

import useUserInfoStore from '@/store/userInfo'

import { fetchLogin, fetchPermission } from '@/apis/auth'

const Login = () => {
  const useUserInfo = useUserInfoStore()
  const navigation = useNavigate()

  const login = async () => {
    const params = { username: 'admin', password: '123456' }
    const { code, data } = await fetchLogin(params)

    if (code === 200) {
      const { token, userInfo } = data
      sessionStorage.setItem('token', token)
      useUserInfo.actions.updateToken(token)
      useUserInfo.actions.updateUserInfo(userInfo)

      const { data: data2 } = await fetchPermission()
      useUserInfo.actions.updatePermission({
        btns: data2.btns,
        routes: data2.routes
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
