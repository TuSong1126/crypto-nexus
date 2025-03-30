import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import styled from 'styled-components'

import Web3Card from '@/components/web3/Web3Card'

import { TransactionContext } from '../context/TransactionContext'
import { shortenAddress } from '../utils/shortenAddress'

// 示例数据，用于展示界面
const dummyData = [
  {
    id: 1,
    url: 'https://metro.co.uk/wp-content/uploads/2015/05/transfer_1431348094.gif?quality=90&strip=all&zoom=1&resize=540%2C284',
    message: '交易成功完成',
    timestamp: '刚刚',
    addressFrom: '0xCF8e569A97C423952DdFf902375C7C76549A6A90',
    amount: '0.01',
    addressTo: '0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE'
  },
  {
    id: 2,
    url: 'https://i.pinimg.com/originals/68/a0/9e/68a09e774e98242871c2db0f99307420.gif',
    message: '以太坊转账',
    timestamp: '1小时前',
    addressFrom: '0xCF8e569A97C423952DdFf902375C7C76549A6A90',
    amount: '0.02',
    addressTo: '0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE'
  },
  {
    id: 3,
    url: 'https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif',
    message: '感谢您的信任',
    timestamp: '昨天',
    addressFrom: '0xCF8e569A97C423952DdFf902375C7C76549A6A90',
    amount: '0.03',
    addressTo: '0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE'
  }
]

interface TransactionCardProps {
  addressTo: string
  addressFrom: string
  timestamp: string
  message: string
  keyword?: string
  amount: string | number
  url?: string
  id?: number
}

const TransactionsContainer = styled.div`
  width: 100%;
  padding: 4rem 1rem;
  position: relative;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(15, 14, 19, 0.8), rgba(15, 14, 19, 0.9));
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.5));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  margin-bottom: 1rem;
`

const Subtitle = styled(motion.p)`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
`

const EmptyStateContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  margin: 2rem auto;
  max-width: 500px;
`

const EmptyStateText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  text-align: center;
`

const ConnectButton = styled(motion.button)`
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

const TransactionsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`

const TransactionCardWrapper = styled(motion.div)`
  height: 100%;
  overflow: hidden;
`

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
  margin-bottom: -8px;
`

const TransactionCardContent = styled.div`
  padding: 1rem;
`

const TimeStamp = styled.div`
  display: inline-block;
  background: rgba(108, 92, 231, 0.2);
  color: #6c5ce7;
  padding: 0.35rem 0.75rem;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 1rem;
`

const AddressLine = styled.a`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    color: #6c5ce7;
  }
`

const AddressLabel = styled.span`
  background: rgba(108, 92, 231, 0.2);
  color: #6c5ce7;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  font-size: 0.8rem;
`

const AmountContainer = styled.div`
  background: rgba(108, 92, 231, 0.1);
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  margin: 0.75rem 0;
`

const AmountLabel = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`

const AmountValue = styled.span`
  color: white;
  font-weight: 600;
`

const MessageContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 0.75rem;
`

const MessageText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: 0;
`

const TransactionCard: React.FC<TransactionCardProps> = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  amount,
  url
}) => {
  return (
    <Web3Card variant="glass" hover={true}>
      <CardImage src={url} alt="交易相关图片" />

      <TransactionCardContent>
        <TimeStamp>{timestamp}</TimeStamp>

        <AddressLine href={`https://etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
          <AddressLabel>从</AddressLabel>
          {shortenAddress(addressFrom)}
        </AddressLine>

        <AddressLine href={`https://etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
          <AddressLabel>至</AddressLabel>
          {shortenAddress(addressTo)}
        </AddressLine>

        <AmountContainer>
          <AmountLabel>金额:</AmountLabel>
          <AmountValue>{amount} ETH</AmountValue>
        </AmountContainer>

        {message && (
          <MessageContainer>
            <MessageText>{message}</MessageText>
          </MessageContainer>
        )}
      </TransactionCardContent>
    </Web3Card>
  )
}

const Transactions: React.FC = () => {
  const { transactions, currentAccount } = useContext(TransactionContext)

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

  return (
    <TransactionsContainer>
      <ContentWrapper>
        <Header>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Title variants={itemVariants}>{currentAccount ? '最新交易' : '交易历史'}</Title>

            <Subtitle variants={itemVariants}>
              {currentAccount ? '查看区块链上所有已确认的最新交易记录' : '连接您的以太坊钱包，查看您的交易历史'}
            </Subtitle>
          </motion.div>
        </Header>

        {!currentAccount ? (
          <EmptyStateContainer variants={containerVariants} initial="hidden" animate="visible">
            <EmptyStateText>请连接您的钱包以查看交易历史</EmptyStateText>
            <ConnectButton variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              连接钱包
            </ConnectButton>
          </EmptyStateContainer>
        ) : (
          <TransactionsGrid variants={containerVariants} initial="hidden" animate="visible">
            {[...dummyData, ...transactions].reverse().map((transaction, i) => (
              <TransactionCardWrapper key={i} variants={itemVariants}>
                <TransactionCard {...transaction} />
              </TransactionCardWrapper>
            ))}
          </TransactionsGrid>
        )}
      </ContentWrapper>
    </TransactionsContainer>
  )
}

export default Transactions
