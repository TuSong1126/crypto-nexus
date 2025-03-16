const CollectionPage = (): JSX.Element => {
  return (
    <div className="collection-container">
      <h2>NFT收藏品</h2>
      <div className="collection-header">
        <div className="collection-info">
          <img src="https://via.placeholder.com/100" alt="Collection" className="collection-avatar" />
          <div className="collection-details">
            <h3>稀有艺术品</h3>
            <p>一个包含各种稀有数字艺术品的收藏</p>
            <div className="collection-stats">
              <div className="stat">
                <span>物品</span>
                <strong>128</strong>
              </div>
              <div className="stat">
                <span>拥有者</span>
                <strong>64</strong>
              </div>
              <div className="stat">
                <span>底价</span>
                <strong>0.5 ETH</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="collection-grid">
        {/* 这里可以循环显示NFT项目 */}
        <div className="collection-item">
          <img src="https://via.placeholder.com/250" alt="NFT Item" className="item-image" />
          <div className="item-info">
            <h4>数字艺术 #001</h4>
            <p className="item-price">0.8 ETH</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionPage
