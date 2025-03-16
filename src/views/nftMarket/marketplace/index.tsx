import { Icon } from '@iconify/react'
import { useState } from 'react'
import styled from 'styled-components'

const NftMarketplace = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // 生成模拟NFT数据
  const nftItems = [
    {
      id: 1,
      name: '彩虹猫 #42',
      collection: '彩虹猫系列',
      price: '0.62',
      creator: '0x8f23...9e57',
      image: 'linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)',
      likes: 42,
      timeLeft: '2小时',
      badges: ['热门', '新品']
    },
    {
      id: 2,
      name: '像素猿 #103',
      collection: '无聊猿像素俱乐部',
      price: '1.24',
      creator: '0x3a89...1d45',
      image: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
      likes: 18,
      timeLeft: '6小时',
      badges: ['拍卖中']
    },
    {
      id: 3,
      name: '宇宙探索者 #7',
      collection: '星际旅行者',
      price: '0.85',
      creator: '0x1f32...7c98',
      image: 'linear-gradient(135deg, #10b981, #3b82f6)',
      likes: 56,
      timeLeft: '1天',
      badges: ['限时优惠']
    },
    {
      id: 4,
      name: '数字朋克 #1138',
      collection: '赛博朋克',
      price: '2.34',
      creator: '0x9c12...4a3e',
      image: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
      likes: 29,
      timeLeft: '5天',
      badges: []
    },
    {
      id: 5,
      name: '虚拟地产 B-12',
      collection: '元宇宙地块',
      price: '4.5',
      creator: '0x5d78...2f91',
      image: 'linear-gradient(135deg, #ec4899, #f97316)',
      likes: 15,
      timeLeft: '3天',
      badges: ['稀有']
    },
    {
      id: 6,
      name: '抽象艺术 #24',
      collection: '抽象派数字艺术',
      price: '0.74',
      creator: '0x2a56...8e12',
      image: 'linear-gradient(135deg, #fbbf24, #f97316, #ef4444)',
      likes: 38,
      timeLeft: '12小时',
      badges: []
    }
  ]

  return (
    <StyleWrapper>
      <div className="nft-marketplace-container">
        <div className="marketplace-header">
          <h2>NFT市场广场</h2>
          <div className="view-controls">
            <button
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Icon icon="mdi:view-grid" />
            </button>
            <button
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <Icon icon="mdi:view-list" />
            </button>
          </div>
        </div>

        <div className="marketplace-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <Icon icon="mdi:shopping" />
            </div>
            <div className="stat-info">
              <span className="stat-value">845</span>
              <span className="stat-label">待售 NFT</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Icon icon="mdi:gavel" />
            </div>
            <div className="stat-info">
              <span className="stat-value">129</span>
              <span className="stat-label">进行中拍卖</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Icon icon="mdi:hand-coin" />
            </div>
            <div className="stat-info">
              <span className="stat-value">546 ETH</span>
              <span className="stat-label">24h 交易量</span>
            </div>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-group">
            <label className="filter-label">
              <Icon icon="mdi:filter-variant" className="filter-icon" />
              分类
            </label>
            <select className="filter-dropdown">
              <option value="all">全部分类</option>
              <option value="art">艺术</option>
              <option value="collectibles">收藏品</option>
              <option value="gaming">游戏</option>
              <option value="metaverse">元宇宙</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <Icon icon="mdi:sort" className="filter-icon" />
              排序
            </label>
            <select className="filter-dropdown">
              <option value="recent">最新上架</option>
              <option value="price-asc">价格从低到高</option>
              <option value="price-desc">价格从高到低</option>
              <option value="popularity">热门程度</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <Icon icon="mdi:currency-usd" className="filter-icon" />
              价格范围
            </label>
            <div className="price-range">
              <input type="number" placeholder="最低" className="price-input" />
              <span className="separator">-</span>
              <input type="number" placeholder="最高" className="price-input" />
              <button className="apply-filter-btn">
                <Icon icon="mdi:check" />
              </button>
            </div>
          </div>
        </div>

        <div className={`nft-grid ${viewMode}`}>
          {nftItems.map((item) => (
            <div className="nft-card" key={item.id}>
              <div className="nft-image-container" style={{ background: item.image }}>
                {item.badges.length > 0 && (
                  <div className="badge-container">
                    {item.badges.map((badge, index) => (
                      <span key={index} className="nft-badge">
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
                <div className="card-actions">
                  <button className="card-action-btn like">
                    <Icon icon="mdi:heart-outline" />
                    <span>{item.likes}</span>
                  </button>
                  <button className="card-action-btn more">
                    <Icon icon="mdi:dots-horizontal" />
                  </button>
                </div>
              </div>

              <div className="nft-info">
                <div className="nft-header">
                  <h3 className="nft-title">{item.name}</h3>
                  <div className="nft-collection">{item.collection}</div>
                </div>

                <div className="creator-row">
                  <div className="creator">
                    <Icon icon="mdi:account-circle" className="creator-icon" />
                    <span>{item.creator}</span>
                  </div>
                  <div className="time-left">
                    <Icon icon="mdi:clock-outline" className="time-icon" />
                    <span>{item.timeLeft}</span>
                  </div>
                </div>

                <div className="price-row">
                  <div className="price">
                    <Icon icon="cryptocurrency:eth" className="eth-icon" />
                    <span>{item.price} ETH</span>
                  </div>
                  <button className="buy-btn">
                    <Icon icon="mdi:cart-outline" />
                    <span>购买</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="marketplace-pagination">
          <button className="pagination-btn prev">
            <Icon icon="mdi:chevron-left" />
            上一页
          </button>
          <div className="pagination-numbers">
            <button className="page-number active">1</button>
            <button className="page-number">2</button>
            <button className="page-number">3</button>
            <span className="page-ellipsis">...</span>
            <button className="page-number">10</button>
          </div>
          <button className="pagination-btn next">
            下一页
            <Icon icon="mdi:chevron-right" />
          </button>
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  .nft-marketplace-container {
    padding: 20px 0;
  }

  .marketplace-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      background: linear-gradient(90deg, #f97316, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
    }

    .view-controls {
      display: flex;
      gap: 8px;

      .view-button {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1.2rem;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        &.active {
          background: linear-gradient(135deg, #f97316, #ec4899);
          border: none;
          color: white;
        }
      }
    }
  }

  .marketplace-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 32px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: linear-gradient(135deg, #f97316, #ec4899);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: white;
      }

      .stat-info {
        display: flex;
        flex-direction: column;

        .stat-value {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }

  .filter-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 32px;

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .filter-label {
        display: flex;
        align-items: center;
        gap: 6px;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 500;

        .filter-icon {
          font-size: 1.2rem;
        }
      }

      .filter-dropdown {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
        outline: none;
        font-size: 1rem;

        &:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }

        option {
          background: #1a1a1a;
        }
      }

      .price-range {
        display: flex;
        align-items: center;
        gap: 10px;

        .price-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 12px;
          border-radius: 8px;
          outline: none;
          font-size: 1rem;

          &:hover,
          &:focus {
            border-color: rgba(255, 255, 255, 0.2);
          }

          &::placeholder {
            color: rgba(255, 255, 255, 0.4);
          }
        }

        .separator {
          color: rgba(255, 255, 255, 0.6);
        }

        .apply-filter-btn {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: linear-gradient(135deg, #f97316, #ec4899);
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(249, 115, 22, 0.3);
          }
        }
      }
    }
  }

  .nft-grid {
    margin-bottom: 40px;

    &.grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }

    &.list {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .nft-card {
        display: grid;
        grid-template-columns: 160px 1fr;

        .nft-image-container {
          height: 100%;
          border-radius: 12px 0 0 12px;
        }

        .nft-info {
          border-radius: 0 12px 12px 0;
        }

        @media (max-width: 600px) {
          display: flex;
          flex-direction: column;

          .nft-image-container {
            height: 200px;
            border-radius: 12px 12px 0 0;
          }

          .nft-info {
            border-radius: 0 0 12px 12px;
          }
        }
      }
    }
  }

  .nft-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

      .card-actions {
        opacity: 1;
      }
    }
  }

  .nft-image-container {
    height: 240px;
    position: relative;

    .badge-container {
      position: absolute;
      top: 10px;
      left: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      .nft-badge {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        color: white;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }

    .card-actions {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      gap: 8px;
      opacity: 0;
      transition: opacity 0.3s ease;

      .card-action-btn {
        display: flex;
        align-items: center;
        gap: 4px;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        border: none;
        color: white;
        padding: 6px 10px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9rem;

        &:hover {
          background: rgba(0, 0, 0, 0.8);
        }

        &.like {
          color: #f87171;
        }
      }
    }
  }

  .nft-info {
    padding: 16px;
  }

  .nft-header {
    margin-bottom: 12px;

    .nft-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: white;
      margin: 0 0 6px 0;
    }

    .nft-collection {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .creator-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    .creator,
    .time-left {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);

      .creator-icon,
      .time-icon {
        font-size: 1.1rem;
      }
    }
  }

  .price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .price {
      display: flex;
      align-items: center;
      gap: 6px;

      .eth-icon {
        font-size: 1.2rem;
        color: #627eea;
      }

      span {
        font-weight: 600;
        font-size: 1.1rem;
        color: white;
      }
    }

    .buy-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: linear-gradient(135deg, #f97316, #ec4899);
      color: white;
      border: none;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(249, 115, 22, 0.3);
      }
    }
  }

  .marketplace-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 16px;
    }

    .pagination-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      &.prev {
        padding-left: 15px;
      }

      &.next {
        padding-right: 15px;
      }
    }

    .pagination-numbers {
      display: flex;
      align-items: center;
      gap: 8px;

      .page-number {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: white;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        &.active {
          background: linear-gradient(135deg, #f97316, #ec4899);
          border: none;
        }
      }

      .page-ellipsis {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`

export default NftMarketplace
