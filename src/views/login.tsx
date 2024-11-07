import { useNavigate } from 'react-router-dom'

import { Button } from 'antd'

const Login = () => {
  const navigation = useNavigate()

  const login = () => {
    localStorage.setItem('token', '12345678')
    navigation('/user')
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
