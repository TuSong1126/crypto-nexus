import { Icon } from '@iconify/react'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Web3Tools = (): JSX.Element => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  // 常用工具数据
  const commonTools = [
    {
      id: 'wallet',
      name: '钱包管理',
      icon: 'mdi:wallet-outline',
      description: '管理您的加密资产钱包，追踪余额和交易记录',
      path: '/web3Tools/wallet'
    },
    {
      id: 'explorer',
      name: '区块浏览器',
      icon: 'mdi:cube-outline',
      description: '浏览和搜索区块链上的交易、地址和智能合约数据',
      path: '/web3Tools/explorer'
    },
    {
      id: 'swap',
      name: 'Token交换',
      icon: 'mdi:swap-horizontal',
      description: '在不同的区块链上进行代币交换',
      path: '/web3Tools/swap'
    },
    {
      id: 'nft',
      name: 'NFT工具',
      icon: 'mdi:image-outline',
      description: '浏览、铸造和管理您的NFT收藏品',
      path: '/web3Tools/nft'
    }
  ]

  // 所有工具数据
  const allTools = [
    {
      category: '资产管理',
      tools: [
        { id: 'portfolio', name: '资产组合', icon: 'mdi:chart-pie', path: '/web3Tools/portfolio' },
        { id: 'staking', name: '质押管理', icon: 'mdi:lock-outline', path: '/web3Tools/staking' },
        { id: 'lending', name: '借贷管理', icon: 'mdi:bank-outline', path: '/web3Tools/lending' }
      ]
    },
    {
      category: '交易工具',
      tools: [
        { id: 'dex', name: '去中心化交易', icon: 'mdi:arrow-decision', path: '/web3Tools/dex' },
        { id: 'bridge', name: '跨链桥', icon: 'mdi:bridge', path: '/web3Tools/bridge' },
        { id: 'gas', name: 'Gas优化器', icon: 'mdi:gas-station', path: '/web3Tools/gas' }
      ]
    },
    {
      category: '开发工具',
      tools: [
        { id: 'contract', name: '合约交互', icon: 'mdi:file-document-outline', path: '/web3Tools/contract' },
        { id: 'abi', name: 'ABI解析器', icon: 'mdi:code-json', path: '/web3Tools/abi' },
        { id: 'events', name: '事件监听', icon: 'mdi:bell-outline', path: '/web3Tools/events' }
      ]
    },
    {
      category: '实用工具',
      tools: [
        { id: 'converter', name: '单位转换', icon: 'mdi:calculator', path: '/web3Tools/converter' },
        { id: 'signature', name: '消息签名', icon: 'mdi:signature', path: '/web3Tools/signature' },
        { id: 'ens', name: 'ENS查询', icon: 'mdi:domain', path: '/web3Tools/ens' }
      ]
    }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 实际应用中这里会过滤工具列表
    console.log('搜索工具:', searchQuery)
  }

  const navigateTo = (path: string) => {
    navigate(path)
  }

  return (
    <StyleWrapper>
      <div className="web3-tools">
        <div className="tools-header">
          <div className="header-content">
            <h2>Web3 工具集</h2>
            <p className="header-description">全方位的Web3工具，帮助您更有效地管理和使用区块链</p>
          </div>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <Icon icon="mdi:magnify" className="search-icon" />
              <input
                type="text"
                placeholder="搜索Web3工具..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <button type="submit" className="search-button">
              搜索
            </button>
          </form>
        </div>

        <div className="common-tools-section">
          <h3 className="section-heading">常用工具</h3>
          <div className="common-tools-grid">
            {commonTools.map((tool) => (
              <div key={tool.id} className="tool-card" onClick={() => navigateTo(tool.path)}>
                <div className="tool-icon">
                  <Icon icon={tool.icon} />
                </div>
                <div className="tool-info">
                  <div className="tool-name">{tool.name}</div>
                  <div className="tool-description">{tool.description}</div>
                </div>
                <div className="tool-arrow">
                  <Icon icon="mdi:chevron-right" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tool-content">
          <Outlet />
        </div>
      </div>

      <div className="all-tools-section">
        <h3 className="section-heading">所有工具</h3>
        <div className="tools-categories">
          {allTools.map((category, index) => (
            <div key={index} className="tool-category">
              <h4 className="category-name">{category.category}</h4>
              <div className="category-tools">
                {category.tools.map((tool) => (
                  <div key={tool.id} className="tool-item" onClick={() => navigateTo(tool.path)}>
                    <div className="tool-item-icon">
                      <Icon icon={tool.icon} />
                    </div>
                    <div className="tool-item-name">{tool.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="additional-resources">
        <h3 className="section-heading">学习资源</h3>
        <div className="resources-grid">
          <div className="resource-card">
            <div className="resource-icon">
              <Icon icon="mdi:book-open-page-variant" />
            </div>
            <div className="resource-content">
              <h4>Web3基础指南</h4>
              <p>了解区块链和Web3的基本概念和应用</p>
            </div>
          </div>
          <div className="resource-card">
            <div className="resource-icon">
              <Icon icon="mdi:video-outline" />
            </div>
            <div className="resource-content">
              <h4>视频教程</h4>
              <p>观看详细的Web3工具使用教程和实操演示</p>
            </div>
          </div>
          <div className="resource-card">
            <div className="resource-icon">
              <Icon icon="mdi:frequently-asked-questions" />
            </div>
            <div className="resource-content">
              <h4>常见问题</h4>
              <p>查找常见问题的解答和疑难解决方法</p>
            </div>
          </div>
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;

  .web3-tools {
    padding: 20px 0;
  }

  .tools-header {
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: 992px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .header-content {
      h2 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 10px;
        background: linear-gradient(90deg, #4f46e5, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .header-description {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.7);
        max-width: 600px;
      }
    }

    .search-form {
      display: flex;
      width: 100%;
      max-width: 500px;

      .search-input-container {
        flex: 1;
        position: relative;

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.2rem;
        }

        .search-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px 0 0 8px;
          padding: 12px 16px 12px 42px;
          color: white;
          font-size: 1rem;

          &::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }

          &:focus {
            outline: none;
            border-color: rgba(255, 255, 255, 0.2);
          }
        }
      }

      .search-button {
        background: linear-gradient(135deg, #4f46e5, #a855f7);
        color: white;
        border: none;
        border-radius: 0 8px 8px 0;
        padding: 0 20px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: linear-gradient(135deg, #4338ca, #9333ea);
        }
      }
    }
  }

  .section-heading {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin-bottom: 20px;
    position: relative;
    padding-left: 16px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 24px;
      background: linear-gradient(to bottom, #4f46e5, #a855f7);
      border-radius: 4px;
    }
  }

  .common-tools-section {
    .common-tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .tool-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      }

      .tool-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(79, 70, 229, 0.1);
        border-radius: 12px;
        font-size: 1.8rem;
        color: #a855f7;
      }

      .tool-info {
        flex: 1;

        .tool-name {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 6px;
          color: white;
        }

        .tool-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.4;
        }
      }

      .tool-arrow {
        color: rgba(255, 255, 255, 0.3);
        font-size: 1.2rem;
        transition: all 0.2s ease;
      }

      &:hover .tool-arrow {
        color: #a855f7;
        transform: translateX(3px);
      }
    }
  }

  .all-tools-section {
    margin-bottom: 40px;

    .tools-categories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }

    .tool-category {
      .category-name {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .category-tools {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .tool-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .tool-item-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          font-size: 1.2rem;
          color: #a855f7;
        }

        .tool-item-name {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }

  .additional-resources {
    .resources-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .resource-card {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 20px;
      display: flex;
      align-items: flex-start;
      gap: 16px;
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.12);
      }

      .resource-icon {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(168, 85, 247, 0.1);
        border-radius: 10px;
        font-size: 1.5rem;
        color: #a855f7;
        flex-shrink: 0;
      }

      .resource-content {
        h4 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: white;
        }

        p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.4;
        }
      }
    }
  }

  .tool-content {
    margin-top: 20px;
    min-height: 300px;
  }
`

export default Web3Tools
