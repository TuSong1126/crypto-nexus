import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

import { ConstEnum } from '@/enums'

export default function NotFound() {
  const navigation = useNavigate()

  // 如果是因为没有token导致，则直接去到登录页
  useEffect(() => {
    const accessToken = localStorage.getItem(ConstEnum.TOKEN)
    if (!accessToken) {
      navigation('/login')
      return
    }
  }, [navigation])

  const goToHome = () => navigation('/home')

  return (
    <StyleWrapper>
      <div>页面不存在</div>
      <div className="btn" onClick={goToHome}>
        去首页
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  .btn {
    color: blue;
  }
`
