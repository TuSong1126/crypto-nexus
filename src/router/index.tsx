import { lazy } from 'react'
import { createHashRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom'

import useRoutePermission from './permission'
import businessRoutes from './routes'

import Layout from '@/layout/index'
import AuthGuard from '@/router/auth-guard'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

export default function Router() {
  // 基础路由
  const BasicRoutes: RouteType[] = [
    {
      path: '*',
      Component: lazy(() => import('@/views/notFound')),
      meta: { title: '页面不存在', permissionKey: '', icon: '' }
    },
    {
      path: 'login',
      Component: lazy(() => import('@/views/login')),
      meta: { title: '登录', permissionKey: '', icon: '' }
    }
  ]

  // 权限路由(所有的业务路由根据实际角色权限进行过滤)
  const permissionRoutes = useRoutePermission([...businessRoutes])

  // 主体路由
  const MainRoutes: RouteType = {
    path: '/',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to={HOMEPAGE} replace /> },
      {
        path: 'home',
        Component: lazy(() => import('@/views/home')),
        meta: { title: '首页', permissionKey: '', icon: '' }
      },
      ...permissionRoutes
    ]
  }

  const router = createHashRouter([...BasicRoutes, MainRoutes] as unknown as RouteObject[])

  return <RouterProvider router={router} />
}
