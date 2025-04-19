import '@rainbow-me/rainbowkit/styles.css'

import { ConnectButton, darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { WagmiProvider } from 'wagmi'

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

const Web3Transaction02 = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([])

  // 从本地存储加载交易历史
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions')
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    }
  }, [])

  // 保存交易历史到本地存储
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions))
    }
  }, [transactions])

  // 添加新交易到历史记录
  const addTransaction = (transaction: TransactionType) => {
    setTransactions((prev) => [transaction, ...prev])
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider theme={darkTheme()}>
          <StyledThemeProvider theme={theme}>
            <Container>
              {/* 钱包连接按钮 - 右上角 */}
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
          </StyledThemeProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}

export default Web3Transaction02
