import React from 'react'

import { Services, Transactions, Welcome } from './components'
import { TransactionsProvider } from './context/TransactionContext'

/**
 * Web3交易演示页面
 * 展示了一个完整的Web3应用，包括钱包连接、发送交易和交易历史
 */
const Web3Transaction: React.FC = () => {
  return (
    <TransactionsProvider>
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Welcome />
        </div>
        <Services />
        <Transactions />
      </div>
    </TransactionsProvider>
  )
}

export default Web3Transaction
