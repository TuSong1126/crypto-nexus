import { Icon } from '@iconify/react'
import { useState } from 'react'
import styled from 'styled-components'

const Web3Transaction = (): JSX.Element => {
  // 切换标签页
  const [activeTab, setActiveTab] = useState('send')

  return (
    <StyleWrapper>
      <div className="web3-transaction">
        <div className="transaction-header">
          <h2>链上交易</h2>
          <p className="transaction-description">发送交易、查看交易历史记录和管理链上操作</p>
        </div>

        <div className="transaction-tabs">
          <div className={`tab ${activeTab === 'send' ? 'active' : ''}`} onClick={() => setActiveTab('send')}>
            <Icon icon="mdi:send" className="tab-icon" />
            <span>发起交易</span>
          </div>
          <div className={`tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
            <Icon icon="mdi:history" className="tab-icon" />
            <span>交易记录</span>
          </div>
        </div>

        <div className="transaction-content">
          {activeTab === 'send' && (
            <div className="send-transaction">
              <div className="send-types">
                <div className="type-option active">
                  <Icon icon="mdi:send" className="type-icon" />
                  <span>转账</span>
                </div>
                <div className="type-option">
                  <Icon icon="mdi:file-document-outline" className="type-icon" />
                  <span>合约交互</span>
                </div>
                <div className="type-option">
                  <Icon icon="mdi:rocket-launch" className="type-icon" />
                  <span>部署合约</span>
                </div>
              </div>

              <div className="send-form">
                <div className="form-group">
                  <label>发送代币</label>
                  <div className="token-selector">
                    <div className="selected-token">
                      <div className="token-icon">E</div>
                      <div className="token-info">
                        <div className="token-symbol">ETH</div>
                        <div className="token-balance">余额: 2.458 (ETH)</div>
                      </div>
                      <Icon icon="mdi:chevron-down" className="selector-icon" />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>接收地址</label>
                  <input type="text" className="input-field" placeholder="输入区块链地址 (0x...)" />
                </div>

                <div className="form-group">
                  <label>发送金额</label>
                  <div className="amount-input">
                    <input type="text" className="input-field" placeholder="0.00" />
                    <div className="amount-suffix">ETH</div>
                  </div>
                </div>

                <div className="form-group">
                  <label>交易费用</label>
                  <div className="gas-options">
                    <div className="gas-option">
                      <div className="option-header">
                        <div className="option-name">经济</div>
                        <div className="option-price">20 Gwei</div>
                      </div>
                      <div className="option-time">~10 分钟</div>
                    </div>
                    <div className="gas-option active">
                      <div className="option-header">
                        <div className="option-name">标准</div>
                        <div className="option-price">30 Gwei</div>
                      </div>
                      <div className="option-time">~3 分钟</div>
                    </div>
                    <div className="gas-option">
                      <div className="option-header">
                        <div className="option-name">快速</div>
                        <div className="option-price">40 Gwei</div>
                      </div>
                      <div className="option-time">~1 分钟</div>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="action-button secondary">取消</button>
                  <button className="action-button primary">确认发送</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="transaction-history">
              <div className="filter-section">
                <div className="search-container">
                  <input type="text" placeholder="搜索交易哈希、地址或金额..." className="search-input" />
                  <Icon icon="mdi:magnify" className="search-icon" />
                </div>

                <div className="filters">
                  <div className="filter-group">
                    <label>状态</label>
                    <select>
                      <option value="all">全部状态</option>
                      <option value="success">成功</option>
                      <option value="pending">处理中</option>
                      <option value="failed">失败</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>交易类型</label>
                    <select>
                      <option value="all">全部类型</option>
                      <option value="transfer">转账</option>
                      <option value="swap">兑换</option>
                      <option value="approve">授权</option>
                      <option value="contract">合约调用</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="transactions-list">
                <div className="table-header">
                  <div className="header-cell hash">交易哈希</div>
                  <div className="header-cell type">类型</div>
                  <div className="header-cell value">金额</div>
                  <div className="header-cell addresses">地址</div>
                  <div className="header-cell time">时间</div>
                  <div className="header-cell status">状态</div>
                </div>

                <div className="transaction-row">
                  <div className="cell hash">
                    <div className="hash-wrapper">
                      <span className="hash-text">0x7a8c6b...a1098</span>
                      <button className="copy-btn">
                        <Icon icon="mdi:content-copy" />
                      </button>
                    </div>
                  </div>
                  <div className="cell type">
                    <div className="type-badge transfer">
                      <Icon icon="mdi:send" />
                      <span>转账</span>
                    </div>
                  </div>
                  <div className="cell value">
                    <span className="value-text">0.75 ETH</span>
                  </div>
                  <div className="cell addresses">
                    <div className="address-flow">
                      <div className="address from">0x5a4c...7a6b</div>
                      <Icon icon="mdi:arrow-right" className="flow-icon" />
                      <div className="address to">0x1a2b...9a0b</div>
                    </div>
                  </div>
                  <div className="cell time">
                    <div className="time-info">
                      <div className="time-date">2023-03-30</div>
                      <div className="time-hour">15:42:23</div>
                    </div>
                  </div>
                  <div className="cell status">
                    <div className="status-badge success">
                      <Icon icon="mdi:check-circle" />
                      <span>成功</span>
                    </div>
                  </div>
                </div>

                <div className="transaction-row">
                  <div className="cell hash">
                    <div className="hash-wrapper">
                      <span className="hash-text">0x3f2e1d...d3e2f1</span>
                      <button className="copy-btn">
                        <Icon icon="mdi:content-copy" />
                      </button>
                    </div>
                  </div>
                  <div className="cell type">
                    <div className="type-badge swap">
                      <Icon icon="mdi:swap-horizontal" />
                      <span>兑换</span>
                    </div>
                  </div>
                  <div className="cell value">
                    <span className="value-text">250 USDT → 0.12 ETH</span>
                  </div>
                  <div className="cell addresses">
                    <div className="address-flow">
                      <div className="address from">0x5a4c...7a6b</div>
                      <Icon icon="mdi:arrow-right" className="flow-icon" />
                      <div className="address to">Uniswap V3</div>
                    </div>
                  </div>
                  <div className="cell time">
                    <div className="time-info">
                      <div className="time-date">2023-03-29</div>
                      <div className="time-hour">10:15:09</div>
                    </div>
                  </div>
                  <div className="cell status">
                    <div className="status-badge success">
                      <Icon icon="mdi:check-circle" />
                      <span>成功</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="view-more">
                <button className="view-more-btn">
                  查看更多交易
                  <Icon icon="mdi:chevron-right" className="more-icon" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  .web3-transaction {
    padding: 20px 0;
  }

  .transaction-header {
    margin-bottom: 24px;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 10px;
      background: linear-gradient(90deg, #8b5cf6, #d946ef);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .transaction-description {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.7);
      max-width: 600px;
    }
  }

  .transaction-tabs {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;

    .tab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;

      .tab-icon {
        font-size: 1.2rem;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      &.active {
        background: rgba(139, 92, 246, 0.2);
        border-color: rgba(139, 92, 246, 0.4);
      }
    }
  }

  .transaction-content {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .send-types {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;

    .type-option {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      &.active {
        background: rgba(139, 92, 246, 0.2);
        border-color: rgba(139, 92, 246, 0.5);
      }

      .type-icon {
        font-size: 1.2rem;
      }
    }
  }

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
    }
  }

  .token-selector {
    .selected-token {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 12px 16px;
      cursor: pointer;

      .token-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, #8b5cf6, #d946ef);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }

      .token-info {
        flex: 1;

        .token-symbol {
          font-weight: 600;
          font-size: 1.1rem;
        }

        .token-balance {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
          margin-top: 2px;
        }
      }
    }
  }

  .input-field {
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 14px 16px;
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

  .amount-input {
    display: flex;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;

    .input-field {
      border: none;
      background: transparent;
    }

    .amount-suffix {
      display: flex;
      align-items: center;
      padding: 0 16px;
      background: rgba(0, 0, 0, 0.2);
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      font-weight: 600;
    }
  }

  .gas-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;

    .gas-option {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 12px 16px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(0, 0, 0, 0.3);
      }

      &.active {
        background: rgba(139, 92, 246, 0.1);
        border-color: rgba(139, 92, 246, 0.3);
      }

      .option-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;

        .option-name {
          font-weight: 600;
        }

        .option-price {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }
      }

      .option-time {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.85rem;
      }
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;

    .action-button {
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 500;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &.primary {
        background: linear-gradient(135deg, #8b5cf6, #d946ef);
        color: white;
        border: none;

        &:hover {
          background: linear-gradient(135deg, #9f6eff, #e85aff);
        }
      }

      &.secondary {
        background: rgba(255, 255, 255, 0.05);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }

  /* 交易历史样式 */
  .filter-section {
    margin-bottom: 20px;
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

  .transactions-list {
    margin-bottom: 20px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .table-header {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 2fr 1fr 1fr;
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
    grid-template-columns: 1.5fr 1fr 1fr 2fr 1fr 1fr;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.03);
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
  }

  .view-more {
    display: flex;
    justify-content: center;
    margin-top: 16px;

    .view-more-btn {
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

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }

  @media (max-width: 992px) {
    .table-header,
    .transaction-row {
      grid-template-columns: 1.2fr 0.8fr 1fr 1.5fr 0.8fr 0.8fr;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    .transactions-list {
      overflow-x: auto;
    }

    .table-header,
    .transaction-row {
      min-width: 900px;
    }

    .transaction-tabs {
      flex-direction: column;
    }
  }
`

export default Web3Transaction
