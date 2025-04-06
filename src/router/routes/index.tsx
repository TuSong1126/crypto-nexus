import { lazy } from 'react'

import defiRoutes from './modules/defi'
import nftMarketRoutes from './modules/nftMarket'
import web3ToolsRoutes from './modules/web3Tools'
import web3TransactionRoutes from './modules/web3Transaction'

const businessRoutes = [
  {
    path: 'home',
    Component: lazy(() => import('@/views/home')),
    meta: { title: '首页', permissionKey: 'home', icon: '' }
  },
  ...web3ToolsRoutes,
  ...nftMarketRoutes,
  ...defiRoutes,
  ...web3TransactionRoutes
] as RouteType[]

export default businessRoutes
