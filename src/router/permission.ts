import businessRoutes from './routes'

import { useUserRoutesPermission } from '@/store/userInfo'

type dealDataType = (data: RouteType[]) => RouteType[]

// 进行权限过滤所有的业务路由
export default function usePermissionRoutes(): RouteType[] {
  const routesPermission = useUserRoutesPermission()

  const filterFunc = (data: RouteType[]) =>
    data?.filter((i) => routesPermission.includes('route:' + i.meta?.permissionKey)) || []

  const dealDataFunc: dealDataType = (data: RouteType[]) => {
    return filterFunc(data)?.map((item) => ({
      ...item,
      children: item?.children ? dealDataFunc(filterFunc(item.children)) : null
    }))
  }

  const filterRoutes = dealDataFunc(businessRoutes)

  return filterRoutes
}
