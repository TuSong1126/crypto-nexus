import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import { protectedLoader } from './loader'
import { usersLoader } from './loader'
import { tokenLoader } from './loader'

import ErrorBoundary from '@/components/errorBoundary'
import LazyImportComponent from '@/components/lazyImportComponent'

const routes = [
  {
    path: '/login',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/views/login'))} />
  },
  {
    path: '/',
    loader: protectedLoader,
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/layout/index'))} />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to={'/user'} replace={true} />
      },
      {
        path: '/user',
        loader: usersLoader,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/views/user'))} />
      },
      {
        path: '/manage',
        loader: tokenLoader,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/views/manage'))} />
      },
      {
        path: '/file/:id?',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/views/file'))} />
      },
      {
        path: '/info',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/views/info'))} />
      }
    ]
  },
  {
    path: '*',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/views/notFound'))} />
  }
]

export default routes
