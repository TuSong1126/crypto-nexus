const PoolPage = (): JSX.Element => {
  return (
    <div className="pool-container">
      <h2>流动性池</h2>
      <div className="pool-list">
        <div className="pool-item">
          <div className="pool-header">
            <h3>ETH-USDT</h3>
            <span className="pool-tag">APY: 5.2%</span>
          </div>
          <div className="pool-details">
            <div className="pool-stat">
              <span>总锁仓金额</span>
              <strong>1,250,000 USDT</strong>
            </div>
            <div className="pool-stat">
              <span>我的份额</span>
              <strong>0 USDT</strong>
            </div>
          </div>
          <div className="pool-actions">
            <button className="pool-button">添加流动性</button>
            <button className="pool-button secondary">移除流动性</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoolPage
