import { useSyncExternalStore } from 'react'

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
