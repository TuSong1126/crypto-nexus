import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import Web3Card from '@/components/web3/Web3Card'

import { TransactionContext } from '../context/TransactionContext'
import { shortenAddress } from '../utils/shortenAddress'

// 示例数据，用于展示界面
const dummyData = [
  {
    url: 'https://metro.co.uk/wp-content/uploads/2015/05/transfer_1431348094.gif?quality=90&strip=all&zoom=1&resize=540%2C284',
    message: '交易成功完成',
    timestamp: '刚刚',
    addressFrom: '0xCF8e569A97C423952DdFf902375C7C76549A6A90',
    amount: '0.01',
    addressTo: '0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE'
  },
  {
    url: 'https://i.pinimg.com/originals/68/a0/9e/68a09e774e98242871c2db0f99307420.gif',
    message: '以太坊转账',
    timestamp: '1小时前',
    addressFrom: '0xCF8e569A97C423952DdFf902375C7C76549A6A90',
    amount: '0.02',
    addressTo: '0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE'
  },
  {
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
  text-align: left;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

const TitleContainer = styled.div`
  flex: 1;
`

const Title = styled(motion.h2)`
  font-size: 3.2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  margin-bottom: 1.2rem;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  position: relative;

  &::before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 2px;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(108, 92, 231, 0.8), rgba(0, 206, 201, 0.8));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: -1;
    filter: blur(8px);
    opacity: 0.7;
  }
`

const Subtitle = styled(motion.p)`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  position: relative;
  line-height: 1.5;
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
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`

const ConnectButton = styled(motion.button)`
  background: linear-gradient(45deg, #6c5ce7, #00cec9);
  border: none;
  border-radius: 8px;
  padding: 0.85rem 2.8rem;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 4px 15px rgba(108, 92, 231, 0.4),
    0 0 0 1px rgba(108, 92, 231, 0.3) inset;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 7px 20px rgba(108, 92, 231, 0.6),
      0 0 0 1px rgba(108, 92, 231, 0.5) inset;
  }

  &:active {
    transform: translateY(1px);
  }
`

// 新增视图切换组件
const ViewToggle = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50px;
  padding: 0.5rem;
  width: fit-content;
`

const ToggleButton = styled(motion.button)<{ $active: boolean }>`
  background: ${(props) =>
    props.$active ? 'linear-gradient(45deg, #6c5ce7, #00cec9)' : 'transparent'};
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 1.7rem;
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;
  box-shadow: ${(props) => (props.$active ? '0 5px 15px rgba(0, 0, 0, 0.2)' : 'none')};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    opacity: 0;
    z-index: -1;
    background: rgba(255, 255, 255, 0.1);
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    background: ${(props) =>
      props.$active ? 'linear-gradient(45deg, #6c5ce7, #00cec9)' : 'rgba(255, 255, 255, 0.1)'};
  }
`

// 网格视图样式
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
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(108, 92, 231, 0.2);
  color: #6c5ce7;
  padding: 0.4rem 0.85rem;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 1rem;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(108, 92, 231, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 30px;
    background: linear-gradient(90deg, rgba(108, 92, 231, 0.2), rgba(0, 206, 201, 0.2));
    z-index: -1;
    filter: blur(5px);
    opacity: 0.7;
  }
`

const AddressLine = styled.a`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    color: #6c5ce7;
    background: rgba(108, 92, 231, 0.1);
    border-color: rgba(108, 92, 231, 0.3);
    transform: translateX(5px);
  }
`

const AddressLabel = styled.span`
  background: rgba(108, 92, 231, 0.2);
  color: #6c5ce7;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  margin-right: 0.75rem;
  font-size: 0.9rem;
  border: 1px solid rgba(108, 92, 231, 0.3);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  font-size: 1rem;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`

const AmountValue = styled.span`
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  z-index: 1;
  background: linear-gradient(90deg, #fff, #6c5ce7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`

const MessageContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 0.75rem;
`

const MessageText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin: 0;
  position: relative;
  padding-left: 1.5rem;
  line-height: 1.4;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0.85rem;
    height: 0.85rem;
    background: linear-gradient(135deg, #6c5ce7, #00cec9);
    border-radius: 50%;
    opacity: 0.8;
  }
`

// 3D交易卡片组件
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
        <TimeStamp>
          <Icon icon="ph:clock-fill" style={{ fontSize: '1.1rem' }} />
          {timestamp}
        </TimeStamp>

        <AddressLine
          href={`https://etherscan.io/address/${addressFrom}`}
          target="_blank"
          rel="noreferrer"
        >
          <AddressLabel>从</AddressLabel>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Icon icon="ph:user-circle-fill" style={{ color: '#6c5ce7', fontSize: '1.2rem' }} />
            {shortenAddress(addressFrom)}
          </span>
        </AddressLine>

        <AddressLine
          href={`https://etherscan.io/address/${addressTo}`}
          target="_blank"
          rel="noreferrer"
        >
          <AddressLabel>至</AddressLabel>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Icon icon="ph:user-circle-fill" style={{ color: '#00cec9', fontSize: '1.2rem' }} />
            {shortenAddress(addressTo)}
          </span>
        </AddressLine>

        <AmountContainer>
          <AmountLabel>
            <Icon icon="ph:currency-eth-fill" style={{ color: '#6c5ce7', fontSize: '1.2rem' }} />
            金额:
          </AmountLabel>
          <AmountValue>
            <span style={{ fontSize: '1.25rem' }}>Ξ</span>
            {amount} ETH
          </AmountValue>
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

// 视图类型枚举
enum ViewType {
  GRID = 'grid',
  TIMELINE = 'timeline',
  TABLE = 'table'
}

// 表格视图样式
const TableContainer = styled(motion.div)`
  width: 100%;
  overflow-x: auto;
  margin: 2rem 0;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: white;
`

const TableHeader = styled.thead`
  background: linear-gradient(90deg, rgba(20, 20, 35, 0.6), rgba(20, 20, 35, 0.8));
  border-radius: 16px 16px 0 0;
  position: relative;

  th {
    padding: 1.25rem 1rem;
    text-align: left;
    font-weight: 600;
    position: relative;
    color: white;
    font-size: 1.1rem;
    letter-spacing: 0.5px;

    &:first-child {
      border-top-left-radius: 16px;
    }

    &:last-child {
      border-top-right-radius: 16px;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, rgba(108, 92, 231, 0.2), rgba(0, 206, 201, 0.2));
      transform: scaleX(0.97);
    }
  }
`

const TableRow = styled(motion.tr)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(108, 92, 231, 0.1);
  }

  &:last-child td {
    border-bottom: none;

    &:first-child {
      border-bottom-left-radius: 16px;
    }

    &:last-child {
      border-bottom-right-radius: 16px;
    }
  }
