import { lazy } from 'react'
import { createHashRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom'

import usePermissionRoutes from './permission'

import Layout from '@/layout/index'
import AuthGuard from '@/router/auth-guard'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

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

export default function Router() {
  // 权限路由(所有的业务路由根据实际角色权限进行过滤)
  const permissionRoutes = usePermissionRoutes()

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

  // key：解决登录后：跳转地址改变，但是页面不刷新问题
  return <RouterProvider router={router} key={Math.random()} />
}
