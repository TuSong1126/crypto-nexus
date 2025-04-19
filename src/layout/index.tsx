import './index.scss'

import { Icon } from '@iconify/react'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { Suspense, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import { CircleLoading } from '@/components/basic/circle-loading'
import ParticleBackground from '@/components/web3/ParticleBackground'
import { useRouter } from '@/hooks/basic/useRouter'
import businessRoutes from '@/router/routes/index'
import useUserInfoStore from '@/store/userInfo'

const { VITE_APP_HOMEPAGE, VITE_STYLE_MODE } = import.meta.env

export default function Layout() {
  // 首页不在菜单中展示(注意斜杠)
  const menuList = businessRoutes.filter((i) => !VITE_APP_HOMEPAGE.includes(i.meta?.permissionKey))
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const userInfo = useUserInfoStore((state) => state.userInfo)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // 点击外部区域关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // 监听滚动显示/隐藏回到顶部按钮
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setShowBackToTop(contentRef.current.scrollTop > 300)
      }
    }

    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll)
      return () => {
        contentElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const menuVariants = {
    initial: {
      opacity: 0,
      y: -20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const menuItemVariants = {
    initial: {
      opacity: 0,
      y: -10
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    whileHover: {
      scale: 1.05,
      rotate: [0, -1, 1, -1, 0],
      transition: {
        duration: 0.3
      }
    }
  }

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  }

  const handleLogout = () => {
    // 清除用户信息和token
    useUserInfoStore.getState().resetUserInfo()
    router.push('/login')
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullScreen(true)
        })
        .catch((err) => {
          console.error(`全屏切换错误: ${err.message}`)
        })
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullScreen(false)
          })
          .catch((err) => {
            console.error(`退出全屏错误: ${err.message}`)
          })
      }
    }
  }

  // 检测全屏状态变化
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullScreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange)
    }
  }, [])

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div
      className={classNames('web3-layout-wrapper', { 'style-mode': VITE_STYLE_MODE === 'true' })}
    >
      <ParticleBackground
        count={100}
        connectParticles={true}
        opacity={0.5}
        color="#6c5ce7"
        speed={0.3}
      />

      <motion.div
        className="floating-orb orb-1"
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
        className="floating-orb orb-2"
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

      <motion.div
        className="web3-header-wrapper"
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="logo"
          onClick={() => router.push(VITE_APP_HOMEPAGE)}
          variants={logoVariants}
          whileHover="whileHover"
        >
          <span className="logo-text">CryptoNexus</span>
        </motion.div>

        <motion.div className="menu" variants={menuVariants}>
          {menuList.map((item) => (
            <motion.div
              onMouseEnter={() => (item.active = true)}
              onMouseLeave={() => (item.active = false)}
              key={item.path}
              variants={menuItemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <NavLink
                to={item.path || VITE_APP_HOMEPAGE}
                className={({ isActive }) => classNames('menu-item', { active: isActive })}
              >
                {item.meta?.icon && <Icon icon={item.meta.icon} className="menu-icon" />}
                <span className="menu-text">{item.meta?.title}</span>
                {item.active && (
                  <motion.span
                    className="menu-hover-effect"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </NavLink>
            </motion.div>
          ))}
        </motion.div>

        <div className="right-section">
          <div className="toolbar">
            <motion.div
              className="toolbar-item"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(108, 92, 231, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="ph:bell" width={22} height={22} />
              <span className="badge">3</span>
            </motion.div>

            <motion.div
              className="toolbar-item"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(108, 92, 231, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFullScreen}
            >
              <Icon icon={isFullScreen ? 'ph:arrows-in' : 'ph:arrows-out'} width={22} height={22} />
            </motion.div>
          </div>

          <div className="user-info">
            <motion.div className="avatar" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Icon icon="ph:user-circle-fill" width={36} height={36} />
            </motion.div>

            <div className="user-dropdown" ref={dropdownRef}>
              <motion.div
                className="user-name"
                whileHover={{ color: '#6c5ce7' }}
                onClick={toggleDropdown}
              >
                <span>{userInfo?.nickname || userInfo?.name || '用户'}</span>
                <Icon
                  icon="ph:caret-down"
                  className="dropdown-icon"
                  width={16}
                  height={16}
                  style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </motion.div>

              {isDropdownOpen && (
                <motion.div
                  className="dropdown-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="menu-header">
                    <div className="user-avatar">
                      <Icon icon="ph:user-circle-fill" width={40} height={40} />
                    </div>
                    <div className="user-details">
                      <div className="user-display-name">
                        {userInfo?.nickname || userInfo?.name || '用户'}
                      </div>
                      <div className="user-role">Web3爱好者</div>
                    </div>
                  </div>

                  <div className="menu-divider"></div>

                  <motion.div
                    className="dropdown-item"
                    whileHover={{ x: 5, backgroundColor: 'rgba(108, 92, 231, 0.2)' }}
                  >
                    <Icon icon="ph:user-gear" width={18} height={18} />
                    <span>个人设置</span>
                  </motion.div>
                  <motion.div
                    className="dropdown-item"
                    whileHover={{ x: 5, backgroundColor: 'rgba(108, 92, 231, 0.2)' }}
                  >
                    <Icon icon="ph:wallet" width={18} height={18} />
                    <span>我的钱包</span>
                  </motion.div>

                  <div className="menu-divider"></div>

                  <motion.div
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                    whileHover={{ x: 5, backgroundColor: 'rgba(255, 86, 86, 0.15)' }}
                  >
                    <Icon icon="ph:sign-out" width={18} height={18} />
                    <span>退出登录</span>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="web3-main-content-wrapper" ref={contentRef}>
        <Suspense fallback={<CircleLoading />}>
          <Outlet />
        </Suspense>

        {showBackToTop && (
          <motion.div
            className="back-to-top"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(108, 92, 231, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon icon="ph:arrow-up" width={24} height={24} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
