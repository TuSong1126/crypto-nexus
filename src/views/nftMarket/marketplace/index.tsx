const NftMarketplace = () => {
  return (
    <div className="nft-marketplace-container">
      <h2>NFT市场广场</h2>

      <div className="filter-section">
        <select className="filter-dropdown">
          <option value="all">全部分类</option>
          <option value="art">艺术</option>
          <option value="collectibles">收藏品</option>
          <option value="gaming">游戏</option>
          <option value="metaverse">元宇宙</option>
        </select>

        <select className="sort-dropdown">
          <option value="recent">最新上架</option>
          <option value="price-asc">价格从低到高</option>
          <option value="price-desc">价格从高到低</option>
          <option value="popularity">热门程度</option>
        </select>
      </div>

      <div className="nft-grid">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="nft-card">
            <div className="nft-image-container">
              <img src={`/assets/nft-${item}.jpg`} alt={`NFT ${item}`} className="nft-image" />
            </div>
            <div className="nft-info">
              <h3>Crypto Punk #{item}00</h3>
              <p className="nft-collection">CryptoPunks</p>
              <div className="nft-price">
                <img src="/assets/eth-logo-small.png" alt="ETH" className="eth-icon" />
                <span>{(Math.random() * 10).toFixed(2)} ETH</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NftMarketplace