`

const TableCell = styled.td`
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 1.05rem;
  position: relative;
  transition: all 0.3s ease;
`

const StatusBadge = styled.span<{ $type: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 500;
  background: ${({ $type }) => {
    switch ($type) {
      case 'recent':
        return 'rgba(108, 92, 231, 0.2)'
      case 'hour':
        return 'rgba(0, 206, 201, 0.2)'
      default:
        return 'rgba(255, 255, 255, 0.1)'
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case 'recent':
        return '#6c5ce7'
      case 'hour':
        return '#00cec9'
      default:
        return 'rgba(255, 255, 255, 0.7)'
    }
  }};
  border: 1px solid
    ${({ $type }) => {
      switch ($type) {
        case 'recent':
          return 'rgba(108, 92, 231, 0.3)'
        case 'hour':
          return 'rgba(0, 206, 201, 0.3)'
        default:
          return 'rgba(255, 255, 255, 0.1)'
      }
    }};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $type }) => {
      switch ($type) {
        case 'recent':
          return '#6c5ce7'
        case 'hour':
          return '#00cec9'
        default:
          return 'rgba(255, 255, 255, 0.5)'
      }
    }};
  }
`

const AddressWithIcon = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #6c5ce7;
  }
`

const AddressIcon = styled.div<{ $from?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  background: ${({ $from }) =>
    $from
      ? 'linear-gradient(135deg, #6c5ce7, #a29bfe)'
      : 'linear-gradient(135deg, #00cec9, #81ecec)'};
`

const AmountCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`

const EthIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #627eea;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: white;
  font-weight: bold;
`

const TableActionButton = styled.button`
  background: rgba(108, 92, 231, 0.1);
  border: 1px solid rgba(108, 92, 231, 0.3);
  border-radius: 8px;
  padding: 0.6rem 0.85rem;
  color: white;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: all 0.5s ease;
  }

  &:hover {
    background: rgba(108, 92, 231, 0.2);
    border-color: rgba(108, 92, 231, 0.5);
    transform: translateY(-2px);

    &::before {
      left: 100%;
    }
  }
`

// 得到交易状态类型
const getStatusType = (timestamp: string): string => {
  if (timestamp.includes('刚刚')) return 'recent'
  if (timestamp.includes('小时')) return 'hour'
  return 'default'
}

