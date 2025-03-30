import { Icon } from '@iconify/react'
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
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-shadow: 0 0 10px rgba(108, 92, 231, 0.7);
  letter-spacing: 1px;
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

const Footer = styled(motion.footer)`
  position: relative;
  margin-top: auto;
  padding: 4rem 2rem;
  color: white;
  text-align: center;
  position: relative;
  z-index: 5;
  overflow: hidden;
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(8, 8, 17, 0), rgba(8, 8, 17, 0.8));
    transform: translateZ(-1px);
    z-index: -1;
  }
`

const FooterTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  background: linear-gradient(90deg, #fff, rgba(108, 92, 231, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.05rem;
  margin-bottom: 1rem;
  line-height: 1.6;
  transition: all 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`

const SocialLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.05rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  transition: all 0.3s ease;
  margin: 0 0.5rem;

  &:hover {
    color: #6c5ce7;
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-3px);
  }
`

const CopyrightContainer = styled(motion.div)`
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(90deg, #6c5ce7, #00cec9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(108, 92, 231, 0.3);
  filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.3));
`

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon icon="ph:cube-transparent-fill" style={{ fontSize: '2.2rem', color: '#6c5ce7' }} />
            区块链交易平台
          </Logo>

          <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>
            <Icon icon="ph:list-fill" style={{ fontSize: '2rem' }} />
          </MobileMenuButton>
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

        {/* 全新3D页脚 */}
        <Footer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="max-w-6xl mx-auto relative" style={{ zIndex: 5 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center md:text-left">
                <FooterTitle>
                  <Icon icon="ph:cube-transparent-fill" style={{ color: '#6c5ce7', fontSize: '1.8rem' }} />
                  区块链交易平台
                </FooterTitle>
                <FooterText>
                  探索加密世界的无限可能，安全可靠的区块链资产管理平台。让每一笔交易都透明、高效、安全。
                </FooterText>
              </div>

              <div className="text-center md:text-left">
                <FooterTitle>
                  <Icon icon="ph:envelope-simple-fill" style={{ color: '#6c5ce7', fontSize: '1.8rem' }} />
                  联系我们
                </FooterTitle>
                <FooterText className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <Icon icon="ph:envelope" style={{ color: '#6c5ce7' }} />
                  info@blockchainplatform.com
                </FooterText>
                <FooterText className="flex items-center justify-center md:justify-start gap-2">
                  <Icon icon="ph:phone" style={{ color: '#6c5ce7' }} />
                  +86 123 4567 8901
                </FooterText>
              </div>

              <div className="text-center md:text-left">
                <FooterTitle>
                  <Icon icon="ph:share-network-fill" style={{ color: '#6c5ce7', fontSize: '1.8rem' }} />
                  关注我们
                </FooterTitle>
                <div className="flex justify-center md:justify-start space-x-4 mt-4">
                  <SocialLink href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Icon icon="ph:twitter-logo-fill" style={{ color: '#6c5ce7', fontSize: '1.4rem' }} />
                    Twitter
                  </SocialLink>
                  <SocialLink href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Icon icon="ph:discord-logo-fill" style={{ color: '#6c5ce7', fontSize: '1.4rem' }} />
                    Discord
                  </SocialLink>
                  <SocialLink href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Icon icon="ph:telegram-logo-fill" style={{ color: '#6c5ce7', fontSize: '1.4rem' }} />
                    Telegram
                  </SocialLink>
                </div>
              </div>
            </div>

            <CopyrightContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Icon icon="ph:copyright" style={{ fontSize: '1.1rem' }} />
              <span>2025 区块链交易平台. 版权所有</span>
              <span style={{ margin: '0 8px' }}>|</span>
              <span className="flex items-center gap-1">
                <Icon icon="ph:shield-check-fill" style={{ color: '#6c5ce7' }} />
                安全交易保障
              </span>
            </CopyrightContainer>
          </div>

          {/* 底部装饰性元素 */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-50px',
              left: '0',
              width: '100%',
              height: '100px',
              background: 'linear-gradient(to top, rgba(108, 92, 231, 0.2), transparent)',
              zIndex: 1
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        </Footer>
      </PageContainer>
    </TransactionsProvider>
  )
}

export default Web3Transaction
