import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback)
  return () => window.removeEventListener('resize', callback)
}

function getSnapshot() {
  return window.innerWidth
}

export default function UseSyncExternalStoreDemo() {
  const width = useSyncExternalStore(subscribe, getSnapshot)
  return <div>Window width: {width}</div>
}
