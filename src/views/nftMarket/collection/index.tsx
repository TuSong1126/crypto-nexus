import { Icon } from '@iconify/react'
import styled from 'styled-components'

const CollectionPage = (): JSX.Element => {
  // 生成模拟NFT项目数据
  const nftItems = Array.from({ length: 8 }).map((_, index) => ({
    id: index + 1,
    name: `数字艺术 #${String(index + 1).padStart(3, '0')}`,
    price: (0.3 + Math.random() * 2).toFixed(2),
    creator: '0x7ab...f12e',
    likes: Math.floor(Math.random() * 100),
    image:
      index % 2 === 0
        ? `linear-gradient(135deg, #f97316, #ec4899 ${40 + index * 5}%, #8b5cf6)`
        : `linear-gradient(135deg, #3b82f6 ${index * 8}%, #8b5cf6, #ec4899)`
  }))

  return (
    <StyleWrapper>
      <div className="collection-container">
        <div className="collection-header">
          <div
            className="collection-banner"
            style={{ background: 'linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)' }}
          >
            <div className="collection-avatar">
              <Icon icon="game-icons:star-formation" className="avatar-icon" />
            </div>
          </div>

          <div className="collection-info">
            <div className="collection-details">
              <h2>稀有艺术品</h2>
              <div className="collection-creator">
                <span>创建者: </span>
                <a href="#" className="creator-link">
                  <Icon icon="mdi:account-circle" className="creator-icon" />
                  ArtMaster
                </a>
                <span className="verified-badge">
                  <Icon icon="mdi:check-decagram" />
                </span>
              </div>
              <p className="collection-description">
                一个包含各种稀有数字艺术品的收藏，每件作品都是独一无二的，由顶级艺术家精心创作。
              </p>
            </div>

            <div className="collection-stats">
              <div className="stat-item">
                <span className="stat-value">128</span>
                <span className="stat-label">物品</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">64</span>
                <span className="stat-label">拥有者</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">0.5 ETH</span>
                <span className="stat-label">底价</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">245 ETH</span>
                <span className="stat-label">总交易额</span>
              </div>
            </div>
          </div>

          <div className="collection-actions">
            <button className="action-button primary">
              <Icon icon="mdi:shopping-outline" className="button-icon" />
              购买
            </button>
            <button className="action-button secondary">
              <Icon icon="mdi:share-variant-outline" className="button-icon" />
              分享
            </button>
            <button className="action-button outline">
              <Icon icon="mdi:dots-horizontal" className="button-icon" />
            </button>
          </div>
        </div>

        <div className="collection-filters">
          <div className="filter-group">
            <div className="filter-label">
              <Icon icon="mdi:filter-variant" className="filter-icon" />
              筛选:
            </div>
            <select className="filter-select">
              <option value="all">全部</option>
              <option value="available">可购买</option>
              <option value="auction">拍卖中</option>
              <option value="sold">已售出</option>
            </select>
          </div>

          <div className="filter-group">
            <div className="filter-label">
              <Icon icon="mdi:sort" className="filter-icon" />
              排序:
            </div>
            <select className="filter-select">
              <option value="recent">最新</option>
              <option value="price-low">价格从低到高</option>
              <option value="price-high">价格从高到低</option>
              <option value="popular">最受欢迎</option>
            </select>
          </div>
        </div>

        <div className="collection-grid">
          {nftItems.map((item) => (
            <div className="nft-item" key={item.id}>
              <div className="nft-image" style={{ background: item.image }}>
                <div className="nft-actions">
                  <button className="nft-action like">
                    <Icon icon="mdi:heart-outline" />
                    <span>{item.likes}</span>
                  </button>
                </div>
              </div>
              <div className="nft-info">
                <h3 className="nft-name">{item.name}</h3>
                <div className="nft-creator">
                  <Icon icon="mdi:account-circle" className="creator-avatar" />
                  <span>{item.creator}</span>
                </div>
                <div className="nft-price-row">
                  <div className="nft-price">
                    <Icon icon="cryptocurrency:eth" className="eth-icon" />
                    <span>{item.price} ETH</span>
                  </div>
                  <button className="buy-now-btn">
                    <Icon icon="mdi:cart-outline" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button className="pagination-btn">
            <Icon icon="mdi:chevron-left" />
          </button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">
            <Icon icon="mdi:chevron-right" />
          </button>
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  .collection-container {
    padding: 20px 0;
  }

  .collection-header {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 32px;
    overflow: hidden;
  }

  .collection-banner {
    height: 200px;
    position: relative;
  }

  .collection-avatar {
    width: 120px;
    height: 120px;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    position: absolute;
    bottom: -40px;
    left: 40px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;

    .avatar-icon {
      font-size: 4rem;
      color: white;
    }
  }

  .collection-info {
    display: flex;
    justify-content: space-between;
    padding: 60px 40px 30px;

    @media (max-width: 992px) {
      flex-direction: column;
      gap: 20px;
    }
  }

  .collection-details {
    max-width: 60%;

    @media (max-width: 992px) {
      max-width: 100%;
    }

    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 12px;
      background: linear-gradient(90deg, #f97316, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .collection-creator {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      color: rgba(255, 255, 255, 0.6);

      .creator-link {
        display: flex;
        align-items: center;
        gap: 4px;
        color: rgba(255, 255, 255, 0.9);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      .creator-icon {
        font-size: 1.2rem;
      }

      .verified-badge {
        color: #3b82f6;
        font-size: 1.2rem;
      }
    }

    .collection-description {
      font-size: 1rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .collection-stats {
    display: flex;
    gap: 24px;

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: #ffffff;
      }

      .stat-label {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .collection-actions {
    display: flex;
    gap: 12px;
    padding: 0 40px 30px;

    .action-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &.primary {
        background: linear-gradient(135deg, #f97316, #ec4899);
        color: white;
        border: none;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(249, 115, 22, 0.3);
        }
      }

      &.secondary {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);

        &:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
      }

      &.outline {
        background: transparent;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 10px 12px;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }

      .button-icon {
        font-size: 1.2rem;
      }
    }
  }

  .collection-filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 16px;
    }

    .filter-group {
      display: flex;
      align-items: center;
      gap: 12px;

      .filter-label {
        display: flex;
        align-items: center;
        gap: 6px;
        color: rgba(255, 255, 255, 0.8);

        .filter-icon {
          font-size: 1.2rem;
        }
      }

      .filter-select {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        outline: none;
        min-width: 160px;

        option {
          background: #1e1e1e;
        }
      }
    }
  }

  .collection-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }

  .nft-item {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    overflow: hidden;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

      .nft-image .nft-actions {
        opacity: 1;
      }
    }
  }

  .nft-image {
    height: 240px;
    position: relative;

    .nft-actions {
      position: absolute;
      top: 10px;
      right: 10px;
      opacity: 0;
      transition: opacity 0.3s ease;

      .nft-action {
        display: flex;
        align-items: center;
        gap: 4px;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        border: none;
        color: white;
        padding: 6px 10px;
        border-radius: 20px;
        cursor: pointer;

        &:hover {
          background: rgba(0, 0, 0, 0.7);
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

  .nft-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    margin: 0 0 8px 0;
  }

  .nft-creator {
    display: flex;
    align-items: center;
    gap: 6px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    margin-bottom: 16px;

    .creator-avatar {
      font-size: 1.1rem;
    }
  }

  .nft-price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nft-price {
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
    }
  }

  .buy-now-btn {
    background: linear-gradient(135deg, #f97316, #ec4899);
    color: white;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 5px 15px rgba(249, 115, 22, 0.3);
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 40px;

    .pagination-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: white;
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
  }
`

export default CollectionPage
