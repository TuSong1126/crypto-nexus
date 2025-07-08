// 简单的全局数据源，支持 localStorage 事件驱动
let storeValue = localStorage.getItem('global-key') || ''
const listeners = new Set<() => void>()

function setValue(newValue: string) {
  storeValue = newValue
  localStorage.setItem('global-key', newValue)
  listeners.forEach((cb) => cb())
}

function getSnapshot() {
  return storeValue
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  // 监听 localStorage 事件，实现多标签页同步
  function storageHandler(e: StorageEvent) {
    if (e.key === 'global-key') {
      storeValue = e.newValue || ''
      callback()
    }
  }
  window.addEventListener('storage', storageHandler)
  return () => {
    listeners.delete(callback)
    window.removeEventListener('storage', storageHandler)
  }
}

export const dataStore = {
  setValue,
  getSnapshot,
  subscribe
}
