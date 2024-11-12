import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

// 对应的tab：最新、最热、我的发表、与我相关、推荐话题---参考沸点
const treeHoleRoutes = [
  {
    path: 'treeHole',
    Component: lazy(() => import('@/views/treeHole/index')),
    meta: { label: '树洞', icon: '' },
    children: [
      {
        index: true,
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        Component: lazy(() => import('@/views/treeHole/list/index'))
      },
      {
        path: 'detail',
        Component: lazy(() => import('@/views/treeHole/detail/index'))
      }
    ]
  }
]

export default treeHoleRoutes
