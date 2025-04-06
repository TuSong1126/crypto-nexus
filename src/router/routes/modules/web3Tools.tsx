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
      }
    ]
  }
]

export default web3ToolsRoutes
