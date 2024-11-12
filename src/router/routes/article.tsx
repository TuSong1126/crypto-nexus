import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

// 对应的tab：最新、最热
const articleRoutes = [
  {
    path: 'article',
    Component: lazy(() => import('@/views/article/index')),
    meta: { label: '妙笔', icon: '' },
    children: [
      {
        index: true,
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        Component: lazy(() => import('@/views/article/list/index'))
      },
      {
        path: 'detail',
        Component: lazy(() => import('@/views/article/detail/index'))
      }
    ]
  }
]

export default articleRoutes
