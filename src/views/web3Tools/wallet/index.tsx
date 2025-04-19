import { Icon } from '@iconify/react'
import { useState } from 'react'
import styled from 'styled-components'

const WalletManage = (): JSX.Element => {
  // 钱包列表数据
  const [wallets, setWallets] = useState([
    {
      id: 1,
      name: '主要钱包',
      address: '0xAbc123...789F',
      balance: '2.458 ETH',
      type: 'MetaMask',
      connectedApps: 3,
      networks: ['以太坊主网', 'BSC', 'Polygon'],
      isActive: true
    },
    {
      id: 2,
      name: 'NFT收藏钱包',
      address: '0xDef456...012E',
      balance: '0.178 ETH',
      type: 'WalletConnect',
      connectedApps: 1,
      networks: ['以太坊主网'],
      isActive: false
    },
    {
      id: 3,
      name: 'DeFi投资钱包',
      address: '0xGhi789...345D',
      balance: '1.054 ETH',
      type: 'Rainbow',
      connectedApps: 5,
      networks: ['以太坊主网', 'Arbitrum', 'Optimism'],
      isActive: false
    }
  ])

  // 交易历史数据
  const transactionHistory = [
    {
      id: 1,
      type: 'transfer',
      from: '0xAbc123...789F',
      to: '0xJkl012...678C',
      amount: '0.5 ETH',
      fee: '0.0012 ETH',
      status: 'success',
      date: '今天 14:25'
    },
    {
      id: 2,
      type: 'swap',
      tokenFrom: 'ETH',
      tokenTo: 'USDT',
      amountFrom: '0.8 ETH',
      amountTo: '1,280 USDT',
      fee: '0.0022 ETH',
      status: 'pending',
      date: '昨天 10:15'
    },
    {
      id: 3,
      type: 'approve',
      token: 'USDC',
      spender: 'Uniswap V3',
      fee: '0.0008 ETH',
      status: 'success',
      date: '2天前'
    }
  ]

  // 控制当前激活的钱包
  const setActiveWallet = (id: number) => {
    setWallets(
      wallets.map((wallet) => ({
        ...wallet,
        isActive: wallet.id === id
      }))
    )
  }

  // 当前激活的钱包
  const activeWallet = wallets.find((wallet) => wallet.isActive) || wallets[0]

  return (
    <StyleWrapper>
      <div className="wallet-manager">
        <div className="wallet-header">
          <h2>钱包管理</h2>
          <p className="wallet-description">管理您的Web3钱包，追踪余额和交易，连接到DApps</p>
        </div>

        <div className="wallet-actions">
          <button className="action-button primary">
            <Icon icon="mdi:wallet-plus" className="action-icon" />
            添加钱包
          </button>
          <button className="action-button secondary">
            <Icon icon="mdi:refresh" className="action-icon" />
            刷新余额
          </button>
          <button className="action-button secondary">
            <Icon icon="mdi:qrcode-scan" className="action-icon" />
            扫描二维码
          </button>
        </div>

        <div className="wallet-main">
          <div className="wallets-section">
            <h3 className="section-heading">
              <Icon icon="mdi:wallet-outline" className="heading-icon" />
              我的钱包
            </h3>

            <div className="wallets-list">
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`wallet-item ${wallet.isActive ? 'active' : ''}`}
                  onClick={() => setActiveWallet(wallet.id)}
                >
                  <div className="wallet-icon">
                    {wallet.type === 'MetaMask' && <Icon icon="mdi:metamask" />}
                    {wallet.type === 'WalletConnect' && <Icon icon="mdi:wallet-connect" />}
                    {wallet.type === 'Rainbow' && <Icon icon="mdi:wallet" />}
                  </div>
                  <div className="wallet-info">
                    <div className="wallet-name">{wallet.name}</div>
                    <div className="wallet-address">{wallet.address}</div>
                  </div>
                  <div className="wallet-balance">
                    <div className="balance-amount">{wallet.balance}</div>
                    <div className="wallet-type">{wallet.type}</div>
                  </div>
                </div>
              ))}

              <div className="add-wallet-card">
                <div className="add-icon">
                  <Icon icon="mdi:plus" />
                </div>
                <div className="add-text">添加新钱包</div>
              </div>
            </div>
          </div>

          <div className="wallet-details">
            <div className="details-header">
              <h3>{activeWallet.name}</h3>
              <div className="wallet-type-badge">
                <Icon
                  icon={
                    activeWallet.type === 'MetaMask'
                      ? 'mdi:metamask'
                      : activeWallet.type === 'WalletConnect'
                        ? 'mdi:wallet-connect'
                        : 'mdi:wallet'
                  }
                />
                <span>{activeWallet.type}</span>
              </div>
            </div>

            <div className="wallet-stats">
              <div className="stat-card">
                <div className="stat-title">余额</div>
                <div className="stat-value">{activeWallet.balance}</div>
                <div className="stat-secondary">≈ ¥24,580</div>
              </div>

              <div className="stat-card">
                <div className="stat-title">已连接应用</div>
                <div className="stat-value">{activeWallet.connectedApps}</div>
                <div className="stat-cta">管理应用</div>
              </div>

              <div className="stat-card">
                <div className="stat-title">支持网络</div>
                <div className="networks-list">
                  {activeWallet.networks.map((network, index) => (
                    <span key={index} className="network-badge">
                      {network}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="wallet-buttons">
              <button className="wallet-button">
                <Icon icon="mdi:send" />
                发送
              </button>
              <button className="wallet-button">
                <Icon icon="mdi:qrcode" />
                接收
              </button>
              <button className="wallet-button">
                <Icon icon="mdi:swap-horizontal" />
                兑换
              </button>
              <button className="wallet-button">
                <Icon icon="mdi:history" />
                历史
              </button>
              <button className="wallet-button">
                <Icon icon="mdi:cog" />
                设置
              </button>
            </div>
          </div>
        </div>

        <div className="transactions-section">
          <h3 className="section-heading">
            <Icon icon="mdi:history" className="heading-icon" />
            最近交易
          </h3>

          <div className="transactions-list">
            {transactionHistory.map((tx) => (
              <div key={tx.id} className="transaction-item">
                <div className="tx-icon-container">
                  <div className={`tx-icon ${tx.type}`}>
                    {tx.type === 'transfer' && <Icon icon="mdi:send" />}
                    {tx.type === 'receive' && <Icon icon="mdi:arrow-down" />}
                    {tx.type === 'swap' && <Icon icon="mdi:swap-horizontal" />}
                    {tx.type === 'approve' && <Icon icon="mdi:check-circle" />}
                  </div>
                </div>

                <div className="tx-content">
                  <div className="tx-title">
                    {tx.type === 'transfer' && '发送 ETH'}
                    {tx.type === 'receive' && '接收 ETH'}
                    {tx.type === 'swap' && `兑换 ${tx.tokenFrom} 为 ${tx.tokenTo}`}
                    {tx.type === 'approve' && `授权 ${tx.token} 给 ${tx.spender}`}
                  </div>

                  {(tx.type === 'transfer' || tx.type === 'receive') && (
                    <div className="tx-addresses">
                      <div className="tx-address">
                        <span className="address-label">从:</span>
                        <span className="address-value">{tx.from}</span>
                      </div>
                      <Icon icon="mdi:arrow-right" className="tx-arrow" />
                      <div className="tx-address">
                        <span className="address-label">至:</span>
                        <span className="address-value">{tx.to}</span>
                      </div>
                    </div>
                  )}

                  {tx.type === 'swap' && (
                    <div className="tx-swap-info">
                      <div className="swap-amount">
                        <span className="swap-from">{tx.amountFrom}</span>
                        <Icon icon="mdi:arrow-right" className="swap-arrow" />
                        <span className="swap-to">{tx.amountTo}</span>
                      </div>
                    </div>
                  )}

                  {tx.type === 'approve' && (
                    <div className="tx-approve-info">
                      <span>无限授权给 {tx.spender}</span>
                    </div>
                  )}
                </div>

                <div className="tx-details">
                  <div className={`tx-status ${tx.status}`}>
                    <span className="status-dot"></span>
                    <span className="status-text">
                      {tx.status === 'success'
                        ? '已确认'
                        : tx.status === 'pending'
                          ? '处理中'
                          : '失败'}
                    </span>
                  </div>

                  <div className="tx-amount">
                    {tx.type === 'transfer'
                      ? `-${tx.amount}`
                      : tx.type === 'receive'
                        ? `+${tx.amount}`
                        : tx.type === 'swap'
                          ? tx.amountTo
                          : ''}
                  </div>

                  <div className="tx-time">{tx.date}</div>

                  <div className="tx-actions">
                    <button className="tx-action-btn">
                      <Icon icon="mdi:open-in-new" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all">
            <button className="view-all-btn">
              查看全部交易历史
              <Icon icon="mdi:chevron-right" className="btn-icon" />
            </button>
          </div>
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  .wallet-manager {
    padding: 20px 0;
  }

  .wallet-header {
    margin-bottom: 24px;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 10px;
      background: linear-gradient(90deg, #7c3aed, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .wallet-description {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.7);
      max-width: 600px;
    }
  }

  .wallet-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 24px;

    .action-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: 8px;
      font-weight: 500;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;

      .action-icon {
        font-size: 1.2rem;
      }

      &.primary {
        background: linear-gradient(135deg, #7c3aed, #a78bfa);
        color: white;
        border: none;

        &:hover {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
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

  .wallet-main {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 32px;

    @media (min-width: 992px) {
      grid-template-columns: 350px 1fr;
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
      color: #7c3aed;
    }
  }

  .wallets-section {
    .wallets-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .wallet-item {
      display: flex;
      align-items: center;
      padding: 16px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      &.active {
        background: rgba(124, 58, 237, 0.1);
        border-color: rgba(124, 58, 237, 0.3);
      }

      .wallet-icon {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        margin-right: 16px;
        font-size: 1.5rem;
        color: #7c3aed;
      }

      .wallet-info {
        flex: 1;

        .wallet-name {
          font-weight: 600;
          margin-bottom: 4px;
          font-size: 1rem;
        }

        .wallet-address {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }
      }

      .wallet-balance {
        text-align: right;

        .balance-amount {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 4px;
          color: #a78bfa;
        }

        .wallet-type {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }

    .add-wallet-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 12px;
      border: 1px dashed rgba(255, 255, 255, 0.1);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.2);
      }

      .add-icon {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(124, 58, 237, 0.1);
        border-radius: 12px;
        margin-bottom: 12px;
        font-size: 1.5rem;
        color: #7c3aed;
      }

      .add-text {
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  .wallet-details {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 24px;

    .details-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;

      h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: white;
      }

      .wallet-type-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(124, 58, 237, 0.1);
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 0.9rem;
        color: #a78bfa;
      }
    }

    .wallet-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: 16px;
      margin-bottom: 24px;

      .stat-card {
        padding: 16px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 12px;

        .stat-title {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }

        .stat-secondary {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .stat-cta {
          font-size: 0.9rem;
          color: #a78bfa;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }

        .networks-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;

          .network-badge {
            background: rgba(124, 58, 237, 0.1);
            color: #a78bfa;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.85rem;
          }
        }
      }
    }

    .wallet-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;

      .wallet-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 12px;
        min-width: 80px;
        color: white;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;

        svg {
          font-size: 1.4rem;
          color: #a78bfa;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }

  .transactions-section {
    margin-top: 32px;

    .transactions-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;
    }
  }

  .transaction-item {
    display: flex;
    align-items: center;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    gap: 16px;

    .tx-icon-container {
      .tx-icon {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        font-size: 1.4rem;

        &.transfer {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        &.receive {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        &.swap {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        &.approve {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }
      }
    }

    .tx-content {
      flex: 1;

      .tx-title {
        font-weight: 600;
        margin-bottom: 6px;
      }

      .tx-addresses,
      .tx-swap-info,
      .tx-approve-info {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.6);
      }

      .tx-addresses {
        display: flex;
        align-items: center;
        gap: 8px;

        .tx-address {
          display: flex;
          align-items: center;
          gap: 4px;

          .address-label {
            color: rgba(255, 255, 255, 0.5);
          }
        }

        .tx-arrow {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.3);
        }
      }

      .tx-swap-info {
        .swap-amount {
          display: flex;
          align-items: center;
          gap: 8px;

          .swap-arrow {
            color: rgba(255, 255, 255, 0.3);
          }
        }
      }
    }

    .tx-details {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;

      .tx-status {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85rem;

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        &.success {
          color: #10b981;

          .status-dot {
            background: #10b981;
          }
        }

        &.pending {
          color: #f59e0b;

          .status-dot {
            background: #f59e0b;
          }
        }

        &.failed {
          color: #ef4444;

          .status-dot {
            background: #ef4444;
          }
        }
      }

      .tx-amount {
        font-weight: 600;
        font-size: 0.95rem;
      }

      .tx-time {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.5);
      }

      .tx-actions {
        .tx-action-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }
      }
    }
  }

  .view-all {
    display: flex;
    justify-content: center;
    margin-top: 16px;

    .view-all-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(124, 58, 237, 0.1);
      color: #a78bfa;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(124, 58, 237, 0.2);
      }

      .btn-icon {
        font-size: 1.1rem;
      }
    }
  }
`

export default WalletManage
