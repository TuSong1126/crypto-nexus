import { Icon } from '@iconify/react'
import { useState } from 'react'
import styled from 'styled-components'

const TransactionHistory = (): JSX.Element => {
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  const [sortOrder, setSortOrder] = useState('desc')

  // 模拟交易数据
  const transactionData = [
    {
      id: 'tx1',
      hash: '0x7a8c6b2f4e3d9c5a1b0e7f8d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1098',
      type: 'transfer',
      amount: '0.75 ETH',
      from: '0x5a4c3b2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b',
      to: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
      status: 'success',
      time: '2023-03-30 15:42:23',
      date: '2023-03-30',
      fee: '0.0021 ETH',
      network: 'Ethereum',
      blockNumber: 18956432,
      nonce: 42
    },
    {
      id: 'tx2',
      hash: '0x3f2e1d0c9b8a7f6e5d4c3b2a1098765432c1b3a42d9e8f7a6b5c4d3e2f1',
      type: 'swap',
      amount: '250 USDT → 0.12 ETH',
      from: '0x5a4c3b2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b',
      to: 'Uniswap V3',
      status: 'success',
      time: '2023-03-29 10:15:09',
      date: '2023-03-29',
      fee: '0.0032 ETH',
      network: 'Ethereum',
      blockNumber: 18945631,
      nonce: 41
    },
    {
      id: 'tx3',
      hash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0',
      type: 'approve',
      amount: 'Unlimited USDC',
      from: '0x5a4c3b2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b',
      to: 'Aave V3',
      status: 'success',
      time: '2023-03-27 18:30:45',
      date: '2023-03-27',
      fee: '0.0018 ETH',
      network: 'Ethereum',
      blockNumber: 18934219,
      nonce: 40
    },
    {
      id: 'tx4',
      hash: '0x4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5',
      type: 'transfer',
      amount: '500 USDT',
      from: '0x5a4c3b2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b',
      to: '0x7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
      status: 'failed',
      time: '2023-03-25 09:12:56',
      date: '2023-03-25',
      fee: '0.0009 ETH',
      network: 'Ethereum',
      blockNumber: 18919874,
      nonce: 39
    },
    {
      id: 'tx5',
      hash: '0x1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d',
      type: 'contract',
      amount: '0.1 ETH',
      from: '0x5a4c3b2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b',
      to: '0x8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c',
      status: 'pending',
      time: '2023-03-30 08:45:12',
      date: '2023-03-30',
      fee: '0.0024 ETH',
      network: 'Ethereum',
      blockNumber: null,
      nonce: 43
    }
  ]

  // 过滤和排序交易记录
  const filteredTransactions = transactionData
    .filter((tx) => {
      // 状态过滤
      if (filterStatus !== 'all' && tx.status !== filterStatus) return false

      // 类型过滤
      if (filterType !== 'all' && tx.type !== filterType) return false

      // 时间范围过滤
      if (selectedPeriod !== 'all') {
        const txDate = new Date(tx.date)
        const today = new Date()

        if (selectedPeriod === 'today' && txDate.toDateString() !== today.toDateString()) return false

        if (selectedPeriod === 'week') {
          const lastWeek = new Date()
          lastWeek.setDate(today.getDate() - 7)
          if (txDate < lastWeek) return false
        }

        if (selectedPeriod === 'month') {
          const lastMonth = new Date()
          lastMonth.setMonth(today.getMonth() - 1)
          if (txDate < lastMonth) return false
        }
      }

      // 搜索过滤
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          tx.hash.toLowerCase().includes(query) ||
          tx.from.toLowerCase().includes(query) ||
          tx.to.toLowerCase().includes(query) ||
          tx.amount.toLowerCase().includes(query)
        )
      }

      return true
    })
    .sort((a, b) => {
      // 排序
      const dateA = new Date(a.time).getTime()
      const dateB = new Date(b.time).getTime()
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
    })

  return (
    <StyleWrapper>
      <div className="transaction-history">
        <div className="history-header">
          <h2>交易记录</h2>
          <p className="history-description">查看和管理您的历史交易记录</p>
        </div>

        <div className="filter-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="搜索交易哈希、地址或金额..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <Icon icon="mdi:magnify" className="search-icon" />
          </div>

          <div className="filters">
            <div className="filter-group">
              <label>状态</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">全部状态</option>
                <option value="success">成功</option>
                <option value="pending">处理中</option>
                <option value="failed">失败</option>
              </select>
            </div>

            <div className="filter-group">
              <label>交易类型</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">全部类型</option>
                <option value="transfer">转账</option>
                <option value="swap">兑换</option>
                <option value="approve">授权</option>
                <option value="contract">合约调用</option>
              </select>
            </div>

            <div className="filter-group">
              <label>时间范围</label>
              <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
                <option value="all">全部时间</option>
                <option value="today">今天</option>
                <option value="week">最近一周</option>
                <option value="month">最近一个月</option>
              </select>
            </div>

            <div className="filter-group">
              <label>排序</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="desc">最新优先</option>
                <option value="asc">最早优先</option>
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button
              className="filter-action"
              onClick={() => {
                setFilterStatus('all')
                setFilterType('all')
                setSelectedPeriod('all')
                setSearchQuery('')
              }}
            >
              <Icon icon="mdi:refresh" className="action-icon" />
              重置筛选
            </button>
            <button className="filter-action">
              <Icon icon="mdi:download" className="action-icon" />
              导出CSV
            </button>
          </div>
        </div>

        <div className="transaction-list">
          <div className="table-header">
            <div className="header-cell hash">交易哈希</div>
            <div className="header-cell type">类型</div>
            <div className="header-cell value">金额</div>
            <div className="header-cell addresses">地址</div>
            <div className="header-cell time">时间</div>
            <div className="header-cell status">状态</div>
            <div className="header-cell actions"></div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="no-transactions">
              <Icon icon="mdi:file-search-outline" className="empty-icon" />
              <p>未找到符合条件的交易记录</p>
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <div key={tx.id} className="transaction-row">
                <div className="cell hash">
                  <div className="hash-wrapper">
                    <span className="hash-text">{`${tx.hash.substring(0, 10)}...${tx.hash.substring(
                      tx.hash.length - 6
                    )}`}</span>
                    <button className="copy-btn" onClick={() => navigator.clipboard.writeText(tx.hash)}>
                      <Icon icon="mdi:content-copy" />
                    </button>
                  </div>
                </div>

                <div className="cell type">
                  <div className={`type-badge ${tx.type}`}>
                    {tx.type === 'transfer' && <Icon icon="mdi:send" />}
                    {tx.type === 'swap' && <Icon icon="mdi:swap-horizontal" />}
                    {tx.type === 'approve' && <Icon icon="mdi:check-circle" />}
                    {tx.type === 'contract' && <Icon icon="mdi:file-document-outline" />}
                    <span>
                      {tx.type === 'transfer'
                        ? '转账'
                        : tx.type === 'swap'
                          ? '兑换'
                          : tx.type === 'approve'
                            ? '授权'
                            : '合约调用'}
                    </span>
                  </div>
                </div>

                <div className="cell value">
                  <span className="value-text">{tx.amount}</span>
                </div>

                <div className="cell addresses">
                  <div className="address-flow">
                    <div className="address from" title={tx.from}>
                      {`${tx.from.substring(0, 6)}...${tx.from.substring(tx.from.length - 4)}`}
                    </div>
                    <Icon icon="mdi:arrow-right" className="flow-icon" />
                    <div className="address to" title={tx.to}>
                      {tx.to.length > 20 ? `${tx.to.substring(0, 6)}...${tx.to.substring(tx.to.length - 4)}` : tx.to}
                    </div>
                  </div>
                </div>

                <div className="cell time">
                  <div className="time-info">
                    <div className="time-date">{tx.date}</div>
                    <div className="time-hour">{tx.time.split(' ')[1]}</div>
                  </div>
                </div>

                <div className="cell status">
                  <div className={`status-badge ${tx.status}`}>
                    {tx.status === 'success' && <Icon icon="mdi:check-circle" />}
                    {tx.status === 'pending' && <Icon icon="mdi:clock-outline" />}
                    {tx.status === 'failed' && <Icon icon="mdi:alert-circle" />}
                    <span>{tx.status === 'success' ? '成功' : tx.status === 'pending' ? '处理中' : '失败'}</span>
                  </div>
                </div>

                <div className="cell actions">
                  <button className="action-btn" title="查看详情">
                    <Icon icon="mdi:information-outline" />
                  </button>
                  <button className="action-btn" title="在区块浏览器中查看">
                    <Icon icon="mdi:open-in-new" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pagination">
          <button className="pagination-btn" disabled>
            <Icon icon="mdi:chevron-left" />
            上一页
          </button>
          <div className="pagination-info">
            第 1-{filteredTransactions.length} 条，共 {filteredTransactions.length} 条
          </div>
          <button className="pagination-btn" disabled>
            下一页
            <Icon icon="mdi:chevron-right" />
          </button>
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  .transaction-history {
    padding: 20px 0;
  }

  .history-header {
    margin-bottom: 24px;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 10px;
      background: linear-gradient(90deg, #8b5cf6, #d946ef);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .history-description {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.7);
      max-width: 600px;
    }
  }

  .filter-section {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .search-container {
    position: relative;
    margin-bottom: 16px;

    .search-input {
      width: 100%;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 12px 16px 12px 40px;
      color: white;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: rgba(139, 92, 246, 0.5);
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
    }

    .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(255, 255, 255, 0.5);
      font-size: 1.2rem;
    }
  }

  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 16px;

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.6);
      }

      select {
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 10px 12px;
        color: white;
        font-size: 0.95rem;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 10px center;
        cursor: pointer;

        &:focus {
          outline: none;
          border-color: rgba(139, 92, 246, 0.5);
        }

        option {
          background: #1f1f1f;
        }
      }
    }
  }

  .filter-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    .filter-action {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 8px 16px;
      color: white;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .action-icon {
        font-size: 1.1rem;
      }
    }
  }

  .transaction-list {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 20px;
    overflow: hidden;
  }

  .table-header {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 2fr 1.2fr 1fr 0.5fr;
    padding: 16px 20px;
    background: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .header-cell {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.9rem;
      font-weight: 600;
    }
  }

  .transaction-row {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 2fr 1.2fr 1fr 0.5fr;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.03);
    }

    &:last-child {
      border-bottom: none;
    }

    .cell {
      display: flex;
      align-items: center;
    }
  }

  .hash-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;

    .hash-text {
      color: #8b5cf6;
      font-family: 'Courier New', monospace;
    }

    .copy-btn {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.4);
      cursor: pointer;
      font-size: 0.85rem;
      padding: 2px;
      display: flex;
      align-items: center;
      opacity: 0.6;
      transition: all 0.2s ease;

      &:hover {
        opacity: 1;
        color: #8b5cf6;
      }
    }
  }

  .type-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;

    &.transfer {
      background: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
    }

    &.swap {
      background: rgba(139, 92, 246, 0.15);
      color: #a78bfa;
    }

    &.approve {
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
    }

    &.contract {
      background: rgba(249, 115, 22, 0.15);
      color: #fb923c;
    }
  }

  .value-text {
    font-weight: 500;
  }

  .address-flow {
    display: flex;
    align-items: center;
    gap: 8px;

    .address {
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      padding: 4px 8px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.2);
    }

    .flow-icon {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  .time-info {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .time-date {
      font-size: 0.85rem;
    }

    .time-hour {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .status-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;

    &.success {
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
    }

    &.pending {
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24;
    }

    &.failed {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
    }
  }

  .action-btn {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    font-size: 1.1rem;
    padding: 4px;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;

    &:hover {
      color: #8b5cf6;
    }
  }

  .no-transactions {
    padding: 60px 20px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    p {
      font-size: 1rem;
    }
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;

    .pagination-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: white;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.1);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .pagination-info {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.9rem;
    }
  }

  @media (max-width: 1200px) {
    .table-header,
    .transaction-row {
      grid-template-columns: 1.2fr 0.8fr 1fr 1.5fr 1fr 0.8fr 0.5fr;
    }
  }

  @media (max-width: 992px) {
    .table-header,
    .transaction-row {
      grid-template-columns: 1fr 0.8fr 0.8fr 1.2fr 0.8fr 0.8fr 0.5fr;
      font-size: 0.9rem;
    }

    .address-flow {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
  }

  @media (max-width: 768px) {
    .transaction-list {
      overflow-x: auto;
    }

    .table-header,
    .transaction-row {
      min-width: 900px;
    }
  }
`

export default TransactionHistory
