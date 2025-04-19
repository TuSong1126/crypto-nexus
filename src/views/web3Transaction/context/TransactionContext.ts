import React from 'react'

import { TransactionContextProps } from '../types'

export const TransactionContext = React.createContext<TransactionContextProps>(
  {} as TransactionContextProps
)
