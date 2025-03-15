import { Icon } from '@iconify/react'
import { Col, Progress, Row, Statistic } from 'antd'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Web3Card from '@/components/web3/Web3Card'

const GradientTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  background: linear-gradient(45deg, #6c5ce7, #00cec9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
`

const StatsRow = styled(Row)`
  margin-bottom: 24px;
`

const TokenChart = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .chart-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    svg {
      margin-bottom: 16px;
    }
  }
`

const TokenTransaction = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }

  .transaction-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(108, 92, 231, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    color: #6c5ce7;
  }

  .transaction-details {
    flex: 1;

    .transaction-title {
      font-weight: 500;
      margin-bottom: 4px;
    }

    .transaction-subtitle {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .transaction-amount {
    font-weight: 600;

    &.positive {
      color: #00b894;
    }

    &.negative {
      color: #ff7675;
    }
  }
`

const Web3Project = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;

  .project-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    .project-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
    }

    .project-title {
      font-weight: 600;
      margin-bottom: 4px;
    }

    .project-category {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .project-stats {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;

    .stat {
      text-align: center;

      .stat-value {
        font-weight: 600;
        margin-bottom: 4px;
      }

      .stat-label {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
`

const mockTransactions = [
  {
    id: 1,
    title: 'ETH 转账',
    subtitle: '0x1a2...3b4c → 0x5d6...7e8f',
    amount: '+0.5 ETH',
    type: 'positive',
    icon: 'cryptocurrency:eth'
  },
  {
    id: 2,
    title: 'NFT 购买',
    subtitle: 'CryptoPunk #1234',
    amount: '-2.4 ETH',
    type: 'negative',
    icon: 'noto:framed-picture'
  },
  {
    id: 3,
    title: 'USDT 收款',
    subtitle: '0xabc...def0',
    amount: '+1250 USDT',
    type: 'positive',
    icon: 'cryptocurrency:usdt'
  }
]

const mockProjects = [
  {
    id: 1,
    title: 'DeFi Kingdom',
    category: '游戏金融',
    icon: 'game-icons:crown-coin',
    iconBg: '#6c5ce7',
    tvl: '$1.2B',
    users: '45.2K',
    apy: '12.5%'
  },
  {
    id: 2,
    title: 'OpenSea',
    category: 'NFT 市场',
    icon: 'arcticons:opensea',
    iconBg: '#00cec9',
    tvl: '$8.5B',
    users: '2.3M',
    apy: '—'
  },
  {
    id: 3,
    title: 'Uniswap',
    category: '去中心化交易所',
    icon: 'simple-icons:uniswap',
    iconBg: '#fd79a8',
    tvl: '$5.7B',
    users: '3.1M',
    apy: '8.2%'
  }
]

export default function Home() {
  const [walletBalance, setWalletBalance] = useState(0)

  useEffect(() => {
    // 模拟余额增长动画
    const timer = setInterval(() => {
      setWalletBalance((prev) => {
        if (prev < 3.65) {
          return prev + 0.01
        }
        clearInterval(timer)
        return 3.65
      })
    }, 20)

    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="web3-home-container">
      <motion.div variants={itemVariants}>
        <GradientTitle>Web3 控制面板</GradientTitle>
      </motion.div>

      <StatsRow gutter={24}>
        <Col span={6}>
          <motion.div variants={itemVariants}>
            <Web3Card hover={true} title="ETH 余额" icon={<Icon icon="cryptocurrency:eth" />}>
              <Statistic
                value={walletBalance}
                precision={2}
                suffix="ETH"
                valueStyle={{ color: '#6c5ce7', fontWeight: 600 }}
              />
              <p style={{ marginTop: 8, fontSize: 14, color: 'rgba(255, 255, 255, 0.5)' }}>
                ≈ ${(walletBalance * 1820).toFixed(2)}
              </p>
            </Web3Card>
          </motion.div>
        </Col>
        <Col span={6}>
          <motion.div variants={itemVariants}>
            <Web3Card hover={true} title="NFT 收藏" icon={<Icon icon="noto:framed-picture" />}>
              <Statistic value={12} suffix="个" valueStyle={{ color: '#00cec9', fontWeight: 600 }} />
              <p style={{ marginTop: 8, fontSize: 14, color: 'rgba(255, 255, 255, 0.5)' }}>地板价: 0.8 ETH</p>
            </Web3Card>
          </motion.div>
        </Col>
        <Col span={6}>
          <motion.div variants={itemVariants}>
            <Web3Card hover={true} title="DeFi 收益" icon={<Icon icon="carbon:chart-line-smooth" />}>
              <Statistic value={8.5} precision={1} suffix="%" valueStyle={{ color: '#00b894', fontWeight: 600 }} />
              <p style={{ marginTop: 8, fontSize: 14, color: 'rgba(255, 255, 255, 0.5)' }}>较昨日 +0.3%</p>
            </Web3Card>
          </motion.div>
        </Col>
        <Col span={6}>
          <motion.div variants={itemVariants}>
            <Web3Card hover={true} title="Gas 费" icon={<Icon icon="mdi:gas-station" />}>
              <Statistic value={25} suffix="Gwei" valueStyle={{ color: '#fdcb6e', fontWeight: 600 }} />
              <p style={{ marginTop: 8, fontSize: 14, color: 'rgba(255, 255, 255, 0.5)' }}>平均确认时间: 12s</p>
            </Web3Card>
          </motion.div>
        </Col>
      </StatsRow>

      <Row gutter={24}>
        <Col span={16}>
          <motion.div variants={itemVariants}>
            <Web3Card
              title="市场趋势"
              subtitle="过去7天数据"
              variant="glass"
              icon={<Icon icon="mdi:chart-timeline-variant" />}
            >
              <TokenChart>
                <div className="chart-placeholder">
                  <Icon icon="mdi:chart-areaspline" width={48} height={48} color="#6c5ce7" />
                  <p>图表数据加载中...</p>
                </div>
              </TokenChart>

              <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={6}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.5)', marginBottom: 4 }}>以太坊</p>
                    <p style={{ fontSize: 16, fontWeight: 600, color: '#a29bfe' }}>$1,820</p>
                    <span style={{ fontSize: 12, color: '#00b894' }}>+2.4%</span>
                  </div>
                </Col>
                <Col span={6}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.5)', marginBottom: 4 }}>比特币</p>
                    <p style={{ fontSize: 16, fontWeight: 600, color: '#fdcb6e' }}>$28,450</p>
                    <span style={{ fontSize: 12, color: '#ff7675' }}>-1.2%</span>
                  </div>
                </Col>
                <Col span={6}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.5)', marginBottom: 4 }}>Solana</p>
                    <p style={{ fontSize: 16, fontWeight: 600, color: '#81ecec' }}>$20.75</p>
                    <span style={{ fontSize: 12, color: '#00b894' }}>+5.7%</span>
                  </div>
                </Col>
                <Col span={6}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.5)', marginBottom: 4 }}>Polygon</p>
                    <p style={{ fontSize: 16, fontWeight: 600, color: '#ff79c6' }}>$0.65</p>
                    <span style={{ fontSize: 12, color: '#00b894' }}>+3.1%</span>
                  </div>
                </Col>
              </Row>
            </Web3Card>
          </motion.div>

          <motion.div variants={itemVariants} style={{ marginTop: 24 }}>
            <Web3Card title="热门项目" variant="default" icon={<Icon icon="ph:star-fill" />}>
              {mockProjects.map((project) => (
                <Web3Project key={project.id} whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}>
                  <div className="project-header">
                    <div className="project-icon" style={{ background: project.iconBg }}>
                      <Icon icon={project.icon} color="#fff" width={24} height={24} />
                    </div>
                    <div>
                      <div className="project-title">{project.title}</div>
                      <div className="project-category">{project.category}</div>
                    </div>
                  </div>

                  <Progress
                    percent={75}
                    showInfo={false}
                    strokeColor={{
                      '0%': '#6c5ce7',
                      '100%': '#00cec9'
                    }}
                    trailColor="rgba(255, 255, 255, 0.1)"
                    style={{ marginTop: 8 }}
                  />

                  <div className="project-stats">
                    <div className="stat">
                      <div className="stat-value">{project.tvl}</div>
                      <div className="stat-label">TVL</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">{project.users}</div>
                      <div className="stat-label">用户</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">{project.apy}</div>
                      <div className="stat-label">收益率</div>
                    </div>
                  </div>
                </Web3Project>
              ))}
            </Web3Card>
          </motion.div>
        </Col>

        <Col span={8}>
          <motion.div variants={itemVariants}>
            <Web3Card title="质押资产" variant="gradient" icon={<Icon icon="mdi:safe" />}>
              <div style={{ padding: '20px 0' }}>
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>总质押价值</span>}
                  value={12580}
                  precision={2}
                  prefix="$"
                  valueStyle={{ color: '#fff', fontWeight: 700 }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>ETH 2.0 质押</span>
                  <span>1.2 ETH</span>
                </div>
                <Progress percent={65} strokeColor="#a29bfe" trailColor="rgba(255, 255, 255, 0.2)" />
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>Uniswap LP</span>
                  <span>$4,320</span>
                </div>
                <Progress percent={42} strokeColor="#fd79a8" trailColor="rgba(255, 255, 255, 0.2)" />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>AAVE 借贷</span>
                  <span>$2,150</span>
                </div>
                <Progress percent={28} strokeColor="#00cec9" trailColor="rgba(255, 255, 255, 0.2)" />
              </div>
            </Web3Card>
          </motion.div>

          <motion.div variants={itemVariants} style={{ marginTop: 24 }}>
            <Web3Card title="最近交易" variant="outline" icon={<Icon icon="mdi:swap-horizontal" />}>
              {mockTransactions.map((tx) => (
                <TokenTransaction key={tx.id}>
                  <div className="transaction-icon">
                    <Icon icon={tx.icon} width={20} height={20} />
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-title">{tx.title}</div>
                    <div className="transaction-subtitle">{tx.subtitle}</div>
                  </div>
                  <div className={`transaction-amount ${tx.type}`}>{tx.amount}</div>
                </TokenTransaction>
              ))}

              <motion.button
                style={{
                  width: '100%',
                  marginTop: 16,
                  padding: '10px',
                  background: 'rgba(108, 92, 231, 0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#6c5ce7',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
                whileHover={{ background: 'rgba(108, 92, 231, 0.2)' }}
                whileTap={{ scale: 0.98 }}
              >
                查看全部交易
              </motion.button>
            </Web3Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  )
}
