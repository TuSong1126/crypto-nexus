import { lazy } from 'react'

const testDemoRoutes: RouteType[] = [
  {
    path: 'testA',
    Component: lazy(() => import('@/views/testDemo/testA')),
    meta: { title: 'testA', permissionKey: 'testA', icon: '' }
  },
  {
    path: 'testB',
    Component: lazy(() => import('@/views/testDemo/testB')),
    meta: { title: 'testB', permissionKey: 'testB', icon: '' }
  }
]

export default testDemoRoutes
