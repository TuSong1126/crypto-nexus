import { motion } from 'framer-motion'
import React from 'react'
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

const RightSection = styled.div`
  flex: 1.2;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`

const ServiceCardWrapper = styled(motion.div)`
  height: 100%;
`

const Services: React.FC = () => {
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

  return (
    <ServicesContainer>
      <ContentWrapper>
        <LeftSection>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Title variants={itemVariants}>
              我们不断改进的
              <br />
              服务
            </Title>

            <Description variants={itemVariants}>
              购买和出售加密资产的最佳选择，我们提供各种超级友好的服务，让您的交易体验更加顺畅和安全。
            </Description>

            <LearnMoreButton variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              了解更多
            </LearnMoreButton>
          </motion.div>
        </LeftSection>

        <RightSection>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'contents' }}>
            <ServiceCardWrapper variants={itemVariants}>
              <Web3Card
                variant="glass"
                hover={true}
                title="安全保障"
                subtitle="安全有保障。我们始终保持隐私并维护产品质量"
                icon={<span style={{ fontSize: '1.5rem' }}>🛡️</span>}
              >
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginTop: '1rem' }}>
                  我们采用最先进的加密技术，确保您的资产和交易数据安全。多重验证和实时监控系统全天候保护您的账户。
                </p>
              </Web3Card>
            </ServiceCardWrapper>

            <ServiceCardWrapper variants={itemVariants}>
              <Web3Card
                variant="gradient"
                hover={true}
                title="最优汇率"
                subtitle="我们提供最优惠的交易汇率，让您的每一笔交易都物超所值"
                icon={<span style={{ fontSize: '1.5rem' }}>🔍</span>}
              >
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', marginTop: '1rem' }}>
                  我们实时跟踪市场动态，分析多个交易所的价格，自动为您选择最优惠的汇率，让您的每一笔交易都能获得最大收益。
                </p>
              </Web3Card>
            </ServiceCardWrapper>

            <ServiceCardWrapper variants={itemVariants}>
              <Web3Card
                variant="outline"
                hover={true}
                glow={true}
                title="极速交易"
                subtitle="闪电般的交易速度，让您的资产快速到账，无需漫长等待"
                icon={<span style={{ fontSize: '1.5rem' }}>⚡</span>}
              >
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginTop: '1rem' }}>
                  基于高性能区块链技术，我们的交易系统能够在几秒钟内完成确认，告别传统银行转账的漫长等待，体验闪电般的交易速度。
                </p>
              </Web3Card>
            </ServiceCardWrapper>
          </motion.div>
        </RightSection>
      </ContentWrapper>
    </ServicesContainer>
  )
}

export default Services
