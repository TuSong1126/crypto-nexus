import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import styled from 'styled-components'

import ParticleBackground from '@/components/web3/ParticleBackground'

import { Services, Transactions, Welcome } from './components'
import { TransactionsProvider } from './context/TransactionsProvider'

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
  padding: 5rem 2rem 4rem;
  color: white;
  text-align: center;
  position: relative;
  z-index: 5;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;

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
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #fff, rgba(108, 92, 231, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #6c5ce7, #00cec9);
    border-radius: 2px;
  }

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

const SocialLinkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    justify-content: center;
    grid-template-columns: repeat(3, minmax(100px, 120px));
  }
`

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  text-decoration: none;
  padding: 0.75rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    color: #fff;
    background: rgba(108, 92, 231, 0.3);
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 25px rgba(108, 92, 231, 0.3);
    border-color: rgba(108, 92, 231, 0.4);
  }
`

const CopyrightContainer = styled(motion.div)`
  margin-top: 3.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const FooterWave = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' style='fill: rgba(15, 14, 19, 0.8);'/%3E%3C/svg%3E");
  background-size: cover;
  z-index: -1;
  transform-origin: top;
`

const FooterCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`

const FooterCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  transform-style: preserve-3d;

  &:hover {
    transform: translateY(-10px) rotateX(5deg);
    box-shadow: 0 15px 35px rgba(108, 92, 231, 0.2);
    border-color: rgba(108, 92, 231, 0.2);
  }
`

const SecurityBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(108, 92, 231, 0.15);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  margin-top: 1rem;
  font-weight: 500;
  border: 1px solid rgba(108, 92, 231, 0.3);
