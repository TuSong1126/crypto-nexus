import './index.scss'

import { Icon } from '@iconify/react'
import { Col, Progress, Row, Statistic } from 'antd'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Web3Card from '@/components/web3/Web3Card'

const GradientTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 28px;
  background: linear-gradient(45deg, #6c5ce7, #00cec9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #6c5ce7, #00cec9);
    border-radius: 2px;
  }
`

const StatsRow = styled(Row)`
  margin-bottom: 28px;
`

const TokenChart = styled.div`
  width: 100%;
  height: 240px;
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
      filter: drop-shadow(0 0 8px rgba(108, 92, 231, 0.6));
    }
  }
`

const TokenTransaction = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  border-radius: 8px;
  padding: 16px;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(5px);
  }

  &:last-child {
    border-bottom: none;
  }

  .transaction-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(108, 92, 231, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    color: #6c5ce7;
    border: 1px solid rgba(108, 92, 231, 0.3);
    box-shadow: 0 0 10px rgba(108, 92, 231, 0.2);
  }

  .transaction-details {
    flex: 1;

    .transaction-title {
      font-weight: 600;
      margin-bottom: 4px;
      font-size: 16px;
    }

    .transaction-subtitle {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .transaction-amount {
    font-weight: 600;
    font-size: 16px;

    &.positive {
      color: #00b894;
      text-shadow: 0 0 10px rgba(0, 184, 148, 0.5);
    }

    &.negative {
      color: #ff7675;
      text-shadow: 0 0 10px rgba(255, 118, 117, 0.5);
    }
  }
`

