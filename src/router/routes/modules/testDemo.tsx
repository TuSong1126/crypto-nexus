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
    meta: { title: 'webworker', permissionKey: 'webworker', icon: '' }
  },
  {
    path: 'IntersectionObserver',
    Component: lazy(() => import('@/views/testDemo/IntersectionObserver/index')),
    meta: { title: 'IntersectionObserver', permissionKey: 'IntersectionObserver', icon: '' }
  },
  {
    path: 'virtualTable',
    Component: lazy(() => import('@/views/testDemo/virtualTable/index')),
    meta: { title: 'virtualTable', permissionKey: 'virtualTable', icon: '' }
  },
  {
    path: 'reactQuery',
    Component: lazy(() => import('@/views/testDemo/reactQuery/index')),
    meta: { title: 'reactQuery', permissionKey: 'reactQuery', icon: '' }
  },
  {
    path: 'zustandRecoil',
    Component: lazy(() => import('@/views/testDemo/zustandRecoil/index')),
    meta: { title: 'zustandRecoil', permissionKey: 'zustandRecoil', icon: '' }
  },
  {
    path: 'zod',
    Component: lazy(() => import('@/views/testDemo/zod/index')),
    meta: { title: 'zod', permissionKey: 'zod', icon: '' }
  },
  {
    path: 'indexedDB',
    Component: lazy(() => import('@/views/testDemo/indexedDB/index')),
    meta: { title: 'indexedDB', permissionKey: 'indexedDB', icon: '' }
  }
]

export default testDemoRoutes
