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
  const goBack = () => router.back()

  return (
    <StyleWrapper>
      <div className="container">
        <div className="error-illustration">
          <svg viewBox="0 0 100 100" width="150" height="150">
            <circle cx="50" cy="50" r="45" fill="#EBF2FD" />
            <text x="50" y="70" fontSize="60" fontWeight="bold" fill="#3f51b5" textAnchor="middle">
              ?
            </text>
          </svg>
        </div>
        <div className="error-code">404</div>
        <div className="error-message">页面不存在</div>
        <p className="error-description">抱歉，您访问的页面可能已被移除或暂时无法访问</p>
        <div className="actions">
          <button className="back-button" onClick={goBack}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="back-icon"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            返回上一页
          </button>
          <button className="home-button" onClick={goToHome}>
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
  background-image: radial-gradient(circle at 10% 10%, #eef2ff 0%, #f8f9fa 70%);

  .container {
    text-align: center;
    padding: 3rem;
    border-radius: 16px;
    background-color: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
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
      background: linear-gradient(90deg, #3f51b5, #5c6bc0);
    }
  }

  .error-illustration {
    margin-bottom: 1.5rem;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .error-code {
    font-size: 7rem;
    font-weight: bold;
    background: linear-gradient(135deg, #3f51b5, #5c6bc0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .error-message {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
  }

  .error-description {
    color: #666;
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

  .home-button {
    background-color: #3f51b5;
    color: white;
    border: none;
    padding: 0.85rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 500;

    &:hover {
      background-color: #303f9f;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(63, 81, 181, 0.3);
    }
  }

  .back-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: #3f51b5;
    border: 1px solid #d0d7de;
    padding: 0.85rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 500;

    .back-icon {
      margin-right: 0.5rem;
    }

    &:hover {
      background-color: #f0f3ff;
      border-color: #3f51b5;
    }
  }
`
