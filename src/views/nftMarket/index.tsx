import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const NftMarket = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  // 模拟NFT数据
  const hotCollections = [
    {
      id: 1,
      name: '太空旅行者',
      creator: 'Cosmic Art Studio',
      floor: '0.85 ETH',
      volume: '125 ETH',
      image: 'linear-gradient(45deg, #3b82f6, #60a5fa)'
    },
    {
      id: 2,
      name: '像素世界',
      creator: 'Pixel Masters',
      floor: '0.12 ETH',
      volume: '42 ETH',
      image: 'linear-gradient(45deg, #f97316, #fb923c)'
    },
    {
      id: 3,
      name: '数字梦境',
      creator: 'Dream Collective',
      floor: '1.2 ETH',
      volume: '215 ETH',
      image: 'linear-gradient(45deg, #8b5cf6, #a78bfa)'
    }
  ]

  return (
    <StyleWrapper>
      <div className="hero-section">
        <div className="hero-content">
          <h1>NFT 数字艺术市场</h1>
          <p className="subtitle">探索、交易和收藏独特的数字艺术品和收藏品</p>
          <div className="search-container">
            <input type="text" placeholder="搜索藏品、创作者或收藏品..." />
            <button className="search-button">搜索</button>
          </div>

          <div className="market-metrics">
            <div className="metric">
              <span className="metric-value">12.5K+</span>
              <span className="metric-label">数字藏品</span>
            </div>
            <div className="metric">
              <span className="metric-value">3.2K+</span>
              <span className="metric-label">艺术家</span>
            </div>
            <div className="metric">
              <span className="metric-value">8.7K+</span>
              <span className="metric-label">收藏家</span>
            </div>
          </div>
        </div>
        <div className="featured-nft">
          <div className="nft-card featured">
            <div className="nft-image-placeholder"></div>
            <div className="nft-info">
              <div className="nft-title">宇宙探索者 #42</div>
              <div className="nft-creator">
                由 <span className="creator-name">Cosmic Art Studio</span> 创作
              </div>
              <div className="nft-price-row">
                <div className="nft-price">2.5 ETH</div>
                <button className="bid-button">出价</button>
              </div>
              <div className="nft-time-left">拍卖剩余时间: 18小时 32分钟</div>
            </div>
          </div>
        </div>
      </div>

      <div className="collections-section">
        <div className="section-header">
          <h2 className="section-title">热门藏品</h2>
          <button className="view-all">查看全部</button>
        </div>

        <div className="collections-grid">
          {hotCollections.map((collection) => (
            <div className="collection-card" key={collection.id}>
              <div className="collection-image" style={{ background: collection.image }}>
                <div className="collection-rank">#{collection.id}</div>
              </div>
              <div className="collection-info">
                <div className="collection-name">{collection.name}</div>
                <div className="collection-creator">由 {collection.creator} 创作</div>
                <div className="collection-stats">
                  <div className="stat">
                    <div className="stat-label">地板价</div>
                    <div className="stat-value">{collection.floor}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">交易量</div>
                    <div className="stat-value">{collection.volume}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-header">
          <h2 className="filter-title">浏览 NFT</h2>
          <div className="filter-controls">
            <div className="sort-dropdown">
              <select className="sort-select">
                <option value="recent">最新上架</option>
                <option value="price-low">价格: 从低到高</option>
                <option value="price-high">价格: 从高到低</option>
                <option value="popular">最受欢迎</option>
              </select>
            </div>
            <div className="view-options">
              <button className="view-option active">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
                </svg>
              </button>
              <button className="view-option">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M3 4h18v4H3V4zm0 6h18v4H3v-4zm0 6h18v4H3v-4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="filter-tags">
          <button
            className={`filter-tag ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            全部
          </button>
          <button
            className={`filter-tag ${activeFilter === 'art' ? 'active' : ''}`}
            onClick={() => setActiveFilter('art')}
          >
            艺术
          </button>
          <button
            className={`filter-tag ${activeFilter === 'collectibles' ? 'active' : ''}`}
            onClick={() => setActiveFilter('collectibles')}
          >
            收藏品
          </button>
          <button
            className={`filter-tag ${activeFilter === 'music' ? 'active' : ''}`}
            onClick={() => setActiveFilter('music')}
          >
            音乐
          </button>
          <button
            className={`filter-tag ${activeFilter === 'photography' ? 'active' : ''}`}
            onClick={() => setActiveFilter('photography')}
          >
            摄影
          </button>
          <button
            className={`filter-tag ${activeFilter === 'game' ? 'active' : ''}`}
            onClick={() => setActiveFilter('game')}
          >
            游戏资产
          </button>
        </div>
      </div>

      <div className="category-nav">
        <button className="category-button active">热门</button>
        <button className="category-button">艺术</button>
        <button className="category-button">收藏品</button>
        <button className="category-button">音乐</button>
        <button className="category-button">游戏</button>
      </div>

      <div className="content-area">
        <Outlet />
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  .hero-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-size: 3rem;
      background: linear-gradient(90deg, #f97316, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1.2;
      margin-bottom: 1rem;
    }

    .subtitle {
      font-size: 1.25rem;
      color: #64748b;
      margin-bottom: 2rem;
      max-width: 500px;
    }
  }

  .market-metrics {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;

    .metric {
      display: flex;
      flex-direction: column;

      .metric-value {
        font-size: 1.75rem;
        font-weight: 700;
        background: linear-gradient(90deg, #f97316, #ec4899);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .metric-label {
        color: #64748b;
        font-size: 0.9rem;
        margin-top: 0.35rem;
      }
    }
  }

  .search-container {
    display: flex;
    max-width: 500px;

    input {
      flex: 1;
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px 0 0 8px;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: #f97316;
      }
    }

    .search-button {
      background: linear-gradient(90deg, #f97316, #ec4899);
      color: white;
      border: none;
      padding: 0 1.5rem;
      border-radius: 0 8px 8px 0;
      font-size: 1rem;
      cursor: pointer;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.9;
      }
    }
  }

  .featured-nft {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nft-card {
    width: 100%;
    max-width: 380px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;

    &.featured {
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
    }

    &:hover {
      transform: translateY(-5px);
    }
  }

  .nft-image-placeholder {
    height: 350px;
    background: linear-gradient(45deg, #f97316, #ec4899);
    position: relative;

    &:after {
      content: 'NFT';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 3rem;
      color: rgba(255, 255, 255, 0.3);
      font-weight: bold;
    }
  }

  .nft-info {
    padding: 1.5rem;
    background-color: white;

    .nft-title {
      font-weight: 600;
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      color: #1e293b;
    }

    .nft-creator {
      font-size: 0.9rem;
      color: #64748b;
      margin-bottom: 1rem;

      .creator-name {
        color: #f97316;
        font-weight: 500;
      }
    }

    .nft-price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .nft-price {
      font-weight: 700;
      color: #f97316;
      font-size: 1.2rem;
    }

    .bid-button {
      background: linear-gradient(90deg, #f97316, #ec4899);
      color: white;
      border: none;
      padding: 0.5rem 1.25rem;
      border-radius: 8px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        opacity: 0.9;
        transform: translateY(-2px);
      }
    }

    .nft-time-left {
      font-size: 0.85rem;
      color: #64748b;
      padding: 0.5rem 0;
      border-top: 1px solid #f1f5f9;
    }
  }

  .collections-section {
    margin-bottom: 3rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: 1.5rem;
    color: #1e293b;
    font-weight: 600;
  }

  .view-all {
    color: #f97316;
    background: none;
    border: none;
    font-size: 0.95rem;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  .collections-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .collection-card {
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    }
  }

  .collection-image {
    height: 160px;
    position: relative;

    .collection-rank {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background-color: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(5px);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 500;
    }
  }

  .collection-info {
    padding: 1.5rem;
  }

  .collection-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  .collection-creator {
    font-size: 0.9rem;
    color: #64748b;
    margin-bottom: 1.25rem;
  }

  .collection-stats {
    display: flex;
    justify-content: space-between;
  }

  .stat {
    .stat-label {
      font-size: 0.8rem;
      color: #94a3b8;
      margin-bottom: 0.25rem;
    }

    .stat-value {
      font-size: 1rem;
      font-weight: 600;
      color: #1e293b;
    }
  }

  .filter-section {
    margin-bottom: 2rem;
    background-color: #f8fafc;
    border-radius: 12px;
    padding: 1.5rem;
  }

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .filter-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
  }

  .filter-controls {
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
      margin-top: 1rem;
      width: 100%;
    }
  }

  .sort-select {
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.5rem 2rem 0.5rem 1rem;
    font-size: 0.9rem;
    color: #334155;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px;

    &:focus {
      outline: none;
      border-color: #f97316;
    }
  }

  .view-options {
    display: flex;
    gap: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
  }

  .view-option {
    border: none;
    background-color: white;
    padding: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      fill: #94a3b8;
    }

    &.active {
      background-color: #f1f5f9;

      svg {
        fill: #f97316;
      }
    }
  }

  .filter-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .filter-tag {
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 9999px;
    padding: 0.5rem 1.25rem;
    font-size: 0.9rem;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: #f97316;
      color: #f97316;
    }

    &.active {
      background: linear-gradient(90deg, #f97316, #ec4899);
      color: white;
      border: none;
      padding: calc(0.5rem + 1px) calc(1.25rem + 1px);
    }
  }

  .category-nav {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 4px;
    }
  }

  .category-button {
    white-space: nowrap;
    padding: 0.75rem 1.5rem;
    border: none;
    background-color: #f1f5f9;
    color: #64748b;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;

    &.active {
      background: linear-gradient(90deg, #f97316, #ec4899);
      color: white;
    }

    &:not(.active):hover {
      background-color: #e2e8f0;
      color: #334155;
    }
  }

  .content-area {
    min-height: 500px;
  }
`

export default NftMarket
