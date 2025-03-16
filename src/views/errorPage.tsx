import styled from 'styled-components'

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
          <button className="action-button refresh" onClick={refreshPage}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="refresh-icon">
              <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
            刷新页面
          </button>
          <button className="action-button home" onClick={goToHome}>
            返回首页
          </button>
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;

  .container {
    text-align: center;
    padding: 2.5rem;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    max-width: 550px;
    width: 90%;
  }

  .error-icon {
    margin-bottom: 1.5rem;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  .error-code {
    font-size: 4rem;
    font-weight: 800;
    color: #f44336;
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }

  .error-title {
    font-size: 2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1rem;
  }

  .error-message {
    color: #666;
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

  .action-button {
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;

    &.refresh {
      background-color: #fff;
      color: #333;
      border: 1px solid #ddd;

      &:hover {
        background-color: #f5f5f5;
      }

      .refresh-icon {
        margin-right: 0.5rem;
      }
    }

    &.home {
      background-color: #f44336;
      color: white;

      &:hover {
        background-color: #d32f2f;
        box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
      }
    }
  }
`
