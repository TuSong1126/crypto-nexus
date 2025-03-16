import { Icon } from '@iconify/react'
import { useState } from 'react'
import styled from 'styled-components'

const BlockExplorer = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('address')

  // 模拟区块数据
  const recentBlocks = [
    {
      number: 15482935,
      timestamp: '30秒前',
      transactions: 142,
      miner: '0xea674fdde714fd979de3edf0f56aa9716b898ec8',
      gasUsed: '12,354,281'
    },
    {
      number: 15482934,
      timestamp: '44秒前',
      transactions: 98,
      miner: '0x829bd824b016326a401d083b33d092293333a830',
      gasUsed: '8,273,645'
    },
    {
      number: 15482933,
      timestamp: '1分钟前',
      transactions: 112,
      miner: '0x1aad0c618caef6fe851a5e43bca75184af3dd2cd',
      gasUsed: '10,984,722'
    },
    {
      number: 15482932,
      timestamp: '2分钟前',
      transactions: 87,
      miner: '0xea674fdde714fd979de3edf0f56aa9716b898ec8',
      gasUsed: '7,892,345'
    }
  ]

  // 模拟交易数据
  const recentTransactions = [
    {
      hash: '0x7df0d43b77832f8f7b533c57822d1fea2e80279b5fb0c7fe9ca5ae8e83519bd5',
      from: '0x2caa03bd0e7a96901c595669d491c3dbd1c064b5',
      to: '0xadf98d12e2b9f33f14b07dd68c11e76f528ebb2b',
      value: '0.38 ETH',
      timestamp: '1分钟前',
      status: 'success'
    },
    {
      hash: '0x9f58e0bf29aefbed161a6a0896dd54e0e25fc389882ed92f56309e4c9a6c608a',
      from: '0x4bcfc3fe67dfbc9c7558ae9cda832e1ef2c7da07',
      to: '0xd015cae7a0ae6b72c5d8850ab4d1fbfef3739422',
      value: '1.25 ETH',
      timestamp: '3分钟前',
      status: 'success'
    },
    {
      hash: '0xf34e788de5b86fa46ec2a3fd86e7401459b83d1d23adca3414c108b303086985',
      from: '0x7de89cdd6e9c145ede146d3e29ca6ea1e788284d',
      to: '0xaa5a0f7f99fa841f410490b3332af1a34c351db7',
      value: '0.05 ETH',
      timestamp: '5分钟前',
      status: 'failed'
    }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 实际应用中这里会调用API搜索区块链数据
    console.log(`Searching for ${searchQuery} as ${searchType}`)
  }

  return (
    <StyleWrapper>
      <div className="block-explorer">
        <div className="explorer-header">
          <h2>区块浏览器</h2>
          <p className="explorer-description">查询区块链上的交易、区块、地址和智能合约数据</p>
        </div>

        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-type-selector">
              <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="search-type">
                <option value="address">地址</option>
                <option value="transaction">交易</option>
                <option value="block">区块</option>
                <option value="token">代币</option>
              </select>
              <Icon icon="mdi:chevron-down" className="select-icon" />
            </div>

            <div className="search-input-container">
              <input
                type="text"
                placeholder={`输入${searchType === 'address' ? '钱包地址' : searchType === 'transaction' ? '交易哈希' : searchType === 'block' ? '区块高度或哈希' : '代币合约地址'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <Icon icon="mdi:magnify" className="search-icon" />
                搜索
              </button>
            </div>
          </form>
        </div>

        <div className="explorer-stats">
          <div className="stat-card">
            <div className="stat-title">当前区块高度</div>
            <div className="stat-value">15,482,935</div>
            <div className="stat-trend up">
              <Icon icon="mdi:arrow-up" className="trend-icon" />
              <span>每12秒新增一个区块</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-title">平均Gas价格</div>
            <div className="stat-value">24 Gwei</div>
            <div className="stat-trend down">
              <Icon icon="mdi:arrow-down" className="trend-icon" />
              <span>较昨日下降12%</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-title">网络哈希率</div>
            <div className="stat-value">1.23 PH/s</div>
            <div className="stat-trend up">
              <Icon icon="mdi:arrow-up" className="trend-icon" />
              <span>较上周增长5.2%</span>
            </div>
          </div>
        </div>

        <div className="data-section">
          <div className="recent-blocks">
            <h3 className="section-heading">
              <Icon icon="mdi:cube-outline" className="heading-icon" />
              最新区块
            </h3>
            <div className="blocks-list">
              {recentBlocks.map((block) => (
                <div className="block-item" key={block.number}>
                  <div className="block-number">
                    <Icon icon="mdi:cube" className="block-icon" />
                    <span>{block.number}</span>
                  </div>

                  <div className="block-details">
                    <div className="block-info">
                      <div className="info-label">时间:</div>
                      <div className="info-value">{block.timestamp}</div>
                    </div>
                    <div className="block-info">
                      <div className="info-label">交易数:</div>
                      <div className="info-value">{block.transactions}</div>
                    </div>
                    <div className="block-info">
                      <div className="info-label">矿工:</div>
                      <div className="info-value address">{block.miner}</div>
                    </div>
                    <div className="block-info">
                      <div className="info-label">Gas用量:</div>
                      <div className="info-value">{block.gasUsed}</div>
                    </div>
                  </div>

                  <div className="block-actions">
                    <button className="block-action-btn">
                      <Icon icon="mdi:eye-outline" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="view-more">
              <button className="view-more-btn">
                查看更多区块
                <Icon icon="mdi:chevron-right" className="more-icon" />
              </button>
            </div>
          </div>

          <div className="recent-transactions">
            <h3 className="section-heading">
              <Icon icon="mdi:swap-horizontal" className="heading-icon" />
              最新交易
            </h3>
            <div className="transactions-list">
              {recentTransactions.map((tx) => (
                <div className="transaction-item" key={tx.hash}>
                  <div className="transaction-hash">
                    <Icon icon="mdi:file-document-outline" className="hash-icon" />
                    <span>{`${tx.hash.substring(0, 18)}...${tx.hash.substring(tx.hash.length - 4)}`}</span>
                  </div>

                  <div className="transaction-flow">
                    <div className="address-pill from">
                      <span>{`${tx.from.substring(0, 10)}...${tx.from.substring(tx.from.length - 4)}`}</span>
                    </div>
                    <div className="flow-arrow">
                      <Icon icon="mdi:arrow-right" />
                    </div>
                    <div className="address-pill to">
                      <span>{`${tx.to.substring(0, 10)}...${tx.to.substring(tx.to.length - 4)}`}</span>
                    </div>
                  </div>

                  <div className="transaction-details">
                    <div className="transaction-value">{tx.value}</div>
                    <div className="transaction-time">{tx.timestamp}</div>
                    <div className={`transaction-status ${tx.status}`}>
                      <Icon
                        icon={tx.status === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'}
                        className="status-icon"
                      />
                      <span>{tx.status === 'success' ? '成功' : '失败'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="view-more">
              <button className="view-more-btn">
                查看更多交易
                <Icon icon="mdi:chevron-right" className="more-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  .block-explorer {
    padding: 20px 0;
  }

  .explorer-header {
    margin-bottom: 24px;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 10px;
      background: linear-gradient(90deg, #3b82f6, #60a5fa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .explorer-description {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.7);
      max-width: 600px;
    }
  }

  .search-section {
    margin-bottom: 32px;

    .search-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);

      @media (min-width: 768px) {
        flex-direction: row;
      }
    }

    .search-type-selector {
      position: relative;

      .search-type {
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
        padding: 14px 40px 14px 16px;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        appearance: none;
        min-width: 140px;

        option {
          background: #1e1e1e;
          color: white;
        }
      }

      .select-icon {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(255, 255, 255, 0.7);
        pointer-events: none;
      }
    }

    .search-input-container {
      display: flex;
      flex: 1;

      .search-input {
        flex: 1;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px 0 0 8px;
        padding: 14px 16px;
        font-size: 1rem;
        color: white;

        &::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      }

      .search-button {
        background: linear-gradient(135deg, #3b82f6, #60a5fa);
        color: white;
        border: none;
        border-radius: 0 8px 8px 0;
        padding: 0 20px;
        font-size: 1rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
        }

        .search-icon {
          font-size: 1.2rem;
        }
      }
    }
  }

  .explorer-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    margin-bottom: 32px;

    .stat-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);

      .stat-title {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.9rem;
        margin-bottom: 8px;
      }

      .stat-value {
        font-size: 1.8rem;
        font-weight: 700;
        margin-bottom: 12px;
        color: white;
      }

      .stat-trend {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.9rem;

        &.up {
          color: #10b981;
        }

        &.down {
          color: #ef4444;
        }

        .trend-icon {
          font-size: 1.1rem;
        }
      }
    }
  }

  .data-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .section-heading {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.25rem;
    color: white;
    margin-bottom: 16px;

    .heading-icon {
      font-size: 1.4rem;
      color: #3b82f6;
    }
  }

  .blocks-list,
  .transactions-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
  }

  .block-item {
    display: flex;
    align-items: center;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    gap: 16px;

    .block-number {
      display: flex;
      align-items: center;
      font-weight: 600;
      gap: 8px;
      min-width: 120px;

      .block-icon {
        color: #3b82f6;
        font-size: 1.4rem;
      }
    }

    .block-details {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;

      .block-info {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .info-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .info-value {
          font-size: 0.95rem;

          &.address {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 120px;
          }
        }
      }
    }

    .block-actions {
      .block-action-btn {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.2s ease;

        &:hover {
          background: rgba(59, 130, 246, 0.2);
        }
      }
    }
  }

  .transaction-item {
    display: flex;
    flex-direction: column;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    gap: 12px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }

    .transaction-hash {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 200px;
      font-size: 0.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      .hash-icon {
        color: #3b82f6;
        font-size: 1.2rem;
      }
    }

    .transaction-flow {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;

      .address-pill {
        background: rgba(0, 0, 0, 0.2);
        padding: 6px 10px;
        border-radius: 20px;
        font-size: 0.85rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 140px;

        &.from {
          color: #10b981;
        }

        &.to {
          color: #3b82f6;
        }
      }

      .flow-arrow {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    .transaction-details {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-left: auto;

      .transaction-value {
        font-weight: 600;
        color: #10b981;
      }

      .transaction-time {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.6);
      }

      .transaction-status {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.85rem;

        &.success {
          color: #10b981;
        }

        &.failed {
          color: #ef4444;
        }

        .status-icon {
          font-size: 1.1rem;
        }
      }
    }
  }

  .view-more {
    display: flex;
    justify-content: center;
    margin-top: 16px;

    .view-more-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(59, 130, 246, 0.2);
      }

      .more-icon {
        font-size: 1.1rem;
      }
    }
  }
`

export default BlockExplorer
