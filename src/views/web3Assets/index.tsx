import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Web3Assets = () => {
  const [activeTab, setActiveTab] = useState('assets')

  // 模拟交易历史数据
  const transactions = [
    {
      id: 1,
      type: 'receive',
      amount: '0.5 ETH',
      from: '0x71C...8F3e',
      to: '你',
      time: '今天 14:32',
      status: 'completed'
    },
    {
      id: 2,
      type: 'send',
      amount: '200 USDT',
      from: '你',
      to: '0x3A8...F29c',
      time: '昨天 09:15',
      status: 'completed'
    },
    {
      id: 3,
      type: 'swap',
      amount: '1.2 ETH → 1,850 USDT',
      from: '你',
      to: '你',
      time: '2023-12-02 17:45',
      status: 'completed'
    }
  ]

  return (
    <StyleWrapper>
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="title-section">
            <h1>Web3资产管理</h1>
            <p>管理您的加密货币、代币及区块链资产</p>
          </div>
          <div className="action-buttons">
            <button className="btn btn-primary">
              <span className="btn-icon">+</span>
              导入资产
            </button>
            <button className="btn btn-outline">
              <span className="btn-icon">↑</span>
              发送
            </button>
            <button className="btn btn-outline">
              <span className="btn-icon">↓</span>
              接收
            </button>
            <button className="btn btn-icon-only">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
            </button>
          </div>
        </header>

        <section className="summary-section">
          <div className="total-value-card">
            <div className="value-info">
              <div className="label">总资产价值</div>
              <div className="amount">$12,483.29</div>
              <div className="change positive">
                <span className="change-icon">↑</span>
                <span className="change-value">+2.4%</span>
              </div>
            </div>
            <div className="chart-container">
              <svg viewBox="0 0 200 50">
                <path
                  d="M0,35 C20,32 40,30 60,25 S100,20 120,15 S160,5 200,10"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.5)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div className="token-cards">
            <div className="token-card eth">
              <div className="token-icon">ETH</div>
              <div className="token-details">
                <div className="token-name">以太坊</div>
                <div className="token-amount">4.28 ETH</div>
                <div className="token-value">$7,356.84</div>
              </div>
              <div className="token-change positive">+3.2%</div>
            </div>

            <div className="token-card btc">
              <div className="token-icon">BTC</div>
              <div className="token-details">
                <div className="token-name">比特币</div>
                <div className="token-amount">0.12 BTC</div>
                <div className="token-value">$3,245.60</div>
              </div>
              <div className="token-change positive">+1.5%</div>
            </div>

            <div className="token-card usdt">
              <div className="token-icon">USDT</div>
              <div className="token-details">
                <div className="token-name">泰达币</div>
                <div className="token-amount">1,880.85 USDT</div>
                <div className="token-value">$1,880.85</div>
              </div>
              <div className="token-change neutral">0.0%</div>
            </div>

            <div className="token-card add-new">
              <div className="add-icon">+</div>
              <div className="add-text">添加代币</div>
            </div>
          </div>
        </section>

        <nav className="tabs-navigation">
          <button
            className={`tab-btn ${activeTab === 'assets' ? 'active' : ''}`}
            onClick={() => setActiveTab('assets')}
          >
            资产
          </button>
          <button
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            交易历史
          </button>
          <button className={`tab-btn ${activeTab === 'nft' ? 'active' : ''}`} onClick={() => setActiveTab('nft')}>
            NFT藏品
          </button>
          <button
            className={`tab-btn ${activeTab === 'staking' ? 'active' : ''}`}
            onClick={() => setActiveTab('staking')}
          >
            质押
          </button>
        </nav>

        <div className="content-area">
          {activeTab === 'history' ? (
            <div className="history-section">
              <div className="section-header">
                <h2>最近交易</h2>
                <button className="view-all">查看全部</button>
              </div>

              <div className="transactions">
                {transactions.map((tx) => (
                  <div className="transaction-item" key={tx.id}>
                    <div className={`tx-icon ${tx.type}`}>
                      {tx.type === 'receive' && (
                        <svg viewBox="0 0 24 24">
                          <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
                        </svg>
                      )}
                      {tx.type === 'send' && (
                        <svg viewBox="0 0 24 24">
                          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
                        </svg>
                      )}
                      {tx.type === 'swap' && (
                        <svg viewBox="0 0 24 24">
                          <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z" />
                        </svg>
                      )}
                    </div>

                    <div className="tx-info">
                      <div className="tx-type">
                        {tx.type === 'receive' ? '收款' : tx.type === 'send' ? '转账' : '兑换'}
                      </div>
                      <div className="tx-path">
                        <span className="from">{tx.from}</span>
                        <span className="path-arrow">→</span>
                        <span className="to">{tx.to}</span>
                      </div>
                    </div>

                    <div className="tx-amount-info">
                      <div className={`amount ${tx.type === 'receive' ? 'positive' : ''}`}>
                        {tx.type === 'receive' ? '+' : ''}
                        {tx.amount}
                      </div>
                      <div className="time">{tx.time}</div>
                    </div>

                    <div className="tx-status">
                      <span className={`status-indicator ${tx.status}`}>
                        {tx.status === 'completed' ? '已完成' : '处理中'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  color: #111827;

  .dashboard {
    padding: 2rem;
    background-color: rgba(249, 250, 251, 0.8);
    border-radius: 20px;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.08),
      0 4px 6px -2px rgba(0, 0, 0, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(229, 231, 235, 0.4);
  }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2.5rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1.5rem;
    }

    .title-section {
      h1 {
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      p {
        font-size: 1rem;
        color: #6b7280;
        margin: 0;
      }
    }

    .action-buttons {
      display: flex;
      gap: 0.75rem;

      @media (max-width: 768px) {
        width: 100%;
        justify-content: space-between;
      }
    }
  }

  .summary-section {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1.5rem;
    margin-bottom: 2.5rem;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  .total-value-card {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    padding: 1.5rem;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.2);

    .value-info {
      .label {
        font-size: 0.875rem;
        opacity: 0.9;
        margin-bottom: 0.5rem;
      }

      .amount {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .change {
        display: inline-flex;
        align-items: center;
        font-size: 0.875rem;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;

        &.positive {
          background-color: rgba(16, 185, 129, 0.2);
          color: #ecfdf5;
        }

        .change-icon {
          margin-right: 0.25rem;
        }
      }
    }

    .chart-container {
      margin-top: 1.5rem;

      svg {
        width: 100%;
        height: 50px;

        path {
          stroke: rgba(255, 255, 255, 0.7);
          stroke-width: 3;
        }
      }
    }
  }

  .token-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;

    .token-card {
      background-color: white;
      border-radius: 16px;
      padding: 1.5rem;
      border: 1px solid rgba(229, 231, 235, 0.5);
      transition: all 0.3s ease;
      cursor: pointer;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

      &:hover {
        transform: translateY(-5px);
        box-shadow:
          0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }

      .token-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1rem;
        margin-bottom: 1.25rem;
      }

      &.eth .token-icon {
        background-color: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
      }

      &.btc .token-icon {
        background-color: rgba(245, 158, 11, 0.1);
        color: #f59e0b;
      }

      &.usdt .token-icon {
        background-color: rgba(16, 185, 129, 0.1);
        color: #10b981;
      }

      .token-details {
        margin-bottom: 0.75rem;

        .token-name {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .token-amount {
          font-weight: 600;
          margin-bottom: 0.25rem;
          font-size: 1.125rem;
        }

        .token-value {
          font-size: 0.875rem;
          color: #374151;
        }
      }

      .token-change {
        display: inline-block;
        font-size: 0.75rem;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;

        &.positive {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        &.negative {
          background-color: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        &.neutral {
          background-color: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }
      }

      &.add-new {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px dashed #d1d5db;
        background-color: rgba(249, 250, 251, 0.5);

        .add-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .add-text {
          color: #6b7280;
          font-size: 0.875rem;
        }
      }
    }
  }

  .tabs-navigation {
    display: flex;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1.5rem;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 4px;
    }

    .tab-btn {
      padding: 0.75rem 1.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #6b7280;
      background: none;
      border: none;
      cursor: pointer;
      position: relative;
      transition: all 0.2s ease;
      white-space: nowrap;

      &:hover {
        color: #3b82f6;
      }

      &.active {
        color: #3b82f6;

        &:after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #3b82f6;
          border-radius: 1px;
        }
      }
    }
  }

  .content-area {
    padding: 1rem 0;
  }

  .history-section {
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
      }

      .view-all {
        font-size: 0.875rem;
        color: #3b82f6;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .transactions {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .transaction-item {
      display: grid;
      grid-template-columns: auto 1fr auto auto;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      background-color: white;
      border-radius: 12px;
      border: 1px solid rgba(229, 231, 235, 0.5);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: all 0.2s ease;

      &:hover {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      @media (max-width: 640px) {
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto;
        gap: 0.75rem;
      }

      .tx-icon {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }

        &.receive {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        &.send {
          background-color: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        &.swap {
          background-color: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }
      }

      .tx-info {
        .tx-type {
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .tx-path {
          font-size: 0.75rem;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 0.375rem;

          .path-arrow {
            opacity: 0.5;
          }
        }
      }

      .tx-amount-info {
        text-align: right;

        .amount {
          font-weight: 500;
          margin-bottom: 0.25rem;

          &.positive {
            color: #10b981;
          }
        }

        .time {
          font-size: 0.75rem;
          color: #6b7280;
        }

        @media (max-width: 640px) {
          text-align: left;
        }
      }

      .tx-status {
        .status-indicator {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;

          &.completed {
            background-color: rgba(16, 185, 129, 0.1);
            color: #10b981;
          }

          &.pending {
            background-color: rgba(245, 158, 11, 0.1);
            color: #f59e0b;
          }
        }
      }
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 12px;
    transition: all 0.2s ease;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    .btn-icon {
      margin-right: 0.5rem;
    }

    &.btn-primary {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      border: none;

      &:hover {
        box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.5);
        transform: translateY(-1px);
      }
    }

    &.btn-outline {
      background-color: transparent;
      color: #3b82f6;
      border: 1px solid #e5e7eb;

      &:hover {
        border-color: #3b82f6;
        background-color: rgba(59, 130, 246, 0.05);
      }
    }

    &.btn-icon-only {
      padding: 0.625rem;
      background-color: transparent;
      color: #6b7280;
      border: 1px solid #e5e7eb;

      &:hover {
        color: #3b82f6;
        border-color: #3b82f6;
      }
    }
  }
`

export default Web3Assets
