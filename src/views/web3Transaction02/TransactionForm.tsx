import { useState } from 'react'
import { parseEther } from 'viem'
import { useAccount, useBalance, useSendTransaction } from 'wagmi'

import {
  Card,
  CardTitle,
  ErrorAlert,
  Form,
  FormGroup,
  FormInput,
  FormLabel,
  InfoAlert,
  PrimaryButton,
  WarningAlert
} from './styled'
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
    <Card>
      <CardTitle>
        <span>💸 发送交易</span>
      </CardTitle>

      {!isConnected && (
        <WarningAlert>
          <span>⚠️ 请先连接钱包才能发送交易</span>
        </WarningAlert>
      )}

      {isConnected && balance && (
        <InfoAlert>
          <span>
            💰 当前余额: {balance.formatted} {balance.symbol}
          </span>
        </InfoAlert>
      )}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>收款地址</FormLabel>
          <FormInput
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            disabled={!isConnected || isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>金额 (ETH)</FormLabel>
          <FormInput
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.01"
            disabled={!isConnected || isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>描述 (可选)</FormLabel>
          <FormInput
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="交易描述..."
            disabled={!isConnected || isSubmitting}
          />
        </FormGroup>

        {error && (
          <ErrorAlert>
            <span>❌ {error}</span>
          </ErrorAlert>
        )}

        {isPending && (
          <InfoAlert>
            <span>⏳ 交易确认中...</span>
          </InfoAlert>
        )}

        <PrimaryButton type="submit" disabled={!isConnected || isSubmitting}>
          {isSubmitting ? '处理中...' : '发送交易'}
        </PrimaryButton>
      </Form>
    </Card>
  )
}

export default TransactionForm
