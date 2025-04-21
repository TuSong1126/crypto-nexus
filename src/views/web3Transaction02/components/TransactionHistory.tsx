import React from 'react'

import {
  Card,
  CardTitle,
  DetailLabel,
  DetailValue,
  EmptyIcon,
  EmptyState,
  EmptyText,
  ErrorStatus,
  PendingStatus,
  SuccessStatus,
  TransactionDetailRow,
  TransactionDetails,
  TransactionHash,
  TransactionHeader,
  TransactionItem,
  TransactionList,
  TransactionStatus,
  TransactionTime,
  TransactionTitle,
  TransactionTitleContainer
} from '../config/styled'
import { TransactionType } from '../config/types'

// 扩展 TransactionType 类型以适应区块链交易数据
interface ExtendedTransactionType extends TransactionType {
  from?: string
  keyword?: string
}

interface TransactionHistoryProps {
  transactions: ExtendedTransactionType[]
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <Card>
        <CardTitle>
          <span>📜 交易历史</span>
        </CardTitle>
        <EmptyState>
          <EmptyIcon>📝</EmptyIcon>
          <EmptyText>暂无交易记录</EmptyText>
        </EmptyState>
      </Card>
    )
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getStatusComponent = (status: string) => {
    switch (status) {
      case 'success':
        return <SuccessStatus>✅ 成功</SuccessStatus>
      case 'pending':
        return <PendingStatus>⏳ 处理中</PendingStatus>
      case 'error':
        return <ErrorStatus>❌ 失败</ErrorStatus>
      default:
        return <TransactionStatus>未知</TransactionStatus>
    }
  }

  return (
    <Card>
      <CardTitle>
        <span>📜 区块链交易历史</span>
      </CardTitle>

      <TransactionList>
        {transactions.map((tx) => (
          <TransactionItem key={tx.id}>
            <TransactionHeader>
              <TransactionTitleContainer>
                <TransactionTitle>{tx.description || '以太坊交易'}</TransactionTitle>
                <TransactionTime>{formatDate(tx.timestamp)}</TransactionTime>
              </TransactionTitleContainer>
              {getStatusComponent(tx.status)}
            </TransactionHeader>

            <TransactionDetails>
              {tx.from && (
                <TransactionDetailRow>
                  <DetailLabel>发送方:</DetailLabel>
                  <DetailValue title={tx.from}>{tx.from}</DetailValue>
                </TransactionDetailRow>
              )}

              <TransactionDetailRow>
                <DetailLabel>接收方:</DetailLabel>
                <DetailValue title={tx.to}>{tx.to}</DetailValue>
              </TransactionDetailRow>

              <TransactionDetailRow>
                <DetailLabel>金额:</DetailLabel>
                <DetailValue>{tx.value} ETH</DetailValue>
              </TransactionDetailRow>

              {tx.keyword && (
                <TransactionDetailRow>
                  <DetailLabel>关键词:</DetailLabel>
                  <DetailValue>{tx.keyword}</DetailValue>
                </TransactionDetailRow>
              )}

              <TransactionDetailRow>
                <DetailLabel>交易哈希:</DetailLabel>
                <TransactionHash
                  href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tx.hash}
                </TransactionHash>
              </TransactionDetailRow>
            </TransactionDetails>
          </TransactionItem>
        ))}
      </TransactionList>
    </Card>
  )
}

export default TransactionHistory
