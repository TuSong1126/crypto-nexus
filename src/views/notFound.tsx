import { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

import Button from '@/components/common/Button'
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
  const goBack = () => router.back()

  return (
    <StyleWrapper>
      <div className="container">
        <div className="error-illustration">
          <svg viewBox="0 0 100 100" width="150" height="150">
            <circle cx="50" cy="50" r="45" fill="#EBF2FD" />
            <text x="50" y="70" fontSize="60" fontWeight="bold" fill="#6c5ce7" textAnchor="middle">
              ?
            </text>
          </svg>
        </div>
        <div className="error-code">404</div>
        <div className="error-message">页面不存在</div>
        <p className="error-description">抱歉，您访问的页面可能已被移除或暂时无法访问</p>
        <div className="actions">
          <Button
            variant="outline"
            onClick={goBack}
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            }
          >
            返回上一页
          </Button>
          <Button variant="primary" onClick={goToHome}>
            返回首页
          </Button>
        </div>
      </div>
    </StyleWrapper>
  )
}

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`

const StyleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0f0e13;
  background-image: radial-gradient(circle at 10% 10%, #1a1a2e 0%, #0f0e13 70%);

  .container {
    text-align: center;
    padding: 3rem;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    max-width: 550px;
    width: 90%;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 8px;
      background: linear-gradient(90deg, #6c5ce7, #00cec9);
    }
  }

  .error-illustration {
    margin-bottom: 1.5rem;
    animation: ${float} 3s ease-in-out infinite;
  }

  .error-code {
    font-size: 7rem;
    font-weight: bold;
    background: linear-gradient(135deg, #6c5ce7, #00cec9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .error-message {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #fff;
  }

  .error-description {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 2.5rem;
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 1rem;

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: center;
    }
  }
`
