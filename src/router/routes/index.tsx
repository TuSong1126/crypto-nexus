import { lazy } from 'react'

import aboutRoutes from './modules/about'
import articleRoutes from './modules/article'
import postOfficeRoutes from './modules/postOffice'
import timeAxisRoutes from './modules/timeAxis'
import treeHoleRoutes from './modules/treeHole'

const businessRoutes = [
  {
    path: 'home',
    Component: lazy(() => import('@/views/home')),
    meta: { title: '首页', permissionKey: 'home', icon: '' }
  },
  ...treeHoleRoutes,
  ...articleRoutes,
  ...timeAxisRoutes,
  ...postOfficeRoutes,
  ...aboutRoutes
] as RouteType[]

export default businessRoutes
