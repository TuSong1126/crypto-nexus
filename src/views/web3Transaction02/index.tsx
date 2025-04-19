import '@rainbow-me/rainbowkit/styles.css'

import { ConnectButton, darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { WagmiProvider } from 'wagmi'

import { config } from './config'
// 组件
import TransactionForm from './TransactionForm'
import TransactionHistory from './TransactionHistory'
import { TransactionType } from './types'

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
          <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Web3 交易平台</h1>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">钱包连接</h2>
                  <div className="flex justify-center">
                    <ConnectButton />
                  </div>
                </div>

                <TransactionForm addTransaction={addTransaction} />
              </div>

              <div className="w-full lg:w-1/2">
                <TransactionHistory transactions={transactions} />
              </div>
            </div>
          </div>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}

export default Web3Transaction02
