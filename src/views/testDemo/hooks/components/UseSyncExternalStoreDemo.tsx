import { useSyncExternalStore } from 'react'

// 基于 React 18 useSyncExternalStore，实现组件级精准订阅与快照管理。
// 支持 localStorage、WebSocket、IndexedDB 等原生事件驱动的高性能实时同步，兼容并发渲染，提升系统响应与一致性。
import { dataStore } from './config/dataStore'

export default function UseSyncExternalStoreDemo() {
  const value = useSyncExternalStore(dataStore.subscribe, dataStore.getSnapshot)
  return (
    <div>
      <div>全局数据: {value}</div>
      <input
        value={value}
        onChange={(e) => dataStore.setValue(e.target.value)}
        placeholder="输入内容同步到全局"
      />
    </div>
  )
}
