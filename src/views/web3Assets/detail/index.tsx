const Web3AssetsDetail = () => {
  return (
    <div className="asset-detail-container">
      <h2>资产详情</h2>
      <div className="asset-info">
        <div className="asset-header">
          <img src="/assets/eth-logo.png" alt="ETH Logo" className="asset-logo" />
          <div>
            <h3>以太坊 (ETH)</h3>
            <p className="asset-price">$2,000.00</p>
          </div>
        </div>

        <div className="asset-stats">
          <div className="stat-item">
            <span className="stat-label">余额</span>
            <span className="stat-value">1.234 ETH</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">价值</span>
            <span className="stat-value">$2,468.00</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">24小时变化</span>
            <span className="stat-value up">+5.67%</span>
          </div>
        </div>

        <div className="asset-actions">
          <button className="action-button">发送</button>
          <button className="action-button">接收</button>
          <button className="action-button">交换</button>
        </div>
      </div>
    </div>
  )
}

export default Web3AssetsDetail
