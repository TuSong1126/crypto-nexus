import styled, { keyframes } from 'styled-components'

import Button from '@/components/common/Button'
import { useRouter } from '@/hooks/basic/useRouter'

export default function ErrorPage() {
  const router = useRouter()

  const goToHome = () => router.push('/home')
  const refreshPage = () => window.location.reload()

  return (
    <StyleWrapper>
      <div className="container">
        <div className="error-icon">
          <svg viewBox="0 0 24 24" width="100" height="100">
            <circle cx="12" cy="12" r="11" fill="#f44336" />
            <path d="M12 6v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="17" r="1" fill="white" />
          </svg>
        </div>
        <div className="error-code">500</div>
        <div className="error-title">系统错误</div>
        <p className="error-message">很抱歉，系统遇到了一些问题</p>
        <div className="buttons-container">
          <Button variant="ghost" onClick={refreshPage} icon={<RefreshIcon />}>
            刷新页面
          </Button>
          <Button variant="primary" onClick={goToHome}>
            返回首页
          </Button>
        </div>
      </div>
    </StyleWrapper>
  )
}

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
  </svg>
)

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
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
    padding: 2.5rem;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    max-width: 550px;
    width: 90%;
  }

  .error-icon {
    margin-bottom: 1.5rem;
    animation: ${pulse} 2s infinite;
  }

  .error-code {
    font-size: 4rem;
    font-weight: 800;
    background: linear-gradient(135deg, #f44336, #ff7675);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 0.5rem;
  }

  .error-title {
    font-size: 2rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1rem;
  }

  .error-message {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 2rem;
    font-size: 1.1rem;
    line-height: 1.5;
  }

  .buttons-container {
    display: flex;
    gap: 1rem;
    justify-content: center;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }
`
