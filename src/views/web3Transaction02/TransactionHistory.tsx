import React from 'react'

import { TransactionType } from './types'

interface TransactionHistoryProps {
  transactions: TransactionType[]
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">交易历史</h2>
        <div className="text-gray-400 text-center py-6">暂无交易记录</div>
      </div>
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-500'
      case 'pending':
        return 'text-yellow-500'
      case 'error':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return '成功'
      case 'pending':
        return '处理中'
      case 'error':
        return '失败'
      default:
        return '未知'
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">交易历史</h2>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="font-medium">{tx.description || '以太坊交易'}</h3>
                <p className="text-sm text-gray-400 mt-1">{formatDate(tx.timestamp)}</p>
              </div>
              <div className={`${getStatusColor(tx.status)} px-2 py-1 rounded text-xs font-medium`}>
                {getStatusText(tx.status)}
              </div>
            </div>

            <div className="space-y-2 mt-3 text-sm">
              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-3 text-gray-400">接收地址:</span>
                <span className="col-span-9 truncate">{tx.to}</span>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-3 text-gray-400">金额:</span>
                <span className="col-span-9">{tx.value} ETH</span>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-3 text-gray-400">交易哈希:</span>
                <a
                  href={`https://etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-9 truncate text-blue-400 hover:text-blue-300"
                >
                  {tx.hash}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionHistory
