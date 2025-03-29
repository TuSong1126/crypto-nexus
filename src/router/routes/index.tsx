import { lazy } from 'react'

import daoRoutes from './modules/dao'
import defiRoutes from './modules/defi'
import nftMarketRoutes from './modules/nftMarket'
import web3AssetsRoutes from './modules/web3Assets'
import web3ToolsRoutes from './modules/web3Tools'

const businessRoutes = [
  {
    path: 'home',
    Component: lazy(() => import('@/views/home')),
    meta: { title: '首页', permissionKey: 'home', icon: '' }
  },
  ...web3ToolsRoutes,
  ...nftMarketRoutes,
  ...defiRoutes,
  ...daoRoutes,
  ...web3AssetsRoutes
] as RouteType[]

export default businessRoutes
