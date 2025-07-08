import { useEffect, useState } from 'react'

export function useMousePosition(delay = 500) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let timer: null | NodeJS.Timeout = null
    const handleMove = (e: MouseEvent) => {
      if (timer) return

      timer = setTimeout(() => {
        console.log('窗口大小变化', e)
        setPosition({ x: e.clientX, y: e.clientY })

        timer = null
      }, delay)
    }

    window.addEventListener('mousemove', handleMove)

    // 清理函数：组件卸载时移除事件监听
    return () => {
      console.log(111, '销毁时,先执行清理函数,移除窗口大小变化的监听')
      window.removeEventListener('mousemove', handleMove)
    }
  }, [])

  return position
}
