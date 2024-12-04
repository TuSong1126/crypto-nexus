import { lazy } from 'react'

// 对应的tab：最新、最热
const articleRoutes: RouteType[] = [
  {
    path: 'article',
    Component: lazy(() => import('@/views/article/index')),
    meta: { title: '妙笔', permissionKey: 'article', icon: '' },
    children: [
      {
        path: 'list',
        Component: lazy(() => import('@/views/article/list/index')),
        meta: { title: '列表', permissionKey: 'article/list', icon: '' }
      },
      {
        path: 'detail',
        Component: lazy(() => import('@/views/article/detail/index')),
        meta: { title: '详情', permissionKey: 'article/detail', icon: '' }
      }
    ]
  }
]

export default articleRoutes
