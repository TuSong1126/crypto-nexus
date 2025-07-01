import { lazy } from 'react'

const testDemoRoutes: RouteType[] = [
  {
    path: 'testA',
    Component: lazy(() => import('@/views/testDemo/testA')),
    meta: { title: 'Hooks', permissionKey: 'testA', icon: '' }
  },
  {
    path: 'testB',
    Component: lazy(() => import('@/views/testDemo/testB')),
    meta: { title: '其它', permissionKey: 'testB', icon: '' }
  }
]

export default testDemoRoutes
