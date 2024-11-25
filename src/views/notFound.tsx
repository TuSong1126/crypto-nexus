import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

export default function NotFound() {
  const navigation = useNavigate()

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
