import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'

import { Transaction, TransactionsProviderProps } from '../types'
// 从常量文件导入
import { contractABI, contractAddress } from '../utils/constants'
// 从单独的文件导入Context
import { TransactionContext } from './TransactionContext'

const { ethereum } = window || {}

const createEthereumContract = () => {
  // 使用ethers v6版本的API
  if (!ethereum) return null

  const provider = new ethers.BrowserProvider(ethereum)
  return provider.getSigner().then((signer) => {
    return new ethers.Contract(contractAddress, contractABI, signer)
  })
}

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' })
  const [currentAccount, setCurrentAccount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState<number | null>(
    Number(localStorage.getItem('transactionCount')) || null
  )
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [accountBalance, setAccountBalance] = useState('0')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
  }

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) {
        alert('请安装MetaMask.')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length) {
        setCurrentAccount(accounts[0])
        getAllTransactions()
      } else {
        console.log('没有找到账户')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert('请安装MetaMask.')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setCurrentAccount(accounts[0])
      await getAccountBalance()
    } catch (error) {
      console.log(error)
      throw new Error('连接钱包失败')
    }
  }

  const checkIfTransactionsExists = async () => {
    try {
      if (!ethereum) return

      const contract = await createEthereumContract()
      if (!contract) return

      const currentTransactionCount = await contract.getTransactionCount()
      window.localStorage.setItem('transactionCount', currentTransactionCount.toString())
    } catch (error) {
      console.log(error)
    }
  }
  const getAllTransactions = async () => {
    try {
      if (!ethereum) return

      const contract = await createEthereumContract()
      if (!contract) return

      const availableTransactions = await contract.getAllTransactions()

      const structuredTransactions = availableTransactions
        .map((transaction: any) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(Number(transaction.timestamp) * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: Number(ethers.formatEther(transaction.amount)),
          txHash: transaction.txHash
        }))
        .reverse()

      setTransactions(structuredTransactions)
    } catch (error) {
      console.log(error)
    }
  }
  const getAccountBalance = async () => {
    try {
      if (!ethereum || !currentAccount) return

      const provider = new ethers.BrowserProvider(ethereum)
      const balance = await provider.getBalance(currentAccount)

      // 将余额转换为ETH并格式化为最多4位小数
      const formattedBalance = parseFloat(ethers.formatEther(balance)).toFixed(4)

      setAccountBalance(formattedBalance)
    } catch (error) {
      console.log('获取余额失败:', error)
      setAccountBalance('0')
    }
  }

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        alert('请安装MetaMask.')
        return
      }

      const { addressTo, amount, keyword, message } = formData
      const contract = await createEthereumContract()
      if (!contract) return

      const parsedAmount = ethers.parseEther(amount)

      // 发送交易
      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x5208', // 21000 GWEI
            value: ethers.toBeHex(parsedAmount)
          }
        ]
      })
      console.log('本次交易的txHash', txHash)

      // 记录交易到合约
      setIsLoading(true)
      const addToBlockchainHash = await contract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword,
        txHash
      )

      console.log(`加载中 - ${addToBlockchainHash.hash}`)
      await addToBlockchainHash.wait()
      console.log(`成功 - ${addToBlockchainHash.hash}`)
      setIsLoading(false)

      // 更新交易计数
      const txCount = await contract.getTransactionCount()
      setTransactionCount(Number(txCount))

      // 重置表单
      setFormData({ addressTo: '', amount: '', keyword: '', message: '' })
      // 重新获取所有交易
      getAllTransactions()
      // 重新获取账户余额
      getAccountBalance()
    } catch (error) {
      console.log(error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // 可以在这里添加成功的提示，比如使用一个toast通知
        console.log('已复制到剪贴板')
      })
      .catch((err) => {
        console.log('复制失败:', err)
      })
  }

  useEffect(() => {
    checkIfWalletIsConnect()
    checkIfTransactionsExists()
  }, [])

  useEffect(() => {
    if (currentAccount) {
      getAccountBalance()
    }
  }, [currentAccount])

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
        accountBalance,
        getAccountBalance,
        copyToClipboard
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
