import { Icon } from '@iconify/react'
import styled from 'styled-components'

const PoolPage = (): JSX.Element => {
  return (
    <StyleWrapper>
      <div className="pool-container">
        <h2>流动性池</h2>

        <div className="pool-actions-bar">
          <div className="filter-group">
            <Icon icon="mdi:filter-variant" className="filter-icon" />
            <select className="filter-select">
              <option value="all">所有池</option>
              <option value="my">我的池</option>
              <option value="popular">热门池</option>
            </select>
          </div>
          <button className="create-pool-button">
            <Icon icon="mdi:plus" className="icon" />
            创建新池
          </button>
        </div>

        <div className="pool-list">
          <div className="pool-item">
            <div className="pool-header">
              <div className="pool-icons">
                <div className="token-icon">
                  <Icon icon="cryptocurrency:eth" />
                </div>
                <div className="token-icon">
                  <Icon icon="cryptocurrency:usdt" />
                </div>
              </div>
              <h3>ETH-USDT</h3>
              <div className="pool-tag">
                <Icon icon="mdi:chart-line-variant" className="tag-icon" />
                APY: 5.2%
              </div>
            </div>
            <div className="pool-details">
              <div className="pool-stat">
                <span>总锁仓金额</span>
                <strong>$1,250,000</strong>
              </div>
              <div className="pool-stat">
                <span>我的份额</span>
                <strong>$0</strong>
              </div>
              <div className="pool-stat">
                <span>交易量(24h)</span>
                <strong>$125,436</strong>
              </div>
              <div className="pool-stat">
                <span>手续费(24h)</span>
                <strong>$378</strong>
              </div>
            </div>
            <div className="pool-actions">
              <button className="pool-button primary">添加流动性</button>
              <button className="pool-button secondary">移除流动性</button>
              <button className="pool-button outline">
                <Icon icon="mdi:information-outline" className="button-icon" />
                详情
              </button>
            </div>
          </div>

          <div className="pool-item">
            <div className="pool-header">
              <div className="pool-icons">
                <div className="token-icon">
                  <Icon icon="cryptocurrency:btc" />
                </div>
                <div className="token-icon">
                  <Icon icon="cryptocurrency:usdt" />
                </div>
              </div>
              <h3>BTC-USDT</h3>
              <div className="pool-tag">
                <Icon icon="mdi:chart-line-variant" className="tag-icon" />
                APY: 4.8%
              </div>
            </div>
            <div className="pool-details">
              <div className="pool-stat">
                <span>总锁仓金额</span>
                <strong>$3,750,000</strong>
              </div>
              <div className="pool-stat">
                <span>我的份额</span>
                <strong>$1,200</strong>
              </div>
              <div className="pool-stat">
                <span>交易量(24h)</span>
                <strong>$542,950</strong>
              </div>
              <div className="pool-stat">
                <span>手续费(24h)</span>
                <strong>$1,629</strong>
              </div>
            </div>
            <div className="pool-actions">
              <button className="pool-button primary">添加流动性</button>
              <button className="pool-button secondary">移除流动性</button>
              <button className="pool-button outline">
                <Icon icon="mdi:information-outline" className="button-icon" />
                详情
              </button>
            </div>
          </div>

          <div className="pool-item">
            <div className="pool-header">
              <div className="pool-icons">
                <div className="token-icon">
                  <Icon icon="cryptocurrency:eth" />
                </div>
                <div className="token-icon">
                  <Icon icon="cryptocurrency:btc" />
                </div>
              </div>
              <h3>ETH-BTC</h3>
              <div className="pool-tag">
                <Icon icon="mdi:chart-line-variant" className="tag-icon" />
                APY: 3.9%
              </div>
            </div>
            <div className="pool-details">
              <div className="pool-stat">
                <span>总锁仓金额</span>
                <strong>$980,000</strong>
              </div>
              <div className="pool-stat">
                <span>我的份额</span>
                <strong>$0</strong>
              </div>
              <div className="pool-stat">
                <span>交易量(24h)</span>
                <strong>$89,260</strong>
              </div>
              <div className="pool-stat">
                <span>手续费(24h)</span>
                <strong>$268</strong>
              </div>
            </div>
            <div className="pool-actions">
              <button className="pool-button primary">添加流动性</button>
              <button className="pool-button secondary">移除流动性</button>
              <button className="pool-button outline">
                <Icon icon="mdi:information-outline" className="button-icon" />
                详情
              </button>
            </div>
          </div>
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  .pool-container {
    padding: 20px 0;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 24px;
    color: #ffffff;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, #6c5ce7, #00cec9);
      border-radius: 2px;
    }
  }

  .pool-actions-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .filter-group {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      padding: 0 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      width: 200px;

      .filter-icon {
        color: rgba(255, 255, 255, 0.6);
        font-size: 1.2rem;
        margin-right: 8px;
      }

      .filter-select {
        background: transparent;
        border: none;
        color: #ffffff;
        padding: 12px 0;
        width: 100%;
        font-size: 1rem;
        outline: none;
        cursor: pointer;

        option {
          background: #2d3436;
          color: #ffffff;
        }
      }
    }

    .create-pool-button {
      display: flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #00b894, #00cec9);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 10px 16px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      .icon {
        font-size: 1.2rem;
      }

      &:hover {
        background: linear-gradient(135deg, #00cec9, #00b894);
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(0, 206, 201, 0.3);
      }
    }

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: stretch;
      gap: 16px;

      .filter-group {
        width: 100%;
      }
    }
  }

  .pool-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .pool-item {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 24px;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
  }

  .pool-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .pool-icons {
      display: flex;
      margin-right: 16px;

      .token-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        font-size: 1.5rem;
        margin-left: -10px;
        border: 2px solid rgba(0, 0, 0, 0.2);

        &:first-child {
          margin-left: 0;
          z-index: 2;
        }

        &:last-child {
          z-index: 1;
        }
      }
    }

    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #ffffff;
      margin: 0;
      flex: 1;
    }

    .pool-tag {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 184, 148, 0.1);
      color: #00b894;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      border: 1px solid rgba(0, 184, 148, 0.3);

      .tag-icon {
        font-size: 1.1rem;
      }
    }

    @media (max-width: 768px) {
      flex-wrap: wrap;
      gap: 12px;

      h3 {
        order: 2;
        width: 100%;
      }

      .pool-tag {
        order: 3;
      }
    }
  }

  .pool-details {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    margin-bottom: 20px;

    .pool-stat {
      display: flex;
      flex-direction: column;
      gap: 4px;

      span {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.6);
      }

      strong {
        font-size: 1.2rem;
        font-weight: 600;
        color: #ffffff;
      }
    }
  }

  .pool-actions {
    display: flex;
    gap: 12px;
    margin-top: 20px;

    @media (max-width: 600px) {
      flex-direction: column;
    }

    .pool-button {
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      flex: 1;

      &.primary {
        background: linear-gradient(135deg, #00b894, #00cec9);
        color: #ffffff;
        border: none;

        &:hover {
          background: linear-gradient(135deg, #00cec9, #00b894);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 206, 201, 0.3);
        }
      }

      &.secondary {
        background: linear-gradient(135deg, #6c5ce7, #a29bfe);
        color: #ffffff;
        border: none;

        &:hover {
          background: linear-gradient(135deg, #a29bfe, #6c5ce7);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(108, 92, 231, 0.3);
        }
      }

      &.outline {
        background: transparent;
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.3);

        &:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }
      }

      .button-icon {
        font-size: 1.2rem;
      }
    }
  }
`

export default PoolPage
