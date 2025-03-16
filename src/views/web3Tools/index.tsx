import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import { useRouter } from '@/hooks/basic/useRouter'

const Web3Tools = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const navigateTo = (path: string) => {
    router.push(`/web3Tools/${path}`)
  }

  return (
    <StyleWrapper>
      <div className="header">
        <div className="title-container">
          <h1>Web3工具箱</h1>
          <p className="subtitle">专业区块链工具集，帮助您更好地管理Web3资产</p>
        </div>
        <div className="search-box">
          <svg viewBox="0 0 24 24" className="search-icon">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="text"
            placeholder="搜索工具..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      <div className="tools-section">
        <h2 className="section-title">常用工具</h2>
        <div className="tools-grid">
          <div className="tool-card" onClick={() => navigateTo('wallet')}>
            <div className="tool-icon wallet">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
            </div>
            <h3 className="tool-name">钱包管理</h3>
            <p className="tool-description">连接和管理您的加密钱包</p>
            <span className="tool-action">打开 →</span>
          </div>

          <div className="tool-card" onClick={() => navigateTo('explorer')}>
            <div className="tool-icon explorer">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <h3 className="tool-name">区块浏览器</h3>
            <p className="tool-description">查询区块链交易和地址信息</p>
            <span className="tool-action">打开 →</span>
          </div>

          <div className="tool-card">
            <div className="tool-icon gas">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
              </svg>
            </div>
            <h3 className="tool-name">GAS费估算</h3>
            <p className="tool-description">查看实时GAS费用并优化交易</p>
            <span className="tool-action">打开 →</span>
          </div>

          <div className="tool-card">
            <div className="tool-icon converter">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
            </div>
            <h3 className="tool-name">代币转换器</h3>
            <p className="tool-description">各类加密货币之间的价值换算</p>
            <span className="tool-action">打开 →</span>
          </div>
        </div>
      </div>

      <div className="tools-nav">
        <button className="nav-button active">所有工具</button>
        <button className="nav-button">钱包</button>
        <button className="nav-button">区块浏览器</button>
        <button className="nav-button">交易工具</button>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2.5rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .title-container {
    flex: 1;
  }

  h1 {
    font-size: 2.5rem;
    color: #1e293b;
    margin-bottom: 0.5rem;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #3b82f6, #60a5fa);
      border-radius: 2px;
    }
  }

  .subtitle {
    font-size: 1.1rem;
    color: #64748b;
    max-width: 500px;
    line-height: 1.5;
    margin-top: 1rem;
  }

  .search-box {
    display: flex;
    align-items: center;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 0.75rem 1.25rem;
    width: 300px;
    transition: all 0.3s;

    &:focus-within {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    @media (max-width: 768px) {
      margin-top: 1.5rem;
      width: 100%;
    }

    .search-icon {
      width: 20px;
      height: 20px;
      fill: #94a3b8;
      margin-right: 0.75rem;
    }

    .search-input {
      border: none;
      background: transparent;
      font-size: 1rem;
      color: #334155;
      width: 100%;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #94a3b8;
      }
    }
  }

  .tools-section {
    margin-bottom: 2.5rem;
  }

  .section-title {
    font-size: 1.25rem;
    color: #334155;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .tool-card {
    background-color: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
    cursor: pointer;
    border: 1px solid #f1f5f9;
    display: flex;
    flex-direction: column;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
      border-color: #e2e8f0;

      .tool-action {
        color: #3b82f6;
      }
    }
  }

  .tool-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;

    svg {
      fill: white;
    }

    &.wallet {
      background: linear-gradient(135deg, #3b82f6, #60a5fa);
    }

    &.explorer {
      background: linear-gradient(135deg, #10b981, #34d399);
    }

    &.gas {
      background: linear-gradient(135deg, #f59e0b, #fbbf24);
    }

    &.converter {
      background: linear-gradient(135deg, #8b5cf6, #a78bfa);
    }
  }

  .tool-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  .tool-description {
    font-size: 0.9rem;
    color: #64748b;
    margin-bottom: 1.5rem;
    line-height: 1.5;
    flex-grow: 1;
  }

  .tool-action {
    font-size: 0.9rem;
    color: #94a3b8;
    font-weight: 500;
    transition: color 0.2s;
    align-self: flex-end;
  }

  .tools-nav {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 0.5rem;

    @media (max-width: 768px) {
      margin-top: 1.5rem;
      width: 100%;
      overflow-x: auto;
      padding-bottom: 1rem;
    }
  }

  .nav-button {
    background-color: transparent;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;

    &.active {
      color: #3b82f6;
      font-weight: 500;

      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 10%;
        width: 80%;
        height: 3px;
        background-color: #3b82f6;
        border-radius: 3px;
      }
    }

    &:hover:not(.active) {
      background-color: #f8fafc;
      color: #334155;
    }
  }

  .content {
    min-height: 500px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    padding: 2rem;
  }
`

export default Web3Tools
