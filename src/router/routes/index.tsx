import { lazy } from 'react'

import defiRoutes from './modules/defi'
import nftMarketRoutes from './modules/nftMarket'
import testDemoRoutes from './modules/testDemo'
import web3ToolsRoutes from './modules/web3Tools'
import web3TransactionRoutes from './modules/web3Transaction'

const { VITE_APP_SIMPLE_MODE } = import.meta.env
let businessRoutes = [] as RouteType[]

if (VITE_APP_SIMPLE_MODE === 'true') {
  businessRoutes = [...testDemoRoutes]
} else {
  businessRoutes = [
    {
      path: 'home',
      Component: lazy(() => import('@/views/home')),
      meta: { title: '首页', permissionKey: 'home', icon: '' }
    },
    ...web3ToolsRoutes,
    ...nftMarketRoutes,
    ...defiRoutes,
    ...web3TransactionRoutes
  ]
}

export default businessRoutes
