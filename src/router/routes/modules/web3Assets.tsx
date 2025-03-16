import { lazy } from 'react'

const web3AssetsRoutes: RouteType[] = [
  {
    path: 'web3Assets',
    Component: lazy(() => import('@/views/web3Assets/index')),
    meta: { title: 'Web3资产', permissionKey: 'web3Assets', icon: '' },
    children: [
      {
        path: 'list',
        Component: lazy(() => import('@/views/web3Assets/list/index')),
        meta: { title: '资产列表', permissionKey: 'web3Assets/list', icon: '' }
      },
      {
        path: 'detail',
        Component: lazy(() => import('@/views/web3Assets/detail/index')),
        meta: { title: '资产详情', permissionKey: 'web3Assets/detail', icon: '' }
      }
    ]
  }
]

export default web3AssetsRoutes
