import useUserInfoStore from '@/store/userInfo'

// 进行权限过滤所有的业务路由
export default function useRoutePermission(allRoutes: RouteType[]): RouteType[] {
  const useUserInfo = useUserInfoStore()
  const _routes = useUserInfo.permssion.routes

  const dealData: (data: RouteType[]) => RouteType[] = (data: RouteType[]) =>
    data.map((item) => ({
      ...item,
      children: item?.children
        ? dealData(item.children.filter((i) => _routes.includes('route:' + i.meta?.permissionKey)))
        : null
    }))

  return dealData(allRoutes)
}
