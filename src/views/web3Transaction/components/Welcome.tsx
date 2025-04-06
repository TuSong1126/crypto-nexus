import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'

// 不再使用Web3Card
// import Web3Card from '@/components/web3/Web3Card'
// 使用Unicode符号或文本代替react-icons
// import { AiFillPlayCircle } from 'react-icons/ai'
// import { BsInfoCircle } from 'react-icons/bs'
// import { SiEthereum } from 'react-icons/si'
import { TransactionContext } from '../context/TransactionContext'
import { shortenAddress } from '../utils/shortenAddress'
// 修复Loader导入路径
import Loader from './Loader'

const WelcomeContainer = styled.div`
  width: 100%;
  padding: 4rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
`

const LeftSection = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 1024px) {
    padding-right: 2rem;
  }
`

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.5));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`

const Description = styled(motion.p)`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  max-width: 500px;
`

const ConnectButton = styled(motion.button)`
  background: linear-gradient(45deg, #6c5ce7, #00cec9);
  border: none;
  border-radius: 50px;
  padding: 0.75rem 2rem;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
  margin-bottom: 2rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(108, 92, 231, 0.6);
  }

  &:active {
    transform: translateY(1px);
  }
`

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
`

const FeatureItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1rem;
  backdrop-filter: blur(5px);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
  }
`

const FeatureIcon = styled.div`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: #6c5ce7;
`

const FeatureText = styled.p`
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
`

const RightSection = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  perspective: 2000px;
`

const EthCard = styled(motion.div)`
  height: 300px;
  background: linear-gradient(135deg, #6c5ce7, #00cec9);
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 15px 35px rgba(108, 92, 231, 0.4);
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: all 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
    opacity: 0.3;
    animation: shimmer 7s infinite linear;
  }

  &::after {
    content: '';
    position: absolute;
    width: 150%;
    height: 100px;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(-45deg) translateY(-50px);
    animation: shine 5s infinite ease-in-out;
    opacity: 0.2;
  }

  @keyframes shimmer {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes shine {
    0% {
      top: -100%;
      left: -100%;
    }
    100% {
      top: 100%;
      left: 100%;
    }
  }
`

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`

const EthLogo = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.8);
  font-weight: bold;
  font-size: 1.3rem;
  color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

const InfoIcon = styled(motion.span)`
  color: white;
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  cursor: pointer;
`

const CardBottom = styled.div`
  color: white;
`

const WalletAddress = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`

const AddressBadge = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  font-family: monospace;
  letter-spacing: 0.5px;
`

const AddressIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

const BalanceContainer = styled(motion.div)`
  background: rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`

const BalanceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NetworkLabel = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const BalanceText = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

const BalanceAmount = styled(motion.span)`
  background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const RefreshButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(15deg);
  }
`

const CopyTooltip = styled(motion.div)`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(0, 0, 0, 0.8);
  }
`

const FormCard = styled(motion.div)`
  backdrop-filter: blur(10px);
  background: rgba(39, 51, 89, 0.4);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`

const FormTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: left;
`

const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: white;
  margin-bottom: 1rem;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: #6c5ce7;
    box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #6c5ce7, #00cec9);
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(108, 92, 231, 0.4);
  }

  &:active {
    transform: translateY(1px);
  }
`

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  margin: 1rem 0;
`

const Welcome: React.FC = () => {
  const {
    currentAccount,
    connectWallet,
    handleChange,
    sendTransaction,
    formData,
    isLoading,
    accountBalance,
    getAccountBalance,
    copyToClipboard
  } = useContext(TransactionContext)

  const [showFullAddress, setShowFullAddress] = useState(false)
  const [showCopyTooltip, setShowCopyTooltip] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    const { addressTo, amount, keyword, message } = formData

    e.preventDefault()

    if (!addressTo || !amount || !keyword || !message) return

    sendTransaction()
  }

  const handleCopyAddress = () => {
    if (currentAccount) {
      copyToClipboard(currentAccount)
      setShowCopyTooltip(true)
      setTimeout(() => setShowCopyTooltip(false), 2000)
    }
  }

  const toggleAddressDisplay = () => {
    setShowFullAddress(!showFullAddress)
  }

  // 动画变量
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const features = [
    { icon: '⚡', text: '可靠性' },
    { icon: '🔒', text: '安全性' },
    { icon: 'Ξ', text: '以太坊' },
    { icon: '🌐', text: 'Web 3.0' },
    { icon: '💰', text: '低手续费' },
    { icon: '⛓', text: '区块链' }
  ]

  return (
    <WelcomeContainer>
      <ContentWrapper>
        <LeftSection variants={containerVariants} initial="hidden" animate="visible">
          {!currentAccount && (
            <ConnectButton
              variants={itemVariants}
              onClick={connectWallet}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>▶</span>
              连接钱包
            </ConnectButton>
          )}

          <FeaturesGrid variants={containerVariants}>
            {features.map((feature, index) => (
              <FeatureItem key={index} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureText>{feature.text}</FeatureText>
              </FeatureItem>
            ))}
          </FeaturesGrid>
        </LeftSection>

        <RightSection variants={containerVariants} initial="hidden" animate="visible">
          <EthCard
            variants={itemVariants}
            whileHover={{
              y: -10,
              rotateX: 5,
              boxShadow: '0 20px 40px rgba(108, 92, 231, 0.5)'
            }}
          >
            <CardTop>
              <EthLogo>ETH</EthLogo>
              <InfoIcon whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                ⓘ
              </InfoIcon>
            </CardTop>

            <CardBottom>
              <WalletAddress onClick={toggleAddressDisplay} style={{ position: 'relative' }}>
                <AddressBadge>
                  {currentAccount ? (showFullAddress ? currentAccount : shortenAddress(currentAccount)) : '未连接钱包'}
                </AddressBadge>

                {currentAccount && (
                  <AddressIcon whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Icon icon={showFullAddress ? 'ph:eye-slash' : 'ph:eye'} style={{ fontSize: '1rem' }} />
                  </AddressIcon>
                )}

                {currentAccount && (
                  <AddressIcon
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopyAddress()
                    }}
                  >
                    <Icon icon="ph:copy" style={{ fontSize: '1rem' }} />
                  </AddressIcon>
                )}

                {showCopyTooltip && (
                  <CopyTooltip initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    已复制到剪贴板
                  </CopyTooltip>
                )}
              </WalletAddress>

              <BalanceContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <BalanceRow>
                  <NetworkLabel>
                    <Icon icon="ph:globe" style={{ fontSize: '0.9rem' }} />
                    以太坊主网
                  </NetworkLabel>
                  <RefreshButton
                    onClick={getAccountBalance}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9, rotate: 30 }}
                  >
                    <Icon icon="ph:arrows-clockwise" style={{ fontSize: '0.9rem' }} />
                  </RefreshButton>
                </BalanceRow>

                {currentAccount ? (
                  <BalanceText
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Icon
                      icon="ph:currency-eth-fill"
                      style={{
                        color: 'white',
                        fontSize: '1.5rem'
                      }}
                    />
                    <BalanceAmount
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {accountBalance} ETH
                    </BalanceAmount>
                  </BalanceText>
                ) : (
                  <BalanceText>
                    <span style={{ opacity: 0.7 }}>请连接钱包查看余额</span>
                  </BalanceText>
                )}
              </BalanceContainer>
            </CardBottom>
          </EthCard>

          <FormCard variants={itemVariants} whileHover={{ y: -5 }}>
            <FormTitle>发送交易</FormTitle>

            <Input placeholder="接收地址" name="addressTo" type="text" onChange={(e) => handleChange(e, 'addressTo')} />

            <Input
              placeholder="金额 (ETH)"
              name="amount"
              type="number"
              step="0.0001"
              onChange={(e) => handleChange(e, 'amount')}
            />

            <Input placeholder="关键词 (Gif)" name="keyword" type="text" onChange={(e) => handleChange(e, 'keyword')} />

            <Input placeholder="输入消息" name="message" type="text" onChange={(e) => handleChange(e, 'message')} />

            <Divider />

            {isLoading ? (
              <Loader />
            ) : (
              <SubmitButton type="button" onClick={handleSubmit}>
                立即发送
              </SubmitButton>
            )}
          </FormCard>
        </RightSection>
      </ContentWrapper>
    </WelcomeContainer>
  )
}

export default Welcome
