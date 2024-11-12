import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

// 对应的tab：公开信、我的信件、写信
const postOfficeRoutes = [
  {
    path: 'postOffice',
    Component: lazy(() => import('@/views/postOffice/index')),
    meta: { label: '邮局', icon: '' },
    children: [
      {
        index: true,
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        Component: lazy(() => import('@/views/postOffice/list/index'))
      },
      {
        path: 'detail',
        Component: lazy(() => import('@/views/postOffice/detail/index'))
      }
    ]
  }
]

export default postOfficeRoutes
