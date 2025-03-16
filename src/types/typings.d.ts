//声明window上自定义属性，如事件总线
declare interface Window {
  eventBus: unknown
}

declare interface Any {
  [key: string]: any
}

// 路由
declare interface RouteType {
  path: string
  Component?: React.LazyExoticComponent<() => JSX.Element>
  index?: boolean
  element?: JSX.Element
  meta?: {
    title: string
    permissionKey: string
    icon: string
  }
  children?: RouteType[] | null
}
