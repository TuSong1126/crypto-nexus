import { lazy } from 'react'

// 对应的tab：TODO、时间卷轴
const timeAxisRoutes: RouteType[] = [
  {
    path: 'timeAxis',
    Component: lazy(() => import('@/views/timeAxis/index')),
    meta: { title: '时光轴', permissionKey: 'timeAxis', icon: '' },
    children: [
      {
        path: 'list',
        Component: lazy(() => import('@/views/timeAxis/list/index')),
        meta: { title: '列表', permissionKey: 'timeAxis/list', icon: '' }
      },
      {
        path: 'detail',
        Component: lazy(() => import('@/views/timeAxis/detail/index')),
        meta: { title: '详情', permissionKey: 'timeAxis/detail', icon: '' }
      }
    ]
  }
]

export default timeAxisRoutes
