import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
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

const MobileMenuButton = styled.div`
  display: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: rgba(15, 14, 19, 0.95);
  backdrop-filter: blur(10px);
  z-index: 100;
  padding: 2rem;
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.3);
`

const CloseButton = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
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

const StatsBanner = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  padding: 2rem 1rem;
  background: linear-gradient(90deg, rgba(108, 92, 231, 0.15), rgba(0, 206, 201, 0.15));
  backdrop-filter: blur(5px);
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`

const StatItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #6c5ce7, #00cec9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
`

const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6c5ce7, #00cec9);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 50;
  font-size: 1.5rem;
`

/**
 * Web3交易演示页面
 * 展示了一个完整的Web3应用，包括钱包连接、发送交易和交易历史
 */
const Web3Transaction: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)

  // 检测滚动位置来显示/隐藏回到顶部按钮
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true)
      } else {
        setShowScrollButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

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

  const stats = [
    { value: '5.2M+', label: '用户总数' },
    { value: '21.8B+', label: '交易量(USD)' },
    { value: '156+', label: '支持的国家' },
    { value: '0.01%', label: '最低交易费' }
  ]

  return (
    <TransactionsProvider>
      <PageContainer>
        {/* 粒子背景 */}
        <ParticleBackground count={100} connectParticles={true} opacity={0.5} color="#6c5ce7" speed={0.3} />

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

          <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>☰</MobileMenuButton>
        </Header>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <MobileMenu
          initial={{ x: 300 }}
          animate={{ x: isMobileMenuOpen ? 0 : 300 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <CloseButton onClick={() => setIsMobileMenuOpen(false)}>✕</CloseButton>
        </MobileMenu>

        {/* 主要内容区域 */}
        <motion.div className="flex-grow relative z-10" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="gradient-bg-welcome">
            <Welcome />
          </motion.div>

          {/* 统计数据展示 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ padding: '0 1rem', marginTop: '-3rem', marginBottom: '3rem' }}
          >
            <StatsBanner>
              {stats.map((stat, index) => (
                <StatItem
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </StatItem>
              ))}
            </StatsBanner>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Transactions />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Services />
          </motion.div>
        </motion.div>

        {/* 回到顶部按钮 */}
        <AnimatePresence>
          {showScrollButton && (
            <ScrollToTopButton
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ↑
            </ScrollToTopButton>
          )}
        </AnimatePresence>

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