// 表格视图组件
const TransactionTable: React.FC<{ transactions: TransactionCardProps[] }> = ({ transactions }) => {
  return (
    <TableContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StyledTable>
        <TableHeader>
          <tr>
            <th>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Icon icon="ph:clock-fill" style={{ fontSize: '1.2rem' }} /> 时间
              </span>
            </th>
            <th>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Icon icon="ph:user-circle-fill" style={{ fontSize: '1.2rem' }} /> 发送方
              </span>
            </th>
            <th>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Icon icon="ph:user-circle-fill" style={{ fontSize: '1.2rem' }} /> 接收方
              </span>
            </th>
            <th>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Icon icon="ph:currency-eth-fill" style={{ fontSize: '1.2rem' }} /> 金额
              </span>
            </th>
            <th>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Icon icon="ph:chat-text-fill" style={{ fontSize: '1.2rem' }} /> 消息
              </span>
            </th>
            <th>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Icon icon="ph:gear-fill" style={{ fontSize: '1.2rem' }} /> 操作
              </span>
            </th>
          </tr>
        </TableHeader>
        <tbody>
          {transactions.map((tx, index) => (
            <TableRow
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <TableCell>
                <StatusBadge $type={getStatusType(tx.timestamp)}>
                  {getStatusType(tx.timestamp) === 'recent' ? (
                    <Icon icon="ph:clock-countdown-fill" style={{ fontSize: '1.1rem' }} />
                  ) : (
                    <Icon icon="ph:clock-fill" style={{ fontSize: '1.1rem' }} />
                  )}
                  {tx.timestamp}
                </StatusBadge>
              </TableCell>
              <TableCell>
                <AddressWithIcon
                  href={`https://etherscan.io/address/${tx.addressFrom}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AddressIcon $from>{tx.addressFrom.substring(2, 4)}</AddressIcon>
                  {shortenAddress(tx.addressFrom)}
                </AddressWithIcon>
              </TableCell>
              <TableCell>
                <AddressWithIcon
                  href={`https://etherscan.io/address/${tx.addressTo}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AddressIcon>{tx.addressTo.substring(2, 4)}</AddressIcon>
                  {shortenAddress(tx.addressTo)}
                </AddressWithIcon>
              </TableCell>
              <TableCell>
                <AmountCell>
                  <EthIcon>Ξ</EthIcon>
                  {tx.amount} ETH
                </AmountCell>
              </TableCell>
              <TableCell>{tx.message}</TableCell>
              <TableCell>
                <TableActionButton
                  onClick={() => window.open(`https://etherscan.io/tx/${tx.id}`, '_blank')}
                >
                  <Icon icon="ph:arrow-square-out-fill" style={{ fontSize: '1.1rem' }} />
                  查看详情
                </TableActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  )
}

const Transactions: React.FC = () => {
  const { transactions, currentAccount } = useContext(TransactionContext)
  const [viewType, setViewType] = useState<ViewType>(ViewType.TABLE)

  // 合并示例数据和真实交易数据
  const allTransactions = [...dummyData, ...transactions].reverse()

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
          <TitleContainer>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <Title data-text={currentAccount ? '最新交易' : '交易历史'} variants={itemVariants}>
                {currentAccount ? '最新交易' : '交易历史'}
              </Title>
              <Subtitle variants={itemVariants}>
                {currentAccount
                  ? '查看区块链上所有已确认的最新交易记录'
                  : '连接您的以太坊钱包，查看您的交易历史'}
              </Subtitle>
            </motion.div>
          </TitleContainer>

          {currentAccount && (
            <ViewToggle>
              <ToggleButton
                $active={viewType === ViewType.TABLE}
                onClick={() => setViewType(ViewType.TABLE)}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon="ph:table-fill" style={{ fontSize: '1.2rem' }} />
                表格视图
              </ToggleButton>
              <ToggleButton
                $active={viewType === ViewType.GRID}
                onClick={() => setViewType(ViewType.GRID)}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon="ph:grid-four-fill" style={{ fontSize: '1.2rem' }} />
                网格视图
              </ToggleButton>
            </ViewToggle>
          )}
        </Header>

        {!currentAccount ? (
          <EmptyStateContainer variants={containerVariants} initial="hidden" animate="visible">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ fontSize: '3.5rem', color: '#6c5ce7', marginBottom: '1.5rem' }}
            >
              <Icon icon="ph:wallet-fill" />
            </motion.div>
            <EmptyStateText>请连接您的钱包以查看交易历史</EmptyStateText>
            <ConnectButton
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="ph:plugs-connected-fill" style={{ fontSize: '1.3rem' }} />
              连接钱包
            </ConnectButton>
          </EmptyStateContainer>
        ) : (
          <>
            {/* 根据选择的视图类型显示不同的布局 */}
            {viewType === ViewType.GRID ? (
              <TransactionsGrid variants={containerVariants} initial="hidden" animate="visible">
                {allTransactions.map((transaction, i) => (
                  <TransactionCardWrapper
                    key={i}
                    variants={itemVariants}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.3 },
                      boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <TransactionCard {...transaction} />
                  </TransactionCardWrapper>
                ))}
              </TransactionsGrid>
            ) : (
              <TransactionTable transactions={allTransactions} />
            )}
          </>
        )}
      </ContentWrapper>
    </TransactionsContainer>
  )
}

export default Transactions
