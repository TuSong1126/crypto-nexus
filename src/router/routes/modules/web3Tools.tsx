import { lazy } from 'react'

const web3ToolsRoutes: RouteType[] = [
  {
    path: 'web3Tools',
    Component: lazy(() => import('@/views/web3Tools/index')),
    meta: { title: 'Web3工具', permissionKey: 'web3Tools', icon: '' },
    children: [
      {
        path: 'wallet',
        Component: lazy(() => import('@/views/web3Tools/wallet/index')),
        meta: { title: '钱包管理', permissionKey: 'web3Tools/wallet', icon: '' }
      },
      {
        path: 'explorer',
        Component: lazy(() => import('@/views/web3Tools/explorer/index')),
        meta: { title: '区块浏览器', permissionKey: 'web3Tools/explorer', icon: '' }
      },
      {
        path: 'demo',
        Component: lazy(() => import('@/pages/Web3Demo')),
        meta: { title: 'Web3演示', permissionKey: 'web3Tools/demo', icon: '' }
      },
      {
        path: 'transaction',
        Component: lazy(() => import('@/views/web3Transaction')),
        meta: { title: '链上交易', permissionKey: 'web3Tools/transaction', icon: '' }
      }
    ]
  }
]

export default web3ToolsRoutes
