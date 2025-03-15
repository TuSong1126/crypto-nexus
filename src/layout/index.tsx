import './index.scss'

import { Icon } from '@iconify/react'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { Suspense, useState } from 'react'
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
  const [isMenuHovered, setIsMenuHovered] = useState(false)
  const userInfo = useUserInfoStore((state) => state.userInfo)

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

  return (
    <div className={classNames('web3-layout-wrapper', { 'style-mode': VITE_STYLE_MODE === 'true' })}>
      <ParticleBackground count={100} connectParticles={true} opacity={0.5} color="#6c5ce7" speed={0.3} />

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

      <motion.div className="web3-header-wrapper" variants={headerVariants} initial="initial" animate="animate">
        <motion.div
          className="logo"
          onClick={() => router.push(VITE_APP_HOMEPAGE)}
          variants={logoVariants}
          whileHover="whileHover"
        >
          <Icon icon="fluent-emoji:rocket" width={32} height={32} className="logo-icon" />
          <span className="logo-text">Web3 World</span>
        </motion.div>

        <motion.div
          className="menu"
          variants={menuVariants}
          onMouseEnter={() => setIsMenuHovered(true)}
          onMouseLeave={() => setIsMenuHovered(false)}
        >
          {menuList.map((item) => (
            <motion.div key={item.path} variants={menuItemVariants} whileHover={{ scale: 1.05 }}>
              <NavLink
                to={item.path || VITE_APP_HOMEPAGE}
                className={({ isActive }) => classNames('menu-item', { active: isActive })}
              >
                {item.meta?.icon && <Icon icon={item.meta.icon} className="menu-icon" />}
                <span className="menu-text">{item.meta?.title}</span>
                {isMenuHovered && (
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
          <div className="user-info">
            <motion.div className="avatar" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Icon icon="ph:user-circle-fill" width={36} height={36} />
            </motion.div>
            <div className="user-dropdown">
              <div className="user-name">{userInfo?.nickname || userInfo?.name || '用户'}</div>

              <div className="dropdown-menu">
                <motion.div className="dropdown-item" whileHover={{ x: 5, backgroundColor: 'rgba(108, 92, 231, 0.2)' }}>
                  <Icon icon="ph:user-gear" width={18} height={18} />
                  <span>个人设置</span>
                </motion.div>
                <motion.div className="dropdown-item" whileHover={{ x: 5, backgroundColor: 'rgba(108, 92, 231, 0.2)' }}>
                  <Icon icon="ph:wallet" width={18} height={18} />
                  <span>我的钱包</span>
                </motion.div>
                <motion.div
                  className="dropdown-item"
                  onClick={handleLogout}
                  whileHover={{ x: 5, backgroundColor: 'rgba(108, 92, 231, 0.2)' }}
                >
                  <Icon icon="ph:sign-out" width={18} height={18} />
                  <span>退出登录</span>
                </motion.div>
              </div>
            </div>
          </div>

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
            >
              <Icon icon="ph:gear-six" width={22} height={22} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="web3-main-content-wrapper">
        <Suspense fallback={<CircleLoading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
