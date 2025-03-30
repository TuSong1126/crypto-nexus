import { lazy } from 'react'

const web3TransactionRoutes: RouteType[] = [
  {
    path: 'web3Transaction',
    Component: lazy(() => import('@/views/web3Transaction/index')),
    meta: { title: '链上交易', permissionKey: 'web3Transaction', icon: '' },
    children: [
      {
        path: 'send',
        Component: lazy(() => import('@/views/web3Transaction/send/index')),
        meta: { title: '发起交易', permissionKey: 'web3Transaction/send', icon: '' }
      },
      {
        path: 'history',
        Component: lazy(() => import('@/views/web3Transaction/history/index')),
        meta: { title: '交易记录', permissionKey: 'web3Transaction/history', icon: '' }
      }
    ]
  }
]

export default web3TransactionRoutes
