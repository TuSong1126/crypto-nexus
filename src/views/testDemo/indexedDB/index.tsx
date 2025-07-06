import React, { useEffect, useState } from 'react'

import { addData, clearAllData, getAllData } from './indexedDB'

const Page: React.FC = () => {
  const [online, setOnline] = useState(navigator.onLine)
  const [input, setInput] = useState('')
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    // 注册 Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('Service Worker 注册成功:', reg)
        })
        .catch((err) => {
          console.error('Service Worker 注册失败:', err)
        })
    }
    // 监听网络状态
    const handleOnline = () => {
      setOnline(true)
      syncData()
    }
    const handleOffline = () => setOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    setOnline(navigator.onLine)
    getAllData().then(setList)
  }, [])

  async function handleAdd() {
    if (!input) return
    const data = { content: input, timestamp: Date.now() }
    await addData(data)
    setInput('')
    getAllData().then(setList)
    if (navigator.onLine) {
      syncData()
    }
  }

  async function syncData() {
    setOnline(true)
    // const data = await getAllData() // 移除未使用变量
    // 模拟同步到服务器
    // for (const item of data) {
    //   await fetch('/api/sync', { method: 'POST', body: JSON.stringify(item) })
    //   假设同步成功后可以清空本地数据
    // }
    await clearAllData()
    getAllData().then(setList)
  }

  return (
    <main>
      <h1>离线数据存储与同步Demo</h1>
      <div>当前网络状态：{online ? '在线' : '离线'}</div>
      <div>
        输入框：
        <input
          value={input}
          className="bg-[#ededed] mr-[16px]"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>添加数据</button>
      </div>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.content} - {new Date(item.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Page
