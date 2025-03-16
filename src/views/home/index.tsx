import './index.scss'

import { Icon } from '@iconify/react'
import { Col, Row } from 'antd'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import ActionCard from '@/components/common/ActionCard'
import Button from '@/components/common/Button'
import PageLayout from '@/components/common/PageLayout'
import StatsCard from '@/components/common/StatsCard'
import Web3Card from '@/components/web3/Web3Card'

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
    <PageLayout title="Web3 仪表盘" subtitle="探索去中心化世界，管理您的数字资产和交易">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="home-container">
        <motion.div
          className="floating-orb home-orb-1"
          animate={{
            y: ['-15%', '15%'],
            x: ['-5%', '5%']
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />

        <Row gutter={[24, 24]}>
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
                title="交易总量"
                value="128"
                trend={{ type: 'up', value: '12.5%' }}
                icon={<Icon icon="mdi:trending-up" />}
              />
            </motion.div>
          </Col>

          <Col xs={24} md={8}>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="挖矿奖励"
                value="0.85 ETH"
                trend={{ type: 'down', value: '3.1%' }}
                icon={<Icon icon="mdi:pickaxe" />}
              />
            </motion.div>
          </Col>
        </Row>

        <Row gutter={[24, 24]} className="section">
          <Col xs={24}>
            <motion.h2 variants={itemVariants} className="section-title">
              快捷操作
            </motion.h2>
          </Col>

          <Col xs={24} md={8}>
            <motion.div variants={itemVariants}>
              <ActionCard
                title="发送资产"
                description="向任何钱包地址发送代币或NFT"
                icon={<Icon icon="mdi:send" />}
                variant="primary"
              >
                <Button variant="primary" size="medium" fullWidth>
                  开始交易
                </Button>
              </ActionCard>
            </motion.div>
          </Col>

          <Col xs={24} md={8}>
            <motion.div variants={itemVariants}>
              <ActionCard
                title="质押"
                description="质押您的代币以获取被动收益"
                icon={<Icon icon="mdi:cash-lock" />}
                variant="secondary"
              >
                <Button variant="secondary" size="medium" fullWidth>
                  质押资产
                </Button>
              </ActionCard>
            </motion.div>
          </Col>

          <Col xs={24} md={8}>
            <motion.div variants={itemVariants}>
              <ActionCard
                title="NFT 市场"
                description="探索、购买和出售数字藏品"
                icon={<Icon icon="mdi:image-multiple" />}
              >
                <Button variant="outline" size="medium" fullWidth>
                  浏览市场
                </Button>
              </ActionCard>
            </motion.div>
          </Col>
        </Row>

        <Row gutter={[24, 24]} className="section">
          <Col xs={24}>
            <motion.h2 variants={itemVariants} className="section-title">
              最近活动
            </motion.h2>
          </Col>

          <Col xs={24}>
            <motion.div variants={itemVariants}>
              <Web3Card variant="glass">
                <div className="activities-list">
                  <div className="activity-item">
                    <div className="activity-icon send">
                      <Icon icon="mdi:arrow-up" />
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">发送 ETH</div>
                      <div className="activity-address">0x7F5...A2E3</div>
                    </div>
                    <div className="activity-amount negative">-0.5 ETH</div>
                  </div>

                  <div className="activity-item">
                    <div className="activity-icon receive">
                      <Icon icon="mdi:arrow-down" />
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">接收 USDT</div>
                      <div className="activity-address">0x3A8...F4D2</div>
                    </div>
                    <div className="activity-amount positive">+1,500 USDT</div>
                  </div>

                  <div className="activity-item">
                    <div className="activity-icon stake">
                      <Icon icon="mdi:safe-square" />
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">质押 ETH</div>
                      <div className="activity-address">Staking Pool</div>
                    </div>
                    <div className="activity-amount neutral">1.0 ETH</div>
                  </div>
                </div>
              </Web3Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </PageLayout>
  )
}
