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
  },
  {
    path: 'webworker',
    Component: lazy(() => import('@/views/testDemo/webworker/index')),
    meta: { title: 'webworker', permissionKey: 'hooks', icon: '' }
  },
  {
    path: 'IntersectionObserver',
    Component: lazy(() => import('@/views/testDemo/IntersectionObserver/index')),
    meta: { title: 'IntersectionObserver', permissionKey: 'hooks', icon: '' }
  },
  {
    path: 'virtualTable',
    Component: lazy(() => import('@/views/testDemo/virtualTable/index')),
    meta: { title: 'virtualTable', permissionKey: 'hooks', icon: '' }
  }
]

export default testDemoRoutes
