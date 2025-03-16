import { lazy } from 'react'

const nftMarketRoutes: RouteType[] = [
  {
    path: 'nftMarket',
    Component: lazy(() => import('@/views/nftMarket/index')),
    meta: { title: 'NFT市场', permissionKey: 'nftMarket', icon: '' },
    children: [
      {
        path: 'marketplace',
        Component: lazy(() => import('@/views/nftMarket/marketplace/index')),
        meta: { title: '市场广场', permissionKey: 'nftMarket/marketplace', icon: '' }
      },
      {
        path: 'collection',
        Component: lazy(() => import('@/views/nftMarket/collection/index')),
        meta: { title: '收藏品', permissionKey: 'nftMarket/collection', icon: '' }
      }
    ]
  }
]

export default nftMarketRoutes
