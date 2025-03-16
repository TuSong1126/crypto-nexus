const Web3AssetsList = () => {
  return (
    <div className="assets-list-container">
      <h2>资产列表</h2>
      <div className="asset-cards">
        <div className="asset-card">
          <h3>ETH</h3>
          <p>余额: 1.234 ETH</p>
          <p>价值: $2,468.00</p>
        </div>
        <div className="asset-card">
          <h3>BTC</h3>
          <p>余额: 0.056 BTC</p>
          <p>价值: $3,360.00</p>
        </div>
        <div className="asset-card">
          <h3>USDT</h3>
          <p>余额: 5,000 USDT</p>
          <p>价值: $5,000.00</p>
        </div>
      </div>
    </div>
  )
}

export default Web3AssetsList
