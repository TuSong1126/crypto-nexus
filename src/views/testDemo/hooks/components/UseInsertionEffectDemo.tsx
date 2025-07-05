import { useInsertionEffect, useRef } from 'react'

// ○ 比 useLayoutEffect 更早运行，适合动态注入样式。
// ○ 仅限 CSS-in-JS 库（如 Emotion、Styled-Components）使用。
// ○ React 18：引入以支持 CSS-in-JS。
// ○ React 19：无变化，但服务器组件中不可用。

export default function UseInsertionEffectDemo() {
  const ref = useRef<HTMLDivElement>(null)

  useInsertionEffect(() => {
    if (ref.current) {
      ref.current.style.color = 'red'
    }
  }, [])

  return <div ref={ref}>useInsertionEffect applied color</div>
}
