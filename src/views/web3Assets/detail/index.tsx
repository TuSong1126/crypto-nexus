import styled from 'styled-components'

const Web3AssetsDetail = () => {
  return (
    <StyleWrapper>
      <div className="asset-detail-page">
        <div className="asset-header">
          <div className="asset-identity">
            <div className="asset-logo-container">
              <img src="/assets/eth-logo.png" alt="ETH Logo" className="asset-logo" />
            </div>
            <div className="asset-basic-info">
              <h2 className="asset-name">以太坊 (ETH)</h2>
              <div className="asset-price">$2,000.00</div>
              <div className="price-change positive">
                <span className="change-arrow">↑</span>
                <span className="change-value">+5.67% (24h)</span>
              </div>
            </div>
          </div>

          <div className="action-group">
            <button className="action-button primary">
              <span className="button-icon">↑</span>
              发送
            </button>
            <button className="action-button">
              <span className="button-icon">↓</span>
              接收
            </button>
            <button className="action-button">
              <span className="button-icon">⇌</span>
              交换
            </button>
          </div>
        </div>

        <div className="asset-data-grid">
          <div className="balance-card">
            <div className="card-header">
              <h3>余额</h3>
            </div>
            <div className="balance-details">
              <div className="token-balance">1.234 ETH</div>
              <div className="fiat-value">$2,468.00</div>
            </div>
          </div>

          <div className="price-chart-card">
            <div className="card-header">
              <h3>价格走势</h3>
              <div className="chart-timeframes">
                <button className="timeframe-btn active">1D</button>
                <button className="timeframe-btn">1W</button>
                <button className="timeframe-btn">1M</button>
                <button className="timeframe-btn">1Y</button>
                <button className="timeframe-btn">全部</button>
              </div>
            </div>
            <div className="chart-container">
              {/* 这里可以集成实际的图表库，现在用占位符 */}
              <div className="placeholder-chart">
                <svg viewBox="0 0 500 200" width="100%" height="100%">
                  <path
                    d="M0,150 C50,120 100,180 150,120 C200,60 250,80 300,50 C350,20 400,40 450,30 L450,200 L0,200 Z"
                    fill="rgba(79, 70, 229, 0.1)"
                    stroke="#4f46e5"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="transaction-history-card">
            <div className="card-header">
              <h3>最近交易</h3>
              <button className="view-all-btn">查看全部</button>
            </div>
            <div className="transaction-list">
              <div className="transaction-item">
                <div className="tx-icon receive">
                  <svg viewBox="0 0 24 24">
                    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
                  </svg>
                </div>
                <div className="tx-details">
                  <div className="tx-title">收到 ETH</div>
                  <div className="tx-time">今天 09:45</div>
                </div>
                <div className="tx-amount positive">+0.125 ETH</div>
              </div>

              <div className="transaction-item">
                <div className="tx-icon send">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
                  </svg>
                </div>
                <div className="tx-details">
                  <div className="tx-title">发送 ETH</div>
                  <div className="tx-time">昨天 16:20</div>
                </div>
                <div className="tx-amount">-0.35 ETH</div>
              </div>

              <div className="transaction-item">
                <div className="tx-icon swap">
                  <svg viewBox="0 0 24 24">
                    <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z" />
                  </svg>
                </div>
                <div className="tx-details">
                  <div className="tx-title">兑换 ETH 到 USDT</div>
                  <div className="tx-time">2023-12-10 13:15</div>
                </div>
                <div className="tx-amount">0.5 ETH → 950 USDT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  color: #111827;

  .asset-detail-page {
    padding: 1rem 0;
  }

  .asset-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e5e7eb;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;
    }
  }

  .asset-identity {
    display: flex;
    align-items: center;

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }

  .asset-logo-container {
    width: 72px;
    height: 72px;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(59, 130, 246, 0.1);
    margin-right: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);

    @media (max-width: 480px) {
      margin-right: 0;
    }

    .asset-logo {
      width: 85%;
      height: 85%;
      object-fit: contain;
    }
  }

  .asset-basic-info {
    .asset-name {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .asset-price {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .price-change {
      display: inline-flex;
      align-items: center;
      font-size: 0.875rem;
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

      .change-arrow {
        margin-right: 0.25rem;
      }
    }
  }

  .action-group {
    display: flex;
    gap: 0.75rem;

    @media (max-width: 480px) {
      width: 100%;
      justify-content: space-between;
    }
  }

  .action-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 12px;
    transition: all 0.2s ease;
    cursor: pointer;
    border: 1px solid #e5e7eb;
    background-color: white;
    color: #3b82f6;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    .button-icon {
      margin-right: 0.5rem;
    }

    &:hover {
      border-color: #3b82f6;
      background-color: rgba(59, 130, 246, 0.05);
      transform: translateY(-1px);
    }

    &.primary {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      border: none;

      &:hover {
        box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.5);
      }
    }
  }

  .asset-data-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      'balance price-chart'
      'transactions transactions';
    gap: 1.5rem;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'balance'
        'price-chart'
        'transactions';
    }
  }

  .balance-card {
    grid-area: balance;
    background-color: white;
    border-radius: 16px;
    border: 1px solid rgba(229, 231, 235, 0.5);
    padding: 1.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  }

  .price-chart-card {
    grid-area: price-chart;
    background-color: white;
    border-radius: 16px;
    border: 1px solid rgba(229, 231, 235, 0.5);
    padding: 1.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  }

  .transaction-history-card {
    grid-area: transactions;
    background-color: white;
    border-radius: 16px;
    border: 1px solid rgba(229, 231, 235, 0.5);
    padding: 1.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0;
      color: #374151;
    }

    .view-all-btn {
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

  .balance-details {
    .token-balance {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .fiat-value {
      font-size: 1.125rem;
      color: #6b7280;
    }
  }

  .chart-timeframes {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;

    .timeframe-btn {
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
      border-radius: 20px;
      border: 1px solid #e5e7eb;
      background-color: white;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: #3b82f6;
        color: #3b82f6;
      }

      &.active {
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: white;
        border-color: transparent;
      }
    }
  }

  .chart-container {
    height: 240px;
    margin-top: 1.5rem;

    .placeholder-chart {
      width: 100%;
      height: 100%;

      svg {
        path {
          stroke: #3b82f6;
        }
      }
    }
  }

  .transaction-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .transaction-item {
    display: flex;
    align-items: center;
    padding: 1.25rem;
    border-radius: 12px;
    border: 1px solid rgba(229, 231, 235, 0.5);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;

    &:hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
      background-color: rgba(249, 250, 251, 0.5);
    }
  }

  .tx-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;

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

  .tx-details {
    flex: 1;

    .tx-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .tx-time {
      font-size: 0.75rem;
      color: #6b7280;
    }
  }

  .tx-amount {
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    background-color: rgba(107, 114, 128, 0.1);

    &.positive {
      color: #10b981;
      background-color: rgba(16, 185, 129, 0.1);
    }
  }
`

export default Web3AssetsDetail
