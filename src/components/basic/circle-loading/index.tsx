import { Spin } from 'antd'
import styled from 'styled-components'

export function CircleLoading() {
  return (
    <StyleWrapper>
      <Spin size="large" />
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`
