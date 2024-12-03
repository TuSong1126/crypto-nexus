import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const aboutRoutes: RouteType[] = [
  {
    path: 'about',
    Component: lazy(() => import('@/views/about/index')),
    meta: { title: '关于', permissionKey: 'about', icon: '' },
    children: [
      {
        index: true,
        element: <Navigate to="product" replace />
      },
      {
        path: 'product',
        Component: lazy(() => import('@/views/about/product/index')),
        meta: { title: '关于产品', permissionKey: 'about/product', icon: '' }
      },
      {
        path: 'me',
        Component: lazy(() => import('@/views/about/me/index')),
        meta: { title: '关于我们', permissionKey: 'about/me', icon: '' }
      }
    ]
  }
]

export default aboutRoutes
