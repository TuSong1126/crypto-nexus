import { motion } from 'framer-motion'
import React, { useContext } from 'react'
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
`

const EthCard = styled(motion.div)`
  background: linear-gradient(135deg, #6c5ce7, #00cec9);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  box-shadow: 0 10px 30px rgba(108, 92, 231, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    opacity: 0.2;
  }
`

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const EthLogo = styled.div`
  width: 3rem;
  height: 3rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.8);
  font-weight: bold;
  font-size: 1.2rem;
  color: white;
`

const CardBottom = styled.div`
  color: white;
`

const WalletAddress = styled.p`
  font-size: 0.875rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
`

const EthText = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
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
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } =
    useContext(TransactionContext)

  const handleSubmit = (e: React.FormEvent) => {
    const { addressTo, amount, keyword, message } = formData

    e.preventDefault()

    if (!addressTo || !amount || !keyword || !message) return

    sendTransaction()
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
          <Title variants={itemVariants}>
            在区块链上
            <br />
            发送数字货币
          </Title>

          <Description variants={itemVariants}>探索加密世界。在我们的平台上轻松买卖加密货币。</Description>

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
          <EthCard variants={itemVariants} whileHover={{ y: -5 }}>
            <CardTop>
              <EthLogo>ETH</EthLogo>
              <span style={{ color: 'white', fontSize: '1.5rem' }}>ⓘ</span>
            </CardTop>

            <CardBottom>
              <WalletAddress>{shortenAddress(currentAccount)}</WalletAddress>
              <EthText>以太坊</EthText>
            </CardBottom>
          </EthCard>

          <FormCard variants={itemVariants}>
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
