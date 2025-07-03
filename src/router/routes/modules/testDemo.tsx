import { lazy } from 'react'

const testDemoRoutes: RouteType[] = [
  {
    path: 'base',
    Component: lazy(() => import('@/views/testDemo/base')),
    meta: { title: 'base', permissionKey: 'base', icon: '' }
  },
  {
    path: 'hooks',
    Component: lazy(() => import('@/views/testDemo/hooks/index')),
    meta: { title: 'hooks', permissionKey: 'hooks', icon: '' }
  }
]

export default testDemoRoutes
