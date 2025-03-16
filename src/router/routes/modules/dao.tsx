import { lazy } from 'react'

const daoRoutes: RouteType[] = [
  {
    path: 'dao',
    Component: lazy(() => import('@/views/dao/index')),
    meta: { title: 'DAO', permissionKey: 'dao', icon: '' },
    children: [
      {
        path: 'proposals',
        Component: lazy(() => import('@/views/dao/proposals/index')),
        meta: { title: '提案列表', permissionKey: 'dao/proposals', icon: '' }
      },
      {
        path: 'voting',
        Component: lazy(() => import('@/views/dao/voting/index')),
        meta: { title: '投票', permissionKey: 'dao/voting', icon: '' }
      }
    ]
  }
]

export default daoRoutes
