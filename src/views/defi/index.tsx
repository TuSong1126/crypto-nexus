import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import ActionCard from '@/components/common/ActionCard'
import Button from '@/components/common/Button'
import PageLayout from '@/components/common/PageLayout'

const Defi = () => {
  // 示例市场数据
  const marketData = [
    { id: 1, name: 'ETH/USDT', price: '$1,832.45', change: '+3.2%', volume: '$2.4B' },
    { id: 2, name: 'BTC/USDT', price: '$28,459.12', change: '+1.8%', volume: '$5.1B' },
    { id: 3, name: 'XRP/USDT', price: '$0.62', change: '-0.5%', volume: '$845M' }
  ]

  const [animateMetrics, setAnimateMetrics] = useState(false)

  // 用于初始加载动画
  useEffect(() => {
    setAnimateMetrics(true)
  }, [])

  return (
    <PageLayout title="DeFi 金融中心" subtitle="去中心化金融，提供流动性和代币交换">
      <StyleWrapper>
        <div className={`metrics-row ${animateMetrics ? 'animate-in' : ''}`}>
          <div className="metrics-card holographic" data-delay="0">
            <div className="metrics-glow"></div>
            <div className="metrics-content">
              <div className="metrics-icon">
                <Icon icon="mdi:wallet-outline" />
                <div className="pulse-effect"></div>
              </div>
              <div className="metrics-data">
                <div className="metrics-title">总资产</div>
                <div className="metrics-value ticker">$2,453</div>
                <div className="metrics-trend positive">
                  <Icon icon="mdi:arrow-up" />
                  <span>5.2%</span>
                </div>
              </div>
              <div className="metrics-graph">
                <div className="bar-chart">
                  <div className="bar" style={{ height: '60%' }}></div>
                  <div className="bar" style={{ height: '80%' }}></div>
                  <div className="bar" style={{ height: '40%' }}></div>
                  <div className="bar" style={{ height: '70%' }}></div>
                  <div className="bar active" style={{ height: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="metrics-card neo" data-delay="200">
            <div className="metrics-glow"></div>
            <div className="metrics-content">
              <div className="metrics-icon">
                <Icon icon="mdi:cash-plus" />
                <div className="pulse-effect"></div>
              </div>
              <div className="metrics-data">
                <div className="metrics-title">日收益</div>
                <div className="metrics-value ticker">$182</div>
                <div className="metrics-trend positive">
                  <Icon icon="mdi:arrow-up" />
                  <span>12.5%</span>
                </div>
              </div>
              <div className="metrics-graph">
                <div className="line-wave"></div>
              </div>
            </div>
          </div>

          <div className="metrics-card cyber" data-delay="400">
            <div className="metrics-glow"></div>
            <div className="metrics-content">
              <div className="metrics-icon">
                <Icon icon="mdi:chart-line" />
                <div className="pulse-effect"></div>
              </div>
              <div className="metrics-data">
                <div className="metrics-title">平均APY</div>
                <div className="metrics-value ticker">8.4%</div>
                <div className="metrics-trend positive">
                  <Icon icon="mdi:arrow-up" />
                  <span>0.6%</span>
                </div>
              </div>
              <div className="metrics-graph">
                <div className="radial-progress">
                  <svg viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" className="circle-bg" />
                    <circle cx="18" cy="18" r="16" fill="none" className="circle-progress" />
                  </svg>
                  <div className="percentage">84%</div>
                </div>
              </div>
            </div>
          </div>
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
                <div
                  className={`market-cell change ${
                    item.change.startsWith('+') ? 'positive' : 'negative'
                  }`}
                >
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
            <ActionCard
              title="质押挖矿"
              description="质押您的代币以赚取更多奖励"
              icon={<Icon icon="mdi:safe" />}
            >
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
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.5s ease-out,
      transform 0.5s ease-out;

    &.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .metrics-card {
    position: relative;
    background: rgba(18, 24, 38, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 20px;
    height: 180px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    transform-style: preserve-3d;
    perspective: 1000px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeSlideUp 0.6s forwards;

    &:hover {
      transform: translateY(-5px) rotateX(5deg);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);

      .metrics-glow {
        opacity: 0.8;
      }
    }

    &[data-delay='0'] {
      animation-delay: 0s;
    }
    &[data-delay='200'] {
      animation-delay: 0.2s;
    }
    &[data-delay='400'] {
      animation-delay: 0.4s;
    }

    &.holographic {
      background: linear-gradient(135deg, rgba(18, 24, 38, 0.8), rgba(25, 32, 55, 0.8));
      border: 1px solid rgba(83, 92, 136, 0.3);

      .metrics-glow {
        background: radial-gradient(
          circle at 50% 0%,
          rgba(108, 92, 231, 0.5),
          rgba(0, 206, 201, 0.1)
        );
      }
    }

    &.neo {
      background: linear-gradient(135deg, rgba(23, 32, 50, 0.8), rgba(16, 24, 40, 0.8));
      border: 1px solid rgba(0, 206, 201, 0.3);

      .metrics-glow {
        background: radial-gradient(circle at 50% 50%, rgba(0, 206, 201, 0.5), transparent);
      }
    }

    &.cyber {
      background: linear-gradient(135deg, rgba(25, 30, 45, 0.8), rgba(20, 20, 35, 0.8));
      border: 1px solid rgba(253, 203, 110, 0.3);

      .metrics-glow {
        background: radial-gradient(circle at 70% 30%, rgba(253, 203, 110, 0.5), transparent);
      }
    }
  }

  .metrics-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.3;
    transition: opacity 0.5s ease;
    filter: blur(20px);
    pointer-events: none;
  }

  .metrics-content {
    position: relative;
    z-index: 2;
    display: flex;
    height: 100%;
  }

  .metrics-icon {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    margin-right: 16px;
    backdrop-filter: blur(5px);

    .pulse-effect {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.1);
      animation: pulse 2s infinite;
    }
  }

  .metrics-data {
    flex: 1;
  }

  .metrics-title {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 8px;
  }

  .metrics-value {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 4px;

    &.ticker {
      background: linear-gradient(90deg, #fff, #6c5ce7, #fff);
      background-size: 200% auto;
      color: #000;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shine 3s linear infinite;
    }
  }

  .metrics-trend {
    display: flex;
    align-items: center;
    font-size: 14px;

    &.positive {
      color: #00b894;
    }

    &.negative {
      color: #ff7675;
    }

    svg {
      margin-right: 4px;
      font-size: 16px;
    }
  }

  .metrics-graph {
    width: 80px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .bar-chart {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    .bar {
      width: 4px;
      background: rgba(108, 92, 231, 0.5);
      border-radius: 2px;
      position: relative;
      transform-origin: bottom;
      animation: barGrow 1.5s ease-out forwards;
      animation-fill-mode: both;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 2px;
      }

      &.active {
        background: #6c5ce7;
      }
    }
  }

  .line-wave {
    width: 100%;
    height: 60px;
    background: linear-gradient(
      transparent,
      transparent 50%,
      rgba(0, 206, 201, 0.2) 50%,
      transparent
    );
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 200%;
      height: 2px;
      background: #00cec9;
      animation: wave 3s linear infinite;
    }
  }

  .radial-progress {
    width: 60px;
    height: 60px;
    position: relative;

    svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);

      .circle-bg {
        stroke: rgba(255, 255, 255, 0.1);
        stroke-width: 2;
      }

      .circle-progress {
        stroke: #fdcb6e;
        stroke-width: 2.5;
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        animation: circleProgress 2s ease-out forwards;
      }
    }

    .percentage {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 12px;
      font-weight: 600;
    }
  }

  @keyframes fadeSlideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.3;
    }
    100% {
      transform: scale(1);
      opacity: 0.7;
    }
  }

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }

  @keyframes barGrow {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }

  @keyframes wave {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  @keyframes circleProgress {
    to {
      stroke-dashoffset: 16; /* 100 - 84 = 16 (84%) */
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

  .icon-particles {
    position: absolute;
    width: 100%;
    height: 100%;

    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #6c5ce7;
      opacity: 0.8;
      animation: particleFloat 3s infinite linear;

      &:nth-child(1) {
        top: 20%;
        left: 30%;
        animation-delay: 0s;
        animation-duration: 2.5s;
      }

      &:nth-child(2) {
        top: 60%;
        left: 20%;
        animation-delay: 0.3s;
        animation-duration: 3.2s;
      }

      &:nth-child(3) {
        top: 40%;
        left: 70%;
        animation-delay: 0.7s;
        animation-duration: 2.8s;
      }

      &:nth-child(4) {
        top: 70%;
        left: 60%;
        animation-delay: 1s;
        animation-duration: 3s;
      }

      &:nth-child(5) {
        top: 30%;
        left: 50%;
        animation-delay: 1.5s;
        animation-duration: 2.7s;
      }
    }
  }

  .liquidity-bubbles {
    position: absolute;
    width: 100%;
    height: 100%;

    .bubble {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(0, 206, 201, 0.8);
      animation: bubbleRise 4s infinite ease-out;
      opacity: 0.8;

      @for $i from 1 through 8 {
        &:nth-child(#{$i}) {
          left: percentage(math.random());
          bottom: percentage(math.random() * 0.5);
          width: #{math.random() * 6 + 2}px;
          height: #{math.random() * 6 + 2}px;
          animation-delay: #{math.random() * 2}s;
          animation-duration: #{math.random() * 2 + 3}s;
        }
      }
    }
  }

  .staking-glow {
    position: absolute;
    width: 140%;
    height: 140%;
    top: -20%;
    left: -20%;
    background: radial-gradient(circle, rgba(253, 203, 110, 0.4), transparent 50%);
    animation: pulse 2s infinite alternate;
  }

  .action-card {
    position: relative;
    background: rgba(18, 24, 38, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 20px;
    height: 100%;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    display: flex;
    flex-direction: column;
    min-height: 300px;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);

      .card-glow {
        opacity: 0.7;
      }

      .corner-decoration {
        opacity: 1;
      }
    }

    &.primary {
      border-color: rgba(108, 92, 231, 0.3);

      .card-glow {
        background: radial-gradient(circle at 30% 30%, rgba(108, 92, 231, 0.4), transparent 70%);
      }

      .card-icon {
        background: rgba(108, 92, 231, 0.2);
        color: #6c5ce7;
      }

      .corner-decoration {
        background: linear-gradient(135deg, #6c5ce7, transparent);
      }
    }

    &.secondary {
      border-color: rgba(0, 206, 201, 0.3);

      .card-glow {
        background: radial-gradient(circle at 30% 30%, rgba(0, 206, 201, 0.4), transparent 70%);
      }

      .card-icon {
        background: rgba(0, 206, 201, 0.2);
        color: #00cec9;
      }

      .corner-decoration {
        background: linear-gradient(135deg, #00cec9, transparent);
      }
    }

    &.neutral {
      border-color: rgba(253, 203, 110, 0.3);

      .card-glow {
        background: radial-gradient(circle at 30% 30%, rgba(253, 203, 110, 0.4), transparent 70%);
      }

      .card-icon {
        background: rgba(253, 203, 110, 0.2);
        color: #fdcb6e;
      }

      .corner-decoration {
        background: linear-gradient(135deg, #fdcb6e, transparent);
      }
    }
  }
`

export default Defi
