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
      <div className="header">
        <div className="title-area">
          <h1>Web3资产管理</h1>
          <p className="description">管理您的加密货币、代币及区块链资产</p>
        </div>
        <div className="action-area">
          <button className="action-btn primary">导入资产</button>
          <button className="action-btn">发送</button>
          <button className="action-btn">接收</button>
          <button className="action-btn icon-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" className="action-icon">
              <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="balance-summary">
        <div className="total-balance">
          <span className="label">总资产价值</span>
          <span className="value">$12,483.29</span>
          <span className="change positive">+2.4% ↑</span>
          <div className="balance-chart">
            <svg viewBox="0 0 200 50" className="chart">
              <path
                d="M0,35 C20,32 40,30 60,25 S100,20 120,15 S160,5 200,10"
                fill="none"
                stroke="rgba(59, 130, 246, 0.5)"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <div className="balance-cards">
          <div className="balance-card">
            <div className="token-icon eth">ETH</div>
            <div className="token-info">
              <div className="token-name">以太坊</div>
              <div className="token-balance">4.28 ETH</div>
              <div className="token-value">$7,356.84</div>
            </div>
            <div className="token-change positive">+3.2%</div>
          </div>
          <div className="balance-card">
            <div className="token-icon btc">BTC</div>
            <div className="token-info">
              <div className="token-name">比特币</div>
              <div className="token-balance">0.12 BTC</div>
              <div className="token-value">$3,245.60</div>
            </div>
            <div className="token-change positive">+1.5%</div>
          </div>
          <div className="balance-card">
            <div className="token-icon usdt">USDT</div>
            <div className="token-info">
              <div className="token-name">泰达币</div>
              <div className="token-balance">1,880.85 USDT</div>
              <div className="token-value">$1,880.85</div>
            </div>
            <div className="token-change neutral">0.0%</div>
          </div>
          <div className="balance-card add-card">
            <div className="add-icon">+</div>
            <div className="add-text">添加代币</div>
          </div>
        </div>
      </div>

      <div className="content-tabs">
        <button
          className={`tab-button ${activeTab === 'assets' ? 'active' : ''}`}
          onClick={() => setActiveTab('assets')}
        >
          资产
        </button>
        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          交易历史
        </button>
        <button className={`tab-button ${activeTab === 'nft' ? 'active' : ''}`} onClick={() => setActiveTab('nft')}>
          NFT藏品
        </button>
        <button
          className={`tab-button ${activeTab === 'staking' ? 'active' : ''}`}
          onClick={() => setActiveTab('staking')}
        >
          质押
        </button>
      </div>

      <div className="content-container">
        {activeTab === 'history' ? (
          <div className="history-container">
            <div className="history-header">
              <h3 className="history-title">最近交易</h3>
              <button className="view-all-btn">查看全部</button>
            </div>

            <div className="transactions-list">
              {transactions.map((tx) => (
                <div className={`transaction-item ${tx.type}`} key={tx.id}>
                  <div className="tx-icon-container">
                    {tx.type === 'receive' && (
                      <svg viewBox="0 0 24 24" className="tx-icon receive">
                        <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
                      </svg>
                    )}
                    {tx.type === 'send' && (
                      <svg viewBox="0 0 24 24" className="tx-icon send">
                        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
                      </svg>
                    )}
                    {tx.type === 'swap' && (
                      <svg viewBox="0 0 24 24" className="tx-icon swap">
                        <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z" />
                      </svg>
                    )}
                  </div>

                  <div className="tx-details">
                    <div className="tx-title">
                      {tx.type === 'receive' ? '收款' : tx.type === 'send' ? '转账' : '兑换'}
                    </div>
                    <div className="tx-addresses">
                      <span className="tx-from">{tx.from}</span>
                      <svg viewBox="0 0 24 24" className="tx-arrow">
                        <path d="M8 16l4-4-4-4 1.41-1.41L14.83 12l-5.42 5.41z" />
                      </svg>
                      <span className="tx-to">{tx.to}</span>
                    </div>
                  </div>

                  <div className="tx-amount">
                    <div className={`amount ${tx.type === 'receive' ? 'positive' : ''}`}>
                      {tx.type === 'receive' ? '+' : ''}
                      {tx.amount}
                    </div>
                    <div className="tx-time">{tx.time}</div>
                  </div>

                  <div className="tx-status">
                    <span className={`status-badge ${tx.status}`}>
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
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .title-area {
    h1 {
      font-size: 2.5rem;
      color: #0f172a;
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

    .description {
      font-size: 1.1rem;
      color: #64748b;
      margin-top: 1rem;
    }
  }

  .action-area {
    display: flex;
    gap: 0.75rem;

    @media (max-width: 768px) {
      margin-top: 1.5rem;
      width: 100%;
      justify-content: flex-start;
    }
  }

  .action-btn {
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid #e2e8f0;
    background-color: #f8fafc;
    color: #334155;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &.icon-btn {
      padding: 0.75rem;

      .action-icon {
        fill: #64748b;
      }
    }

    &:hover {
      background-color: #e2e8f0;
    }

    &.primary {
      background-color: #3b82f6;
      color: white;
      border-color: #3b82f6;

      &:hover {
        background-color: #2563eb;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }
    }
  }

  .balance-summary {
    margin-bottom: 2rem;
  }

  .total-balance {
    background-color: #1e293b;
    color: white;
    padding: 2rem;
    border-radius: 16px 16px 0 0;
    text-align: center;
    position: relative;
    overflow: hidden;

    .label {
      display: block;
      font-size: 1rem;
      opacity: 0.7;
      margin-bottom: 0.5rem;
    }

    .value {
      display: block;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .change {
      display: inline-block;
      font-size: 0.9rem;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;

      &.positive {
        background-color: rgba(34, 197, 94, 0.2);
        color: #22c55e;
      }

      &.negative {
        background-color: rgba(239, 68, 68, 0.2);
        color: #ef4444;
      }
    }

    .balance-chart {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      opacity: 0.3;

      .chart {
        width: 100%;
        height: 100%;
      }
    }
  }

  .balance-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1.5rem;
    background-color: #f8fafc;
    border-radius: 0 0 16px 16px;
    border: 1px solid #e2e8f0;
    border-top: none;
  }

  .balance-card {
    display: flex;
    align-items: center;
    background-color: white;
    padding: 1.25rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    position: relative;
    transition:
      transform 0.3s,
      box-shadow 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
    }

    &.add-card {
      border: 2px dashed #e2e8f0;
      box-shadow: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      min-height: 120px;
      padding: 1.5rem;

      &:hover {
        border-color: #3b82f6;
        background-color: #f8fafc;

        .add-icon,
        .add-text {
          color: #3b82f6;
        }
      }
    }
  }

  .add-icon {
    font-size: 2rem;
    font-weight: 300;
    color: #94a3b8;
    margin-bottom: 0.5rem;
  }

  .add-text {
    color: #64748b;
    font-size: 0.9rem;
  }

  .token-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    background-color: #94a3b8;
    color: white;
    margin-right: 1rem;

    &.eth {
      background-color: #3b82f6;
    }

    &.btc {
      background-color: #f59e0b;
    }

    &.usdt {
      background-color: #10b981;
    }
  }

  .token-change {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    font-size: 0.85rem;
    font-weight: 500;

    &.positive {
      color: #10b981;
    }

    &.negative {
      color: #ef4444;
    }

    &.neutral {
      color: #94a3b8;
    }
  }

  .token-info {
    .token-name {
      font-weight: 600;
      color: #334155;
      margin-bottom: 0.25rem;
    }

    .token-balance {
      color: #64748b;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    .token-value {
      color: #0f172a;
      font-weight: 600;
    }
  }

  .content-tabs {
    display: flex;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 3px;
    }
  }

  .tab-button {
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    color: #64748b;
    font-size: 1rem;
    cursor: pointer;
    position: relative;
    white-space: nowrap;

    &.active {
      color: #3b82f6;
      font-weight: 600;

      &:after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #3b82f6;
      }
    }

    &:hover:not(.active) {
      color: #334155;
    }
  }

  .content-container {
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    min-height: 300px;
    padding: 2rem;
  }

  .history-container {
    color: #334155;
  }

  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .history-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
  }

  .view-all-btn {
    color: #3b82f6;
    background: none;
    border: none;
    font-size: 0.9rem;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .transactions-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .transaction-item {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    border-radius: 12px;
    background-color: #f8fafc;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f1f5f9;
    }

    @media (max-width: 768px) {
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto;
      gap: 0.75rem;
    }
  }

  .tx-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .tx-icon {
    width: 24px;
    height: 24px;

    &.receive {
      fill: #10b981;
    }

    &.send {
      fill: #ef4444;
    }

    &.swap {
      fill: #8b5cf6;
    }
  }

  .tx-details {
    overflow: hidden;

    @media (max-width: 768px) {
      grid-column: 2;
      grid-row: 1;
    }
  }

  .tx-title {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }

  .tx-addresses {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tx-arrow {
    width: 16px;
    height: 16px;
    fill: #94a3b8;
    margin: 0 0.35rem;
    flex-shrink: 0;
  }

  .tx-amount {
    text-align: right;

    @media (max-width: 768px) {
      grid-column: 2;
      grid-row: 2;
      text-align: left;
    }
  }

  .amount {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.25rem;

    &.positive {
      color: #10b981;
    }
  }

  .tx-time {
    font-size: 0.85rem;
    color: #94a3b8;
  }

  .tx-status {
    @media (max-width: 768px) {
      grid-column: 1;
      grid-row: 2;
      display: flex;
      align-items: center;
    }
  }

  .status-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.85rem;

    &.completed {
      background-color: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }

    &.pending {
      background-color: rgba(245, 158, 11, 0.1);
      color: #f59e0b;
    }
  }
`

export default Web3Assets
