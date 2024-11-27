import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

import './index.scss'

import useUserInfoStore from '@/store/userInfo'

import { fetchLogin, fetchPermission } from '@/apis/auth'
import Video from '@/assets/video/video.mp4'

const { VITE_APP_HOMEPAGE } = import.meta.env

const Login = () => {
  const userInfoStore = useUserInfoStore()
  const navigation = useNavigate()

  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('123456')

  const handleLogin = async () => {
    if (!username || !password) {
      message.error('请输入正确的账号和密码！')
      return
    }

    const { data } = await fetchLogin({ username, password })
    const { token, userInfo } = data
    userInfoStore.updateToken(token)
    userInfoStore.updateUserInfo(userInfo)

    const { data: perm } = await fetchPermission()
    userInfoStore.updatePermission({
      btns: perm.btns,
      routes: perm.routes
    })

    navigation(VITE_APP_HOMEPAGE, { replace: true })
  }

  return (
    <div className="login-wrapper">
      <div className="form">
        <div className="left">
          <video src={Video} muted loop autoPlay />
        </div>

        <div className="right">
          <div className="right-con">
            <h2>Wooden House</h2>

            <form>
              <h3>账号</h3>
              <input className="text" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

              <h3>密码</h3>
              <input
                className="text"
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>

            <input className="btn" type="submit" value="登录" onClick={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
