import { Icon } from '@iconify/react'
import { useState } from 'react'
import styled from 'styled-components'

const TransactionSend = (): JSX.Element => {
  const [transactionType, setTransactionType] = useState('transfer')
  const [selectedToken, setSelectedToken] = useState('ETH')
  const [recipientAddress, setRecipientAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [gasOption, setGasOption] = useState('standard')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [gasLimit, setGasLimit] = useState('21000')
  const [maxFeePerGas, setMaxFeePerGas] = useState('30')
  const [maxPriorityFee, setMaxPriorityFee] = useState('1.5')
  const [nonce, setNonce] = useState('')
  const [memo, setMemo] = useState('')

  // 模拟代币列表
  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: '2.458', value: '24,580' },
    { symbol: 'USDT', name: 'Tether', balance: '1,250.75', value: '8,755' },
    { symbol: 'USDC', name: 'USD Coin', balance: '946.21', value: '6,623' },
    { symbol: 'BNB', name: 'Binance Coin', balance: '3.72', value: '4,092' },
    { symbol: 'LINK', name: 'Chainlink', balance: '48.35', value: '1,934' }
  ]

  // 模拟联系人列表
  const contacts = [
    { name: '交易所充值', address: '0x1a2b3c4d5e6f7g8h9i0j...' },
    { name: 'DeFi钱包', address: '0x9i8h7g6f5e4d3c2b1a0...' },
    { name: '项目投资', address: '0xabcdef1234567890abcd...' }
  ]

  // 选择的代币信息
  const selectedTokenInfo = tokens.find((token) => token.symbol === selectedToken)

  // 计算交易费用
  const calculateFee = () => {
    // 模拟费用计算
    const feeOptions = {
      slow: { fee: '0.0012 ETH', time: '~10 分钟', price: '20 Gwei' },
      standard: { fee: '0.0018 ETH', time: '~3 分钟', price: '30 Gwei' },
      fast: { fee: '0.0024 ETH', time: '~1 分钟', price: '40 Gwei' }
    }
    return feeOptions[gasOption as keyof typeof feeOptions]
  }

  // 处理发送交易
  const handleSendTransaction = () => {
    // 实际应用中会调用钱包API发送交易
    console.log({
      type: transactionType,
      token: selectedToken,
      recipient: recipientAddress,
      amount,
      gasOption,
      ...(showAdvanced && {
        gasLimit,
        maxFeePerGas,
        maxPriorityFee,
        nonce: nonce || undefined,
        memo: memo || undefined
      })
    })

    // 显示成功提示或处理错误
    alert('交易已提交!')
  }

  const fee = calculateFee()

  return (
    <StyleWrapper>
      <div className="transaction-send">
        <div className="send-header">
          <h2>发起交易</h2>
          <p className="send-description">发送代币、与智能合约交互或部署合约</p>
        </div>

        <div className="transaction-types">
          <div
            className={`type-option ${transactionType === 'transfer' ? 'active' : ''}`}
            onClick={() => setTransactionType('transfer')}
          >
            <Icon icon="mdi:send" className="type-icon" />
            <span>转账</span>
          </div>
          <div
            className={`type-option ${transactionType === 'contract' ? 'active' : ''}`}
            onClick={() => setTransactionType('contract')}
          >
            <Icon icon="mdi:file-document-outline" className="type-icon" />
            <span>合约交互</span>
          </div>
          <div
            className={`type-option ${transactionType === 'deploy' ? 'active' : ''}`}
            onClick={() => setTransactionType('deploy')}
          >
            <Icon icon="mdi:rocket-launch" className="type-icon" />
            <span>部署合约</span>
          </div>
        </div>

        <div className="transaction-form">
          {transactionType === 'transfer' && (
            <>
              <div className="form-group">
                <label>发送代币</label>
                <div className="token-selector">
                  <div className="selected-token" onClick={() => console.log('打开代币选择器')}>
                    <div className="token-icon">{selectedToken.charAt(0)}</div>
                    <div className="token-info">
                      <div className="token-symbol">{selectedToken}</div>
                      <div className="token-balance">
                        余额: {selectedTokenInfo?.balance} ({selectedTokenInfo?.symbol})
                      </div>
                    </div>
                    <Icon icon="mdi:chevron-down" className="selector-icon" />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>接收地址</label>
                <div className="address-input-container">
                  <input
                    type="text"
                    className="address-input"
                    placeholder="输入区块链地址 (0x...)"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                  />
                  <button className="address-action" onClick={() => console.log('打开联系人')}>
                    <Icon icon="mdi:account" />
                  </button>
                  <button className="address-action" onClick={() => console.log('扫描二维码')}>
                    <Icon icon="mdi:qrcode-scan" />
                  </button>
                </div>

                {contacts.length > 0 && (
                  <div className="quick-contacts">
                    <div className="contacts-label">常用联系人:</div>
                    <div className="contacts-list">
                      {contacts.map((contact, index) => (
                        <div key={index} className="contact-pill" onClick={() => setRecipientAddress(contact.address)}>
                          <Icon icon="mdi:account" className="contact-icon" />
                          <span>{contact.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>发送金额</label>
                <div className="amount-input-container">
                  <input
                    type="text"
                    className="amount-input"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="amount-actions">
                    <button className="amount-action" onClick={() => setAmount(selectedTokenInfo?.balance || '')}>
                      最大
                    </button>
                    <div className="amount-currency">{selectedToken}</div>
                  </div>
                </div>
                {selectedTokenInfo && amount && !isNaN(parseFloat(amount)) && (
                  <div className="amount-fiat">
                    ≈ ¥{' '}
                    {(
                      (parseFloat(amount) * parseFloat(selectedTokenInfo.value)) /
                      parseFloat(selectedTokenInfo.balance)
                    ).toFixed(2)}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>交易费用</label>
                <div className="gas-options">
                  <div
                    className={`gas-option ${gasOption === 'slow' ? 'active' : ''}`}
                    onClick={() => setGasOption('slow')}
                  >
                    <div className="option-header">
                      <div className="option-name">经济</div>
                      <div className="option-price">20 Gwei</div>
                    </div>
                    <div className="option-time">~10 分钟</div>
                  </div>
                  <div
                    className={`gas-option ${gasOption === 'standard' ? 'active' : ''}`}
                    onClick={() => setGasOption('standard')}
                  >
                    <div className="option-header">
                      <div className="option-name">标准</div>
                      <div className="option-price">30 Gwei</div>
                    </div>
                    <div className="option-time">~3 分钟</div>
                  </div>
                  <div
                    className={`gas-option ${gasOption === 'fast' ? 'active' : ''}`}
                    onClick={() => setGasOption('fast')}
                  >
                    <div className="option-header">
                      <div className="option-name">快速</div>
                      <div className="option-price">40 Gwei</div>
                    </div>
                    <div className="option-time">~1 分钟</div>
                  </div>
                </div>
                {fee && (
                  <div className="fee-summary">
                    估计费用: <span className="fee-amount">{fee.fee}</span>
                  </div>
                )}
              </div>

              <div className="advanced-toggle" onClick={() => setShowAdvanced(!showAdvanced)}>
                <span>高级选项</span>
                <Icon icon="mdi:chevron-down" className={`toggle-icon ${showAdvanced ? 'expanded' : ''}`} />
              </div>

              {showAdvanced && (
                <div className="advanced-options">
                  <div className="form-row">
                    <div className="form-group half">
                      <label>Gas 限制</label>
                      <input
                        type="text"
                        className="text-input"
                        placeholder="21000"
                        value={gasLimit}
                        onChange={(e) => setGasLimit(e.target.value)}
                      />
                    </div>
                    <div className="form-group half">
                      <label>最大矿工费 (Gwei)</label>
                      <input
                        type="text"
                        className="text-input"
                        placeholder="30"
                        value={maxFeePerGas}
                        onChange={(e) => setMaxFeePerGas(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group half">
                      <label>最大优先费 (Gwei)</label>
                      <input
                        type="text"
                        className="text-input"
                        placeholder="1.5"
                        value={maxPriorityFee}
                        onChange={(e) => setMaxPriorityFee(e.target.value)}
                      />
                    </div>
                    <div className="form-group half">
                      <label>Nonce (选填)</label>
                      <input
                        type="text"
                        className="text-input"
                        placeholder="自动"
                        value={nonce}
                        onChange={(e) => setNonce(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>交易备注 (选填)</label>
                    <textarea
                      className="memo-input"
                      placeholder="添加交易相关备注..."
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              )}
            </>
          )}

          {transactionType === 'contract' && (
            <div className="placeholder-message">
              <Icon icon="mdi:code-json" className="placeholder-icon" />
              <h3>合约交互</h3>
              <p>在此页面编写合约调用逻辑，选择调用方法并设置参数</p>
            </div>
          )}

          {transactionType === 'deploy' && (
            <div className="placeholder-message">
              <Icon icon="mdi:rocket-launch" className="placeholder-icon" />
              <h3>部署合约</h3>
              <p>在此页面上传合约代码并进行部署设置</p>
            </div>
          )}

          <div className="form-actions">
            <button className="action-button secondary" onClick={() => console.log('取消')}>
              取消
            </button>
            <button
              className="action-button primary"
              onClick={handleSendTransaction}
              disabled={!amount || !recipientAddress}
            >
              确认发送
            </button>
          </div>
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  .transaction-send {
    padding: 20px 0;
  }

  .send-header {
    margin-bottom: 24px;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 10px;
      background: linear-gradient(90deg, #8b5cf6, #d946ef);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .send-description {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.7);
      max-width: 600px;
    }
  }

  .transaction-types {
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

  .transaction-form {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
    }

    &.half {
      width: calc(50% - 8px);
    }
  }

  .form-row {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
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

      .selector-icon {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  .address-input-container,
  .amount-input-container {
    display: flex;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  .address-input,
  .amount-input,
  .text-input {
    flex: 1;
    background: transparent;
    border: none;
    padding: 14px 16px;
    color: white;
    font-size: 1rem;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  .memo-input {
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 14px 16px;
    color: white;
    font-size: 1rem;
    min-height: 80px;
    resize: vertical;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  .address-action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    background: none;
    border: none;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .amount-actions {
    display: flex;
    align-items: center;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }

  .amount-action {
    padding: 0 12px;
    background: none;
    border: none;
    color: #8b5cf6;
    cursor: pointer;
    font-weight: 500;
    height: 100%;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(139, 92, 246, 0.1);
    }
  }

  .amount-currency {
    padding: 0 16px;
    color: white;
    font-weight: 600;
  }

  .amount-fiat {
    margin-top: 8px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
  }

  .quick-contacts {
    margin-top: 12px;

    .contacts-label {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.85rem;
      margin-bottom: 8px;
    }

    .contacts-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .contact-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(139, 92, 246, 0.1);
      border: 1px solid rgba(139, 92, 246, 0.2);
      border-radius: 20px;
      padding: 6px 12px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(139, 92, 246, 0.2);
      }

      .contact-icon {
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  .gas-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 12px;

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

  .fee-summary {
    margin-top: 12px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;

    .fee-amount {
      color: white;
      font-weight: 500;
    }
  }

  .advanced-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.7);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 16px;

    .toggle-icon {
      transition: transform 0.3s ease;

      &.expanded {
        transform: rotate(180deg);
      }
    }
  }

  .advanced-options {
    margin-bottom: 24px;
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

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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

  .placeholder-message {
    text-align: center;
    padding: 40px 20px;

    .placeholder-icon {
      font-size: 3rem;
      color: rgba(255, 255, 255, 0.3);
      margin-bottom: 16px;
    }

    h3 {
      margin-bottom: 12px;
      font-size: 1.5rem;
    }

    p {
      color: rgba(255, 255, 255, 0.6);
      max-width: 500px;
      margin: 0 auto;
    }
  }

  @media (max-width: 768px) {
    .form-row {
      flex-direction: column;
      gap: 20px;
    }

    .form-group.half {
      width: 100%;
    }
  }
`

export default TransactionSend
