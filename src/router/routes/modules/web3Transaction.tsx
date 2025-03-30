import { lazy } from 'react'

const web3TransactionRoutes: RouteType[] = [
  {
    path: 'web3Transaction',
    Component: lazy(() => import('@/views/web3Transaction/index')),
    meta: { title: '链上交易', permissionKey: 'web3Transaction', icon: '' }
  }
]

export default web3TransactionRoutes
