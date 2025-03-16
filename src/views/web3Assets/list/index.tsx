import styled from 'styled-components'

const Web3AssetsList = () => {
  // 模拟更多资产数据
  const assets = [
    {
      id: 1,
      symbol: 'ETH',
      name: '以太坊',
      balance: '1.234',
      value: 2468.0,
      change: 5.67,
      icon: '🔷'
    },
    {
      id: 2,
      symbol: 'BTC',
      name: '比特币',
      balance: '0.056',
      value: 3360.0,
      change: 2.14,
      icon: '🟠'
    },
    {
      id: 3,
      symbol: 'USDT',
      name: '泰达币',
      balance: '5,000',
      value: 5000.0,
      change: 0,
      icon: '🟢'
    },
    {
      id: 4,
      symbol: 'SOL',
      name: '索拉纳',
      balance: '15.5',
      value: 1725.5,
      change: -2.34,
      icon: '🟣'
    },
    {
      id: 5,
      symbol: 'AVAX',
      name: '雪崩',
      balance: '25.75',
      value: 950.25,
      change: 8.21,
      icon: '🔴'
    }
  ]

  return (
    <StyleWrapper>
      <div className="assets-list-page">
        <div className="list-header">
          <div className="search-filter">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input type="text" className="search-input" placeholder="搜索资产..." />
            </div>
            <div className="filter-buttons">
              <button className="filter-button active">全部</button>
              <button className="filter-button">代币</button>
              <button className="filter-button">NFT</button>
            </div>
          </div>
          <div className="sort-options">
            <select className="sort-select">
              <option value="value-desc">按价值 (高到低)</option>
              <option value="value-asc">按价值 (低到高)</option>
              <option value="name-asc">按名称 (A-Z)</option>
              <option value="change-desc">按变化 (高到低)</option>
            </select>
          </div>
        </div>

        <div className="assets-table-container">
          <table className="assets-table">
            <thead>
              <tr>
                <th className="asset-column">资产</th>
                <th className="balance-column">余额</th>
                <th className="price-column">价格</th>
                <th className="value-column">价值</th>
                <th className="change-column">24h变化</th>
                <th className="actions-column">操作</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} className="asset-row">
                  <td className="asset-column">
                    <div className="asset-info">
                      <div className="asset-icon">{asset.icon}</div>
                      <div className="asset-name-container">
                        <div className="asset-symbol">{asset.symbol}</div>
                        <div className="asset-name">{asset.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="balance-column">
                    <div className="asset-balance">
                      {asset.balance} {asset.symbol}
                    </div>
                  </td>
                  <td className="price-column">
                    <div className="asset-price">
                      ${(asset.value / parseFloat(asset.balance.replace(',', ''))).toFixed(2)}
                    </div>
                  </td>
                  <td className="value-column">
                    <div className="asset-value">${asset.value.toFixed(2)}</div>
                  </td>
                  <td className="change-column">
                    <div
                      className={`asset-change ${asset.change > 0 ? 'positive' : asset.change < 0 ? 'negative' : 'neutral'}`}
                    >
                      {asset.change > 0 ? '+' : ''}
                      {asset.change}%
                    </div>
                  </td>
                  <td className="actions-column">
                    <div className="asset-actions">
                      <button className="action-btn">发送</button>
                      <button className="action-btn">接收</button>
                      <button className="more-btn">•••</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mobile-asset-cards">
          {assets.map((asset) => (
            <div className="asset-card" key={asset.id}>
              <div className="card-header">
                <div className="asset-info">
                  <div className="asset-icon">{asset.icon}</div>
                  <div className="asset-name-container">
                    <div className="asset-symbol">{asset.symbol}</div>
                    <div className="asset-name">{asset.name}</div>
                  </div>
                </div>
                <div
                  className={`asset-change ${asset.change > 0 ? 'positive' : asset.change < 0 ? 'negative' : 'neutral'}`}
                >
                  {asset.change > 0 ? '+' : ''}
                  {asset.change}%
                </div>
              </div>
              <div className="card-body">
                <div className="asset-balance">
                  {asset.balance} {asset.symbol}
                </div>
                <div className="asset-value">${asset.value.toFixed(2)}</div>
              </div>
              <div className="card-actions">
                <button className="action-btn">发送</button>
                <button className="action-btn">接收</button>
                <button className="action-btn">交换</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  color: #111827;

  .assets-list-page {
    padding: 1rem 0;
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    background-color: white;
    padding: 1.25rem;
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(229, 231, 235, 0.5);

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }
  }

  .search-filter {
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .search-container {
    position: relative;

    .search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
      font-size: 0.875rem;
    }

    .search-input {
      padding: 0.75rem 0.75rem 0.75rem 2.25rem;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      font-size: 0.875rem;
      width: 280px;
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
      }

      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }

  .filter-buttons {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;

    .filter-button {
      padding: 0.625rem 1.25rem;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      background: none;
      font-size: 0.875rem;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: #3b82f6;
        color: #3b82f6;
        transform: translateY(-1px);
      }

      &.active {
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: white;
        border-color: transparent;
        box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
      }
    }
  }

  .sort-select {
    padding: 0.75rem 1.25rem;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background-color: white;
    font-size: 0.875rem;
    color: #374151;
    cursor: pointer;
    min-width: 180px;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
  }

  .assets-table-container {
    margin-bottom: 1.5rem;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(229, 231, 235, 0.5);
    background-color: white;

    @media (max-width: 1024px) {
      display: none;
    }
  }

  .assets-table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 1.25rem 1rem;
      text-align: left;
    }

    th {
      background-color: #f9fafb;
      font-weight: 600;
      font-size: 0.875rem;
      color: #4b5563;
      position: sticky;
      top: 0;
    }

    tbody tr {
      border-top: 1px solid #e5e7eb;
      transition: all 0.2s ease;

      &:hover {
        background-color: rgba(59, 130, 246, 0.05);
      }
    }

    .asset-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .asset-icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f3f4f6;
      font-size: 1.25rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .asset-name-container {
      display: flex;
      flex-direction: column;
    }

    .asset-symbol {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .asset-name {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .asset-balance {
      font-weight: 600;
      color: #111827;
    }

    .asset-price,
    .asset-value {
      font-weight: 500;
      color: #374151;
    }

    .asset-change {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      display: inline-block;
      font-weight: 600;

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

    .asset-actions {
      display: flex;
      gap: 0.5rem;

      .action-btn,
      .more-btn {
        padding: 0.375rem 0.75rem;
        border-radius: 8px;
        font-size: 0.75rem;
        border: 1px solid #e5e7eb;
        background: none;
        color: #6b7280;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          border-color: #3b82f6;
          color: #3b82f6;
          background-color: rgba(59, 130, 246, 0.05);
        }
      }
    }
  }

  // 移动端资产卡片
  .mobile-asset-cards {
    display: none;
    flex-direction: column;
    gap: 1rem;

    @media (max-width: 1024px) {
      display: flex;
    }
  }

  .asset-card {
    background-color: white;
    border-radius: 16px;
    border: 1px solid rgba(229, 231, 235, 0.5);
    padding: 1.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .asset-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .asset-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f3f4f6;
      font-size: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
  }

  .card-body {
    margin-bottom: 1.25rem;

    .asset-balance {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .asset-value {
      font-size: 1rem;
      color: #6b7280;
    }
  }

  .card-actions {
    display: flex;
    gap: 0.75rem;
    border-top: 1px solid #e5e7eb;
    padding-top: 1.25rem;

    .action-btn {
      flex: 1;
      padding: 0.75rem;
      font-size: 0.875rem;
      border-radius: 12px;
      background: none;
      border: 1px solid #e5e7eb;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: #3b82f6;
        color: #3b82f6;
        background-color: rgba(59, 130, 246, 0.05);
        transform: translateY(-1px);
      }
    }
  }
`

export default Web3AssetsList
