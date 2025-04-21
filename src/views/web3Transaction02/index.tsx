import '@rainbow-me/rainbowkit/styles.css'

import { ConnectButton, darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { useAccount } from 'wagmi'
import { WagmiProvider } from 'wagmi'

// 导入合约常量
import { contractABI, contractAddress } from '../web3Transaction/utils/constants'
import TransactionForm from './components/TransactionForm'
import TransactionHistory from './components/TransactionHistory'
import { config } from './config'
// 组件
import {
  Container,
  Content,
  LeftColumn,
  RightColumn,
  theme,
  WalletConnectContainer
} from './config/styled'
import { TransactionType } from './config/types'

const queryClient = new QueryClient()

// 创建合约实例
const createEthereumContract = async () => {
  const { ethereum } = window as any
  if (!ethereum) return null

  try {
    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner()
    return new ethers.Contract(contractAddress, contractABI, signer)
  } catch (error) {
    console.error('创建合约实例失败:', error)
    return null
  }
}

// 内部组件，包含实际业务逻辑
const TransactionApp = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([])
  const { isConnected } = useAccount()

  // 从链上获取交易历史
  const getTransactionsFromBlockchain = async () => {
    try {
      const contract = await createEthereumContract()
      if (!contract) return

      const availableTransactions = await contract.getAllTransactions()

      // 格式化交易数据
      const structuredTransactions = availableTransactions
        .map((transaction: any) => ({
          id: `${transaction.timestamp}-${transaction.txHash.slice(0, 10)}`,
          hash: transaction.txHash,
          to: transaction.receiver,
          from: transaction.sender,
          value: ethers.formatEther(transaction.amount),
          timestamp: Number(transaction.timestamp) * 1000,
          status: 'success',
          description: transaction.message || '以太坊交易',
          keyword: transaction.keyword
        }))
        .reverse()

      setTransactions(structuredTransactions)
    } catch (error) {
      console.error('获取区块链交易历史失败:', error)
    }
  }

  // 当连接状态改变时获取交易历史
  useEffect(() => {
    if (isConnected) {
      getTransactionsFromBlockchain()
    }
  }, [isConnected])

  // 添加新交易到历史记录
  const addTransaction = (transaction: TransactionType) => {
    setTransactions((prev) => [transaction, ...prev])

    // 交易确认后刷新数据
    setTimeout(() => {
      getTransactionsFromBlockchain()
    }, 15000) // 等待15秒让交易上链
  }

  return (
    <Container>
      <WalletConnectContainer>
        <ConnectButton />
      </WalletConnectContainer>

      <Content>
        <LeftColumn>
          <TransactionForm addTransaction={addTransaction} />
        </LeftColumn>

        <RightColumn>
          <TransactionHistory transactions={transactions} />
        </RightColumn>
      </Content>
    </Container>
  )
}

// 外层组件，只负责提供上下文
const Web3Transaction02 = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#6c5ce7',
            borderRadius: 'medium'
          })}
        >
          <StyledThemeProvider theme={theme}>
            <TransactionApp />
          </StyledThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Web3Transaction02
