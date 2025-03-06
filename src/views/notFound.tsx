import { useEffect } from 'react'
import styled from 'styled-components'

import { ConstEnum } from '@/enums'
import { useRouter } from '@/hooks/basic/useRouter'

export default function NotFound() {
  const router = useRouter()

  // 如果是因为没有token导致，则直接去到登录页
  useEffect(() => {
    const accessToken = localStorage.getItem(ConstEnum.TOKEN)
    if (!accessToken) {
      router.push('/login')
      return
    }
  }, [router])

  const goToHome = () => router.push('/home')

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
