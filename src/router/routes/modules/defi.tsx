import { lazy } from 'react'

const defiRoutes: RouteType[] = [
  {
    path: 'defi',
    Component: lazy(() => import('@/views/defi/index')),
    meta: { title: 'DeFi', permissionKey: 'defi', icon: '' },
    children: [
      {
        path: 'swap',
        Component: lazy(() => import('@/views/defi/swap/index')),
        meta: { title: '代币交换', permissionKey: 'defi/swap', icon: '' }
      },
      {
        path: 'pool',
        Component: lazy(() => import('@/views/defi/pool/index')),
        meta: { title: '流动性池', permissionKey: 'defi/pool', icon: '' }
      }
    ]
  }
]

export default defiRoutes
