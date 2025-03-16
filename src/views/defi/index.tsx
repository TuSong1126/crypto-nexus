import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Defi = () => {
  const [activeTab, setActiveTab] = useState('overview')

  // 示例市场数据
  const marketData = [
    { id: 1, name: 'ETH/USDT', price: '$1,832.45', change: '+3.2%', volume: '$2.4B' },
    { id: 2, name: 'BTC/USDT', price: '$28,459.12', change: '+1.8%', volume: '$5.1B' },
    { id: 3, name: 'XRP/USDT', price: '$0.62', change: '-0.5%', volume: '$845M' }
  ]

  return (
    <StyleWrapper>
      <div className="dashboard">
        <div className="overview">
          <h1>DeFi 金融中心</h1>
          <p className="subtitle">去中心化金融，提供流动性和代币交换</p>

          <div className="metrics">
            <div className="metric-card">
              <div className="metric-value">$2,453</div>
              <div className="metric-label">总资产</div>
              <div className="trend-indicator positive">↑ 5.2%</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">$182</div>
              <div className="metric-label">日收益</div>
              <div className="trend-indicator positive">↑ 12.5%</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">8.4%</div>
              <div className="metric-label">平均APY</div>
              <div className="trend-graph">
                <svg viewBox="0 0 100 30" className="mini-chart">
                  <polyline
                    points="0,20 10,15 20,18 30,14 40,10 50,12 60,8 70,6 80,9 90,4 100,5"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="asset-trend">
          <div className="trend-header">
            <div className="asset-trend-title">资产趋势</div>
            <div className="trend-options">
              <button className="trend-option active">周</button>
              <button className="trend-option">月</button>
              <button className="trend-option">年</button>
            </div>
          </div>
          <div className="chart-container">
            <svg viewBox="0 0 500 200" width="100%" height="100%" className="trend-chart">
              {/* 背景网格 */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

              {/* 主要趋势线 */}
              <path
                d="M0,150 C50,140 100,100 150,120 S250,80 300,100 S400,60 500,50"
                fill="none"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="3"
              />

              {/* 区域填充 */}
              <path
                d="M0,150 C50,140 100,100 150,120 S250,80 300,100 S400,60 500,50 L500,200 L0,200 Z"
                fill="url(#areaGradient)"
                opacity="0.6"
              />

              {/* 渐变定义 */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="chart-labels">
              <div>一</div>
              <div>二</div>
              <div>三</div>
              <div>四</div>
              <div>五</div>
              <div>六</div>
              <div>日</div>
            </div>
          </div>
        </div>

        <div className="actions">
          <button className="action-button swap">
            <span className="icon">↔️</span>
            交换
          </button>
          <button className="action-button pool">
            <span className="icon">💧</span>
            流动池
          </button>
          <button className="action-button stake">
            <span className="icon">🔒</span>
            质押
          </button>
          <button className="action-button farm">
            <span className="icon">🌾</span>
            收益耕作
          </button>
        </div>
      </div>

      <div className="content-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          概览
        </button>
        <button
          className={`tab-button ${activeTab === 'market' ? 'active' : ''}`}
          onClick={() => setActiveTab('market')}
        >
          市场
        </button>
        <button
          className={`tab-button ${activeTab === 'portfolio' ? 'active' : ''}`}
          onClick={() => setActiveTab('portfolio')}
        >
          投资组合
        </button>
        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          交易历史
        </button>
      </div>

      <div className="content">
        {activeTab === 'market' && (
          <div className="market-data">
            <div className="market-header">
              <div className="market-title">市场行情</div>
              <div className="market-search">
                <svg viewBox="0 0 24 24" className="search-icon">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                <input type="text" placeholder="搜索代币..." className="search-input" />
              </div>
            </div>

            <div className="market-table">
              <div className="table-header">
                <div className="table-cell">交易对</div>
                <div className="table-cell">价格</div>
                <div className="table-cell">24h变化</div>
                <div className="table-cell">24h成交量</div>
                <div className="table-cell"></div>
              </div>

              {marketData.map((item) => (
                <div className="table-row" key={item.id}>
                  <div className="table-cell">{item.name}</div>
                  <div className="table-cell">{item.price}</div>
                  <div className={`table-cell ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
                    {item.change}
                  </div>
                  <div className="table-cell">{item.volume}</div>
                  <div className="table-cell">
                    <button className="trade-button">交易</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab !== 'market' && <Outlet />}
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  .dashboard {
    background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
    border-radius: 16px;
    padding: 2rem;
    color: white;
    margin-bottom: 2rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .overview {
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.1rem;
      opacity: 0.8;
      margin-bottom: 2rem;
    }
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .metric-card {
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;

    .metric-value {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .metric-label {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    .trend-indicator {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      font-size: 0.8rem;
      font-weight: 600;

      &.positive {
        color: #34d399;
      }

      &.negative {
        color: #ef4444;
      }
    }

    .trend-graph {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 30px;

      .mini-chart {
        width: 100%;
        height: 100%;
      }
    }
  }

  .asset-trend {
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;

    .trend-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .asset-trend-title {
      font-size: 1.1rem;
      font-weight: 600;
    }

    .trend-options {
      display: flex;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 0.25rem;
    }

    .trend-option {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.8rem;
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      cursor: pointer;

      &.active {
        background-color: rgba(255, 255, 255, 0.15);
        color: white;
      }
    }

    .chart-container {
      height: 200px;
      position: relative;

      .trend-chart {
        position: absolute;
        top: 0;
        left: 0;
      }

      .chart-labels {
        position: absolute;
        bottom: -25px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        font-size: 0.8rem;
        opacity: 0.7;
      }
    }
  }

  .actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .action-button {
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.15);
    border: none;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition:
      background-color 0.2s,
      transform 0.2s;

    .icon {
      margin-right: 0.5rem;
      font-size: 1.2rem;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
    }

    &.swap {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &.pool {
      background-color: rgba(255, 255, 255, 0.15);
    }

    &.stake {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &.farm {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }

  .content-tabs {
    display: flex;
    margin-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
    overflow-x: auto;
    padding-bottom: 1px;

    &::-webkit-scrollbar {
      height: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 3px;
    }
  }

  .tab-button {
    background: none;
    border: none;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    color: #64748b;
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

  .content {
    background-color: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    min-height: 400px;
  }

  .market-data {
    font-size: 0.95rem;
  }

  .market-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    @media (max-width: 640px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .market-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
  }

  .market-search {
    display: flex;
    align-items: center;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    width: 250px;

    @media (max-width: 640px) {
      margin-top: 1rem;
      width: 100%;
    }

    .search-icon {
      width: 18px;
      height: 18px;
      fill: #94a3b8;
      margin-right: 0.5rem;
    }

    .search-input {
      border: none;
      background: transparent;
      font-size: 0.9rem;
      outline: none;
      width: 100%;

      &::placeholder {
        color: #94a3b8;
      }
    }
  }

  .market-table {
    width: 100%;
    border-collapse: collapse;
  }

  .table-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr 0.8fr;
    padding: 1rem 0;
    border-bottom: 1px solid #e2e8f0;
    font-weight: 600;
    color: #64748b;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .table-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr 0.8fr;
    padding: 1rem 0;
    border-bottom: 1px solid #f1f5f9;
    align-items: center;

    &:hover {
      background-color: #f8fafc;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-gap: 0.5rem;
      padding: 1rem;

      &:not(:last-child) {
        border-bottom: 1px solid #e2e8f0;
      }
    }
  }

  .table-cell {
    &.positive {
      color: #10b981;
    }

    &.negative {
      color: #ef4444;
    }

    @media (max-width: 768px) {
      &:nth-child(1) {
        font-weight: 600;
      }

      &:not(:first-child):before {
        content: attr(data-label);
        font-weight: 600;
        margin-right: 0.5rem;
      }
    }
  }

  .trade-button {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #2563eb;
    }

    @media (max-width: 768px) {
      width: 100%;
      padding: 0.75rem;
    }
  }
`

export default Defi
