import { motion } from 'framer-motion'
import React, { useState } from 'react'
import styled from 'styled-components'

import Web3Card from '@/components/web3/Web3Card'

const ServicesContainer = styled.div`
  width: 100%;
  padding: 4rem 1rem;
  position: relative;
  z-index: 10;
  background: rgba(15, 14, 19, 0.8);
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

const LeftSection = styled.div`
  flex: 1;

  @media (min-width: 1024px) {
    padding-right: 2rem;
  }
`

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.5));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`

const Description = styled(motion.p)`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  max-width: 500px;
  line-height: 1.6;
`

const LearnMoreButton = styled(motion.button)`
  background: linear-gradient(45deg, #6c5ce7, #00cec9);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 2rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(108, 92, 231, 0.6);
  }

  &:active {
    transform: translateY(1px);
  }
`

const MetricsList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
`

const MetricItem = styled(motion.div)`
  display: flex;
  align-items: center;
`

const MetricIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(108, 92, 231, 0.2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  color: #6c5ce7;
  font-size: 1.25rem;
`

const MetricContent = styled.div`
  flex: 1;
`

const MetricValue = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  color: white;
  margin-bottom: 0.25rem;
`

const MetricLabel = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
`

const RightSection = styled.div`
  flex: 1.2;
`

const ServiceCardWrapper = styled(motion.div)`
  height: 100%;
  margin-bottom: 1.5rem;
`

const ServiceTabs = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const TabButton = styled(motion.button)<{ $active: boolean }>`
  background: transparent;
  color: ${(props) => (props.$active ? 'white' : 'rgba(255, 255, 255, 0.6)')};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: ${(props) => (props.$active ? '600' : '400')};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: ${(props) => (props.$active ? '100%' : '0%')};
    height: 2px;
    background: linear-gradient(90deg, #6c5ce7, #00cec9);
    transition: width 0.3s ease;
  }

  &:hover {
    color: white;

    &::after {
      width: 100%;
    }
  }
`

