import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import articleRoutes from './article'
import postOfficeRoutes from './postOffice'
import timeAxisRoutes from './timeAxis'
import treeHoleRoutes from './treeHole'

import Layout from '@/layout/index'
import AuthGuard from '@/router/auth-guard'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

const routes = [
  {
    path: 'login',
    Component: lazy(() => import('@/views/login'))
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={HOMEPAGE} replace />
      },
      {
        path: 'home',
        Component: lazy(() => import('@/views/home')),
        meta: { label: '首页', icon: '' }
      },
      ...treeHoleRoutes,
      ...articleRoutes,
      ...timeAxisRoutes,
      ...postOfficeRoutes
    ]
  },
  {
    path: '*',
    Component: lazy(() => import('@/views/notFound'))
  }
]

export default routes
