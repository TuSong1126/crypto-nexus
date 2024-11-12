import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

// 对应的tab：TODO、时间卷轴
const timeAxisRoutes = [
  {
    path: 'timeAxis',
    Component: lazy(() => import('@/views/timeAxis/index')),
    meta: { label: '时光轴', icon: '' },
    children: [
      {
        index: true,
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        Component: lazy(() => import('@/views/timeAxis/list/index'))
      },
      {
        path: 'detail',
        Component: lazy(() => import('@/views/timeAxis/detail/index'))
      }
    ]
  }
]

export default timeAxisRoutes
