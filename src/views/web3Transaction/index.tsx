import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

import ParticleBackground from '@/components/web3/ParticleBackground'

import { Services, Transactions, Welcome } from './components'
import { TransactionsProvider } from './context/TransactionContext'

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background-color: #0f0e13;
`

const Header = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`

const NavItem = styled(motion.a)`
  color: white;
  margin: 0 1rem;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #6c5ce7, #00cec9);
    transition: width 0.3s;
  }

  &:hover::after {
    width: 100%;
  }
`

const MobileMenuButton = styled.div`
  display: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`

const Footer = styled.footer`
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  text-align: center;
  margin-top: auto;
  position: relative;
  z-index: 5;
`

/**
 * Web3交易演示页面
 * 展示了一个完整的Web3应用，包括钱包连接、发送交易和交易历史
 */
const Web3Transaction: React.FC = () => {
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
    <TransactionsProvider>
      <PageContainer>
        {/* 粒子背景 */}
        <ParticleBackground count={80} connectParticles={true} opacity={0.5} color="#6c5ce7" speed={0.3} />

        {/* 装饰球体 */}
        <motion.div
          className="floating-orb"
          style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(108, 92, 231, 0.8), rgba(0, 206, 201, 0.4))',
            filter: 'blur(60px)',
            zIndex: 1
          }}
          animate={{
            y: ['-5%', '5%'],
            x: ['-2%', '2%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />

        <motion.div
          className="floating-orb"
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 70% 70%, rgba(0, 206, 201, 0.6), rgba(108, 92, 231, 0.3))',
            filter: 'blur(50px)',
            zIndex: 1
          }}
          animate={{
            y: ['5%', '-5%'],
            x: ['2%', '-2%']
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />

        {/* 导航栏 */}
        <Header initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Logo
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span style={{ color: '#6c5ce7' }}>Ξ</span> 区块链交易平台
          </Logo>

          <MobileMenuButton>☰</MobileMenuButton>
        </Header>

        {/* 主要内容区域 */}
        <motion.div className="flex-grow relative z-10" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="gradient-bg-welcome">
            <Welcome />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Services />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Transactions />
          </motion.div>
        </motion.div>

        {/* 页脚 */}
        <Footer>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">区块链交易平台</h4>
                <p className="text-gray-400">探索加密世界的无限可能</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">联系我们</h4>
                <p className="text-gray-400">info@blockchainplatform.com</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">关注我们</h4>
                <div className="flex space-x-4">
                  <span className="cursor-pointer hover:text-[#6c5ce7] transition-colors">Twitter</span>
                  <span className="cursor-pointer hover:text-[#6c5ce7] transition-colors">Discord</span>
                  <span className="cursor-pointer hover:text-[#6c5ce7] transition-colors">Telegram</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm">© 2025 区块链交易平台. 版权所有</p>
            </div>
          </div>
        </Footer>
      </PageContainer>
    </TransactionsProvider>
  )
}

export default Web3Transaction