`

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding: 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(5px);
  }
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
const Web3Transaction = (): JSX.Element => {
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

  return (
    <TransactionsProvider>
      <PageContainer>
        {/* 粒子背景 */}
        <ParticleBackground
          count={100}
          connectParticles={true}
          opacity={0.5}
          color="#6c5ce7"
          speed={0.3}
        />

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
            background:
              'radial-gradient(circle at 30% 30%, rgba(108, 92, 231, 0.8), rgba(0, 206, 201, 0.4))',
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
            background:
              'radial-gradient(circle at 70% 70%, rgba(0, 206, 201, 0.6), rgba(108, 92, 231, 0.3))',
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
        <Header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Logo
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon
              icon="ph:cube-transparent-fill"
              style={{ fontSize: '2.2rem', color: '#6c5ce7' }}
            />
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
        <motion.div
          className="flex-grow relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="gradient-bg-welcome">
            <Welcome />
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
          <FooterWave
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />

          <div className="max-w-6xl mx-auto relative" style={{ zIndex: 5 }}>
            <FooterCardGrid>
              <FooterCard
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <FooterTitle>
                  <Icon
                    icon="ph:cube-transparent-fill"
                    style={{ color: '#6c5ce7', fontSize: '1.8rem' }}
                  />
                  区块链交易平台
                </FooterTitle>
                <FooterText>
                  探索加密世界的无限可能，安全可靠的区块链资产管理平台。让每一笔交易都透明、高效、安全。
                </FooterText>
                <SecurityBadge
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Icon
                    icon="ph:shield-check-fill"
                    style={{ color: '#6c5ce7', fontSize: '1.2rem' }}
                  />
                  安全交易保障
                </SecurityBadge>
              </FooterCard>

              <FooterCard
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <FooterTitle>
                  <Icon
                    icon="ph:envelope-simple-fill"
                    style={{ color: '#6c5ce7', fontSize: '1.8rem' }}
                  />
                  联系我们
                </FooterTitle>
                <ContactItem whileHover={{ x: 5 }}>
                  <Icon
                    icon="ph:envelope"
                    style={{
                      color: '#6c5ce7',
                      fontSize: '1.4rem',
                      filter: 'drop-shadow(0 0 8px rgba(108, 92, 231, 0.5))'
                    }}
                  />
                  <FooterText style={{ margin: 0 }}>info@blockchainplatform.com</FooterText>
                </ContactItem>
                <ContactItem whileHover={{ x: 5 }}>
                  <Icon
                    icon="ph:phone"
                    style={{
                      color: '#6c5ce7',
                      fontSize: '1.4rem',
                      filter: 'drop-shadow(0 0 8px rgba(108, 92, 231, 0.5))'
                    }}
                  />
                  <FooterText style={{ margin: 0 }}>+86 123 4567 8901</FooterText>
                </ContactItem>
                <ContactItem whileHover={{ x: 5 }}>
                  <Icon
                    icon="ph:map-pin"
                    style={{
                      color: '#6c5ce7',
                      fontSize: '1.4rem',
                      filter: 'drop-shadow(0 0 8px rgba(108, 92, 231, 0.5))'
                    }}
                  />
                  <FooterText style={{ margin: 0 }}>区块链大厦，科技园区</FooterText>
                </ContactItem>
              </FooterCard>

              <FooterCard
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <FooterTitle>
                  <Icon
                    icon="ph:share-network-fill"
                    style={{ color: '#6c5ce7', fontSize: '1.8rem' }}
                  />
                  关注我们
                </FooterTitle>
                <FooterText>关注我们的社交媒体，获取最新的区块链资讯和平台动态。</FooterText>
                <SocialLinkGrid>
                  <SocialLink href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Icon
                      icon="ph:twitter-logo-fill"
                      style={{
                        color: '#6c5ce7',
                        fontSize: '1.4rem',
                        filter: 'drop-shadow(0 0 8px rgba(108, 92, 231, 0.5))'
                      }}
                    />
                    Twitter
                  </SocialLink>
                  <SocialLink href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Icon
                      icon="ph:discord-logo-fill"
                      style={{
                        color: '#6c5ce7',
                        fontSize: '1.4rem',
                        filter: 'drop-shadow(0 0 8px rgba(108, 92, 231, 0.5))'
                      }}
                    />
                    Discord
                  </SocialLink>
                  <SocialLink href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Icon
                      icon="ph:telegram-logo-fill"
                      style={{
                        color: '#6c5ce7',
                        fontSize: '1.4rem',
                        filter: 'drop-shadow(0 0 8px rgba(108, 92, 231, 0.5))'
                      }}
                    />
                    Telegram
                  </SocialLink>
                  <SocialLink href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Icon
                      icon="ph:youtube-logo-fill"
                      style={{
                        color: '#6c5ce7',
                        fontSize: '1.4rem',
                        filter: 'drop-shadow(0 0 8px rgba(108, 92, 231, 0.5))'
                      }}
                    />
                    YouTube
                  </SocialLink>
                  <SocialLink href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Icon
                      icon="ph:medium-logo-fill"
                      style={{
                        color: '#6c5ce7',
                        fontSize: '1.4rem',
                        filter: 'drop-shadow(0 0 8px rgba(108, 92, 231, 0.5))'
                      }}
                    />
                    Medium
                  </SocialLink>
                  <SocialLink href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Icon
                      icon="ph:github-logo-fill"
                      style={{
                        color: '#6c5ce7',
                        fontSize: '1.4rem',
                        filter: 'drop-shadow(0 0 8px rgba(108, 92, 231, 0.5))'
                      }}
                    />
                    GitHub
                  </SocialLink>
                </SocialLinkGrid>
              </FooterCard>
            </FooterCardGrid>

            <CopyrightContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                <Icon icon="ph:copyright" style={{ fontSize: '1.1rem' }} />
                <span>2025 区块链交易平台. 版权所有</span>
              </motion.div>
              <span style={{ margin: '0 8px' }}>|</span>
              <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                <Icon icon="ph:scroll" style={{ color: '#6c5ce7' }} />
                <span>服务条款</span>
              </motion.div>
              <span style={{ margin: '0 8px' }}>|</span>
              <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                <Icon icon="ph:eye" style={{ color: '#6c5ce7' }} />
                <span>隐私政策</span>
              </motion.div>
            </CopyrightContainer>
          </div>

          {/* 3D效果装饰元素 */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '100%',
              height: '150px',
              background: 'linear-gradient(to top, rgba(108, 92, 231, 0.2), transparent)',
              zIndex: 1,
              transformStyle: 'preserve-3d',
              transform: 'rotateX(70deg) translateZ(-50px)',
              opacity: 0.5
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: 'mirror'
            }}
          />

          {/* 波浪动画装饰 */}
          <svg
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '100%',
              height: '120px',
              zIndex: 2,
              opacity: 0.3
            }}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
          >
            <defs>
              <motion.path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                animate={{
                  d: [
                    'M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z',
                    'M-160 34c30 0 58-14 88-14s 58 14 88 14 58-14 88-14 58 14 88 14 v44h-352z',
                    'M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
                  ]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut'
                }}
              />
            </defs>
            <motion.g>
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(108, 92, 231, 0.3)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(0, 206, 201, 0.2)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(108, 92, 231, 0.1)" />
            </motion.g>
          </svg>
        </Footer>
      </PageContainer>
    </TransactionsProvider>
  )
}

export default Web3Transaction
