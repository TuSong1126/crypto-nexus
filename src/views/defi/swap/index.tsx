import { Icon } from '@iconify/react'
import styled from 'styled-components'

const SwapPage = (): JSX.Element => {
  return (
    <StyleWrapper>
      <div className="swap-container">
        <h2>代币交换</h2>
        <div className="swap-card">
          <div className="swap-form">
            <div className="form-group">
              <div className="input-label">
                <label>从</label>
                <span className="balance">余额: 1.245 ETH</span>
              </div>
              <div className="input-container">
                <input type="text" placeholder="0.0" />
                <div className="token-selector">
                  <div className="token-icon">
                    <Icon icon="cryptocurrency:eth" />
                  </div>
                  <select>
                    <option value="eth">ETH</option>
                    <option value="usdt">USDT</option>
                    <option value="usdc">USDC</option>
                    <option value="dai">DAI</option>
                  </select>
                  <Icon icon="mdi:chevron-down" className="dropdown-icon" />
                </div>
              </div>
            </div>

            <div className="swap-direction">
              <button className="direction-button">
                <Icon icon="mdi:swap-vertical" />
              </button>
            </div>

            <div className="form-group">
              <div className="input-label">
                <label>到</label>
                <span className="balance">余额: 2,500 USDT</span>
              </div>
              <div className="input-container">
                <input type="text" placeholder="0.0" />
                <div className="token-selector">
                  <div className="token-icon">
                    <Icon icon="cryptocurrency:usdt" />
                  </div>
                  <select>
                    <option value="usdt">USDT</option>
                    <option value="eth">ETH</option>
                    <option value="usdc">USDC</option>
                    <option value="dai">DAI</option>
                  </select>
                  <Icon icon="mdi:chevron-down" className="dropdown-icon" />
                </div>
              </div>
            </div>

            <div className="swap-details">
              <div className="detail-item">
                <span>汇率</span>
                <span>1 ETH = 1,830 USDT</span>
              </div>
              <div className="detail-item">
                <span>最小接收</span>
                <span>1,811.7 USDT</span>
              </div>
              <div className="detail-item">
                <span>价格影响</span>
                <span className="impact low">0.3%</span>
              </div>
              <div className="detail-item">
                <span>手续费</span>
                <span>0.001 ETH</span>
              </div>
            </div>

            <button className="swap-button">交换代币</button>
          </div>
        </div>

        <div className="recent-transactions">
          <h3>最近交易</h3>
          <div className="transaction-list">
            <div className="transaction-item">
              <div className="transaction-tokens">
                <span>0.5 ETH</span>
                <Icon icon="mdi:arrow-right" className="arrow-icon" />
                <span>912 USDT</span>
              </div>
              <div className="transaction-time">3分钟前</div>
            </div>
            <div className="transaction-item">
              <div className="transaction-tokens">
                <span>200 USDT</span>
                <Icon icon="mdi:arrow-right" className="arrow-icon" />
                <span>0.11 ETH</span>
              </div>
              <div className="transaction-time">昨天</div>
            </div>
          </div>
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  .swap-container {
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

  .swap-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin-bottom: 32px;
  }

  .swap-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .input-label {
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      font-size: 1rem;
      font-weight: 600;
      color: #ffffff;
    }

    .balance {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .input-container {
    display: flex;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    padding: 4px;
    border: 1px solid rgba(255, 255, 255, 0.05);

    input {
      flex: 1;
      background: transparent;
      border: none;
      padding: 12px 16px;
      font-size: 1.2rem;
      font-weight: 500;
      color: #ffffff;
      outline: none;

      &::placeholder {
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }

  .token-selector {
    display: flex;
    align-items: center;
    background: rgba(108, 92, 231, 0.2);
    border-radius: 8px;
    padding: 4px 12px;
    margin: 4px;
    cursor: pointer;

    .token-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-right: 8px;
    }

    select {
      background: transparent;
      border: none;
      color: #ffffff;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      outline: none;
      appearance: none;
      padding-right: 16px;
    }

    .dropdown-icon {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .swap-direction {
    display: flex;
    justify-content: center;
    margin: 4px 0;

    .direction-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(108, 92, 231, 0.2);
      border: 1px solid rgba(108, 92, 231, 0.4);
      color: #ffffff;
      font-size: 1.4rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(108, 92, 231, 0.4);
        transform: rotate(180deg);
      }
    }
  }

  .swap-details {
    margin-top: 16px;
    padding: 16px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .detail-item {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);

      .impact {
        &.low {
          color: #00b894;
        }
        &.medium {
          color: #fdcb6e;
        }
        &.high {
          color: #ff7675;
        }
      }
    }
  }

  .swap-button {
    margin-top: 16px;
    padding: 16px;
    border-radius: 12px;
    background: linear-gradient(135deg, #6c5ce7, #a29bfe);
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #a29bfe, #6c5ce7);
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(108, 92, 231, 0.3);
    }
  }

  .recent-transactions {
    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 16px;
      color: #ffffff;
    }

    .transaction-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .transaction-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.05);

      .transaction-tokens {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;

        .arrow-icon {
          color: rgba(255, 255, 255, 0.6);
        }
      }

      .transaction-time {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  @media (max-width: 768px) {
    .swap-card {
      padding: 16px;
    }

    .input-container input {
      font-size: 1rem;
      padding: 10px 12px;
    }

    .token-selector {
      padding: 4px 8px;

      select {
        max-width: 60px;
        font-size: 0.9rem;
      }
    }
  }
`

export default SwapPage
