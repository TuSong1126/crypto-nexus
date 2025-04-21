export interface TransactionType {
  id: string
  hash: string
  to: string
  value: string
  timestamp: number
  status: 'pending' | 'success' | 'error'
  description?: string
}
