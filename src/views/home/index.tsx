import './index.scss'

import { Icon } from '@iconify/react'
import { Col, Row, Typography } from 'antd'
import { motion, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'

import Button from '@/components/common/Button'
import PageLayout from '@/components/common/PageLayout'
import StatsCard from '@/components/common/StatsCard'
import ParticleBackground from '@/components/web3/ParticleBackground'

const { Title, Paragraph } = Typography

export default function Home() {
  const [walletBalance, setWalletBalance] = useState(0)
  const [cryptoPrice, setCryptoPrice] = useState({
    btc: 42350.75,
    eth: 2275.5,
    sol: 112.25
  })

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

    // 模拟价格波动
    const priceTimer = setInterval(() => {
      setCryptoPrice((prev) => ({
        btc: prev.btc + (Math.random() - 0.5) * 20,
        eth: prev.eth + (Math.random() - 0.5) * 5,
        sol: prev.sol + (Math.random() - 0.5) * 2
      }))
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(priceTimer)
    }
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  }

  // 对于自定义索引的动画，我们需要单独处理
  const featureVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
        delay: index * 0.1 + 0.2
      }
    }),
    hover: {
      y: -10,
      boxShadow: '0 10px 25px rgba(108, 92, 231, 0.4)',
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  }

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
        delay: index * 0.15 + 0.3
      }
    }),
    hover: {
      y: -5,
      boxShadow: '0 10px 30px rgba(108, 92, 231, 0.3)',
      borderColor: 'rgba(108, 92, 231, 0.5)',
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  }

  // Web3生态系统数据
  const web3Ecosystem = [
    {
      title: 'DeFi',
      icon: 'mdi:bank-outline',
      description: '去中心化金融平台，释放价值交换的全新可能',
      stats: '锁仓总值: $45.2B',
      color: '#6c5ce7'
    },
    {
      title: 'NFT',
      icon: 'mdi:palette-outline',
      description: '数字艺术与收藏品，重新定义所有权和创作价值',
      stats: '交易量: $2.5M/天',
      color: '#00cec9'
    },
    {
      title: 'DAO',
      icon: 'mdi:account-group-outline',
      description: '去中心化自治组织，社区驱动的决策与治理方式',
      stats: '活跃成员: 240万+',
      color: '#fd79a8'
    },
    {
      title: '元宇宙',
      icon: 'mdi:virtual-reality',
      description: '虚拟世界与现实交融的数字生活空间',
      stats: '用户增长: 187%/年',
      color: '#0984e3'
    }
  ]

  // 最新Web3技术趋势
  const web3Trends = [
    {
      title: 'Layer 2扩展方案',
      icon: 'mdi:layers-outline',
      description: '提升区块链性能与可扩展性的创新技术方案',
      topics: ['零知识证明', 'Rollups', '状态通道']
    },
    {
      title: '跨链技术',
      icon: 'mdi:vector-link',
      description: '连接不同区块链生态系统，实现资产与数据无缝流动',
      topics: ['跨链桥', '原子交换', '互操作性协议']
    },
    {
      title: '去中心化身份',
      icon: 'mdi:account-key-outline',
      description: '用户自主掌控个人数据的身份验证与隐私保护方案',
      topics: ['DID', '零知识证明', 'Soul Bound Token']
    }
  ]

  // 核心区块链项目
  const blockchainProjects = [
    {
      title: 'Ethereum',
      icon: 'cryptocurrency:eth',
      description: '智能合约平台的先驱，构建去中心化应用的基础设施',
      color: '#627eea'
    },
    {
      title: 'Solana',
      icon: 'cryptocurrency:sol',
      description: '高性能区块链，提供极速交易与低成本解决方案',
      color: '#14f195'
    },
    {
      title: 'Polkadot',
      icon: 'cryptocurrency:dot',
      description: '异构多链网络，实现跨链互操作性的新一代区块链',
      color: '#e6007a'
    },
    {
      title: 'Avalanche',
      icon: 'cryptocurrency:avax',
      description: '快速、低费用且环保的区块链平台，支持DeFi与企业应用',
      color: '#e84142'
    }
  ]

  // 快捷功能项
  const quickFeatures = [
    { title: '多链钱包', icon: 'mdi:wallet-outline', color: '#6c5ce7' },
    { title: '跨链交易', icon: 'mdi:swap-horizontal', color: '#00cec9' },
    { title: '资产追踪', icon: 'mdi:chart-line-variant', color: '#fd79a8' },
    { title: '安全保障', icon: 'mdi:shield-check', color: '#0984e3' }
  ]

  return (
    <PageLayout title="Web3 元宇宙" subtitle="探索去中心化未来的无限可能">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="home-container">
        <ParticleBackground />

        {/* 紧凑导航面板 */}
        <motion.div className="compact-header" variants={itemVariants}>
          <Row gutter={[16, 16]} className="dashboard-header-row">
            <Col xs={24} md={16}>
              <motion.div
                className="welcome-panel"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1
                }}
              >
                {/* 装饰元素 */}
                <div className="welcome-decoration-el circle-1"></div>
                <div className="welcome-decoration-el circle-2"></div>
                <div className="welcome-decoration-el dot-group">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>

                {/* 浮动形状元素 */}
                <div className="floating-element hexagon"></div>
                <div className="floating-element triangle"></div>
                <div className="floating-element square"></div>
                <div className="floating-element glow-orb"></div>

                <div className="welcome-content">
                  <div className="welcome-text">
                    <motion.h2
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="welcome-title"
                    >
                      探索{' '}
                      <span className="gradient-text" data-text="Web3">
                        Web3
                      </span>{' '}
                      世界
                      <div className="title-glow"></div>
                      <motion.span
                        className="title-decoration"
                        initial={{ width: 0 }}
                        animate={{ width: '120px' }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      ></motion.span>
                    </motion.h2>

                    {/* 3D科技感数字计数器 */}
                    <div className="tech-counter">
                      <div className="counter-item">
                        <div className="counter-value">3.7M+</div>
                        <div className="counter-label">用户总数</div>
                        <div className="counter-glow"></div>
                      </div>
                      <div className="counter-separator">
                        <div className="separator-dot"></div>
                      </div>
                      <div className="counter-item">
                        <div className="counter-value">$2.9B</div>
                        <div className="counter-label">交易量</div>
                        <div className="counter-glow"></div>
                      </div>
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="welcome-description"
                    >
                      掌控您的数字资产，参与去中心化经济，构建未来金融
                    </motion.p>

                    <motion.div
                      className="action-buttons"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      <Button variant="primary" size="medium" className="glow-effect">
                        <Icon icon="mdi:rocket-launch" className="btn-icon" />
                        开始探索
                      </Button>
                      <Button variant="outline" size="medium">
                        <Icon icon="mdi:play-circle" className="btn-icon" />
                        观看演示
                      </Button>
                    </motion.div>

                    {/* 3D科技感进度条 */}
                    <div className="tech-progress-container">
                      <div className="tech-progress-header">
                        <div className="tech-progress-title">Web3 生态系统发展</div>
                        <div className="tech-progress-value">78%</div>
                      </div>
                      <div className="tech-progress-bar">
                        <div className="tech-progress-fill"></div>
                        <div className="tech-progress-glow"></div>
                        <div className="tech-progress-marks">
                          <div className="mark mark-1">Q1</div>
                          <div className="mark mark-2">Q2</div>
                          <div className="mark mark-3">Q3</div>
                          <div className="mark mark-4">Q4</div>
                        </div>
                      </div>
                    </div>

                    {/* 添加统计数据 */}
                    <motion.div
                      className="welcome-stats"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      <div className="stat-item">
                        <div className="stat-value">32.5K+</div>
                        <div className="stat-label">
                          <span className="indicator positive"></span>
                          活跃用户
                        </div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">$7.8M</div>
                        <div className="stat-label">
                          <span className="indicator positive"></span>
                          交易量
                        </div>
                      </div>
                    </motion.div>

                    {/* 3D折线图 */}
                    <div className="tech-graph-container">
                      <div className="tech-graph-title">近期活动</div>
                      <div className="tech-graph">
                        <div className="graph-axis y-axis"></div>
                        <div className="graph-axis x-axis"></div>
                        <div className="graph-line">
                          <div className="graph-point point-1"></div>
                          <div className="graph-point point-2"></div>
                          <div className="graph-point point-3"></div>
                          <div className="graph-point point-4"></div>
                          <div className="graph-point point-5"></div>
                        </div>
                        <div className="graph-area"></div>
                      </div>
                    </div>

                    {/* 集成快捷功能区 */}
                    <motion.div
                      className="integrated-quick-features"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <div className="features-header">
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          transition={{ delay: 0.7, duration: 0.4 }}
                          className="features-title"
                        >
                          快捷功能
                        </motion.span>
                        <motion.div
                          className="features-line"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: 0.8, duration: 0.6 }}
                        ></motion.div>
                      </div>
                      <div className="features-grid">
                        {quickFeatures.map((feature, index) => (
                          <motion.div
                            key={feature.title}
                            className="feature-pill"
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                              delay: 0.7 + index * 0.1,
                              type: 'spring',
                              stiffness: 300,
                              damping: 20
                            }}
                            whileHover={{
                              scale: 1.05,
                              y: -5,
                              boxShadow: `0 8px 20px rgba(0,0,0,0.15), 0 0 10px ${feature.color}50`
                            }}
                            style={{
                              background: `linear-gradient(135deg, ${feature.color}20, transparent)`,
                              borderLeft: `2px solid ${feature.color}`
                            }}
                          >
                            <div
                              className="feature-glow"
                              style={{ background: `radial-gradient(circle, ${feature.color}30 0%, transparent 70%)` }}
                            ></div>
                            <div className="feature-icon" style={{ color: feature.color }}>
                              <Icon icon={feature.icon} />
                              <div className="icon-pulse" style={{ borderColor: feature.color }}></div>
                            </div>
                            <div className="feature-name">{feature.title}</div>
                            <div className="feature-arrow">
                              <Icon icon="mdi:chevron-right" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <div className="crypto-visual">
                    <div className="visual-header">
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="visual-title"
                      >
                        热门加密货币
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="visual-action"
                      >
                        <Icon icon="mdi:arrow-right" />
                      </motion.div>
                    </div>

                    <div className="crypto-icon-group">
                      {['eth', 'btc', 'sol'].map((coin, index) => (
                        <motion.div
                          key={coin}
                          className={`crypto-icon ${coin}`}
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{
                            delay: 0.3 + index * 0.1,
                            type: 'spring',
                            stiffness: 260,
                            damping: 20
                          }}
                          whileHover={{
                            y: -5,
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <div className="icon-backdrop"></div>
                          <div className="icon-glow"></div>
                          <div className="icon-container">
                            <Icon icon={`cryptocurrency:${coin}`} />
                          </div>
                          <div className="icon-label">
                            <span>{coin.toUpperCase()}</span>
                            <motion.span
                              className="price"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            >
                              $
                              {coin === 'eth'
                                ? cryptoPrice.eth.toFixed(0)
                                : coin === 'btc'
                                  ? cryptoPrice.btc.toFixed(0)
                                  : cryptoPrice.sol.toFixed(0)}
                            </motion.span>
                          </div>
                          <div className="icon-particles">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div
                                key={i}
                                className="particle"
                                style={{
                                  animationDelay: `${i * 0.7}s`,
                                  left: `${10 + i * 20}%`,
                                  width: `${4 + (i % 3)}px`,
                                  height: `${4 + (i % 3)}px`
                                }}
                              ></div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="crypto-rings">
                      <motion.div
                        className="ring ring-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.7, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      ></motion.div>
                      <motion.div
                        className="ring ring-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.5, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                      ></motion.div>
                      <motion.div
                        className="ring ring-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      ></motion.div>
                    </div>

                    <motion.div
                      className="orbit-line"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                    >
                      <div className="orbit-dot"></div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Col>

            <Col xs={24} md={8}>
              <motion.div
                className="account-summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                  delay: 0.3
                }}
              >
                {/* 装饰元素 */}
                <div className="summary-decoration circle-1"></div>
                <div className="summary-decoration circle-2"></div>
                <div className="summary-pattern"></div>

                {/* 全息扫描线 */}
                <div className="holographic-scan-line"></div>

                {/* 科技线框装饰 */}
                <div className="tech-lines top-right"></div>
                <div className="tech-lines bottom-left"></div>

                <motion.div
                  className="summary-header"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3>资产概览</h3>
                  <div className="header-options">
                    <motion.div className="refresh-btn" whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
                      <Icon icon="mdi:refresh" />
                    </motion.div>
                    <motion.div className="more-btn" whileHover={{ scale: 1.1 }}>
                      <Icon icon="mdi:dots-horizontal" />
                    </motion.div>
                  </div>
                </motion.div>

                <div className="balance-card">
                  <motion.div
                    className="balance-amount-wrapper"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.5,
                      type: 'spring',
                      stiffness: 300
                    }}
                  >
                    <div className="balance-label">
                      总资产估值
                      <motion.div
                        className="balance-trend positive"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Icon icon="mdi:trending-up" />
                        <span>+5.8%</span>
                      </motion.div>
                    </div>

                    <div className="balance-amount">
                      <div className="amount-decoration"></div>
                      <span className="amount-value">
                        $
                        {(walletBalance * cryptoPrice.eth + 0.018 * cryptoPrice.btc + 0.12 * cryptoPrice.sol).toFixed(
                          2
                        )}
                      </span>
                      <span className="amount-currency">USD</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="progress-ring-container"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.6, type: 'spring' }}
                  >
                    <div className="progress-ring">
                      <svg viewBox="0 0 120 120" width="120" height="120">
                        <circle
                          className="progress-ring-bg"
                          cx="60"
                          cy="60"
                          r="54"
                          strokeWidth="8"
                          stroke="rgba(255,255,255,0.1)"
                          fill="none"
                        />
                        <circle
                          className="progress-ring-eth"
                          cx="60"
                          cy="60"
                          r="54"
                          strokeWidth="8"
                          stroke="#627eea"
                          fill="none"
                          strokeDasharray="339.292"
                          strokeDashoffset="169.646" // 50%
                        />
                        <circle
                          className="progress-ring-btc"
                          cx="60"
                          cy="60"
                          r="54"
                          strokeWidth="8"
                          stroke="#f7931a"
                          fill="none"
                          strokeDasharray="339.292"
                          strokeDashoffset="288.898" // 15%
                        />
                        <circle
                          className="progress-ring-sol"
                          cx="60"
                          cy="60"
                          r="54"
                          strokeWidth="8"
                          stroke="#14f195"
                          fill="none"
                          strokeDasharray="339.292"
                          strokeDashoffset="322.327" // 5%
                        />
                      </svg>
                      <div className="ring-content">
                        <motion.div
                          className="ring-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.9, type: 'spring' }}
                        >
                          <Icon icon="mdi:wallet-outline" />
                        </motion.div>
                      </div>
                    </div>
                    <div className="distribution-legend">
                      <div className="legend-item eth">
                        <span className="legend-color"></span>
                        <span className="legend-label">ETH 80%</span>
                      </div>
                      <div className="legend-item btc">
                        <span className="legend-color"></span>
                        <span className="legend-label">BTC 15%</span>
                      </div>
                      <div className="legend-item sol">
                        <span className="legend-color"></span>
                        <span className="legend-label">SOL 5%</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="asset-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="asset-list-header">
                    <h4>资产列表</h4>
                    <motion.div
                      className="view-all-btn"
                      whileHover={{ x: 3 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <span>查看全部</span>
                      <Icon icon="mdi:chevron-right" />
                    </motion.div>
                  </div>

                  <div className="asset-items">
                    <motion.div
                      className="asset-item eth"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                      whileHover={{
                        scale: 1.02
                      }}
                    >
                      <div className="asset-icon eth">
                        <Icon icon="cryptocurrency:eth" />
                        <div className="asset-icon-bg"></div>
                      </div>
                      <div className="asset-info">
                        <div className="asset-name-row">
                          <span className="asset-name">Ethereum</span>
                          <span className="asset-amount">{walletBalance.toFixed(2)} ETH</span>
                        </div>
                        <div className="asset-value-row">
                          <span className="asset-price">${cryptoPrice.eth.toFixed(2)}</span>
                          <span className="asset-value">${(walletBalance * cryptoPrice.eth).toFixed(2)}</span>
                        </div>
                        <div className="sparkline">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div
                              key={i}
                              className="sparkline-bar"
                              style={{
                                height: `${15 + Math.sin(i / 3) * 10 + Math.random() * 5}px`,
                                animationDelay: `${i * 0.1}s`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="asset-item btc"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 }}
                      whileHover={{
                        scale: 1.02
                      }}
                    >
                      <div className="asset-icon btc">
                        <Icon icon="cryptocurrency:btc" />
                        <div className="asset-icon-bg"></div>
                      </div>
                      <div className="asset-info">
                        <div className="asset-name-row">
                          <span className="asset-name">Bitcoin</span>
                          <span className="asset-amount">0.018 BTC</span>
                        </div>
                        <div className="asset-value-row">
                          <span className="asset-price">${cryptoPrice.btc.toFixed(2)}</span>
                          <span className="asset-value">${(0.018 * cryptoPrice.btc).toFixed(2)}</span>
                        </div>
                        <div className="sparkline">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div
                              key={i}
                              className="sparkline-bar"
                              style={{
                                height: `${12 + Math.cos(i / 2) * 8 + Math.random() * 5}px`,
                                animationDelay: `${i * 0.1}s`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="asset-item sol"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 }}
                      whileHover={{
                        scale: 1.02
                      }}
                    >
                      <div className="asset-icon sol">
                        <Icon icon="cryptocurrency:sol" />
                        <div className="asset-icon-bg"></div>
                      </div>
                      <div className="asset-info">
                        <div className="asset-name-row">
                          <span className="asset-name">Solana</span>
                          <span className="asset-amount">0.12 SOL</span>
                        </div>
                        <div className="asset-value-row">
                          <span className="asset-price">${cryptoPrice.sol.toFixed(2)}</span>
                          <span className="asset-value">${(0.12 * cryptoPrice.sol).toFixed(2)}</span>
                        </div>
                        <div className="sparkline">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div
                              key={i}
                              className="sparkline-bar"
                              style={{
                                height: `${18 + Math.sin(i / 1.5) * 7 + Math.random() * 5}px`,
                                animationDelay: `${i * 0.1}s`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        {/* 市场概览 */}
        <div className="market-overview">
          <motion.div
            className="market-ticker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="ticker-item">
              <Icon icon="cryptocurrency:btc" />
              <span className="ticker-name">Bitcoin</span>
              <span className="ticker-price">
                ${cryptoPrice.btc.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
              <span className="ticker-change positive">+2.4%</span>
            </div>
            <div className="ticker-item">
              <Icon icon="cryptocurrency:eth" />
              <span className="ticker-name">Ethereum</span>
              <span className="ticker-price">
                ${cryptoPrice.eth.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
              <span className="ticker-change positive">+3.8%</span>
            </div>
            <div className="ticker-item">
              <Icon icon="cryptocurrency:sol" />
              <span className="ticker-name">Solana</span>
              <span className="ticker-price">
                ${cryptoPrice.sol.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
              <span className="ticker-change positive">+5.2%</span>
            </div>
            <div className="ticker-item">
              <Icon icon="cryptocurrency:dot" />
              <span className="ticker-name">Polkadot</span>
              <span className="ticker-price">$13.45</span>
              <span className="ticker-change negative">-0.8%</span>
            </div>
            <div className="ticker-item">
              <Icon icon="cryptocurrency:avax" />
              <span className="ticker-name">Avalanche</span>
              <span className="ticker-price">$29.87</span>
              <span className="ticker-change positive">+1.5%</span>
            </div>
          </motion.div>
        </div>

        <Row gutter={[24, 24]} className="stats-section">
          <Col xs={24} md={8}>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="钱包余额"
                value={`${walletBalance.toFixed(2)} ETH`}
                trend={{ type: 'up', value: '2.3%' }}
                icon={<Icon icon="mdi:wallet-outline" />}
                variant="gradient"
              />
            </motion.div>
          </Col>

          <Col xs={24} md={8}>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="总资产估值"
                value="$12,583.65"
                trend={{ type: 'up', value: '5.8%' }}
                icon={<Icon icon="mdi:chart-line" />}
              />
            </motion.div>
          </Col>

          <Col xs={24} md={8}>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="DeFi收益率"
                value="8.7% APY"
                trend={{ type: 'up', value: '0.3%' }}
                icon={<Icon icon="mdi:percent" />}
              />
            </motion.div>
          </Col>
        </Row>

        <div className="section-divider">
          <motion.div
            className="divider-line"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <motion.div
            className="divider-icon"
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 360 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Icon icon="mdi:cube-outline" />
          </motion.div>
        </div>

        <div className="section ecosystem-section">
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="section-header ecosystem-header">
                  <div className="header-decoration"></div>
                  <motion.div
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <span className="gradient-text" data-text="Web3生态系统">
                      Web3生态系统
                    </span>
                    <div className="title-decoration">
                      <div className="decoration-line"></div>
                      <div className="decoration-dot"></div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Paragraph className="section-subtitle">探索去中心化网络中相互连接的数字经济生态</Paragraph>
                  </motion.div>
                </div>
              </motion.div>
            </Col>

            <Col xs={24}>
              <div className="ecosystem-background">
                <div className="bg-element circle-1"></div>
                <div className="bg-element circle-2"></div>
                <div className="bg-element dots-1"></div>
                <div className="bg-element dots-2"></div>
                <div className="connection-lines">
                  <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="svg-lines">
                    <path className="path-line path-1" d="M100,150 C300,50 700,250 900,150" />
                    <path className="path-line path-2" d="M100,150 C300,250 700,50 900,150" />
                    <path className="path-line path-3" d="M500,50 C400,100 600,200 500,250" />
                  </svg>
                </div>
              </div>

              <Row gutter={[30, 30]} className="ecosystem-cards">
                {web3Ecosystem.map((item, index) => (
                  <Col xs={24} sm={12} lg={6} key={item.title}>
                    <motion.div
                      custom={index}
                      variants={featureVariants}
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      viewport={{ once: true }}
                      className="ecosystem-card"
                    >
                      <div className="card-glass-effect"></div>
                      <div
                        className="card-glow"
                        style={{ background: `radial-gradient(circle, ${item.color}40 0%, transparent 70%)` }}
                      ></div>

                      <div className="ecosystem-icon-wrapper">
                        <div className="icon-background" style={{ borderColor: item.color }}></div>
                        <div className="ecosystem-icon" style={{ color: item.color }}>
                          <Icon icon={item.icon} width={36} height={36} />
                        </div>
                        <div
                          className="icon-glow"
                          style={{ background: `radial-gradient(circle, ${item.color}40 0%, transparent 70%)` }}
                        ></div>
                      </div>

                      <motion.h3
                        className="ecosystem-title"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {item.title}
                        <div className="title-underline" style={{ background: item.color }}></div>
                      </motion.h3>

                      <motion.p
                        className="ecosystem-description"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {item.description}
                      </motion.p>

                      <motion.div
                        className="ecosystem-stats"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.6 + index * 0.1,
                          type: 'spring',
                          stiffness: 300
                        }}
                        viewport={{ once: true }}
                        style={{
                          background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                          borderColor: `${item.color}30`
                        }}
                      >
                        <div className="stats-icon" style={{ color: item.color }}>
                          <Icon
                            icon={
                              index === 0
                                ? 'mdi:chart-line'
                                : index === 1
                                  ? 'mdi:cash-multiple'
                                  : index === 2
                                    ? 'mdi:account-group'
                                    : 'mdi:chart-timeline-variant'
                            }
                          />
                        </div>
                        <span>{item.stats}</span>
                      </motion.div>

                      <div className="card-particles">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="particle"
                            style={{
                              top: `${10 + i * 20}%`,
                              left: `${80 + (i % 3) * 5}%`,
                              background: `${item.color}`,
                              animationDelay: `${i * 0.3}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>

        <div className="section">
          <div className="section-header projects-header">
            <div className="section-title">
              <span className="gradient-text" data-text="核心区块链项目">
                核心区块链项目
              </span>
            </div>
            <Paragraph className="section-subtitle">驱动Web3创新的底层区块链技术平台</Paragraph>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="blockchain-projects"
          >
            {blockchainProjects.map((project, index) => (
              <motion.div
                key={project.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="project-card"
              >
                <div
                  className="project-bg"
                  style={{
                    backgroundColor: project.color,
                    backgroundImage: `linear-gradient(45deg, ${project.color}99, #00000099)`
                  }}
                ></div>
                <div className="project-content">
                  <div className="project-icon">
                    <Icon icon={project.icon} width={30} height={30} />
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
                <div className="project-action">
                  <Icon icon="mdi:arrow-top-right" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="section-divider reverse">
          <motion.div
            className="divider-line"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <motion.div
            className="divider-icon"
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: -360 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Icon icon="mdi:lightning-bolt" />
          </motion.div>
        </div>

        <Row gutter={[24, 24]} className="section trends-section">
          <Col xs={24} lg={15}>
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="section-header trends-header">
                <div className="section-title">
                  <span className="gradient-text" data-text="最新技术趋势">
                    最新技术趋势
                  </span>
                </div>
                <Paragraph className="section-subtitle">引领区块链和去中心化技术发展的前沿创新领域</Paragraph>
              </div>

              <Row gutter={[24, 24]}>
                {web3Trends.map((trend, index) => (
                  <Col xs={24} md={index === 2 ? 24 : 12} key={trend.title}>
                    <motion.div
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      viewport={{ once: true }}
                      className="trend-card"
                    >
                      <div className="trend-header">
                        <div className="trend-icon">
                          <Icon icon={trend.icon} width={32} height={32} />
                        </div>
                        <h3 className="trend-title">{trend.title}</h3>
                      </div>
                      <p className="trend-description">{trend.description}</p>
                      <div className="trend-topics">
                        {trend.topics.map((topic) => (
                          <span key={topic} className="topic-tag">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          </Col>

          <Col xs={24} lg={9}>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="trends-action"
            >
              <div className="action-card">
                <div className="action-content">
                  <h3 className="action-title">
                    探索{' '}
                    <span className="gradient-text" data-text="Web3">
                      Web3
                    </span>{' '}
                    未来技术
                  </h3>
                  <p className="action-description">加入我们的开发者社区，获取前沿技术资讯，参与创新项目开发与测试</p>
                  <Button variant="primary" size="large" className="action-button glow-effect">
                    <Icon icon="mdi:rocket-launch" style={{ marginRight: 8 }} />
                    加入社区
                  </Button>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>

        <motion.div
          className="cta-banner"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="cta-content">
            <Title level={2}>
              准备好加入 <span className="gradient-text">Web3 革命</span> 了吗？
            </Title>
            <Paragraph>创建您的数字身份，掌控您的数据和资产，参与去中心化的数字经济生态</Paragraph>
            <Button variant="primary" size="large" className="glow-effect">
              <Icon icon="mdi:account-plus" style={{ marginRight: 8 }} />
              创建账户
            </Button>
          </div>
          <div className="cta-circle-1"></div>
          <div className="cta-circle-2"></div>
        </motion.div>
      </motion.div>
    </PageLayout>
  )
}
