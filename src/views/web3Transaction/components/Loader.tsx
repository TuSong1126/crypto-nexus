import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  flex-direction: column;
`

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #6c5ce7;
  border-left-color: #00cec9;
  animation: ${spin} 1s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(108, 92, 231, 0.2);
`

const LoadingText = styled.p`
  color: white;
  font-size: 0.875rem;
  margin-top: 0.75rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
`

const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <Spinner />
      <LoadingText>处理中...</LoadingText>
    </LoaderContainer>
  )
}

export default Loader
