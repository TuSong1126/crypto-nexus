import './index.scss'

import { Icon } from '@iconify/react'
import { Col, Row, Space, Tag, Typography } from 'antd'
import { motion, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'

import Button from '@/components/common/Button'
import PageLayout from '@/components/common/PageLayout'
import StatsCard from '@/components/common/StatsCard'
import ParticleBackground from '@/components/web3/ParticleBackground'
import Web3Card from '@/components/web3/Web3Card'

const { Title, Paragraph } = Typography

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

  const knowledgeVariants = {
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

  // Web3知识库数据
  const web3Knowledge = [
    {
      title: '区块链基础',
      icon: 'mdi:cube-outline',
      description: '区块链是一种分布式账本技术，通过密码学原理保证交易安全，无需第三方中介。'
    },
    {
      title: '智能合约',
      icon: 'mdi:file-document-outline',
      description: '智能合约是自动执行的合约，条件代码化并存储在区块链上，确保交易的透明性和不可篡改性。'
    },
    {
      title: 'DeFi',
      icon: 'mdi:bank-outline',
      description: '去中心化金融使用区块链和加密货币提供传统金融服务，如借贷、交易和保险，无需传统银行参与。'
    },
    {
      title: 'NFT',
      icon: 'mdi:image-multiple-outline',
      description: '非同质化代币是独特的数字资产，代表对特定项目的所有权，如艺术品、收藏品和游戏内物品。'
    }
  ]

  // 系统特点数据
  const systemFeatures = [
    {
      title: '多链支持',
      description: '同时支持以太坊、Solana、Polkadot等多条主流区块链，轻松管理跨链资产。',
      icon: 'mdi:collage',
      color: '#3f51b5'
    },
    {
      title: '低Gas费优化',
      description: '智能交易路由和Gas费预测，为您节省高达40%的交易成本。',
      icon: 'mdi:gas-station',
      color: '#4caf50'
    },
    {
      title: '军级安全保障',
      description: '采用多重签名和硬件级加密技术，保障您的数字资产安全。',
      icon: 'mdi:shield-check',
      color: '#f44336'
    },
    {
      title: 'AI智能分析',
      description: '运用人工智能分析市场趋势，提供个性化投资建议。',
      icon: 'mdi:brain',
      color: '#9c27b0'
    }
  ]

  return (
    <PageLayout title="Web3 世界" subtitle="探索去中心化的无限可能">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="home-container">
        <ParticleBackground />

        <motion.div className="hero-section" variants={itemVariants}>
          <div className="hero-content">
            <Title level={1} className="hero-title">
              探索无限可能的 Web3 世界
            </Title>
            <Paragraph className="hero-subtitle">
              一站式管理您的数字资产、DeFi投资和NFT收藏，体验下一代互联网革命
            </Paragraph>
            <Space size="middle">
              <Button variant="primary" size="large">
                <Icon icon="mdi:rocket-launch" style={{ marginRight: 8 }} />
                开始探索
              </Button>
              <Button variant="outline" size="large">
                <Icon icon="mdi:play-circle" style={{ marginRight: 8 }} />
                观看演示
              </Button>
            </Space>
          </div>
        </motion.div>

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

        <div className="section feature-section">
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <motion.div variants={itemVariants}>
                <div className="section-header">
                  <Title level={2} className="section-title">
                    系统核心优势
                  </Title>
                  <Paragraph className="section-subtitle">
                    领先的区块链技术支持，为您提供安全、高效、直观的数字资产管理体验
                  </Paragraph>
                </div>
              </motion.div>
            </Col>

            {systemFeatures.map((feature, index) => (
              <Col xs={24} md={12} lg={6} key={index}>
                <motion.div
                  custom={index}
                  variants={featureVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                >
                  <Web3Card variant="glass" className="feature-card">
                    <motion.div
                      className="feature-icon"
                      style={{ backgroundColor: feature.color }}
                      animate={{
                        boxShadow: [
                          `0 10px 15px rgba(0, 0, 0, 0.1)`,
                          `0 10px 25px ${feature.color}33`,
                          `0 10px 15px rgba(0, 0, 0, 0.1)`
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }}
                    >
                      <Icon icon={feature.icon} width={32} height={32} />
                    </motion.div>
                    <Title level={4}>{feature.title}</Title>
                    <Paragraph>{feature.description}</Paragraph>
                  </Web3Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="section">
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <motion.div variants={itemVariants}>
                <div className="section-header">
                  <Title level={2} className="section-title">
                    Web3 知识库
                  </Title>
                  <Paragraph className="section-subtitle">
                    了解区块链和Web3技术的基础知识，开启您的去中心化之旅
                  </Paragraph>
                </div>
              </motion.div>
            </Col>

            {web3Knowledge.map((item, index) => (
              <Col xs={24} md={12} key={index}>
                <motion.div
                  custom={index}
                  variants={knowledgeVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                >
                  <Web3Card variant="default" className="knowledge-card">
                    <div className="knowledge-header">
                      <motion.div
                        animate={{
                          color: ['#00cec9', '#8e66ff', '#00cec9']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: 'reverse'
                        }}
                      >
                        <Icon icon={item.icon} width={28} height={28} />
                      </motion.div>
                      <Title level={4}>{item.title}</Title>
                    </div>
                    <Paragraph>{item.description}</Paragraph>
                    <Button variant="outline" size="small">
                      了解更多 <Icon icon="mdi:arrow-right" />
                    </Button>
                  </Web3Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>

        <Row gutter={[24, 24]} className="section">
          <Col xs={24} lg={16}>
            <motion.div variants={itemVariants}>
              <Web3Card variant="glass" className="market-trends-card">
                <div className="card-header">
                  <Title level={3}>市场趋势</Title>
                  <Space>
                    <Tag color="green">实时</Tag>
                    <Button variant="ghost" size="small">
                      查看全部
                    </Button>
                  </Space>
                </div>
                <div className="coin-list">
                  <div className="coin-item">
                    <div className="coin-info">
                      <Icon icon="cryptocurrency:btc" width={24} height={24} />
                      <div>
                        <div className="coin-name">Bitcoin</div>
                        <div className="coin-symbol">BTC</div>
                      </div>
                    </div>
                    <div className="coin-price">
                      <div className="price-value">$41,235.80</div>
                      <div className="price-change positive">+2.4%</div>
                    </div>
                  </div>

                  <div className="coin-item">
                    <div className="coin-info">
                      <Icon icon="cryptocurrency:eth" width={24} height={24} />
                      <div>
                        <div className="coin-name">Ethereum</div>
                        <div className="coin-symbol">ETH</div>
                      </div>
                    </div>
                    <div className="coin-price">
                      <div className="price-value">$2,318.65</div>
                      <div className="price-change positive">+3.8%</div>
                    </div>
                  </div>

                  <div className="coin-item">
                    <div className="coin-info">
                      <Icon icon="cryptocurrency:sol" width={24} height={24} />
                      <div>
                        <div className="coin-name">Solana</div>
                        <div className="coin-symbol">SOL</div>
                      </div>
                    </div>
                    <div className="coin-price">
                      <div className="price-value">$108.52</div>
                      <div className="price-change negative">-1.2%</div>
                    </div>
                  </div>
                </div>
              </Web3Card>
            </motion.div>
          </Col>

          <Col xs={24} lg={8}>
            <motion.div variants={itemVariants} className="action-cards">
              <Web3Card variant="gradient" className="main-action-card">
                <Title level={3}>开始您的Web3之旅</Title>
                <Paragraph>连接您的钱包，探索去中心化世界的无限可能</Paragraph>
                <Button variant="ghost" size="large" fullWidth>
                  <Icon icon="mdi:wallet-plus" style={{ marginRight: 8 }} />
                  连接钱包
                </Button>
              </Web3Card>

              <Web3Card variant="glass" className="event-card">
                <div className="event-badge">新</div>
                <Title level={4}>参加Web3创新大会</Title>
                <Paragraph>了解最新区块链技术发展和应用场景</Paragraph>
                <Button variant="outline" size="small">
                  查看详情
                </Button>
              </Web3Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </PageLayout>
  )
}
