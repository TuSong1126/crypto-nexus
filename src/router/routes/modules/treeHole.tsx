import { lazy } from 'react'

// 对应的tab：最新、最热、我的发表、与我相关、推荐话题---参考沸点
const treeHoleRoutes: RouteType[] = [
  {
    path: 'treeHole',
    Component: lazy(() => import('@/views/treeHole/index')),
    meta: { title: '树洞', permissionKey: 'treeHole', icon: '' },
    children: [
      {
        path: 'list',
        Component: lazy(() => import('@/views/treeHole/list/index')),
        meta: { title: '列表', permissionKey: 'treeHole/list', icon: '' }
      },
      {
        path: 'detail',
        Component: lazy(() => import('@/views/treeHole/detail/index')),
        meta: { title: '详情', permissionKey: 'treeHole/detail', icon: '' }
      }
    ]
  }
]

export default treeHoleRoutes
