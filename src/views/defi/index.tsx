import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import ActionCard from '@/components/common/ActionCard'
import Button from '@/components/common/Button'
import PageLayout from '@/components/common/PageLayout'
import StatsCard from '@/components/common/StatsCard'

const Defi = () => {
  // 示例市场数据
  const marketData = [
    { id: 1, name: 'ETH/USDT', price: '$1,832.45', change: '+3.2%', volume: '$2.4B' },
    { id: 2, name: 'BTC/USDT', price: '$28,459.12', change: '+1.8%', volume: '$5.1B' },
    { id: 3, name: 'XRP/USDT', price: '$0.62', change: '-0.5%', volume: '$845M' }
  ]

  return (
    <PageLayout title="DeFi 金融中心" subtitle="去中心化金融，提供流动性和代币交换">
      <StyleWrapper>
        <div className="metrics-row">
          <StatsCard
            title="总资产"
            value="$2,453"
            trend={{ type: 'up', value: '5.2%' }}
            icon={<Icon icon="mdi:wallet-outline" />}
            variant="gradient"
          />
          <StatsCard
            title="日收益"
            value="$182"
            trend={{ type: 'up', value: '12.5%' }}
            icon={<Icon icon="mdi:cash-plus" />}
          />
          <StatsCard
            title="平均APY"
            value="8.4%"
            trend={{ type: 'up', value: '0.6%' }}
            icon={<Icon icon="mdi:chart-line" />}
          />
        </div>

        <div className="section-container">
          <h2 className="section-title">交易对</h2>
          <div className="market-table">
            <div className="market-header">
              <div className="market-cell">交易对</div>
              <div className="market-cell">价格</div>
              <div className="market-cell">24h变化</div>
              <div className="market-cell">成交量</div>
              <div className="market-cell">操作</div>
            </div>
            {marketData.map((item) => (
              <div className="market-row" key={item.id}>
                <div className="market-cell">{item.name}</div>
                <div className="market-cell price">{item.price}</div>
                <div className={`market-cell change ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {item.change}
                </div>
                <div className="market-cell volume">{item.volume}</div>
                <div className="market-cell actions">
                  <Button size="small" variant="primary">
                    交易
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-container">
          <h2 className="section-title">快捷操作</h2>
          <div className="actions-grid">
            <ActionCard
              title="兑换代币"
              description="在 DEX 上快速兑换代币"
              icon={<Icon icon="mdi:swap-horizontal" />}
              variant="primary"
            >
              <Button variant="primary" fullWidth>
                去交换
              </Button>
            </ActionCard>
            <ActionCard
              title="添加流动性"
              description="为交易对提供流动性并赚取手续费"
              icon={<Icon icon="mdi:water-plus" />}
              variant="secondary"
            >
              <Button variant="secondary" fullWidth>
                添加流动性
              </Button>
            </ActionCard>
            <ActionCard title="质押挖矿" description="质押您的代币以赚取更多奖励" icon={<Icon icon="mdi:safe" />}>
              <Button variant="outline" fullWidth>
                开始质押
              </Button>
            </ActionCard>
          </div>
        </div>

        <div className="section-container">
          <h2 className="section-title">实时活动</h2>
          <div className="activity-log">
            <div className="activity-item">
              <div className="activity-time">3分钟前</div>
              <div className="activity-content">
                <div className="activity-icon swap">
                  <Icon icon="mdi:swap-horizontal" />
                </div>
                <div className="activity-details">
                  <div className="activity-title">兑换完成</div>
                  <div className="activity-description">0.5 ETH → 912 USDT</div>
                </div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-time">25分钟前</div>
              <div className="activity-content">
                <div className="activity-icon add">
                  <Icon icon="mdi:plus" />
                </div>
                <div className="activity-details">
                  <div className="activity-title">添加流动性</div>
                  <div className="activity-description">ETH/USDT 池 - 添加 0.2 ETH 和 365 USDT</div>
                </div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-time">2小时前</div>
              <div className="activity-content">
                <div className="activity-icon reward">
                  <Icon icon="mdi:gift" />
                </div>
                <div className="activity-details">
                  <div className="activity-title">领取收益</div>
                  <div className="activity-description">从 ETH/USDT 池中领取 15 XYZ 代币</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-outlet">
          <Outlet />
        </div>
      </StyleWrapper>
    </PageLayout>
  )
}

const StyleWrapper = styled.div`
  .metrics-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 32px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .section-container {
    margin-bottom: 32px;
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: #ffffff;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, #6c5ce7, #00cec9);
      border-radius: 2px;
    }
  }

  .market-table {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
  }

  .market-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-weight: 600;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .market-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background-color 0.3s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }

    &:last-child {
      border-bottom: none;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 8px;
    }
  }

  .market-cell {
    display: flex;
    align-items: center;

    &.price {
      font-weight: 600;
    }

    &.positive {
      color: #00b894;
    }

    &.negative {
      color: #ff7675;
    }

    &.actions {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }
    }
  }

  .actions-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .activity-log {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 16px;
  }

  .activity-item {
    display: flex;
    padding: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    &:last-child {
      border-bottom: none;
    }
  }

  .activity-time {
    width: 80px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.85rem;

    @media (max-width: 768px) {
      width: 60px;
      font-size: 0.75rem;
    }
  }

  .activity-content {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .activity-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;

    &.swap {
      background: rgba(108, 92, 231, 0.2);
      color: #6c5ce7;
    }

    &.add {
      background: rgba(0, 206, 201, 0.2);
      color: #00cec9;
    }

    &.reward {
      background: rgba(253, 203, 110, 0.2);
      color: #fdcb6e;
    }
  }

  .activity-details {
    flex: 1;
  }

  .activity-title {
    font-weight: 600;
    margin-bottom: 4px;
  }

  .activity-description {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }
`

export default Defi