const TabContent = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`

const FeatureBadge = styled(motion.span)`
  display: inline-block;
  background: linear-gradient(45deg, #6c5ce7, #00cec9);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
  vertical-align: middle;
`

const DetailsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
`

const DetailsItem = styled.li`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;

  &::before {
    content: '✓';
    color: #00cec9;
    margin-right: 0.5rem;
    font-weight: bold;
  }
`

// 服务类别及详情
interface ServiceCategory {
  id: string
  name: string
  services: {
    title: string
    subtitle: string
    icon: string
    details: string[]
    variant: 'glass' | 'gradient' | 'outline'
    isNew?: boolean
    isPopular?: boolean
  }[]
}

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trading')

  // 动画变量
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  const tabVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.3 }
    }
  }

  // 服务分类
  const serviceCategories: ServiceCategory[] = [
    {
      id: 'trading',
      name: '交易服务',
      services: [
        {
          title: '安全保障',
          subtitle: '最先进的加密与防护系统',
          icon: '🛡️',
          details: ['多因素身份验证', '冷钱包离线存储', '24/7实时监控', '交易保险保障'],
          variant: 'glass',
          isPopular: true
        },
        {
          title: '最优汇率',
          subtitle: '实时价格监控与最优匹配',
          icon: '🔍',
          details: ['跨交易所价格对比', '智能路由系统', '零隐藏费用', '价格预警功能'],
          variant: 'gradient'
        },
        {
          title: '极速交易',
          subtitle: '毫秒级响应的高性能交易系统',
          icon: '⚡',
          details: ['高吞吐量交易系统', '闪电网络支持', '平均确认时间 < 5秒', '批量交易处理'],
          variant: 'outline',
          glow: true
        }
      ]
    },
    {
      id: 'defi',
      name: 'DeFi服务',
      services: [
        {
          title: '流动性挖矿',
          subtitle: '为流动性提供者提供高收益回报',
          icon: '💰',
          details: ['多协议收益聚合', '自动复投策略', '实时APY计算', '无锁定期'],
          variant: 'gradient',
          isNew: true
        },
        {
          title: '借贷平台',
          subtitle: '安全高效的借贷服务',
          icon: '🏦',
          details: ['低至1%的借款利率', '多资产抵押', '灵活的还款期限', '无信用检查'],
          variant: 'glass',
          isPopular: true
        },
        {
          title: '质押服务',
          subtitle: '将闲置资产转化为被动收入',
          icon: '🔒',
          details: ['支持20+种代币', '灵活的质押期限', '复合收益', '每日发放奖励'],
          variant: 'outline'
        }
      ]
    },
    {
      id: 'nft',
      name: 'NFT服务',
      services: [
        {
          title: 'NFT市场',
          subtitle: '一站式数字艺术交易平台',
          icon: '🖼️',
          details: ['0.5%交易手续费', '多链支持', '版税自动分配', '限时拍卖功能'],
          variant: 'glass',
          isNew: true
        },
        {
          title: 'NFT铸造',
          subtitle: '简单快捷的创作者工具',
          icon: '🔨',
          details: ['一键铸造功能', '批量创建集合', '元数据管理工具', '多媒体格式支持'],
          variant: 'gradient',
          isPopular: true
        },
        {
          title: 'NFT分析',
          subtitle: '先进的市场分析与洞察',
          icon: '📊',
          details: ['实时价格追踪', '稀有度计算器', '趋势预测', '集合表现对比'],
          variant: 'outline'
        }
      ]
    }
  ]

  // 查找当前活动的服务分类
  const activeCategory = serviceCategories.find((category) => category.id === activeTab) || serviceCategories[0]

  // 指标数据
  const metrics = [
    { icon: '🔒', value: '100%', label: '安全保障' },
    { icon: '⚡', value: '<2秒', label: '交易速度' },
    { icon: '💹', value: '99.9%', label: '系统可用性' },
    { icon: '👥', value: '240万+', label: '用户信任' }
  ]

  return (
    <ServicesContainer>
      <ContentWrapper>
        <LeftSection>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Title variants={itemVariants}>不断改进的服务</Title>

            <Description variants={itemVariants}>
              购买和出售加密资产的最佳选择，我们提供各种超级友好的服务，让您的交易体验更加顺畅和安全。通过我们的专业工具，您可以轻松管理您的数字资产，享受DeFi和NFT的全部优势。
            </Description>

            <LearnMoreButton variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              了解更多
            </LearnMoreButton>

            <MetricsList variants={containerVariants}>
              {metrics.map((metric, index) => (
                <MetricItem key={index} variants={itemVariants} whileHover={{ x: 5 }}>
                  <MetricIcon>{metric.icon}</MetricIcon>
                  <MetricContent>
                    <MetricValue>{metric.value}</MetricValue>
                    <MetricLabel>{metric.label}</MetricLabel>
                  </MetricContent>
                </MetricItem>
              ))}
            </MetricsList>
          </motion.div>
        </LeftSection>

        <RightSection>
          <ServiceTabs>
            {serviceCategories.map((category) => (
              <TabButton
                key={category.id}
                $active={activeTab === category.id}
                onClick={() => setActiveTab(category.id)}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </TabButton>
            ))}
          </ServiceTabs>

          <motion.div key={activeTab} initial="hidden" animate="visible" exit="exit" variants={tabVariants}>
            <TabContent>
              {activeCategory.services.map((service, index) => (
                <ServiceCardWrapper
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Web3Card
                    variant={service.variant}
                    hover={true}
                    glow={service.glow}
                    title={
                      <>
                        {service.title}
                        {service.isNew && <FeatureBadge>新</FeatureBadge>}
                        {service.isPopular && <FeatureBadge>热门</FeatureBadge>}
                      </>
                    }
                    subtitle={service.subtitle}
                    icon={<span style={{ fontSize: '1.5rem' }}>{service.icon}</span>}
                  >
                    <DetailsList>
                      {service.details.map((detail, i) => (
                        <DetailsItem key={i}>{detail}</DetailsItem>
                      ))}
                    </DetailsList>
                  </Web3Card>
                </ServiceCardWrapper>
              ))}
            </TabContent>
          </motion.div>
        </RightSection>
      </ContentWrapper>
    </ServicesContainer>
  )
}

export default Services