const Web3Project = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(108, 92, 231, 0.05), rgba(0, 206, 201, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border-color: rgba(108, 92, 231, 0.3);

    &::before {
      opacity: 1;
    }
  }

  .project-header {
    display: flex;
    align-items: center;
    margin-bottom: 18px;

    .project-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .project-title {
      font-weight: 700;
      margin-bottom: 4px;
      font-size: 18px;
    }

    .project-category {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.5);
      display: flex;
      align-items: center;

      svg {
        margin-right: 4px;
        font-size: 14px;
      }
    }
  }

  .project-stats {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;

    .stat {
      text-align: center;
      background: rgba(0, 0, 0, 0.2);
      padding: 10px;
      border-radius: 8px;
      min-width: 80px;

      .stat-value {
        font-weight: 700;
        margin-bottom: 4px;
        font-size: 16px;
        background: linear-gradient(45deg, #fff, #ddd);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .stat-label {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
`

const StatsCard = styled(motion.div)`
  .ant-statistic-title {
    color: rgba(255, 255, 255, 0.7) !important;
    font-size: 14px !important;
    margin-bottom: 8px !important;
  }

  .ant-statistic-content-value {
    font-weight: 700 !important;
    font-size: 22px !important;
  }

  .ant-statistic-content-suffix {
    font-size: 14px !important;
    margin-left: 4px !important;
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
      <motion.div
        className="floating-orb home-orb-1"
        animate={{
          y: ['-15%', '15%'],
          x: ['-5%', '5%']
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="floating-orb home-orb-2"
        animate={{
          y: ['10%', '-10%'],
          x: ['5%', '-5%']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />

      <motion.div variants={itemVariants}>
        <GradientTitle>区块链资产控制面板</GradientTitle>
      </motion.div>

      <StatsRow gutter={24}>
        <Col span={6}>
          <motion.div variants={itemVariants}>
            <Web3Card
              hover={true}
              title="ETH 余额"
              icon={<Icon icon="cryptocurrency:eth" />}
              glow={true}
              variant="glass"
            >
              <StatsCard>
                <Statistic
                  value={walletBalance}
                  precision={2}
                  suffix="ETH"
                  valueStyle={{ color: '#6c5ce7', fontWeight: 600 }}
                />
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 14,
                    color: 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Icon icon="ph:currency-dollar" style={{ marginRight: '4px' }} />${(walletBalance * 1820).toFixed(2)}
                </p>
              </StatsCard>
            </Web3Card>
          </motion.div>
        </Col>
        <Col span={6}>
          <motion.div variants={itemVariants}>
            <Web3Card hover={true} title="NFT 收藏" icon={<Icon icon="noto:framed-picture" />} variant="glass">
              <StatsCard>
                <Statistic value={12} suffix="个" valueStyle={{ color: '#00cec9', fontWeight: 600 }} />
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 14,
                    color: 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Icon icon="ph:trend-up" style={{ marginRight: '4px', color: '#00b894' }} />
                  地板价: 0.8 ETH
                </p>
              </StatsCard>
            </Web3Card>
          </motion.div>
        </Col>
        <Col span={6}>
          <motion.div variants={itemVariants}>
            <Web3Card hover={true} title="DeFi 收益" icon={<Icon icon="carbon:chart-line-smooth" />} variant="glass">
              <StatsCard>
                <Statistic value={8.5} precision={1} suffix="%" valueStyle={{ color: '#00b894', fontWeight: 600 }} />
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 14,
                    color: 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Icon icon="ph:arrow-up-right" style={{ marginRight: '4px', color: '#00b894' }} />
                  较昨日 +0.3%
                </p>
              </StatsCard>
            </Web3Card>
          </motion.div>
        </Col>
        <Col span={6}>
          <motion.div variants={itemVariants}>
            <Web3Card hover={true} title="Gas 费" icon={<Icon icon="mdi:gas-station" />} variant="glass">
              <StatsCard>
                <Statistic value={25} suffix="Gwei" valueStyle={{ color: '#fdcb6e', fontWeight: 600 }} />
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 14,
                    color: 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Icon icon="ph:clock" style={{ marginRight: '4px' }} />
                  平均确认时间: 12s
                </p>
              </StatsCard>
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
              hover={true}
            >
              <TokenChart>
                <div className="chart-placeholder">
                  <Icon icon="mdi:chart-areaspline" width={60} height={60} color="#6c5ce7" />
                  <p>图表数据加载中...</p>
                </div>
              </TokenChart>

              <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={6}>
                  <div
                    style={{
                      textAlign: 'center',
                      background: 'rgba(162, 155, 254, 0.1)',
                      padding: '16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(162, 155, 254, 0.2)'
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}
                    >
                      <Icon icon="cryptocurrency:eth" style={{ marginRight: '8px' }} />
                      <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>以太坊</p>
                    </div>
                    <p style={{ fontSize: 18, fontWeight: 700, color: '#a29bfe', margin: '8px 0' }}>$1,820</p>
                    <span
                      style={{
                        fontSize: 12,
                        color: '#00b894',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon icon="ph:trend-up" style={{ marginRight: '4px' }} />
                      +2.4%
                    </span>
                  </div>
                </Col>
                <Col span={6}>
                  <div
                    style={{
                      textAlign: 'center',
                      background: 'rgba(253, 203, 110, 0.1)',
                      padding: '16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(253, 203, 110, 0.2)'
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}
                    >
                      <Icon icon="cryptocurrency:btc" style={{ marginRight: '8px' }} />
                      <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>比特币</p>
                    </div>
                    <p style={{ fontSize: 18, fontWeight: 700, color: '#fdcb6e', margin: '8px 0' }}>$28,450</p>
                    <span
                      style={{
                        fontSize: 12,
                        color: '#ff7675',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon icon="ph:trend-down" style={{ marginRight: '4px' }} />
                      -1.2%
                    </span>
                  </div>
                </Col>
                <Col span={6}>
                  <div
                    style={{
                      textAlign: 'center',
                      background: 'rgba(129, 236, 236, 0.1)',
                      padding: '16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(129, 236, 236, 0.2)'
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}
                    >
                      <Icon icon="cryptocurrency:sol" style={{ marginRight: '8px' }} />
                      <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>Solana</p>
                    </div>
                    <p style={{ fontSize: 18, fontWeight: 700, color: '#81ecec', margin: '8px 0' }}>$20.75</p>
                    <span
                      style={{
                        fontSize: 12,
                        color: '#00b894',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon icon="ph:trend-up" style={{ marginRight: '4px' }} />
                      +5.7%
                    </span>
                  </div>
                </Col>
                <Col span={6}>
                  <div
                    style={{
                      textAlign: 'center',
                      background: 'rgba(255, 121, 198, 0.1)',
                      padding: '16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 121, 198, 0.2)'
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}
                    >
                      <Icon icon="cryptocurrency:matic" style={{ marginRight: '8px' }} />
                      <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>Polygon</p>
                    </div>
                    <p style={{ fontSize: 18, fontWeight: 700, color: '#ff79c6', margin: '8px 0' }}>$0.65</p>
                    <span
                      style={{
                        fontSize: 12,
                        color: '#00b894',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon icon="ph:trend-up" style={{ marginRight: '4px' }} />
                      +3.1%
                    </span>
                  </div>
                </Col>
              </Row>
            </Web3Card>
          </motion.div>

          <motion.div variants={itemVariants} style={{ marginTop: 24 }}>
            <Web3Card title="热门项目" variant="glass" icon={<Icon icon="ph:star-fill" />} hover={true}>
              {mockProjects.map((project) => (
                <Web3Project key={project.id} whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}>
                  <div className="project-header">
                    <div className="project-icon" style={{ background: project.iconBg }}>
                      <Icon icon={project.icon} color="#fff" width={28} height={28} />
                    </div>
                    <div>
                      <div className="project-title">{project.title}</div>
                      <div className="project-category">
                        <Icon icon="ph:tag" />
                        {project.category}
                      </div>
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
                    strokeWidth={8}
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
            <Web3Card title="质押资产" variant="gradient" icon={<Icon icon="mdi:safe" />} hover={true} glow={true}>
              <motion.div
                style={{ padding: '20px 0' }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>总质押价值</span>}
                  value={12580}
                  precision={2}
                  prefix="$"
                  valueStyle={{ color: '#fff', fontWeight: 700, fontSize: '28px' }}
                />
              </motion.div>

              <div style={{ marginBottom: 20 }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon icon="cryptocurrency:eth" style={{ marginRight: '8px' }} />
                    <span>ETH 2.0 质押</span>
                  </div>
                  <span style={{ fontWeight: 600 }}>1.2 ETH</span>
                </div>
                <Progress
                  percent={65}
                  strokeColor="#a29bfe"
                  trailColor="rgba(255, 255, 255, 0.2)"
                  showInfo={false}
                  strokeWidth={8}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon icon="simple-icons:uniswap" style={{ marginRight: '8px' }} />
                    <span>Uniswap LP</span>
                  </div>
                  <span style={{ fontWeight: 600 }}>$4,320</span>
                </div>
                <Progress
                  percent={42}
                  strokeColor="#fd79a8"
                  trailColor="rgba(255, 255, 255, 0.2)"
                  showInfo={false}
                  strokeWidth={8}
                />
              </div>

              <div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon icon="simple-icons:aave" style={{ marginRight: '8px' }} />
                    <span>AAVE 借贷</span>
                  </div>
                  <span style={{ fontWeight: 600 }}>$2,150</span>
                </div>
                <Progress
                  percent={28}
                  strokeColor="#00cec9"
                  trailColor="rgba(255, 255, 255, 0.2)"
                  showInfo={false}
                  strokeWidth={8}
                />
              </div>
            </Web3Card>
          </motion.div>

          <motion.div variants={itemVariants} style={{ marginTop: 24 }}>
            <Web3Card title="最近交易" variant="glass" icon={<Icon icon="mdi:swap-horizontal" />} hover={true}>
              {mockTransactions.map((tx) => (
                <TokenTransaction key={tx.id}>
                  <div className="transaction-icon">
                    <Icon icon={tx.icon} width={24} height={24} />
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
                  marginTop: 20,
                  padding: '12px',
                  background: 'rgba(108, 92, 231, 0.15)',
                  border: '1px solid rgba(108, 92, 231, 0.3)',
                  borderRadius: '8px',
                  color: '#6c5ce7',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                whileHover={{ background: 'rgba(108, 92, 231, 0.25)', boxShadow: '0 5px 15px rgba(108, 92, 231, 0.2)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon icon="ph:arrow-right" style={{ marginRight: '8px' }} />
                查看全部交易
              </motion.button>
            </Web3Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  )
}
