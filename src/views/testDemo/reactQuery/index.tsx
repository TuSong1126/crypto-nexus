import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'

// 模拟权限数据类型
type Permission = {
  id: string
  name: string
  code: string
  description: string
  status: string
}

// 模拟异步获取权限数据
const fetchPermissions = (): Promise<Permission[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(11111, '调用了接口')
      resolve(mockPermissions)
    }, 1000) // 模拟网络延迟
  })
}

// 模拟权限数据
const mockPermissions: Permission[] = [
  {
    id: '1',
    name: '用户管理',
    code: 'USER_MANAGE',
    description: '管理用户信息',
    status: 'active'
  },
  {
    id: '2',
    name: '角色管理',
    code: 'ROLE_MANAGE',
    description: '管理用户角色',
    status: 'active'
  },
  {
    id: '3',
    name: '系统设置',
    code: 'SYSTEM_SETTING',
    description: '系统配置管理',
    status: 'inactive'
  }
]

// 总结：
// 组件重新渲染 ≠ 数据重新请求
// 10 秒后缓存被清理，但不会自动请求接口，除非有新的“需求”触发（如组件重新挂载、手动刷新等）
const Page: React.FC = () => {
  const queryClient = useQueryClient()

  // 1. useQuery 获取数据，staleTime 控制缓存过期时间
  const { data, isLoading, isFetching, refetch, isStale } = useQuery<Permission[]>({
    queryKey: ['permissions'],
    queryFn: fetchPermissions,
    staleTime: 5000, // 5秒内数据为新鲜，不会自动重新请求
    gcTime: 10000 // 10秒后缓存才会被清理
    // refetchInterval: 10000 // 每 10 秒自动请求一次
  })

  useEffect(() => {
    console.log(11111, '组件挂载了，看一下接口调用没有！！！')
  }, [])

  // 2. 手动失效缓存
  const handleInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['permissions'] })
  }

  return (
    <main>
      <h1>React Query Demo</h1>
      <button onClick={() => refetch()}>手动刷新</button>
      <button onClick={handleInvalidate} style={{ marginLeft: 8 }}>
        手动失效缓存
      </button>
      <div style={{ margin: '12px 0' }}>
        {isLoading ? '加载中...' : null}
        {isFetching && !isLoading ? '后台刷新中...' : null}
        <div>当前数据是否过期（isStale）：{isStale ? '是' : '否'}</div>
      </div>
      <ul>
        {Array.isArray(data) &&
          data.map((item) => (
            <li key={item.id}>
              <b>{item.name}</b>（{item.status}） - {item.description}
            </li>
          ))}
      </ul>
    </main>
  )
}

export default Page
