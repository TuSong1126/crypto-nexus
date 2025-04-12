import { ReactNode } from 'react'

declare global {
  interface Window {
    ethereum?: any
  }
}

export interface TransactionContextProps {
  connectWallet: () => Promise<void>
  transactions: Transaction[]
  currentAccount: string
  isLoading: boolean
  sendTransaction: () => Promise<void>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void
  formData: {
    addressTo: string
    amount: string
    keyword: string
    message: string
  }
  transactionCount: number | null
  accountBalance: string
  getAccountBalance: () => Promise<void>
  copyToClipboard: (text: string) => void
}

export interface Transaction {
  addressTo: string
  addressFrom: string
  timestamp: string
  message: string
  keyword: string
  amount: number
}

export interface TransactionsProviderProps {
  children: ReactNode
}
