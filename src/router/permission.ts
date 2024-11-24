import { useMemo } from 'react'

import businessRoutes from './routes'

import useUserInfoStore from '@/store/userInfo'

type dealDataType = (data: RouteType[]) => RouteType[]

// 进行权限过滤所有的业务路由
export default function usePermissionRoutes(): RouteType[] {
  const { permssion } = useUserInfoStore()

  return useMemo(() => {
    const filterFunc = (data: RouteType[]) =>
      data?.filter((i) => permssion.routes.includes('route:' + i.meta?.permissionKey)) || []

    const dealDataFunc: dealDataType = (data: RouteType[]) => {
      return filterFunc(data)?.map((item) => ({
        ...item,
        children: item?.children ? dealDataFunc(filterFunc(item.children)) : null
      }))
    }
    const filterRoutes = dealDataFunc(businessRoutes)

    return filterRoutes
  }, [permssion.routes])
}
