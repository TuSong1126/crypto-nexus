import articleRoutes from './modules/article'
import postOfficeRoutes from './modules/postOffice'
import timeAxisRoutes from './modules/timeAxis'
import treeHoleRoutes from './modules/treeHole'

const businessRoutes = [...treeHoleRoutes, ...articleRoutes, ...timeAxisRoutes, ...postOfficeRoutes] as RouteType[]

export default businessRoutes
