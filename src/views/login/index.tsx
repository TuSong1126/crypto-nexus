import './index.scss'

import { Icon } from '@iconify/react'
import { message } from 'antd'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { fetchLogin, fetchPermission, fetchRegister } from '@/apis/auth'
import Web3Logo from '@/assets/svg/logo.svg'
import ParticleBackground from '@/components/web3/ParticleBackground'
import Web3Button from '@/components/web3/Web3Button'
import { useRouter } from '@/hooks/basic/useRouter'
import useUserInfoStore from '@/store/userInfo'

const { VITE_APP_HOMEPAGE } = import.meta.env

const Login = () => {
  const userInfoStore = useUserInfoStore()
  const router = useRouter()

  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('123456')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [activeTab, setActiveTab] = useState('login') // login or register

  const handleLogin = async () => {
    if (!username || !password) {
      message.error('请输入正确的账号和密码！')
      return
    }

    setIsLoggingIn(true)
    try {
      const { data } = await fetchLogin({ username, password })
      const { token, userInfo } = data
      userInfoStore.updateToken(token)
      userInfoStore.updateUserInfo(userInfo)

      const { data: perm } = await fetchPermission()
      userInfoStore.updatePermission({
        btns: perm.btns,
        routes: perm.routes
      })

      message.success('登录成功，欢迎回来！')
      router.replace(VITE_APP_HOMEPAGE)
    } catch (error) {
      message.error('登录失败，请检查账号和密码')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleRegister = async () => {
    if (!username || !password) {
      message.error('请输入正确的账号和密码！')
      return
    }

    setIsRegistering(true)
    try {
      const { msg } = await fetchRegister({ username, password })
      message.success(msg)
      setActiveTab('login')
    } catch (error) {
      message.error('注册失败，请稍后再试')
    } finally {
      setIsRegistering(false)
    }
  }

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (activeTab === 'login') {
        handleLogin()
      } else {
        handleRegister()
      }
    }
  }

  return (
    <div className="web3-login-wrapper">
      <ParticleBackground
        color="#6c5ce7"
        count={150}
        connectParticles={true}
        opacity={0.7}
        minSize={1}
        maxSize={4}
        speed={0.3}
      />

      <motion.div
        className="floating-orb orb-1"
        animate={{
          y: ['-10%', '10%'],
          x: ['-5%', '5%']
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
          y: ['10%', '-10%'],
          x: ['5%', '-5%']
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />

      <motion.div className="web3-login-container" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="web3-login-left" variants={itemVariants}>
          <div className="web3-decoration top"></div>
          <div className="web3-decoration bottom"></div>

          <motion.div className="web3-illustration" variants={itemVariants} whileHover={{ scale: 1.05, rotate: 5 }}>
            <img src={Web3Logo} alt="Web3" width={240} height={240} />
          </motion.div>

          <motion.h2 className="web3-tagline" variants={itemVariants}>
            Web3 World
          </motion.h2>

          <motion.p className="web3-description" variants={itemVariants}>
            连接区块链技术，释放数字资产的无限潜力;
          </motion.p>
          <motion.p className="web3-description" variants={itemVariants}>
            探索未来世界，开启无限可能。
          </motion.p>
        </motion.div>

        <motion.div className="web3-login-right">
          <motion.div className="web3-login-tabs" variants={itemVariants}>
            <div className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
              登录
            </div>
            <div className={`tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>
              注册
            </div>
          </motion.div>

          <motion.div className="web3-login-form" variants={itemVariants}>
            <div className="form-group">
              <label htmlFor="username">账号</label>
              <div className="input-wrapper">
                <Icon icon="mdi:account" className="input-icon" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="请输入账号"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">密码</label>
              <div className="input-wrapper">
                <Icon icon="mdi:lock" className="input-icon" />
                <input
                  id="password"
                  type="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="请输入密码"
                />
              </div>
            </div>

            {activeTab === 'login' ? (
              <Web3Button onClick={handleLogin} isLoading={isLoggingIn} fullWidth size="large" gradient glow>
                登录
              </Web3Button>
            ) : (
              <Web3Button onClick={handleRegister} isLoading={isRegistering} fullWidth size="large" gradient>
                注册
              </Web3Button>
            )}

            <div className="web3-login-divider">
              <span>或者</span>
            </div>

            <motion.div
              className="web3-metamask-button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => message.info('区块链钱包连接功能尚未实现')}
            >
              <img src={Web3Logo} alt="Web3" width={36} height={36} />
              <span>连接区块链钱包</span>
            </motion.div>
          </motion.div>

          <motion.p className="web3-login-footer" variants={itemVariants}>
            © 2025 Web3 World. All rights reserved.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login
