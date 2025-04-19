import { useState } from 'react'
import { parseEther } from 'viem'
import { useAccount, useBalance, useSendTransaction } from 'wagmi'

import { TransactionType } from './types'

interface TransactionFormProps {
  addTransaction: (transaction: TransactionType) => void
}

const TransactionForm = ({ addTransaction }: TransactionFormProps) => {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({
    address
  })

  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { sendTransactionAsync, isPending } = useSendTransaction()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    if (!isConnected || !address) {
      setError('请先连接钱包')
      setIsSubmitting(false)
      return
    }

    try {
      // 验证输入
      if (!recipient || !amount) {
        throw new Error('收款地址和金额不能为空')
      }

      if (!/^0x[a-fA-F0-9]{40}$/.test(recipient)) {
        throw new Error('无效的以太坊地址')
      }

      const amountInWei = parseEther(amount)

      // 发送交易
      const txHash = await sendTransactionAsync({
        to: recipient as `0x${string}`,
        value: amountInWei
      })

      // 添加到交易历史
      if (txHash) {
        const newTransaction: TransactionType = {
          id: Date.now().toString(),
          hash: txHash,
          to: recipient,
          value: amount,
          timestamp: Date.now(),
          status: 'pending',
          description: description || '发送ETH'
        }

        addTransaction(newTransaction)

        // 清空表单
        setRecipient('')
        setAmount('')
        setDescription('')
      }
    } catch (err) {
      console.error('交易错误:', err)
      setError(err instanceof Error ? err.message : '交易失败')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">发送交易</h2>

      {!isConnected && (
        <div className="text-yellow-400 mb-4 p-3 bg-yellow-900/30 rounded">
          请先连接钱包才能发送交易
        </div>
      )}

      {isConnected && balance && (
        <div className="mb-4 p-3 bg-blue-900/30 rounded">
          <p>
            当前余额: {balance.formatted} {balance.symbol}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">收款地址</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            disabled={!isConnected || isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">金额 (ETH)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.01"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            disabled={!isConnected || isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">描述 (可选)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="交易描述..."
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            disabled={!isConnected || isSubmitting}
          />
        </div>

        {error && <div className="text-red-400 p-3 bg-red-900/30 rounded">{error}</div>}

        {isPending && <div className="text-blue-400 p-3 bg-blue-900/30 rounded">交易确认中...</div>}

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded font-medium ${
            !isConnected
              ? 'bg-gray-600 cursor-not-allowed'
              : isSubmitting
                ? 'bg-blue-700 cursor-wait'
                : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={!isConnected || isSubmitting}
        >
          {isSubmitting ? '处理中...' : '发送交易'}
        </button>
      </form>
    </div>
  )
}

export default TransactionForm
