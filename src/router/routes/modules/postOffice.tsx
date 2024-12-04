import { lazy } from 'react'

// 对应的tab：公开信、我的信件、写信
const postOfficeRoutes: RouteType[] = [
  {
    path: 'postOffice',
    Component: lazy(() => import('@/views/postOffice/index')),
    meta: { title: '邮局', permissionKey: 'postOffice', icon: '' },
    children: [
      {
        path: 'list',
        Component: lazy(() => import('@/views/postOffice/list/index')),
        meta: { title: '列表', permissionKey: 'postOffice/list', icon: '' }
      },
      {
        path: 'detail',
        Component: lazy(() => import('@/views/postOffice/detail/index')),
        meta: { title: '详情', permissionKey: 'postOffice/detail', icon: '' }
      }
    ]
  }
]

export default postOfficeRoutes
